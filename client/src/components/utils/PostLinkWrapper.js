import { Link } from 'react-router-dom';

const PostLinkWrapper = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`} className='post'>
			<h2 className='post-title'>Title: {post.title}</h2>
			<div className='post-metadata'>
				<h3 className='post-author'>Author: {post.author.username}</h3>
				<h4 className='post-created'>
					Published:{' '}
					{new Date(post.createdAt).toLocaleString('en-GB', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
					})}
				</h4>
				{post.updatedAt ? (
					<h4 className='comment-updated'>
						Updated:{' '}
						{new Date(post.updatedAt).toLocaleString('en-GB', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						})}
					</h4>
				) : null}
			</div>
		</Link>
	);
};

export default PostLinkWrapper;
