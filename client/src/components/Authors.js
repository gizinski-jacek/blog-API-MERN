import PostLinkWrapper from './utils/PostLinkWrapper';

const Authors = (props) => {
	// Grab author names from all posts
	const authors = props.posts?.map((post) => {
		return post.author;
	});
	// Remove duplicate author names
	const uniqueAuthors = [...new Set(authors)];
	// Transform author names to objects with author name and array of posts belonging to that author
	const authorsData = uniqueAuthors.map((author) => {
		let posts = props.posts.filter((post) => post.author === author);
		return { author_name: author, posts: posts };
	});
	const contentDisplay = authorsData.map((author) => {
		const posts = author.posts.map((post, index) => {
			return <PostLinkWrapper key={index} post={post} />;
		});
		return (
			<div className='author'>
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
