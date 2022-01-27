import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from './hooks/UserContext';

const LogIn = ({ setUser }) => {
	const navigate = useNavigate();

	// const { setUserContext } = useContext(UserContext);
	const [error, setError] = useState();
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
				setError(resJson);
			} else {
				setUser(resJson);
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
				<button type='submit'>Log In</button>
				<button type='button' onClick={() => navigate(-1)}>
					Go Back
				</button>
			</form>
			{error ? <div>{error.msg}</div> : null}
		</div>
	);
};

export default LogIn;
