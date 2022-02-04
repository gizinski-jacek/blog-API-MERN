import { useEffect, useState } from 'react';
import LoadingIcon from './utils/LoadingIcon';
import PostLinkWrapper from './utils/PostLinkWrapper';

const PostList = () => {
	const [loading, setLoading] = useState(true);
	const [allPosts, setAllPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/posts', {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setAllPosts(resJson);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const postsDisplay = allPosts?.map((post) => {
		return <PostLinkWrapper key={post._id} post={post} />;
	});

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='all-posts'>
					<section className='grid-container'>{postsDisplay}</section>
				</div>
			)}
		</>
	);
};

export default PostList;
