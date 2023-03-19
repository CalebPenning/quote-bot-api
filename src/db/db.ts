import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()
const url = process.env.DB_URL as string

const sql = postgres(url)

export default sql
