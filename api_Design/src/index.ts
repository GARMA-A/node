import { app } from "./server.ts"
import dotenv from "dotenv"
dotenv.config()

app.listen(3000, () => {
	console.log("server is up on https://localhost:3000")
})
