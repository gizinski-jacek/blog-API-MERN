import { useState } from 'react';
import { useNavigate } from 'react-router';

const Signup = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/sign-up', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({ username, password, confirmPassword }),
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				setErrors(resJson);
			} else {
				navigate('/log-in');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const errorDisplay = errors?.map((error, index) => {
		return <li key={index}>{error.msg}</li>;
	});

	return (
		<div className='sign-up'>
			<form id='sign-up-form' onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Username'
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
			{errorDisplay ? <div>{errorDisplay}</div> : null}
		</div>
	);
};

export default Signup;
