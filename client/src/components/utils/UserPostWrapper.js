const UserPostWrapper = ({ post }) => {
	return (
		<div className='user-post'>
			<div className='post-controls'>
				<button type='button'>Edit</button>
				<button type='button'>Delete</button>
			</div>
			<article className='post'>
				<h2 className='title'>{post.title}</h2>
				<h3 className='author'>{post.author ? post.author : 'Anonymous'}</h3>
				<h3 className='published'>{post.timestamp}</h3>
			</article>
		</div>
	);
};

export default UserPostWrapper;
