import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const LogIn = ({ setCurrentUser }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [errors, setErrors] = useState(location?.state);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogIn = async (e) => {
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
				if (!Array.isArray(resJson)) {
					if (typeof resJson === 'object') {
						console.log([resJson]);
						setErrors([resJson]);
					}
					if (typeof resJson === 'string') {
						setErrors([{ msg: resJson }]);
					}
				} else {
					setErrors(resJson);
				}
			} else {
				setCurrentUser(resJson);
				navigate('/dashboard');
			}
			setPassword('');
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
		<div className='log-in'>
			<form id='log-in-form' onSubmit={handleLogIn}>
				<h2>Log In</h2>
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
					placeholder='Password'
					required
				/>
				{errorsDisplay ? <ul className='error-list'>{errorsDisplay}</ul> : null}
				<div className='log-in-controls'>
					<button type='submit' className='button-m'>
						Log In
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

export default LogIn;
