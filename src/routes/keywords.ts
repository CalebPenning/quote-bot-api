import { Request, Response, Router } from "express"
import sql from "../db/db"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
	try {
		const allKeywords = await sql`
      select * from keywords
    `
		res.status(200).json({
			keywords: allKeywords,
		})
	} catch (err) {
		res.status(500).json({ error: err })
	}
})

router.post("/", async (req: Request, res: Response) => {
	try {
		const body = req.body
		if (!body.body) {
			return res.status(400).json({
				error:
					"Request body did not have 'body' property. 'body' is a required property.",
			})
		}
		const result = await sql`
			insert into keywords ${sql(body, "body")}
			returning *
		`
		res.status(201).json(result)
	} catch (err) {
		res.status(401).json({ error: err })
	}
})

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const id = +req.params.id
		if (!id) res.status(400).json({ error: "Invalid id" })

		const results = await sql`
			delete from keywords
			where id = ${id}
			returning *
		`

		if (!results.length)
			return res.status(400).json({ error: "something went wrong!" })
		else res.json(results)
	} catch (err) {
		console.error(err)
		res.status(400).json({ error: err })
	}
})

export default router
