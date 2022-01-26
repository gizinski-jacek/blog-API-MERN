import UserPostDataWrapper from './utils/UserPostDataWrapper';

const Dashboard = ({ user, posts }) => {
	const postsDisplay = posts
		?.filter((post) => post.author === user.username)
		.map((post, index) => {
			return <UserPostDataWrapper key={index} post={post} />;
		});

	return <div className='user-posts container'>{postsDisplay}</div>;
};

export default Dashboard;
