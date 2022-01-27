import { Link } from 'react-router-dom';

const PostLinkWrapper = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`}>
			<article className='post'>
				<h2 className='title'>{post.title}</h2>
				<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
				<h3 className='published'>{post.create_timestamp}</h3>
				{post.update_timestamp ? (
					<h3 className='updated'>Last updated: {post.update_timestamp}</h3>
				) : null}
			</article>
		</Link>
	);
};

export default PostLinkWrapper;
