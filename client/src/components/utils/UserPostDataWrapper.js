import { Link } from 'react-router-dom';

const UserPostDataWrapper = ({ post, setPosts }) => {
	const handlePublish = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/dashboard/${post._id}/publish`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				// setErrors(resJson);
				console.log(resJson);
			} else {
				setPosts(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnpublish = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/dashboard/${post._id}/unpublish`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				// setErrors(resJson);
				console.log(resJson);
			} else {
				setPosts(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='user-post'>
			<div className='post-controls'>
				<Link to={`${post._id}/update`}>Edit</Link>
				{post.published ? (
					<button type='button' onClick={handleUnpublish}>
						Unpublish
					</button>
				) : (
					<button type='button' onClick={handlePublish}>
						Publish
					</button>
				)}
				<Link to={`${post._id}/delete`}>Delete</Link>
			</div>
			<article className='post'>
				<h2 className='title'>{post.title}</h2>
				<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
				<h3 className='published'>{post.create_timestamp}</h3>
				{post.update_timestamp ? (
					<h3 className='updated'>Last updated: {post.update_timestamp}</h3>
				) : null}
			</article>
		</div>
	);
};

export default UserPostDataWrapper;
