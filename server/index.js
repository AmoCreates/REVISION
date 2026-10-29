import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "dotenv/config";
dotenv.config({ path: "./.env" });

import userRouter from "./router/userRouter.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
		methods: ["GET", "POST"],
	}),
);

app.get("/", (req, res) => {
	res.send("server is ready to serve");
});

app.get('/search', (req, res) => {
	const query = req.query
	res.json(query);
})

app.use('/user', userRouter)

app.listen(port, () => {
	console.log(`server is running at port: http://localhost:${port}`);
});
