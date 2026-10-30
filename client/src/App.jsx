import React from "react";
import axios from "axios";

const App = () => {
	const getData = async (id) => {
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/${id}`,
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			Welcome To Home
			<button
				onClick={() => {
					getData(101);
				}}
			>
				Get Data
			</button>
		</div>
	);
};

export default App;
