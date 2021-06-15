<template>
    <div v-if="error" class="alert alert-danger mw-500 mx-auto d-flex justify-content-between" role="alert">
        {{ error }}
        <span class="close-icon" @click="closeError">&times;</span>
    </div>
    <h2 class="text-center mt-5" v-if="!getAuthStatus">Для того, чтобы опубликовать пост нужно авторизоваться</h2>
    <div v-else class="row mt-5">
        <div class="col-6">
            <form class="form mx-auto" @submit.prevent="publishPost()">
                <div class="mb-2">
                    <label for="title" class="form-label">Post title</label>
                    <input type="text" class="form-control" id="title" v-model="formData.title">
                </div>
                <div class="mb-2">
                    <label for="content" class="form-label">Post content</label>
                    <input type="text" class="form-control" id="content" v-model="formData.content">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Публикация поста</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете опубликовать пост</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "PublishPost",
        data() {
            return {
                formData: {
                    title: '',
                    content: ''
                },
                error: ''
            }
        },
        methods: {
            publishPost() {
                if (this.formData.title === '' || this.formData.content === '') {
                    this.error = 'Все поля должны быть заполнены.'
                }
                this.$store.dispatch('publishPost', { ...this.formData, dateOfCreation: Date.now(), creatorId: this.getAuthUser.id })
            },
            closeError() {
                this.error = ''
            }
        },
        computed: mapGetters(['getAuthStatus', 'getAuthUser'])
    }
</script>

<style lang="scss" scoped>
    .form {
        max-width: 500px;
    }

    .mw-500 {
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
</style>