<template>
    <h2 v-if="!getAuthStatus" class="text-center">Чтобы удалить коннект, нужно авторизоваться</h2>
    <div v-else class="row mt-5">
        <div class="col-6">
            <form class="form mx-auto" @submit.prevent="deleteConnection()">
                <div class="mb-2">
                    <label for="id" class="form-label">Id</label>
                    <input type="email" class="form-control" id="id" aria-describedby="id" v-model="id">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Удаление коннекта</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете удалить коннект с определенным пользователем</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DeleteConnection",
        data() {
            return {
                id: ''
            }
        },
        methods: {
            deleteConnection() {
                this.$store.dispatch('deleteConnection', { senderId: this.getAuthUser.id, receiverId: this.id })
            }
        },
        computed: mapGetters(['getAuthStatus', 'getAuthUser'])
    }
</script>

<style lang="scss" scoped>
    .form {
        max-width: 500px;
    }

    .form-description {
        font-size: 24px;
    }
</style>