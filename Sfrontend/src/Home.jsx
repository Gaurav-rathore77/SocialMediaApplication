import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
	const [commentInput, setCommentInput] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts")
			.then((response) => setPosts(response.data))
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);

	const handleLike = (postId) => {
		axios
			.post(`http://localhost:5000/api/posts/like/${postId}`)
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error liking post:", error));
	};

	const handleAddComment = (postId, commentText) => {
		axios
			.post(`http://localhost:5000/api/posts/comment/${postId}`, {
				text: commentText,
			})
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error adding comment:", error));
	};

	return (
		<div className="home max-w-4xl mx-auto p-4">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Recent Posts</h2>
			{posts.map((post) => (
				<div
					key={post._id}
					className="post bg-white shadow-md rounded-lg p-6 mb-6"
				>
					<h3 className="text-2xl font-semibold text-gray-700 mb-2">{post.title}</h3>
					<p className="text-gray-600 mb-4">{post.content}</p>
					{post.file && (
						<div className="mb-4">
							{post.file.includes(".mp4") ? (
								<video className="rounded-md w-full max-w-md" controls>
									<source
										src={`http://localhost:5000/uploads/${post.file}`}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							) : (
								<img
									src={`http://localhost:5000/uploads/${post.file}`}
									alt="Post Media"
									className="rounded-md w-full max-w-md"
								/>
							)}
						</div>
					)}
					<div className="flex items-center justify-between mb-4">
						<p className="text-gray-600">
							<span className="font-semibold">Likes:</span> {post.likes}
						</p>
						<button
							onClick={() => handleLike(post._id)}
							className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
						>
							Like
						</button>
					</div>
					<div className="mb-4">
						<p className="text-gray-600">
							<span className="font-semibold">Comments:</span> {post.comments.length}
						</p>
						<ul className="mt-2">
							{post.comments.map((comment, index) => (
								<li
									key={index}
									className="text-gray-600 text-sm bg-gray-100 p-2 rounded-md mb-1"
								>
									{comment.text}
								</li>
							))}
						</ul>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="text"
							placeholder="Add a comment"
							className="comment-input w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={(e) => setCommentInput(e.target.value)}
						/>
						<button
							onClick={() => handleAddComment(post._id, commentInput)}
							className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
						>
							Add
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default Home;
