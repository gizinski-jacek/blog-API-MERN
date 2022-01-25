import { Link } from 'react-router-dom';

const PostLinkWrapper = ({ post }) => {
	return (
		<Link to={`/posts/${post._id}`}>
			<article className='post'>
				<h2 className='title'>{post.title}</h2>
				<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
				<h3 className='published'>{post.timestamp}</h3>
			</article>
		</Link>
	);
};

export default PostLinkWrapper;
