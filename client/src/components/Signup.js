import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await fetch('http://localhost:4000/api/sign-up', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({ username, password, confirmPassword }),
				headers: new Headers({ 'Content-type': 'application/json' }),
			});
			navigate('/login');
		} catch (error) {}
	};

	return (
		<div id='sign-up'>
			<form id='sign-up-form' onSubmit={handleSubmit}>
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
				<label htmlFor='confirmPasswords'>Confirm password</label>
				<input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					value={confirmPassword}
					onChange={(e) => setconfirmPassword(e.target.value)}
					required
				/>
				<button type='submit'>Sign Up</button>
				<button type='button' onClick={() => navigate(-1)}>
					Go Back{' '}
				</button>
			</form>
		</div>
	);
};

export default Signup;
