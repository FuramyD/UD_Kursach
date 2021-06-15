<template>
    <h2>Отчет - Коннекты между пользователями</h2>
    <div class="container report-wrapper mx-5">
        <div v-for="(user, i) of users" class="group-wrapper mt-4">
            <div class="title">Пользователь: {{ user.id }} {{ user.first_name }} {{ user.last_name }} </div>
            <div class="connections">
                <div v-for="connection of user.connections" class="connection mx-2 d-flex">
                    <div>{{ connection.first_name }}</div>
                    <div>{{ connection.last_name }}</div>
                    <div>{{ connection.email }}</div>
                    <div>{{ connection.phone }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AllUsersAndConnections",
        data() {
            return {
                users: null,
                connections: null
            }
        },
        methods: {

        },
        async created() {
            const query = `
                SELECT
                    U.ID AS U1_ID,
                    U.FIRST_NAME AS U1_FIRST_NAME,
                    U.LAST_NAME AS U1_LAST_NAME,
                    U.EMAIL AS U1_EMAIL,
                    U.PHONE AS U1_PHONE,
                    U2.FIRST_NAME AS U2_FIRST_NAME,
                    U2.LAST_NAME AS U2_LAST_NAME,
                    U2.EMAIL AS U2_EMAIL,
                    U2.PHONE AS U2_PHONE
                FROM "CONNECTION" C
                    JOIN "USER" U on C.USER1_ID = U.ID
                    JOIN "USER" U2 on C.USER2_ID = U2.ID;
            `

            const res = await fetch('http://localhost:3000/api/query', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ query })
            })
                .then(res => res.json())
                .then(res => res.rows)

            console.log('response:', res)

            this.users = res.map(el => ({
                id: el.u1_id,
                first_name: el.u1_first_name,
                last_name: el.u1_last_name,
                email: el.u1_email,
                phone: el.u1_phone,
                connections: []
            }))
                .sort((a, b) => a.id - b.id)
                .filter((el, i, arr) => {
                    if (i > 1)
                        return el.email !== arr[i - 1].email
                    return true
                })

            this.users.forEach(user => {
                res.forEach(el => {
                    if (user.email === el.u1_email) {
                        user.connections.push({
                            first_name: el.u2_first_name,
                            last_name: el.u2_last_name,
                            email: el.u2_email,
                            phone: el.u2_phone,
                        })
                    }
                })
            })

            console.log('users:', this.users)

        }
    }


    function uniq(arr) {
        var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

        return arr.filter(function(item) {
            var type = typeof item;
            if(type in prims)
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
                return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    }
</script>

<style lang="scss" scoped>
    .container {
        .group-wrapper {
            .title {
                font-size: 18px;
                font-weight: 500;
            }
            .connections {
                .connection {

                    & > div {
                        margin: 0 10px;
                    }
                }
            }
        }
    }
</style>