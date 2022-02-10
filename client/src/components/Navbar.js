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
					<img
						className='logo-icon'
						src='/images/b-blog-icon-51268.png'
						alt='logo-icon'
					/>
					logster
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
