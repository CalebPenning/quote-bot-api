import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import morgan from "morgan"

import keywordsRoutes from "./routes/keywords"
import quotesRoutes from "./routes/quotes"

dotenv.config()
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.use("/keywords", keywordsRoutes)
app.use("/quotes", quotesRoutes)

app.get("/health", (_: Request, res: Response) => {
	res.status(200).send("OK")
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
