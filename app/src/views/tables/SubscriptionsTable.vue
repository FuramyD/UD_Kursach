<template>
    <h2 v-if="subs.length === 0" class="text-center mt-5">Пока что пользователей в базе нету</h2>
    <table v-if="subs.length > 0" class="table mt-5" :key="subs">
        <thead>
        <tr>
            <th v-for="[title,_] of Object.entries(subs[0])" v-show="title !== 'password'" scope="col">{{ title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="sub of subs">
            <th scope="row">{{ sub.group_id }}</th>
            <td>{{ sub.group_name }}</td>
            <td>{{ sub.description }}</td>
            <td>{{ sub.user_id }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "SubscriptionsTable",
        data() {
            return {
                subs: []
            }
        },
        async created() {
            this.subs = await fetch('http://localhost:3000/users/subs-table')
                .then(res => res.json())
                .then(res => res.table)
        }
    }
</script>

<style scoped>

</style>