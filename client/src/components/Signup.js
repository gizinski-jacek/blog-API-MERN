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

	const errorsDisplay = errors?.map((error, index) => {
		return (
			<li key={index} className='error-msg'>
				{error.msg}
			</li>
		);
	});

	return (
		<div className='sign-up'>
			<form id='sign-up-form' onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					minLength='4'
					maxLength='32'
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
					minLength='4'
					maxLength='64'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label htmlFor='confirmPasswords'>Confirm password</label>
				<input
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					minLength='4'
					maxLength='64'
					value={confirmPassword}
					onChange={(e) => setconfirmPassword(e.target.value)}
					required
				/>
				<div className='sign-up-controls'>
					<button type='submit' className='button-m'>
						Sign Up
					</button>
					<button
						type='button'
						className='button-m'
						onClick={() => navigate(-1)}
					>
						Go Back
					</button>
				</div>
			</form>
			{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
		</div>
	);
};

export default Signup;
