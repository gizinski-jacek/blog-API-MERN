import { useState } from 'react';
import { useNavigate } from 'react-router';

const LogIn = ({ setCurrentUser }) => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/log-in', {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				setCurrentUser(resJson);
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='log-in'>
			<form id='log-in-form' onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div className='log-in-controls'>
					<button type='submit'>Log In</button>
					<button type='button' onClick={() => navigate(-1)}>
						Go Back
					</button>
				</div>
			</form>
			{errors ? (
				<ul className='error-list'>
					<li className='error-msg'>{errors.msg}</li>
				</ul>
			) : null}
		</div>
	);
};

export default LogIn;
