import CommentWrapper from './utils/CommentWrapper';

const CommentList = ({ currentUser, postComments, setEditingComment }) => {
	const commentsDisplay = postComments?.map((comment, index) => {
		return (
			<CommentWrapper
				key={index}
				currentUser={currentUser}
				comment={comment}
				setEditingComment={setEditingComment}
			/>
		);
	});

	return <div className='comment-list'>{commentsDisplay}</div>;
};

export default CommentList;
