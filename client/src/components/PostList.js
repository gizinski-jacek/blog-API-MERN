import { useEffect, useState } from 'react';
import PostLinkWrapper from './utils/PostLinkWrapper';

const PostList = () => {
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
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const postsDisplay = allPosts?.map((post) => {
		return <PostLinkWrapper key={post._id} post={post} />;
	});

	return <section className='post-list container'>{postsDisplay}</section>;
};

export default PostList;
