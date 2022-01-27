import { useParams } from 'react-router';

const Comments = ({ comments }) => {
	const params = useParams();

	const commentsDisplay = comments
		?.filter((comment) => comment.post_ref_id === params.postid)
		.map((comment, index) => {
			return (
				<div key={index} className='comment'>
					<h3>{comment.author}</h3>
					<h3>{comment.timestamp}</h3>
					<p>{comment.text}</p>
				</div>
			);
		});

	return <div className='comments'>{commentsDisplay}</div>;
};

export default Comments;
