import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./config/connection.db.js";
import user from "./models/user.model.js";
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

app.get("/", (req, res) => {
	// All Headers
	console.log(req.headers);
	// Getting a Specific Header
	console.log(req.get("user-agent"));

	// Set Headers | Custome Headers
	// Convention to use (x-) for custome headers
	// 2 Ways to Set Headers
	res.set("x-username", "Amy");
	res.header("x-email", "AmoCreates@outlook.com");

	// Remove Header
	res.removeHeader("x-email");

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
				.json({ message: "All credentials are required." });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({
				message: "Password and confirm password do not match.",
			});
		}

		const exists = await user.findOne({email});

		if (exists)
			return res.status(400).json({
				message: "Email already exists.",
			});

		await user.create({
			name: username,
			email,
			mobile,
			password,
		});
		return res.status(201).json({ message: "Signup successful!" });
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong, signup failed!",
		});
	}
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = await req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "All credentials are required." });
		}
		const person = await user.findOne({email});
		if (!person) {
			return res.status(400).json({
				message: "Either email or password is invalid.",
			});
		}

		if (person.password !== password) {
			return res.status(400).json({
				message: "Either email or password is invalid.",
			});
		}

		person.loggedin = true;
		await person.save();
		return res.status(200).json({ message: "Login successful!" });
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong, login failed!",
		});
	}
});

const isLoggedin = async (req, res, next) => {
	try {
		const { email, password } = req.body || {};
		if (!email || !password) {
			return res
				.status(401)
				.json({ message: "User not found. You need to log in first." });
		}

		const person = await user.findOne({email});
		if (!person) {
			return res.status(401).json({ message: "User not found." });
		}

		if (person.password !== password) {
			return res.status(400).json({
				message: "Either email or password is invalid.",
			});
		}

		req.user = person;
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Something went wrong, please try again." });
	}
};

app.post("/getData", isLoggedin, async (req, res) => {
	try {
		const { name, mobile, email } = req.user;
		return res.status(200).json({ name, mobile, email });
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong, failed to fetch user data!",
		});
	}
});

app.listen(port, async () => {
	await dbConnect();
	console.log(`server is running at port: http://localhost:${port}`);
});
