import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const CommentDetails = ({ user, setComments, comments }) => {
	const params = useParams();

	const [errors, setErrors] = useState();
	const [commentValue, setCommentValue] = useState('');
	const [editing, setEditing] = useState(false);
	const [theComment, setTheComment] = useState('');

	useEffect(() => {
		if (comments) {
			const theComment = comments.find(
				(comment) => comment._id === params.commentid
			);
			setTheComment(theComment);
			setCommentValue(theComment.title);
		}
	}, [comments, params.commentid]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}/comments/update`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ commentValue }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setComments(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}/comments/delete`, {
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setComments(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const errorDisplay = errors?.map((error, index) => {
		return <li key={index}>{error.msg}</li>;
	});

	return (
		<div className='comment-details'>
			{user && user.username === theComment.author ? (
				<>
					<button
						type='button'
						onClick={() => {
							setEditing(true);
						}}
					>
						Edit Comment
					</button>
					<button type='submit' onClick={handleDelete}>
						Delete Comment
					</button>
				</>
			) : null}
			<div className='comment'>
				<h3>{theComment.author}</h3>
				<h3>{theComment.create_timestamp}</h3>
				{theComment.update_timestamp ? (
					<h3>Last updated: {theComment.create_timestamp}</h3>
				) : null}
				{editing ? (
					<>
						<form onSubmit={handleUpdate}>
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
							<button
								type='submit'
								onClick={() => {
									setEditing(false);
								}}
							>
								Update Comment
							</button>
						</form>
						{errorDisplay ? <div>{errorDisplay}</div> : null}
					</>
				) : (
					<p>{theComment.text}</p>
				)}
			</div>
		</div>
	);
};

export default CommentDetails;
