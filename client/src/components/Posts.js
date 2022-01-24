import PostWrapper from './utils/PostWrapper';

const Posts = ({ posts }) => {
	const postsDisplay = posts?.map((post) => {
		return <PostWrapper key={post._id} post={post} />;
	});

	return <section className='posts-preview container'>{postsDisplay}</section>;
};

export default Posts;
