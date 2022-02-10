import { useState } from 'react';
import { useParams } from 'react-router';

const CommentForm = ({ currentUser, setPostComments }) => {
	const params = useParams();

	const [errors, setErrors] = useState();
	const [comment, setComment] = useState({ text: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setComment({ [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}/comments`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(comment),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				if (!Array.isArray(resJson)) {
					if (typeof resJson === 'object') {
						setErrors([resJson]);
					}
					if (typeof resJson === 'string') {
						setErrors([{ msg: resJson }]);
					}
				} else {
					setErrors(resJson);
				}
			} else {
				setPostComments(resJson);
				setComment({});
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
					<h3>Comment as: {currentUser.username}</h3>
					<form id='new-comment-form' onSubmit={handleSubmit}>
						<textarea
							type='text'
							id='comment'
							name='comment'
							minLength='2'
							maxLength='64'
							rows='2'
							onChange={(e) => {
								handleChange(e);
							}}
							value={comment.text}
							placeholder='Comment'
							required
						/>
						{errorsDisplay ? (
							<ul className='error-list'>{errorsDisplay}</ul>
						) : null}
						<button type='submit' className='button-m'>
							Submit
						</button>
					</form>
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
