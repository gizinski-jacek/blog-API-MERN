import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, setCurrentUser }) => {
	const navigate = useNavigate();

	const handleLogOut = async (e) => {
		e.preventDefault();
		try {
			await fetch('/api/log-out', {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-type': 'application/json' },
			});
			navigate('/');
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
				<Link to='posts' className='button-link'>
					Posts
				</Link>
				<Link to='authors' className='button-link'>
					Authors
				</Link>
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
						<Link to='/' className='button-link' onClick={handleLogOut}>
							Log Out
						</Link>
					</>
				) : (
					<>
						<Link to='log-in' className='button-link'>
							Log In
						</Link>
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
