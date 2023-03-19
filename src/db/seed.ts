import sql from "./db"
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

		return
	} catch (err) {
		console.error("An error occured while creating the tables: ")
		console.error(err)
	}
}

async function seedTables() {
	try {
		const quoteResults = await sql`
            insert into quotes (
                body
            ) values (
                    'Start the war... that's never been seen before...',
                    'EH HEH',
                    '*holds knife to throat*',
                    '*licks knife*',
                    '*threatens to pour 'The Concoction' on you*',
                    'Scientists studied it, dude',
                    'My brother totally invented 'Your face'',
                    'Bro... Jane is so hot.',
                    'That's some rope ass chicken',
                    'Be right back, I gotta call my mom.\n*Hey, mom... I just wanted to call and say that I love you...*\nI'm back. *wipes tears*',
                    'What if you made the connection... when there weren't any distractions?',
                    'Look in the window...',
                    'I'm the guest.',
                    '©Joker1 Productions',
                    'Ohhhh, what would you do with a drunken sailooor?',
                    'I'm the best, man, I deed it',
                    'Can someone turn the lights up? I can't hear the song.',
                    'skating',
                    '*holds knife to throat* DON'T YOU *EVER* TOUCH ME AGAIN',
                    'I can see the clouds moving...',
                    'I could model for apple sauce',
                    'Well ya should've ate it!'
                );
            returning *
        `

		const keywordsResults = await sql`
            insert into keywords (body)
                values (
                    'alex',
                    'steven',
                    'sneaky',
                    'craigo',
                    'stavi',
                    'my brother',
                    'epic'
                );
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
