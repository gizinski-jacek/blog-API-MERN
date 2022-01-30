import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const CommentDetails = ({ currentUser, allComments, setAllComments }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [errors, setErrors] = useState();
	const [editing, setEditing] = useState(false);
	const [commentValue, setCommentValue] = useState('');
	const [theComment, setTheComment] = useState({});

	useEffect(() => {
		if (allComments) {
			const theComment = allComments.find(
				(comment) => comment._id === params.commentid
			);
			if (theComment) {
				setCommentValue(theComment.text);
				setTheComment(theComment);
			} else {
				navigate('../');
			}
		}
	}, [allComments, params.commentid, navigate]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${params.commentid}`,
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
				setAllComments(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${params.commentid}`,
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
				setAllComments(resJson);
				navigate('../');
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
		<div className='comment-details'>
			{currentUser && currentUser.username === theComment.author ? (
				<div className='comment-edit-controls'>
					<button
						type='button'
						onClick={() => {
							setEditing(!editing);
						}}
					>
						Edit Comment
					</button>
					<button type='submit' onClick={handleDelete}>
						Delete Comment
					</button>
				</div>
			) : null}
			<div className='comment'>
				<h3 className='comment-author'>{theComment.author}</h3>
				<h3 className='comment-created'>
					Posted: {theComment.create_timestamp}
				</h3>
				{theComment.update_timestamp ? (
					<h3 className='comment-updated'>
						Last updated: {theComment.create_timestamp}
					</h3>
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
							<button type='submit'>Update Comment</button>
						</form>
						{errorsDisplay ? (
							<ul className='error-list'>{errorsDisplay}</ul>
						) : null}
					</>
				) : (
					<p className='comment-text'>{theComment.text}</p>
				)}
			</div>
		</div>
	);
};

export default CommentDetails;
