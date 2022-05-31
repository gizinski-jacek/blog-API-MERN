import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, setCurrentUser }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		setShowForm(false);
	}, [location]);

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
			setShowForm(false);
			setUsername('');
			setPassword('');
			if (res.status !== 200) {
				let errors;
				if (!Array.isArray(resJson)) {
					if (typeof resJson === 'object') {
						errors = [resJson];
					}
					if (typeof resJson === 'string') {
						errors = [{ msg: resJson }];
					}
				} else {
					errors = resJson;
				}
				navigate('/log-in', { state: errors });
			} else {
				setCurrentUser(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = async (e) => {
		try {
			await fetch('/api/log-out', {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-type': 'application/json' },
			});
			setCurrentUser(null);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className='navbar'>
			<div className='nav-left'>
				<Link to='/' className='logo'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
						width='512px'
						height='512px'
					>
						<path
							fill='#000000'
							d='M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z'
						/>
					</svg>
				</Link>
				<Link to='posts'>Posts</Link>
				<Link to='authors'>Authors</Link>
			</div>
			<div className='nav-right'>
				{currentUser ? (
					<>
						<Link to='dashboard' className='button-l'>
							Dashboard
						</Link>
						<Link to='dashboard/create' className='button-l'>
							Create Post
						</Link>
						<button className='button-l' onClick={handleLogOut}>
							Log Out
						</button>
					</>
				) : (
					<>
						{showForm ? (
							<form id='nav-log-in-form' onSubmit={handleLogIn}>
								<fieldset>
									<label htmlFor='username'>Username</label>
									<input
										type='text'
										id='username'
										name='username'
										minLength='4'
										maxLength='32'
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										placeholder='Username'
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
										placeholder='Password'
									/>
								</fieldset>
								<div>
									<button type='submit' className='button-s'>
										Log In
									</button>
									<button
										type='button'
										className='button-s'
										onClick={() => {
											setShowForm(false);
										}}
									>
										Cancel
									</button>
								</div>
							</form>
						) : (
							<button
								to=''
								className='button-l'
								onClick={() => {
									setShowForm(true);
								}}
							>
								Log In
							</button>
						)}
						<Link to='sign-up' className='button-l'>
							Sign Up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
