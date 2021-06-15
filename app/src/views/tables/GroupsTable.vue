<template>
    <h2 v-if="groups.length === 0" class="text-center mt-5">Пока что групп в базе нету</h2>
    <table v-if="groups.length > 0" class="table mt-5" :key="groups">
        <thead>
        <tr>
            <th v-for="[title,_] of Object.entries(groups[0])" scope="col">{{ title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(group, i) of groups">
            <th scope="row">{{ group.id }}</th>
            <td>{{ group.group_name }}</td>
            <td>{{ group.description }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "GroupsTable",
        data() {
            return {
                groups: []
            }
        },
        async created() {
            this.groups = await fetch('http://localhost:3000/groups/all')
                .then(res => res.json())
                .then(res => res.groups)
            console.log(this.groups)
        }
    }
</script>

<style scoped>

</style>