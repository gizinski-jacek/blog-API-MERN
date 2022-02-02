import { useEffect, useState } from 'react';
import PostLinkWrapper from './utils/PostLinkWrapper';

const Authors = () => {
	const [allPosts, setAllPosts] = useState();
	const [allAuthors, setAllAuthors] = useState();

	useEffect(() => {
		(async () => {
			try {
				const resPosts = await fetch('/api/posts', {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resAuthors = await fetch('/api/authors', {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const postsJson = await resPosts.json();
				const authorsJson = await resAuthors.json();
				setAllPosts(postsJson);
				setAllAuthors(authorsJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	// Transform each author object to objects with author data and array of published posts belonging to that author
	const authorsData = allAuthors
		?.map((author) => {
			const authorPosts = allPosts.filter(
				(post) => post.published === true && post.author._id === author._id
			);
			return { author, authorPosts };
		})
		// Filter out authors with no published posts
		.filter((author) => author.authorPosts.length > 0);

	const contentDisplay = authorsData?.map((data, index) => {
		const posts = data.authorPosts.map((post, index) => {
			return <PostLinkWrapper key={index} post={post} />;
		});
		return (
			<div key={index} className='author'>
				<h1>{data.author.username}</h1>
				{posts}
			</div>
		);
	});

	return (
		<div className='author-list'>
			<span>{contentDisplay}</span>
		</div>
	);
};

export default Authors;
