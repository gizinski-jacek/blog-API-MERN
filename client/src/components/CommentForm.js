import { useState } from 'react';
import { useParams } from 'react-router';

const CommentForm = ({ currentUser, setAllComments }) => {
	const params = useParams();

	const [errors, setErrors] = useState();
	const [commentValue, setCommentValue] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}/comments`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ commentValue }),
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
	};

	const errorsDisplay = errors?.map((error, index) => {
		return (
			<li key={index} className='error-msg'>
				{error.msg}
			</li>
		);
	});

	return (
		<div className='new-comment'>
			{currentUser ? (
				<>
					<h3>{currentUser.username}</h3>
					<form id='new-comment-form' onSubmit={handleSubmit}>
						<input
							type='text'
							id='comment'
							name='comment'
							minLength='2'
							maxLength='64'
							onChange={(e) => {
								setCommentValue(e.target.value);
							}}
							value={commentValue}
							placeholder='Comment'
							required
						/>
						<button type='submit'>Submit</button>
					</form>
					{errorsDisplay ? (
						<ul className='error-list'>{errorsDisplay}</ul>
					) : null}
				</>
			) : (
				<>
					<h2>Log In to comment</h2>
				</>
			)}
		</div>
	);
};

export default CommentForm;
