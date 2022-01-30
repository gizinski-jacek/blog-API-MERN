import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostLinkWrapper from './utils/PostLinkWrapper';

const PostsPreview = () => {
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
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const postsPreviewDisplay = previewPosts?.map((post) => {
		return <PostLinkWrapper key={post._id} post={post} />;
	});

	return (
		<section className='posts-preview'>
			<div className='container'>{postsPreviewDisplay}</div>
			<Link to='posts' className='button-link'>
				View all posts
			</Link>
		</section>
	);
};

export default PostsPreview;
