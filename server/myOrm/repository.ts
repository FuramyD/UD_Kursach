import { Client } from 'pg'

export class Repository {
    constructor(table) {
        this.table = table

        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: '260201',
            port: 5432,
        })

        this.client.connect()
    }

    private client: Client
    public table: string

    async find(filters = null) {
        if (!filters) return this.client.query(`SELECT * FROM "${this.table}"`)

        filters = Object.entries(filters)
        let where = ''
        for (const [fieldName, value] of filters) {
            where += `${fieldName} = '${value}' AND `
        }
        where = where.substr(0, where.length - 5)
        console.log('WHERE:', where)
        return this.client.query(`SELECT * FROM "${this.table}" WHERE ${where}`).then(res => res.rows)
    }

    async findOne(filters) {
        const found = await this.find(filters) ?? []
        return found[0] ?? null
    }

    async insertOne(data) {
        data = Object.entries(data)
        let fields = ''
        let values = ''
        for (const [fieldName, value] of data) {
            fields += `${this.toSnakeCase(fieldName)},`
            values += `'${value}',`
        }
        fields = fields.substr(0, fields.length - 1)
        values = values.substr(0, values.length - 1)
        try {
            return this.client.query(`INSERT INTO "${this.table}" (${fields}) VALUES (${values})`)
        } catch (e) {
            return false
        }

    }

    async delete(filters): Promise<any> {
        // if (!filters) return this.client.query(`DELETE FROM "${this.table}"`)
        filters = Object.entries(filters)
        let where = ''
        for (const [fieldName, value] of filters) {
            where += `${this.toSnakeCase(fieldName)} = '${value}' AND `
        }
        where = where.substr(0, where.length - 5)
        console.log('WHERE:', where)
        return this.client.query(`DELETE FROM "${this.table}" WHERE ${where}`)
    }

    async deleteOne(id: number | string) {
        return this.client.query(`DELETE FROM "${this.table}" WHERE ID = '${id}'`)
    }

    async getConnections(id) {
        return this.query(
            `SELECT * FROM "${this.table}" U RIGHT JOIN "CONNECTION" C ON U.ID = C.USER1_ID WHERE USER2_ID = '${id}'
                    UNION
                    SELECT * FROM "${this.table}" U RIGHT JOIN "CONNECTION" C ON U.ID = C.USER2_ID WHERE USER1_ID = '${id}';`
        )
    }

    async query(request: string) {
        return this.client.query(request)
    }

    toSnakeCase(str: string) {
        let resultStr = ''
        for (const symbol of str) {
            if (this.isUpperCase(symbol)) resultStr += `_${symbol}`
            else resultStr += symbol.toUpperCase()
        }
        return resultStr
    }

    isUpperCase(symbol: string) {
        return symbol === symbol.toUpperCase()
    }
}