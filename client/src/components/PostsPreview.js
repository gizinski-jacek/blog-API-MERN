import PostWrapper from './utils/PostWrapper';

const PostsPreview = ({ posts }) => {
	const postsDisplay = posts?.slice(0, 3).map((post) => {
		return <PostWrapper key={post._id} post={post} />;
	});

	return <section className='posts-preview container'>{postsDisplay}</section>;
};

export default PostsPreview;
