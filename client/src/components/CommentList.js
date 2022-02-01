import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const Comments = ({ currentUser }) => {
	const params = useParams();

	const [errors, setErrors] = useState();
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
					setErrors(resJson);
				} else {
					setAllComments(resJson);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.postid]);

	const errorsDisplay = errors?.map((error, index) => {
		return (
			<li key={index} className='error-msg'>
				{error.msg}
			</li>
		);
	});

	const commentsDisplay = allComments?.map((comment, index) => {
		return (
			<Link key={index} to={`comments/${comment._id}`}>
				<div className='comment'>
					<h3>{comment.author.username}</h3>
					<h3>{comment.create_timestamp}</h3>
					{comment.update_timestamp ? (
						<h3>
							Last updated:{' '}
							{new Date(comment.update_timestamp).toLocaleString('en-GB')}
						</h3>
					) : null}
					<p>{comment.text}</p>
				</div>
			</Link>
		);
	});

	return (
		<>
			<CommentForm currentUser={currentUser} setAllComments={setAllComments} />
			<div className='comment-list'>{commentsDisplay}</div>
			{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
		</>
	);
};

export default Comments;
