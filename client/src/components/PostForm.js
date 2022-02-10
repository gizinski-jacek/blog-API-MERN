import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import LoadingIcon from './utils/LoadingIcon';

const PostForm = ({ editing }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState();
	const [post, setPost] = useState({ title: '', text: '' });

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
					setPost(resJson);
					setLoading(false);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setLoading(false);
		}
	}, [params.postid]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPost((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/posts/create', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(post),
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
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}`, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(post),
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
				}
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
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='new-post'>
					<form
						className='new-post-form'
						onSubmit={editing ? handleUpdate : handleSubmit}
					>
						<label htmlFor='title'>Title</label>
						<textarea
							type='text'
							id='title'
							name='title'
							minLength='8'
							maxLength='128'
							rows='3'
							onChange={(e) => {
								handleChange(e);
							}}
							value={post.title}
							placeholder='Title'
							required
						/>
						<label htmlFor='text'>Text</label>
						<textarea
							type='text'
							id='text'
							name='text'
							minLength='16'
							maxLength='4084'
							rows='16'
							onChange={(e) => {
								handleChange(e);
							}}
							value={post.text}
							placeholder='Text'
							required
						/>
						<button type='submit' className='button-l'>
							Submit
						</button>
					</form>
					{errorsDisplay ? (
						<ul className='error-list'>{errorsDisplay}</ul>
					) : null}
				</div>
			)}
		</>
	);
};

export default PostForm;
