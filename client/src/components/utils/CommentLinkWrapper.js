const CommentLinkWrapper = ({ comment }) => {
	return (
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
	);
};

export default CommentLinkWrapper;
