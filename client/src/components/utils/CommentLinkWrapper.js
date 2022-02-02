import { Link } from 'react-router-dom';

const CommentLinkWrapper = ({ comment }) => {
	return (
		<Link to={`comments/${comment._id}`}>
			<div className='comment'>
				<h3>{comment.author.username}</h3>
				<h3>
					{new Date(comment.create_timestamp).toLocaleString('en-GB', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
					})}
				</h3>
				{comment.update_timestamp ? (
					<h3>
						Last edit:{' '}
						{new Date(comment.update_timestamp).toLocaleString('en-GB', {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						})}
					</h3>
				) : null}
				<p>{comment.text}</p>
			</div>
		</Link>
	);
};

export default CommentLinkWrapper;
