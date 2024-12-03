import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";

function App() {
	return (
		<Router>
			<div className="app bg-gray-100 w-screen h-full">
				<nav className="bg-blue-600 text-white shadow-md">
					<div className="container mx-auto p-4 flex justify-between items-center">
						<h1 className="text-xl font-bold">Aaru's ShareApp</h1>
						<ul className="flex gap-4">
							<li>
								<Link
									to="/"
									className=" text-white hover:underline hover:text-blue-300"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/create"
									className=" text-white hover:underline hover:text-blue-300"
								>
									Create Post
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className="container mx-auto p-4">
					<Routes>
						<Route path="/create" element={<CreatePost />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
