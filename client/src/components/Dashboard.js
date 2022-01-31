import { useEffect, useState } from 'react';
import UserPostDataWrapper from './utils/UserPostDataWrapper';

const Dashboard = ({ currentUser }) => {
	const [allPosts, setAllPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/user/${currentUser._id}`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setAllPosts(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [currentUser._id]);

	const postsDisplay = allPosts?.map((post, index) => {
		return (
			<UserPostDataWrapper key={index} post={post} setAllPosts={setAllPosts} />
		);
	});

	return <div className='user-posts container'>{postsDisplay}</div>;
};

export default Dashboard;
