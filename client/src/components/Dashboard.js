import UserPostDataWrapper from './utils/UserPostDataWrapper';

const Dashboard = ({ currentUser, allPosts, setAllPosts }) => {
	const postsDisplay = allPosts
		?.filter((post) => post.author === currentUser.username)
		.map((post, index) => {
			return (
				<UserPostDataWrapper
					key={index}
					post={post}
					setAllPosts={setAllPosts}
				/>
			);
		});

	return <div className='user-posts container'>{postsDisplay}</div>;
};

export default Dashboard;
