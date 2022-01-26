import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Comments = () => {
	const params = useParams();

	const [postComments, setPostComments] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/${params.postid}/comments`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setPostComments(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.postid]);

	const commentsDisplay = postComments?.map((comment) => {
		return (
			<div className='comment'>
				<h3>{comment.author}</h3>
				<h3>{comment.timestamp}</h3>
				<p>{comment.text}</p>
			</div>
		);
	});

	return <div className='comments'>{commentsDisplay}</div>;
};

export default Comments;
