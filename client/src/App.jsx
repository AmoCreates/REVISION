import React, { useState } from "react";
import axios from "axios";

export default function App() {
	const [formData, setFormData] = useState({
		username: "",
		mobile: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [success, setSuccess] = useState(false);
	const [islogin, setIsLogin] = useState(false);

	const signup = async () => {
		try {
			const { data } = await axios.post(
				"http://localhost:3000/signup",
				formData,
				{
					withCredentials: true,
				},
			);
			console.log(data.message);
			setError("");
			setSuccess(true);
			setSuccessMsg(data.message);
		} catch (error) {
			setError(error.response.data.message);
			console.log(error.response.data.message);
		}
	};

	const login = async () => {
		try {
			if (
				!formData.email ||
				formData.email.trim().length === 0 ||
				!formData.password ||
				formData.password.trim().length === 0
			) {
				return;
			}
			const { data } = await axios.post(
				"http://localhost:3000/login",
				formData,
				{
					withCredentials: true,
				},
			);
			console.log(data.message);
			setError("");
			setSuccess(true);
			setSuccessMsg(data.message);
			console.log(data.user)
		} catch (error) {
			setError(error.response.data.message);
			console.log(error.response.data.message);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		// Basic Client-side Validation
		if (!islogin && formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		if (islogin) {
			// call login
			await login();
		} else {
			//call signup
			await signup();
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<div>
					<h2 className="mt-6 text-center text-3xl font-light tracking-tight text-gray-900">
						{islogin ? "Login Account" : "Create Account"}
					</h2>
					<p className="mt-2 text-center text-sm text-gray-500">
						Please enter your details to{" "}
						{islogin ? "Login" : "sign up"}.
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100">
							{error}
						</div>
					)}
					{success && (
						<div className="rounded-md bg-green-50 p-3 text-sm text-green-600 border border-green-100">
							{successMsg}
						</div>
					)}

					<div className="space-y-4">
						<div className={`${islogin && "hidden"}`}>
							<label
								htmlFor="username"
								className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1"
							>
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required={!islogin}
								value={formData.username}
								onChange={handleChange}
								className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
								placeholder="johndoe"
							/>
						</div>

						<div className={`${islogin && "hidden"}`}>
							<label
								htmlFor="mobile"
								className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1"
							>
								Mobile Number
							</label>
							<input
								id="mobile"
								name="mobile"
								type="tel"
								required={!islogin}
								value={formData.mobile}
								onChange={handleChange}
								className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
								placeholder="+1 (555) 000-0000"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1"
							>
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={formData.password}
								onChange={handleChange}
								className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
								placeholder="••••••••"
							/>
						</div>

						<div className={`${islogin && "hidden"}`}>
							<label
								htmlFor="confirmPassword"
								className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required={!islogin}
								value={formData.confirmPassword}
								onChange={handleChange}
								className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="w-full bg-black py-3 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all rounded-md mt-4"
						>
							{islogin ? "Login" : "Signup"}
						</button>
					</div>
				</form>
				<button
					onClick={() => {
						setError("");
						setSuccessMsg("");
						setSuccess(false);
						setIsLogin(!islogin);
					}}
					className="w-full underline text-blue-300 cursor-pointer active:scale-95 active:font-semibold"
				>
					{islogin ? "signup" : "login"}
				</button>
			</div>
		</div>
	);
}
