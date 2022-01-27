import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {
	const params = useParams();

	const commentsDisplay = comments
		?.filter((comment) => comment.post_ref_id === params.postid)
		.map((comment, index) => {
			return (
				<Link to={`comments/${comment._id}`}>
					<div key={index} className='comment'>
						<h3>{comment.author}</h3>
						<h3>{comment.create_timestamp}</h3>
						{comment.update_timestamp ? (
							<h3>Last updated: {comment.update_timestamp}</h3>
						) : null}
						<p>{comment.text}</p>
					</div>
				</Link>
			);
		});

	return <div className='comments'>{commentsDisplay}</div>;
};

export default Comments;
