<template>
    <h2>Отчет - Подписчики групп</h2>
    <div class="container report-wrapper mx-5">
        <div v-for="(gName, i) of groups_names" class="group-wrapper mt-4">
            <div class="title">Группа: {{ gName }}</div>
            <div class="subscribers">
                <div v-for="sub of subs[i]" class="sub mx-2 d-flex">
                    <div>{{ sub.first_name }}</div>
                    <div>{{ sub.last_name }}</div>
                    <div>{{ sub.email }}</div>
                    <div>{{ sub.phone }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AllGroupsAndSubscribers",
        data() {
          return {
              groups_names: null,
              subs: null
          }
        },
        methods: {

        },
        async created() {
            const query = `
                SELECT * FROM "GROUPS_USERS" GU
                JOIN "GROUP" G ON GU.GROUP_ID = G.ID
                JOIN "USER" U on GU.USER_ID = U.ID
            `

            const res = await fetch('http://localhost:3000/api/query', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ query })
            })
                .then(res => res.json())
                .then(res => res.rows)

            console.log(res);

            this.groups_names = Array.from(new Set(res.map(el => el.group_name)))
            console.log(this.groups_names)
            this.subs = new Array(this.groups_names.length)
            for (let i = 0; i < this.subs.length; i++) {
                this.subs[i] = res
                    .filter(el => el.group_name === this.groups_names[i])
                    .map(el => ({
                        first_name: el.first_name,
                        last_name: el.last_name,
                        email: el.email,
                        phone: el.phone
                    }))
            }
            console.log('subs:', this.subs);
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        .group-wrapper {
            .title {
                font-size: 18px;
                font-weight: 500;
            }
            .subscribers {
                .sub {

                    & > div {
                        margin: 0 10px;
                    }
                }
            }
        }
    }
</style>