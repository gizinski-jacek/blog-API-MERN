import { useState } from 'react';
import { useNavigate } from 'react-router';

const Signup = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState();
	const [user, setUser] = useState({ username: '', password: '', repeat: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/sign-up', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(user),
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
				<h2>Sign Up</h2>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					name='username'
					minLength='4'
					maxLength='32'
					value={user.username}
					onChange={(e) => handleChange(e)}
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
					value={user.password}
					onChange={(e) => handleChange(e)}
					placeholder='Password'
					required
				/>
				<label htmlFor='repeat'>Repeat password</label>
				<input
					type='password'
					id='repeat'
					name='repeat'
					minLength='4'
					maxLength='64'
					value={user.repeat}
					onChange={(e) => handleChange(e)}
					placeholder='Repeat password'
					required
				/>
				{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
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
		</div>
	);
};

export default Signup;
