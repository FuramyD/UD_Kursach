<template>
    <h2 v-if="users.length === 0" class="text-center mt-5">Пока что пользователей в базе нету</h2>
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
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "UsersTable",
        data() {
            return {
                users: []
            }
        },
        async created() {
            this.users = await fetch('http://localhost:3000/users/all')
                .then(res => res.json())
                .then(res => res.users)
            console.log('users:', this.users)
        }
    }
</script>

<style lang="scss" scoped>

</style>