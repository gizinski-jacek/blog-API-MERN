import nl2br from 'react-nl2br';

const CommentWrapper = ({ currentUser, comment, setEditingComment }) => {
	return (
		<div className='comment'>
			{currentUser && currentUser._id === comment.author._id ? (
				<div className='comment-edit-controls'>
					<button
						type='button'
						className='button-s'
						onClick={() => {
							setEditingComment(comment);
						}}
					>
						Edit
					</button>
				</div>
			) : null}
			<div className='comment-metadata'>
				<h3 className='comment-author'>By: {comment.author.username}</h3>
				<h5 className='comment-created'>
					Posted: {new Date(comment.createdAt).toLocaleString('en-GB')}
				</h5>
				{comment.updatedAt ? (
					<h5 className='comment-updated'>
						Last edit: {new Date(comment.updatedAt).toLocaleString('en-GB')}
					</h5>
				) : null}
			</div>
			<p className='comment-text'>{nl2br(comment.text)}</p>
		</div>
	);
};

export default CommentWrapper;
