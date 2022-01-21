import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='posts'>Posts</Link>
			<Link to='authors'>Authors</Link>
			<Link to='dashboard'>Dashboard</Link>
			<Link to='login'>Login</Link>
			<Link to='sign-up'>Signup</Link>
		</nav>
	);
};

export default Nav;
