import CommentWrapper from './utils/CommentWrapper';

const CommentList = ({ currentUser, postComments, setPostComments }) => {
	const commentsDisplay = postComments?.map((comment, index) => {
		return (
			<CommentWrapper
				key={index}
				currentUser={currentUser}
				comment={comment}
				setPostComments={setPostComments}
			/>
		);
	});

	return <div className='comment-list'>{commentsDisplay}</div>;
};

export default CommentList;
