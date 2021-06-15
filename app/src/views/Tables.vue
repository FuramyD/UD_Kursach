<template>
    <div class="container d-flex flex-wrap">
        <div class="card mt-5 mx-3" style="width: 18rem;" v-for="card of cards">
            <div class="card-body">
                <h5 class="card-title">{{ card.title }}</h5>
                <p class="card-text">{{ card.description }}</p>
            </div>
            <div class="card-footer">
                <router-link :to="card.link">Перейти</router-link>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Tables",
        data() {
            return {
                cards: [
                    {
                        title: 'Таблица пользователей',
                        description: 'Эта таблица всех существующих пользователей со всеми данными, кроме паролей',
                        link: '/tables/users'
                    },
                    {
                        title: 'Таблица коннектов',
                        description: 'Эта таблица всех связанных пользователей с текущим авторизованным пользователем',
                        link: '/tables/usersJoinConnections'
                    },
                    {
                        title: 'Таблица групп',
                        description: 'Эта таблица всех групп',
                        link: '/tables/groups'
                    },
                    {
                        title: 'Таблица постов',
                        description: 'Эта таблица всех постов пользователей и групп',
                        link: '/tables/posts'
                    },
                    {
                        title: 'Таблица постов пользователей',
                        description: 'Эта таблица всех постов пользователей',
                        link: '/tables/users-posts'
                    },
                    {
                        title: 'Таблица постов групп',
                        description: 'Эта таблица всех постов групп',
                        link: '/tables/groups-posts'
                    },
                    {
                        title: 'Таблица подписок аккаунта',
                        description: 'Эта таблица всех групп на которые подписан пользователь',
                        link: '/tables/subscriptions'
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        box-shadow: 2px 2px 12px 1px #ccc;
    }
</style>