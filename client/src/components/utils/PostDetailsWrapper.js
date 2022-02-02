const PostDetailsWrapper = ({ post }) => {
	return (
		<article className='post'>
			<h2 className='post-title'>Title: {post.title}</h2>
			<p className='post-text'>{post.text}</p>
			<h3 className='post-author'>Author: {post.author.username}</h3>
			<h3 className='post-created'>Published: {post.create_timestamp}</h3>
			{post.update_timestamp ? (
				<h3 className='post-updated'>
					Last updated:{' '}
					{new Date(post.update_timestamp).toLocaleString('en-GB')}
				</h3>
			) : null}
		</article>
	);
};

export default PostDetailsWrapper;
