import PostLinkWrapper from './utils/PostLinkWrapper';

const Posts = ({ posts }) => {
	const postsDisplay = posts?.map((post) => {
		return <PostLinkWrapper key={post._id} post={post} />;
	});

	return <section className='posts-preview container'>{postsDisplay}</section>;
};

export default Posts;
