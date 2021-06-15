<template>
    <h2 class="text-center mt-5" v-if="!getAuthStatus">Для того, чтобы подписаться на группу нужно авторизоваться</h2>
    <div v-else class="container-fluid" :key="groups">
        <h2 v-if="groups.length === 0" class="text-center mt-5">Пока что групп в базе нету</h2>
        <table v-if="groups.length > 0" class="table mt-5">
            <thead>
            <tr>
                <th v-for="[title,_] of Object.entries(groups[0])" scope="col">{{ title }}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, i) of groups">
                <th scope="row">{{ group.id }}</th>
                <td>{{ group.group_name }}</td>
                <td>{{ group.description }}</td>
                <td>
                    <input ref="check" type="checkbox" class="form-check-input"
                           :checked="isChecked(group.id)" @change="toggleGroup(group.id)">
                </td>
            </tr>
            </tbody>
        </table>
        <button :disabled="acceptList.length === 0" v-if="groups.length > 0" @click="subscribeOnGroups" class="btn btn-primary">subscribe</button>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "GroupSubscribe",
        data() {
            return {
                groups: [],
                acceptList: [],
                mySubscriptions: [],
                error: ''
            }
        },
        methods: {
            toggleGroup(id) {
                const isFound = this.acceptList.find(el => el === id)
                if (isFound)
                    this.acceptList = this.acceptList.filter(el => el !== id)
                else this.acceptList.push(id)
                console.log(this.acceptList)
            },
            async subscribeOnGroups() {
                await this.$store.dispatch('subscribeOnGroups', { subscriberId: this.getAuthUser.id, list: this.acceptList })
                this.$refs.check.checked = false

                this.groups = await fetch('http://localhost:3000/groups/all')
                    .then(res => res.json())
                    .then(res => res.groups)

                this.mySubscriptions = await fetch(`http://localhost:3000/users/find-subscriptions/${this.getAuthUser.id}`)
                    .then(res => res.json())
                    .then(res => res.subscriptions)
                console.log('subs:', this.mySubscriptions)

                for (let i = 0; i < this.mySubscriptions.length; i++) {
                    this.groups = this.groups.filter(gr => gr.id !== this.mySubscriptions[i])
                }
            },
            isChecked(groupId) {
                return !!this.acceptList.find(id => id === groupId)
            },
            closeError() {
                this.error = ''
            }
        },
        computed: mapGetters(['getAuthStatus', 'getAuthUser']),
        async created() {
            this.groups = await fetch('http://localhost:3000/groups/all')
                .then(res => res.json())
                .then(res => res.groups)

            this.mySubscriptions = await fetch(`http://localhost:3000/users/find-subscriptions/${this.getAuthUser.id}`)
                .then(res => res.json())
                .then(res => res.subscriptions)
            console.log('subs:', this.mySubscriptions)

            for (let i = 0; i < this.mySubscriptions.length; i++) {
                this.groups = this.groups.filter(gr => gr.id !== this.mySubscriptions[i])
            }
            console.log(this.groups)
        }
    }
</script>

<style lang="scss" scoped>

</style>