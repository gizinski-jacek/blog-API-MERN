import { useState } from 'react';
import { useNavigate } from 'react-router';

const CreatePost = (props) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState();
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/create', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ title, text }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status === 200) {
				navigate(resJson.redirectUrl);
			} else {
				setErrors(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const errorDisplay = errors?.map((error, index) => {
		return <li key={index}>{error.msg}</li>;
	});

	return (
		<>
			{props.user ? (
				<div className='create-post'>
					<form className='create-post-form' onSubmit={handleSubmit}>
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
						></input>
						<label htmlFor='text'>Text</label>
						<input
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
						></input>
						<button type='submit'>Submit</button>
					</form>
					{errorDisplay ? <div>{errorDisplay}</div> : null}
				</div>
			) : (
				navigate('/log-in')
			)}
		</>
	);
};

export default CreatePost;
