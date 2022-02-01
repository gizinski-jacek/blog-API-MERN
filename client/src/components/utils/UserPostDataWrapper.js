import { Link } from 'react-router-dom';

const UserPostDataWrapper = ({ post, setAllPosts }) => {
	const handlePublish = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${post._id}/publish`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				console.log(resJson);
			} else {
				setAllPosts(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnpublish = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${post._id}/unpublish`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				console.log(resJson);
			} else {
				setAllPosts(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='user-post'>
			<div className='post-edit-controls'>
				<Link to={`update/${post._id}`}>Edit</Link>
				{post.published ? (
					<button type='button' onClick={handleUnpublish}>
						Unpublish
					</button>
				) : (
					<button type='button' onClick={handlePublish}>
						Publish
					</button>
				)}
				<Link to={`delete/${post._id}`}>Delete</Link>
			</div>
			<article className='post'>
				<h2 className='post-title'>Title: {post.title}</h2>
				<h3 className='post-author'>Author: {post.author.username}</h3>
				<h3 className='post-created'>Published: {post.create_timestamp}</h3>
				{post.update_timestamp ? (
					<h3 className='post-updated'>
						Last updated:{' '}
						{new Date(post.update_timestamp).toLocaleString('en-GB')}
					</h3>
				) : null}
			</article>
		</div>
	);
};

export default UserPostDataWrapper;
