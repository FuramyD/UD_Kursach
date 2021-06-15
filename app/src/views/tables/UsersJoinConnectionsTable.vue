<template>
    <h2 v-if="!getAuthStatus" class="text-center mt-5">Вы не авторизованы под пользователем</h2>
    <div v-else class="container-fluid mt-5">
        <h2 class="text-center" v-if="users.length === 0">У вас пока нету коннектов с другими пользователями</h2>
        <table v-if="users.length > 0" class="table mt-5" :key="users">
            <thead>
            <tr>
                <th v-for="[title,_] of Object.entries(users[0])" v-show="title !== 'password'" scope="col">{{ title }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user of users">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.user1_id }}</td>
                <td>{{ user.user2_id }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "UsersJoinConnectionsTable",
        data() {
            return {
                users: [],
                authId: null
            }
        },
        computed: mapGetters(['getAuthUser', 'getAuthStatus']),
        async created() {
            if (!this.getAuthStatus) return

            this.authId = await this.getAuthUser.id ?? null
            this.users = await fetch(`http://localhost:3000/users/all-join-connections/${this.authId}`)
                .then(res => res.json())
                .then(res => res.users)
            console.log(this.users)
        }
    }
</script>

<style lang="scss" scoped>

</style>