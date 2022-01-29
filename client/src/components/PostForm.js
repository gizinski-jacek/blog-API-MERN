import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PostForm = ({ allPosts, setAllPosts, editing }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [errors, setErrors] = useState();
	const [titleValue, setTitleValue] = useState('');
	const [textValue, setTextValue] = useState('');

	useEffect(() => {
		if (allPosts) {
			const thePost = allPosts.find((post) => post._id === params.postid);
			setTitleValue(thePost.title);
			setTextValue(thePost.text);
		}
	}, [allPosts, params.postid, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/dashboard/create', {
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
				setAllPosts(resJson);
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/dashboard/${params.postid}`, {
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
				setAllPosts(resJson);
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
			{errorDisplay ? <div>{errorDisplay}</div> : null}
		</div>
	);
};

export default PostForm;
