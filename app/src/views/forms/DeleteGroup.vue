<template>
    <div class="row mt-5">
        <div class="col-6">
            <form class="form mx-auto" @submit.prevent="deleteGroup()">
                <div class="mb-2">
                    <label for="id" class="form-label">Id</label>
                    <input type="email" class="form-control" id="id" aria-describedby="id" v-model="id">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Удаление группы</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете удалить группу</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeleteGroup",
        data() {
            return {
                id: ''
            }
        },
        methods: {
            deleteGroup() {
                this.$store.dispatch('deleteGroup', +this.id)
            }
        }
    }
</script>

<style scoped>
    .form {
        max-width: 500px;
    }

    .form-description {
        font-size: 24px;
    }
</style>