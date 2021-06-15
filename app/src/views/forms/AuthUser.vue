<template>
    <div class="row mt-5">
        <div class="col-6">
            <div v-if="getAuthError" class="alert alert-danger mw-500 mx-auto d-flex justify-content-between" role="alert">
                {{ getAuthError }}
                <span class="close-icon" @click="closeError">&times;</span>
            </div>
            <form class="form mx-auto mw-500" @submit.prevent="authUser">
                <div class="mb-2">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="formData.email">
                </div>
                <div class="mb-2">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formData.password">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Авторизация пользователя</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете авторизоваться под созданного пользователя</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";

    export default {
        name: "Auth.vue",
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            authUser() {
                if (this.formData.email && this.formData.password) {
                    this.$store.dispatch('authUser', this.formData)
                }
                else
                    this.setAuthError('Все поля должны быть заполнены.')
            },
            ...mapMutations(['closeError', 'setAuthError'])
        },
        computed: mapGetters(['getAuthError'])
    }
</script>

<style lang="scss" scoped>
    .mw-500 {
        max-width: 500px;
    }

    .close-icon {
        display: flex;
        align-items: center;

        font-size: 24px;
        width: 24px;
        height: 24px;

        cursor: pointer;
    }

    .form-description {
        font-size: 24px;
    }
</style>