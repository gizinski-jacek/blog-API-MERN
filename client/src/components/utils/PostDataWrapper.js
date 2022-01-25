const PostDataWrapper = ({ post }) => {
	return (
		<article id={post._id} className='post'>
			<h2 className='title'>{post.title}</h2>
			<p>{post.text}</p>
			<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
			<h3 className='published'>{post.timestamp}</h3>
		</article>
	);
};

export default PostDataWrapper;
