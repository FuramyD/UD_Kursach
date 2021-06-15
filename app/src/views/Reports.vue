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
        name: "Reports",
        data() {
            return {
                cards: [
                    {
                        title: 'Отчет - Подписчики групп',
                        description: 'В этом отчете вы можете посмотреть какие пользователи подписаны на определенные группы и их количество',
                        link: '/reports/all-groups-and-subscribers'
                    },
                    {
                        title: 'Отчет - Коннекты между пользователями',
                        description: 'В этом отчете вы можете посмотреть какие пользователи общаются друг с другом',
                        link: '/reports/all-users-and-connections'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>