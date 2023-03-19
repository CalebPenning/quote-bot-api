import sql from "./db"
import { quotesSeed, keywordsSeed } from "./data"

const mappedQuotes = quotesSeed.map((quote) => ({
	body: quote,
}))
const mappedKeywords = keywordsSeed.map((keyword) => ({
	body: keyword,
}))

;(async () => {
	console.log(sql)
	await createTables()
	await seedTables()
	console.log("Tables created and seeded successfully")
})()

// create tables
async function createTables() {
	try {
		const quotesResults = await sql`
            CREATE TABLE IF NOT EXISTS quotes (
                id SERIAL UNIQUE PRIMARY KEY,
                body TEXT NOT NULL UNIQUE
            )
        `
		if (quotesResults) {
			console.log("Results of creating tables -> ", quotesResults)
		}

		const keywordsResults = await sql`
            CREATE TABLE IF NOT EXISTS keywords (
                id SERIAL UNIQUE PRIMARY KEY,
                body TEXT NOT NULL UNIQUE
            )
        `

		if (keywordsResults) {
			console.log("Results of creating tables -> ", quotesResults)
		}

		console.log("Tables created successfully!")
		return
	} catch (err) {
		console.error("An error occured while creating the tables: ")
		console.error(err)
	}
}

async function seedTables() {
	try {
		const quoteResults = await sql`
            insert into quotes ${sql(mappedQuotes, "body")}
            returning *
        `

		const keywordsResults = await sql`
            insert into keywords ${sql(mappedKeywords, "body")}
            returning *
        `

		if (quoteResults && keywordsResults) {
			console.log("Quote Insert Results -> ", quoteResults)
			console.log("Keyword Insert Results -> ", keywordsResults)
		}
	} catch (err) {
		console.error("An error occured while seeding the db tables: ")
		console.error(err)
	}
}
