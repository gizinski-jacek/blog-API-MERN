const PostDataWrapper = ({ post }) => {
	return (
		<article id={post._id} className='post'>
			<h2 className='title'>{post.title}</h2>
			<p>{post.text}</p>
			<h3 className='author'>
				Author: {post.author ? post.author : 'Anonymous'}
			</h3>
			<h3 className='published'>Published: {post.create_timestamp}</h3>
			{post.update_timestamp ? (
				<h3 className='updated'>Last updated: {post.update_timestamp}</h3>
			) : null}
		</article>
	);
};

export default PostDataWrapper;
