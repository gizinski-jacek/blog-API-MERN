import PostLinkWrapper from './utils/PostLinkWrapper';

const Posts = ({ allPosts }) => {
	const postsDisplay = allPosts
		?.filter((post) => post.published === true)
		.map((post) => {
			return <PostLinkWrapper key={post._id} post={post} />;
		});

	return <section className='post-list container'>{postsDisplay}</section>;
};

export default Posts;
