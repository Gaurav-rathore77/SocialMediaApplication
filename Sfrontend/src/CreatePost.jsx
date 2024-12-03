import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		file: null,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleFileChange = (event) => {
		setNewPost({ ...newPost, file: event.target.files[0] });
	};

	const handlePostSubmit = () => {
		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("file", newPost.file);

		axios
			.post("http://localhost:5000/api/posts", formData)
			.then((response) => {
				setNewPost({ title: "", content: "", file: null });
			})
			.catch((error) => console.error("Error creating post:", error));
	};

	return (
		<div className="create-post  max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
			<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create a Post</h2>
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={newPost.title}
				onChange={handleInputChange}
				className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
			/>
			<textarea
				name="content"
				placeholder="Content"
				value={newPost.content}
				onChange={handleInputChange}
				className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
				rows="4"
			></textarea>
			<input
				type="file"
				name="file"
				onChange={handleFileChange}
				className="w-full text-gray-700 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
			/>
			<button
				onClick={handlePostSubmit}
				className="w-full bg-blue-500 text-white font-bold py-3 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Post
			</button>
		</div>
	);
}

export default CreatePost;
