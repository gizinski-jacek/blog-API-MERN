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
				<Link to='/'>Home</Link>
				<Link to='posts'>Posts</Link>
				<Link to='authors'>Authors</Link>
			</div>
			<div className='nav-right'>
				{currentUser ? (
					<>
						<Link to='dashboard'>Dashboard</Link>
						<Link to='dashboard/create'>Create Post</Link>
						<Link to='/' onClick={handleLogOut}>
							Log Out
						</Link>
					</>
				) : (
					<>
						<Link to='log-in'>Log In</Link>
						<Link to='sign-up'>Sign Up</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
