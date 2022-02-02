import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PostDetails = ({ deleting }) => {
	const navigate = useNavigate();

	const params = useParams();

	const [post, setPost] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/${params.postid}`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setPost(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.postid]);

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}`, {
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				console.log(resJson);
			}
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='post-details'>
			{deleting ? (
				<div className='post-delete-controls'>
					<h1>Delete this post?</h1>
					<button type='submit' onClick={handleDelete}>
						Delete
					</button>
				</div>
			) : null}
			{post ? (
				<article className='post'>
					<h2 className='post-title'>Title: {post.title}</h2>
					<p className='post-text'>{post.text}</p>
					<h3 className='post-author'>Author: {post.author.username}</h3>
					<h3 className='post-created'>
						Published: {new Date(post.create_timestamp).toLocaleString('en-GB')}
					</h3>
					{post.update_timestamp ? (
						<h3 className='post-updated'>
							Last updated:{' '}
							{new Date(post.update_timestamp).toLocaleString('en-GB')}
						</h3>
					) : null}
				</article>
			) : null}
		</div>
	);
};

export default PostDetails;
