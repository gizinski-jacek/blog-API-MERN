import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PostForm = ({ posts, setPosts, editing }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [errors, setErrors] = useState();
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		if (posts) {
			const thePost = posts.find((post) => post._id === params.postid);
			setTitle(thePost.title);
			setText(thePost.text);
		}
	}, [posts, params.postid]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/dashboard/create', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ title, text }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setPosts(resJson);
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/dashboard/${params.postid}/update`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ title, text }),
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

	const errorDisplay = errors?.map((error, index) => {
		return <li key={index}>{error.msg}</li>;
	});

	return (
		<div className='create-post'>
			<form
				className='create-post-form'
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
						setTitle(e.target.value);
					}}
					value={title}
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
						setText(e.target.value);
					}}
					value={text}
					placeholder='Text'
					required
				/>
				<button type='submit'>Submit</button>
			</form>
			{errorDisplay ? <div>{errorDisplay}</div> : null}
		</div>
	);
};

export default PostForm;
