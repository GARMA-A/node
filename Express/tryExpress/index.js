import express from "express";
import { router as movieRouter } from "./movie/index.js";

let app = express();

app.use("/movies", movieRouter);

app.get("/", (_, res) => {
	res.redirect("/movies");

});


app.listen(8080, () => {
	console.log(" Movie data base is on http://localhost:8080");
});
