<template>
    <h2 v-if="posts.length === 0" class="text-center mt-5">Пока что постов в базе нету</h2>
    <table v-if="posts.length > 0" class="table mt-5" :key="users">
        <thead>
        <tr>
            <th v-for="[title,_] of Object.entries(posts[0])" scope="col">{{ title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post of posts">
            <th scope="row">{{ post.id }}</th>
            <td>{{ post.title }}</td>
            <td>{{ post.content }}</td>
            <td>{{ new Date(+post.date_of_creation).toString() }}</td>
            <td>{{ post.creator_id }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "GroupsPostsTable",
        data() {
            return {
                posts: []
            }
        },
        async created() {
            this.posts = await fetch('http://localhost:3000/groups-posts/all')
                .then(res => res.json())
                .then(res => res.posts)
            console.log('posts:', this.posts)
        }
    }
</script>

<style scoped>

</style>