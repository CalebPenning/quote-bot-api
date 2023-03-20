import { Request, Response, Router } from "express"
import sql from "../db/db"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
	try {
		const allKeywords = await sql`
      select * from keywords
    `
		res.status(200).json({
			quotes: allKeywords,
		})
	} catch (err) {
		res.status(500).json({ error: err })
	}
})

router.post("/", async (req: Request, res: Response) => {
	try {
		const { body } = req
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

export default router
