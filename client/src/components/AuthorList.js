import { useEffect, useState } from 'react';
import AuthorPostsWrapper from './utils/AuthorPostsWrapper';

const AuthorList = () => {
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

	const authorsDataDisplay = authorsData?.map((data, index) => {
		return (
			<AuthorPostsWrapper
				key={index}
				author={data.author}
				posts={data.authorPosts}
			/>
		);
	});

	return <div className='author-list'>{authorsDataDisplay}</div>;
};

export default AuthorList;
