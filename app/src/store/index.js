import { createStore } from 'vuex'
import router from "../router";

const server_url = 'http://localhost:3000'

export default createStore({
    actions: {
        async createUser(ctx, data) {
            ctx.commit('closeError')
            const res = await request('http://localhost:3000/users/create', 'POST', data)
            if (res.status === 'failed') {
                ctx.commit('setCreateUserError', 'Не удалось создать пользователя, ' +
                    'возможно пользователь с такой почтой или телефоном уже существует.')
                return
            }

            console.log('createUser: ', res)
            ctx.commit('addUser', data)
        },
        async authUser(ctx, data) {
            ctx.commit('closeError')
            const res = await request('http://localhost:3000/users/auth', 'POST', data)
            if (res.status === 'not found') {
                ctx.commit('setAuthError', 'Пользователь не был найден.')
                return
            }

            ctx.commit('authUser', res)
        },
        async deleteUser(ctx, id) {
            const res = await request(`${server_url}/users/delete/${id}`, 'DELETE')
        },
        async createGroup(ctx, data) {
            const res = await request(`${server_url}/groups/create`, 'POST', data)
            alert(res.status)
        },
        async deleteGroup(ctx, id) {
            const res = await request(`${server_url}/groups/delete/${id}`, 'DELETE')
            alert(res.status)
        },
        async sendConnection(ctx, data) {
            const res = await request(`${server_url}/users/connections/send`, 'POST', data)
            alert(res.status)
        },
        async confirmConnection(ctx, data) {
            const res = await request(`${server_url}/users/connections/confirm`, 'POST', data)
            let connections = ctx.getters.getConnections
            for (const cid of data.list) {
                connections = connections.filter(el => el.id !== cid)
            }
            ctx.commit('setConnections', connections)
            console.log('confirm:', res)
        },
        async receiveConnections(ctx, id) {
            const connections = await request(`${server_url}/users/connections/receive/${id}`)
            // const connections = await fetch(`http://localhost:3000/users/connections/receive/${id}`).then(res => res.json())
            ctx.commit('setConnections', connections)
            console.log(connections)
        },
        async deleteConnection(ctx, data) {
            const res = await request(`${server_url}/users/connections/delete`, 'POST', data)
            alert(res.status)
        },
        async subscribeOnGroups(ctx, data) {
            const res = await request(`${server_url}/users/subscribe`, 'POST', data)
            alert(res.status + ' count: ' + res.count)
        },
        async publishPost(ctx, data) {
            const res = await request(`${server_url}/users/post`, 'POST', data)
            alert(res.status)
        },
        async publishGroupPost(ctx, data) {
            const res = await request(`${server_url}/groups/post`, 'POST', data)
            alert(res.status)
        },
        async getUsers(ctx) {
            const users = await request(`${server_url}/users/all`)
            ctx.commit('setUsers', users)
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        addUser(state, user) {
            // state.users.push(user)
            state.successfullyUserCreatedAlert = true
        },
        setConnections(state, connections) {
            state.connections = connections
        },
        authUser(state, authData) {
            state.authorizedUser = authData
            state.isAuth = true
            router.push('/tables')
        },
        logoutUser(state) {
            state.authorizedUser = null
            state.isAuth = false
        },

        setAuthError(state, error) {
            state.authError = error
        },
        setCreateUserError(state, error) {
            state.createUserError = error
        },

        closeAlert(state) {
            state.successfullyUserCreatedAlert = false
        },
        closeError(state) {
            state.authError = ''
            state.createUserError = ''
        }
    },
    state: {
        users: [],
        connections: [],
        isAuth: false,
        authorizedUser: null,

        successfullyUserCreatedAlert: false,

        authError: '',
        createUserError: ''
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getConnections(state) {
            return state.connections
        },
        getAuthStatus(state) {
            return state.isAuth
        },
        getAuthUser(state) {
            return state.authorizedUser
        },

        getUserCreatedAlert(state) {
            return state.successfullyUserCreatedAlert
        },

        getAuthError(state) {
            return state.authError
        },
        getCreateUserError(state) {
            return state.createUserError
        }
    },
    modules: {
    }
})


async function request(url, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' }

    switch (method) {
        case "GET":
            return fetch(url).then(res => res.json())
        case "POST":
            return fetch(url, {
                method,
                headers,
                body: JSON.stringify(body)
            }).then(res => res.json())
        case "PUT":
            break
        case "DELETE":
            return fetch(url, {
                method
            }).then(res => res.json())
    }
}