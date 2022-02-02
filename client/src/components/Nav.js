import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, setCurrentUser }) => {
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
				navigate('/log-in', { state: resJson });
			} else {
				setCurrentUser(resJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = async (e) => {
		e.preventDefault();
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
					Blogster
				</Link>
				<Link to='posts'>Posts</Link>
				<Link to='authors'>Authors</Link>
			</div>
			<div className='nav-right'>
				{currentUser ? (
					<>
						<Link to='dashboard' className='button-link'>
							Dashboard
						</Link>
						<Link to='dashboard/create' className='button-link'>
							Create Post
						</Link>
						<Link to='' className='button-link' onClick={handleLogOut}>
							Log Out
						</Link>
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
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										placeholder='Password'
									/>
								</fieldset>
								<div className='nav-log-in-controls'>
									<button type='submit'>Log In</button>
									<button
										type='button'
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
								className='button-link'
								onClick={() => {
									setShowForm(true);
								}}
							>
								Log In
							</button>
						)}
						<Link to='sign-up' className='button-link'>
							Sign Up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
