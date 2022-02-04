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
			<h3 className='comment-author'>By: {comment.author.username}</h3>
			<p className='comment-created'>
				Posted: {new Date(comment.create_timestamp).toLocaleString('en-GB')}
			</p>
			{comment.update_timestamp ? (
				<p className='comment-updated'>
					Last edited:{' '}
					{new Date(comment.update_timestamp).toLocaleString('en-GB')}
				</p>
			) : null}
			<p className='comment-text'>{nl2br(comment.text)}</p>
		</div>
	);
};

export default CommentWrapper;
