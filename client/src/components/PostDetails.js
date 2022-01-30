import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PostDataWrapper from './utils/PostDataWrapper';

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
			const res = await fetch(`/api/posts/delete/${params.postid}`, {
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				// setErrors(resJson);
				console.log(resJson);
			} else {
				navigate('/dashboard');
			}
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
			{post ? <PostDataWrapper post={post} /> : null}
		</div>
	);
};

export default PostDetails;
