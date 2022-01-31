import { Link } from 'react-router-dom';

const PostLinkWrapper = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`} className='post'>
			<h2 className='post-title'>Title: {post.title}</h2>
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
		</Link>
	);
};

export default PostLinkWrapper;
