import { useState } from 'react';

const CommentForm = ({ user }) => {
	const [errors, setErrors] = useState();
	const [comment, setComment] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/dashboard/create', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ comment }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			}
			// else {
			// 	navigate('/dashboard');
			// }
		} catch (error) {
			console.log(error);
		}
	};

	const errorDisplay = errors?.map((error, index) => {
		return <li key={index}>{error.msg}</li>;
	});

	return (
		<div className='new-comment'>
			{user ? (
				<>
					<h3>{user.username}</h3>
					<form className='new-comment-form' onSubmit={handleSubmit}>
						<input
							type='text'
							id='comment'
							name='comment'
							minLength='2'
							maxLength='64'
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
							}}
							placeholder='Comment'
							required
						/>
						<button type='submit'></button>
					</form>
					{errorDisplay ? <div>{errorDisplay}</div> : null}
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
