<template>
    <div class="row mt-5">
        <div class="col-6">
            <h2 class="text-center mt-5" v-if="!getAuthStatus">Вы не авторизованы под пользователем</h2>
            <form v-else class="form mt-5 mx-auto" @submit.prevent="sendConnection">
                <!--        <div class="mb-2">-->
                <!--            <label for="senderId" class="form-label">Sender Id</label>-->
                <!--            <input type="text" class="form-control" id="senderId" v-model="formData.senderId">-->
                <!--        </div>-->
                <div class="mb-2">
                    <label for="receiverId" class="form-label">Receiver Id</label>
                    <input type="text" class="form-control" id="receiverId" v-model="receiverId">
                </div>

                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-5 form-description">
            <div class="row">
                <h2 class="col-12">Заявка на связь</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете отправить заявку на коннект другому пользователю</p>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "SendConnection",
        data() {
            return {
                receiverId: ''
            }
        },
        methods: {
            async sendConnection() {
                if (this.getAuthUser.id !== this.receiverId)
                    await this.$store.dispatch('sendConnection', { senderId: this.getAuthUser.id, receiverId: this.receiverId })
            }
        },
        computed: mapGetters(['getAuthUser', 'getAuthStatus'])
    }
</script>

<style scoped>
    .form {
        max-width: 500px;
    }
</style>