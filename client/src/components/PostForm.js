import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PostForm = ({ editing }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [errors, setErrors] = useState();
	const [titleValue, setTitleValue] = useState('');
	const [textValue, setTextValue] = useState('');

	useEffect(() => {
		if (params.postid) {
			(async () => {
				try {
					const res = await fetch(`/api/posts/${params.postid}`, {
						method: 'GET',
						mode: 'cors',
						headers: { 'Content-type': 'application/json' },
					});
					const resJson = await res.json();
					setTitleValue(resJson.title);
					setTextValue(resJson.text);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setTitleValue('');
			setTextValue('');
		}
	}, [params.postid]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/posts/create', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ titleValue, textValue }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/update/${params.postid}`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ titleValue, textValue }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				navigate('/dashboard');
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
		<div className='new-post'>
			<form
				className='new-post-form'
				onSubmit={editing ? handleUpdate : handleSubmit}
			>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					name='title'
					minLength='4'
					maxLength='64'
					onChange={(e) => {
						setTitleValue(e.target.value);
					}}
					value={titleValue}
					placeholder='Title'
					required
				/>
				<label htmlFor='text'>Text</label>
				<textarea
					type='text'
					id='text'
					name='text'
					minLength='4'
					maxLength='512'
					onChange={(e) => {
						setTextValue(e.target.value);
					}}
					value={textValue}
					placeholder='Text'
					required
				/>
				<button type='submit'>Submit</button>
			</form>
			{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
		</div>
	);
};

export default PostForm;
