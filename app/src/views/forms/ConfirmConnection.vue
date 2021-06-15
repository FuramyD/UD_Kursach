<template>
    <div class="container">
        <div class="mb-2">
            <label for="id" class="form-label">Введите id пользователя, чтобы получить список его входящих запросов на связь</label>
            <input @input="onInputId" type="text" class="form-control" id="id" aria-describedby="emailHelp" v-model="formData.id">
        </div>

        <table v-if="!!getConnections[0]" class="table mt-5">
            <thead>
            <tr>
                <th v-for="[title,_] of Object.entries(getConnections[0])" scope="col">{{ title }}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="connection of getConnections">
                <th scope="row">{{ connection.id }}</th>
                <td>{{ connection.first_name }}</td>
                <td>{{ connection.last_name }}</td>
                <td>{{ connection.email }}</td>
                <td>{{ connection.phone }}</td>
                <td>
                    <input ref="check" type="checkbox" class="form-check-input"
                           :checked="isChecked(connection.id)" @change="toggleUser(connection.id)">
                </td>
            </tr>
            </tbody>
        </table>

        <button @click="acceptConnections" :disabled="acceptList.length === 0" class="btn btn-primary">Accept</button>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ConfirmConnection",
        data() {
            return {
                formData: {
                    id: ''
                },
                timeout: null,
                acceptList: []
            }
        },
        methods: {
            onInputId() {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.$store.dispatch('receiveConnections', this.formData.id)
                    this.acceptList = []
                    if (this.$refs.check) this.$refs.check.checked = false
                }, 500)
            },
            toggleUser(id) {
                const isFound = this.acceptList.find(el => el === id)
                if (isFound)
                    this.acceptList = this.acceptList.filter(el => el !== id)
                else this.acceptList.push(id)
                console.log(this.acceptList)
            },
            acceptConnections() {
                this.$store.dispatch('confirmConnection', { receiverId: this.formData.id, list: this.acceptList })
                this.$refs.check.checked = false
            },
            isChecked(connectionId) {
                return !!this.acceptList.find(id => id === connectionId)
            }
        },
        computed: {
            ...mapGetters(['getUsers', 'getConnections']),
        }
    }
</script>

<style scoped>
    .form {
        max-width: 500px;
    }
</style>