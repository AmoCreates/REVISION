import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "dotenv/config";
dotenv.config({ path: "./.env" });

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

const users = [];

app.get("/", (req, res) => {
	res.send("server is ready to serve");
});

app.get("/hello", (req, res) => {
	res.status(200).json({ message: "Hello from backend" });
});

app.get("/search", (req, res) => {
	const query = req.query;
	res.json(query);
});

app.post("/signup", async (req, res) => {
	try {
		const { username, mobile, email, password, confirmPassword } =
			await req.body;
		if (!username || !mobile || !email || !password || !confirmPassword) {
			return res
				.status(400)
				.json({ message: "All credentials requires" });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({
				message: "password and confirm password do not matched",
			});
		}

		const exists = users.some((user) => user.email === mobile);

		if (exists) {
			users.push({ name: username, mobile, email, password });
			return res.status(201).json({ message: "Signup Successfull!!" });
		}

		return res.status(400).json({
			message: "email already exists.",
		});
	} catch (error) {
		return res.status(500).json({
			message: "someting went wrong, signup failed!",
		});
	}
});

app.listen(port, () => {
	console.log(`server is running at port: http://localhost:${port}`);
});
