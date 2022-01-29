import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PostDataWrapper from './utils/PostDataWrapper';

const PostDetails = ({ allPosts, setAllPosts, deleting }) => {
	const navigate = useNavigate();

	const params = useParams();

	const [thePost, setThePost] = useState();

	useEffect(() => {
		if (allPosts) {
			const thePost = allPosts
				?.filter((post) => post.published === true)
				.find((post) => post._id === params.postid);
			if (thePost) {
				setThePost(thePost);
			} else {
				navigate('/posts');
			}
		}
	}, [allPosts, params.postid, navigate]);

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/dashboard/${params.postid}`, {
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
				setAllPosts(resJson);
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='post-details'>
			{deleting ? (
				<div className='delete-controls'>
					<h1>Delete this post?</h1>
					<button type='submit' onClick={handleDelete}>
						Delete
					</button>
				</div>
			) : null}
			{thePost ? <PostDataWrapper post={thePost} /> : null}
		</div>
	);
};

export default PostDetails;
