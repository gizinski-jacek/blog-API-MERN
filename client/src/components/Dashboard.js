import { useEffect, useState } from 'react';
import DashboardPostWrapper from './utils/DashboardPostWrapper';
import LoadingIcon from './utils/LoadingIcon';

const Dashboard = ({ currentUser }) => {
	const [loading, setLoading] = useState(true);
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
				setLoading(false);
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
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='user-post-list'>
					<section className='grid-container'>{postsDisplay}</section>
				</div>
			)}
		</>
	);
};

export default Dashboard;
