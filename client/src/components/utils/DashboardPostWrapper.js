import { Link } from 'react-router-dom';

const DashboardPostWrapper = ({ post, setAllPosts }) => {
	const handlePublish = async (id) => {
		try {
			const res = await fetch(`/api/posts/${id}/publish`, {
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

	const handleUnpublish = async (id) => {
		try {
			const res = await fetch(`/api/posts/${id}/unpublish`, {
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
			<div className='user-post-controls'>
				{post.published ? (
					<button
						type='button'
						className='button-m'
						onClick={() => handleUnpublish(post._id)}
					>
						Unpublish
					</button>
				) : (
					<button
						type='button'
						className='button-m'
						onClick={() => handlePublish(post._id)}
					>
						Publish
					</button>
				)}
				<Link to={`update/${post._id}`} className='button-m'>
					Edit
				</Link>
				<Link to={`delete/${post._id}`} className='button-m'>
					Delete
				</Link>
			</div>
			<article className={`post ${post.published ? '' : 'unpublished'}`}>
				<h2 className='post-title'>Title: {post.title}</h2>
				<div className='post-metadata'>
					<h3 className='post-created'>
						Published:{' '}
						{new Date(post.createdAt).toLocaleString('en-GB', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						})}
					</h3>
				</div>
			</article>
		</div>
	);
};

export default DashboardPostWrapper;
