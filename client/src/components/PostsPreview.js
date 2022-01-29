import PostLinkWrapper from './utils/PostLinkWrapper';

const PostsPreview = ({ allPosts }) => {
	const postsPreviewDisplay = allPosts
		?.filter((post) => post.published === true)
		.slice(0, 3)
		.map((post) => {
			return <PostLinkWrapper key={post._id} post={post} />;
		});

	return (
		<section className='posts-preview container'>{postsPreviewDisplay}</section>
	);
};

export default PostsPreview;
