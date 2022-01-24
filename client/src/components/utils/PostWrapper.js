const PostWrapper = ({ post }) => {
	return (
		<article className='post'>
			<h2 className='title'>{post.title}</h2>
			<h3 className='author'>
				{post.author ? post.author.username : 'Anonymous'}
			</h3>
			<h3 className='published'>{post.timestamp}</h3>
		</article>
	);
};

export default PostWrapper;
