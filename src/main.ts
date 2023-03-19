import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_: Request, res: Response) => {
	res.status(200).json({ message: "hello world!" })
})

app.get("/health", (_: Request, res: Response) => {
	res.status(200).send("OK")
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
