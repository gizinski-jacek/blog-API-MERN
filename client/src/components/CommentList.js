import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CommentForm from './CommentForm';
import CommentLinkWrapper from './utils/CommentLinkWrapper';

const CommentList = ({ currentUser }) => {
	const params = useParams();

	const [allComments, setAllComments] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/${params.postid}/comments`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				if (res.status !== 200) {
					console.log(resJson);
				} else {
					setAllComments(resJson);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.postid]);

	const commentsDisplay = allComments?.map((comment, index) => {
		return <CommentLinkWrapper key={index} comment={comment} />;
	});

	return (
		<>
			<CommentForm currentUser={currentUser} setAllComments={setAllComments} />
			<div className='comment-list'>{commentsDisplay}</div>
		</>
	);
};

export default CommentList;
