<template>
    <div class="container">
        <h2 class="mt-5">Выберите форму</h2>
        <div class="container-fluid d-flex justify-content-evenly">
            <div class="card mt-5" style="width: 18rem;" v-for="card of cards">
                <div class="card-body">
                    <h5 class="card-title">{{ card.title }}</h5>
                    <p class="card-text">{{ card.description }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="item of card.list">
                        <router-link style="text-decoration: none" :to="item.link">{{ item.message }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Forms",
        data() {
            return {
                cards: [
                    {
                        title: 'Работа с пользователями',
                        description: 'Здесь вы можете создать пользователя, зайти за пользователя,' +
                            ' отправить коннект другому пользователю, подписаться на группу',
                        list: [
                            { message: 'Создать пользователя', link: '/forms/users/registration' },
                            { message: 'Авторизоваться', link: '/forms/users/auth' },
                            { message: 'Отправить коннект другому пользователю', link: '/forms/users/connections/send' },
                            { message: 'Посмотреть входящие коннекты', link: '/forms/users/connections/receive' },
                            { message: 'Удалить коннект', link: '/forms/users/connections/delete' },
                            { message: 'Подписаться на группу', link: '/forms/users/subscribe' },
                            { message: 'Опубликовать пост', link: '/forms/users/post' },
                            { message: 'Удалить пользователя', link: '/forms/users/delete' }
                        ]
                    },
                    {
                        title: 'Работа с группами',
                        description: 'Здесь вы можете создать группу и выложить пост',
                        list: [
                            { message: 'Создать группу', link: '/forms/groups/create' },
                            { message: 'Опубликовать пост', link: '/forms/groups/post' },
                            { message: 'Удалить группу', link: '/forms/groups/delete' },
                        ]
                    },
                    // {
                    //     title: 'Работа с чатами',
                    //     description: 'Здесь вы можете создать чат и добавить туда пользователей',
                    //     list: [
                    //         { message: 'Создать чат', link: '/forms/chats/create' },
                    //         { message: 'Добавить пользователей', link: '/forms/chats/add' },
                    //     ]
                    // },
                ]
            }
        },
        created() {
            this.$store.dispatch('getUsers')
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        box-shadow: 2px 2px 12px 1px #ccc;
    }

    .list-group {
        background-color: #eee;
    }
    
    .list-group-item {
        cursor: pointer;
        transition: background-color 50ms linear;

        &:hover {
            background-color: rgba(204, 204, 204, 0.1);
        }
    }
</style>