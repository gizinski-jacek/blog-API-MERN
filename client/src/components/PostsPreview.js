import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingIcon from './utils/LoadingIcon';
import PostLinkWrapper from './utils/PostLinkWrapper';

const PostsPreview = () => {
	const [loading, setLoading] = useState(true);
	const [previewPosts, setPreviewPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/posts/preview', {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setPreviewPosts(resJson);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const postsPreviewDisplay = previewPosts?.map((post) => {
		return <PostLinkWrapper key={post._id} post={post} />;
	});

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='preview-posts'>
					<h2 className='recent-posts'>Most recent posts</h2>
					<section className='grid-container'>{postsPreviewDisplay}</section>
					<Link to='posts' className='view-all button-link'>
						View all posts
					</Link>
				</div>
			)}
		</>
	);
};

export default PostsPreview;
