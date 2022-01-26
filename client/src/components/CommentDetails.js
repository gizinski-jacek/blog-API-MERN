import { useState } from 'react';
import { useParams } from 'react-router';

const CommentDetails = ({ comments }) => {
	const params = useParams();

	const theComment = comments?.find((post) => post._id === params.postid);

	return (
		<div className='comment-details'>
			<div className='comment'>
				<h3>{theComment.author}</h3>
				<h3>{theComment.timestamp}</h3>
				<p>{theComment.text}</p>
			</div>
		</div>
	);
};

export default CommentDetails;
