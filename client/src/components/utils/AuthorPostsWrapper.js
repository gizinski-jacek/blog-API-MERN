import { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthorPostsWrapper = ({ author, posts }) => {
	const [expand, setExpand] = useState(false);

	const postsDisplay = posts.map((post, index) => {
		return (
			<Link key={index} to={`/posts/${post._id}`} className='post-simple'>
				<h2 className='post-title'>Title: {post.title}</h2>
				<div className='post-metadata'>
					<h2 className='post-created'>
						Published:{' '}
						{new Date(post.create_timestamp).toLocaleString('en-GB', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						})}
					</h2>
				</div>
			</Link>
		);
	});

	return (
		<div className='author-posts'>
			<div className='top'>
				<h2>Author: {author.username}</h2>
				<button type='button' onClick={() => setExpand(!expand)}>
					{expand ? 'Collapse' : 'Expand'}
				</button>
			</div>
			<section className={`container ${expand ? 'expand' : ''}`}>
				{postsDisplay}
			</section>
		</div>
	);
};

export default AuthorPostsWrapper;
