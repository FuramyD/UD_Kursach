<template>
    <div class="row mt-5">
        <div class="col-6">
            <form class="form mx-auto" @submit.prevent="createGroup">
                <div class="mb-2">
                    <label for="name" class="form-label">Group name</label>
                    <input type="text" class="form-control" id="name" v-model="formData.groupName">
                </div>
                <div class="mb-2">
                    <label for="description" class="form-label">Group description</label>
                    <input type="text" class="form-control" id="description" v-model="formData.description">
                </div>
                <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
        <div class="col-5 mt-3 form-description">
            <div class="row">
                <h2 class="col-12">Создание группы</h2>
            </div>
            <div class="row">
                <p class="text-wrapper col-9">На этой странице вы можете создать новую группу</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreateGroup",
        data() {
            return {
                formData: {
                    groupName: '',
                    description: ''
                }
            }
        },
        methods: {
            createGroup() {
                this.$store.dispatch('createGroup', this.formData)
            }
        }
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