import { useState } from 'react';
import { useParams } from 'react-router';

const CommentWrapper = ({ currentUser, comment, setPostComments }) => {
	const params = useParams();

	const [errors, setErrors] = useState();
	const [editing, setEditing] = useState(false);
	const [commentValue, setCommentValue] = useState(comment.text);
	const [theComment, setTheComment] = useState(comment);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${theComment._id}`,
				{
					method: 'PUT',
					mode: 'cors',
					credentials: 'include',
					body: JSON.stringify({ commentValue }),
					headers: { 'Content-type': 'application/json' },
				}
			);
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setEditing(false);
				setCommentValue(resJson.text);
				setTheComment(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${theComment._id}`,
				{
					method: 'DELETE',
					mode: 'cors',
					credentials: 'include',
					headers: { 'Content-type': 'application/json' },
				}
			);
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setPostComments(resJson);
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
		<div className='comment'>
			{currentUser && currentUser._id === theComment.author._id ? (
				<div className='comment-edit-controls'>
					<button
						type='button'
						onClick={() => {
							setEditing(!editing);
						}}
					>
						Edit
					</button>
					<button type='submit' onClick={handleDelete}>
						Delete
					</button>
				</div>
			) : null}
			<h3 className='comment-author'>By: {theComment.author.username}</h3>
			<p className='comment-created'>
				Posted: {new Date(theComment.create_timestamp).toLocaleString('en-GB')}
			</p>
			{theComment.update_timestamp ? (
				<p className='comment-updated'>
					Last edited:{' '}
					{new Date(theComment.update_timestamp).toLocaleString('en-GB')}
				</p>
			) : null}
			{editing ? (
				<>
					<form id='edit-comment-form' onSubmit={handleUpdate}>
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
						<button type='submit'>Update</button>
					</form>
					{errorsDisplay ? (
						<ul className='error-list'>{errorsDisplay}</ul>
					) : null}
				</>
			) : (
				<p className='comment-text'>{theComment.text}</p>
			)}
		</div>
	);
};

export default CommentWrapper;
