import { Link } from 'react-router-dom';

const UserPostDataWrapper = ({ post }) => {
	const handlePublish = () => {};

	const handleUnpublish = () => {};

	return (
		<div className='user-post'>
			<div className='post-controls'>
				<Link to={`${post._id}/update`}>Edit</Link>
				{post.published ? (
					<button type='button'>Unpublish</button>
				) : (
					<button type='button'>Publish</button>
				)}
				<Link to={`${post._id}/delete`}>Delete</Link>
			</div>
			<article className='post'>
				<h2 className='title'>{post.title}</h2>
				<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
				<h3 className='published'>{post.timestamp}</h3>
			</article>
		</div>
	);
};

export default UserPostDataWrapper;
