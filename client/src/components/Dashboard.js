import { useEffect, useState } from 'react';
import DashboardPostWrapper from './utils/DashboardPostWrapper';

const Dashboard = ({ currentUser }) => {
	const [allPosts, setAllPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/user/${currentUser._id}`, {
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
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
			<DashboardPostWrapper key={index} post={post} setAllPosts={setAllPosts} />
		);
	});

	return (
		<div className='user-posts'>
			<section className='grid-container'>{postsDisplay}</section>
		</div>
	);
};

export default Dashboard;
