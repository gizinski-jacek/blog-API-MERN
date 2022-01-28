import UserPostDataWrapper from './utils/UserPostDataWrapper';
//why doesnt show posts after log in
const Dashboard = ({ currentUser, posts, setPosts }) => {
	const postsDisplay = posts
		?.filter((post) => post.author === currentUser.username)
		.map((post, index) => {
			return (
				<UserPostDataWrapper key={index} post={post} setPosts={setPosts} />
			);
		});

	return <div className='user-posts container'>{postsDisplay}</div>;
};

export default Dashboard;
