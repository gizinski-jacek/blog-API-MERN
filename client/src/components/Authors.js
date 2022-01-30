import { useEffect, useState } from 'react';
import PostLinkWrapper from './utils/PostLinkWrapper';

const Authors = () => {
	const [allPosts, setAllPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts`, {
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

	// Grab author names from all posts
	const authors = allPosts?.map((post) => {
		return post.author;
	});
	// Remove duplicate author names
	const uniqueAuthors = [...new Set(authors)];
	// Transform author names to objects with author name and array of published posts belonging to that author
	const authorsData = uniqueAuthors
		.map((author) => {
			const authorPosts = allPosts.filter(
				(post) => post.published === true && post.author === author
			);
			return { author_name: author, authorPosts };
		})
		// Filter out authors with no published posts
		.filter((author) => author.authorPosts.length > 0);

	const contentDisplay = authorsData.map((author, index) => {
		const posts = author.authorPosts.map((post, index) => {
			return <PostLinkWrapper key={index} post={post} />;
		});
		return (
			<div key={index} className='author'>
				<h1>{author.author_name}</h1>
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
