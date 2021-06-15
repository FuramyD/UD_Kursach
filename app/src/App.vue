<template>
    <div class="container mx-auto">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/tables" class="nav-link" href="#">Таблицы</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/reports" class="nav-link" href="#">Отчеты</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/forms" class="nav-link">Формы</router-link>
                        </li>
                    </ul>
                    <div v-if="getAuthStatus" class="authData">
                        <h4 style="font-weight: 400;">Привет, {{ getAuthUser.first_name }}</h4>
                    </div>
                </div>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: 'App',
        data() {
            return {
                isAuth: false,
                authData: null
            }
        },
        methods: {

        },
        computed: mapGetters(['getAuthUser', 'getAuthStatus'])
    }
</script>

<style lang="scss">
    @import "node_modules/bootstrap/scss/bootstrap";

    .nav-item {
        font-size: 18px;
    }
</style>
