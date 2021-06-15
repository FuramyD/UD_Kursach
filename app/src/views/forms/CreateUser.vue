<template>
    <div class="row mt-5">
        <div class="col-6">
            <div v-if="getUserCreatedAlert" class="alert alert-success mw-500 mx-auto d-flex justify-content-between" role="alert">
                <p>Пользователь был успешно создан, теперь вы можете <router-link class="inline-link" to="/forms/users/auth">авторизоваться</router-link></p>
                <span class="close-icon" @click="closeAlert">&times;</span>
            </div>
            <div v-if="getCreateUserError" class="alert alert-danger mw-500 mx-auto d-flex justify-content-between" role="alert">
                {{ getCreateUserError }}
                <span class="close-icon" @click="closeError">&times;</span>
            </div>
            <form class="form mx-auto" @submit.prevent="createUser">
                <div class="mb-2">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="formData.email">
                    <!--            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
                </div>
                <div class="mb-2">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formData.password">
                </div>
                <div class="mb-2">
                    <label class="form-check-label" for="firstName">First name</label>
                    <input type="text" class="form-control" id="firstName" v-model="formData.firstName">
                </div>
                <div class="mb-2">
                    <label class="form-check-label" for="lastName">Last name</label>
                    <input type="text" class="form-control" id="lastName" v-model="formData.lastName">
                </div>
                <div class="mb-2">
                    <label class="form-check-label" for="phone">Phone</label>
                    <input type="tel" class="form-control" id="phone" v-model="formData.phone">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Создание пользователя</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете создать нового пользователя</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "CreateUser",
        data() {
            return {
                formData: {
                    email: '',
                    password: '',
                    phone: '',
                    firstName: '',
                    lastName: ''
                }
            }
        },
        methods: {
            async createUser() {
                const { email, password, phone, firstName, lastName } = this.formData
                if (email === '' || password === '' || phone === '' || firstName === '' || lastName === '') {
                    this.setCreateUserError('Все поля должны быть заполнены.')
                    return
                }
                await this.$store.dispatch('createUser', this.formData)
            },
            ...mapMutations(['setCreateUserError', 'closeError', 'closeAlert'])
        },
        computed: mapGetters(['getCreateUserError', 'getUserCreatedAlert'])
    }
</script>

<style lang="scss" scoped>
    .form {
        max-width: 500px;
    }

    .text-wrapper {
        height: 100%;
    }

    .form-description p {
        font-size: 24px;
        font-weight: 400;
    }

    .close-icon {
        display: flex;
        align-items: center;

        font-size: 24px;
        width: 24px;
        height: 24px;

        cursor: pointer;
    }

    .mw-500 {
        max-width: 500px;
    }

    .inline-link {
        display: inline;
        color: #198754;
        text-decoration: none;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: lighten(#198754, 5%);
        }

    }
</style>