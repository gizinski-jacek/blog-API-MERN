import { Link } from 'react-router-dom';

const PostLinkWrapper = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`} className='post'>
			<h2 className='post-title'>Title: {post.title}</h2>
			<p className='post-text'>{post.text}</p>
			<h3 className='post-author'>Author: {post.author.username}</h3>
			<h3 className='post-created'>
				Published:{' '}
				{new Date(post.create_timestamp).toLocaleString('en-GB', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				})}
			</h3>
		</Link>
	);
};

export default PostLinkWrapper;
