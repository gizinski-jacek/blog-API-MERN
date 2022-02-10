import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EditCommentForm = ({
	editingComment,
	setEditingComment,
	setPostComments,
}) => {
	const params = useParams();

	const [errors, setErrors] = useState();
	const [comment, setComment] = useState(editingComment);

	useEffect(() => {
		setComment(editingComment);
	}, [editingComment]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setComment((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${editingComment._id}`,
				{
					method: 'PUT',
					mode: 'cors',
					credentials: 'include',
					body: JSON.stringify(comment),
					headers: { 'Content-type': 'application/json' },
				}
			);
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setComment('');
				setPostComments(resJson);
				setEditingComment(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/posts/${params.postid}/comments/${editingComment._id}`,
				{
					method: 'DELETE',
					mode: 'cors',
					credentials: 'include',
					headers: { 'Content-type': 'application/json' },
				}
			);
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
				setEditingComment(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setEditingComment(null);
	};

	const errorsDisplay = errors?.map((error, index) => {
		return (
			<li key={index} className='error-msg'>
				{error.msg}
			</li>
		);
	});

	return (
		<div className='edit-comment'>
			<h3>Editing comment</h3>
			<form id='edit-comment-form' onSubmit={handleUpdate}>
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
					value={comment}
					placeholder='Comment'
					required
				/>
				{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
				<div className='controls'>
					<button type='submit' className='button-m'>
						Update
					</button>
					<button
						type='submit'
						className='button-m'
						onClick={(e) => handleCancel(e)}
					>
						Cancel
					</button>
					<button
						type='button'
						className='button-m'
						onClick={(e) => handleDelete(e)}
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditCommentForm;
