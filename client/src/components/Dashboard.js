import { useEffect, useState } from 'react';
import UserPostWrapper from './utils/UserPostWrapper';

const Dashboard = ({ user, posts }) => {
	const postsDisplay = posts
		?.filter((post) => post.author === user.username)
		.map((post, index) => {
			return <UserPostWrapper key={index} post={post} dashboard={true} />;
		});

	return <div className='user-posts container'>{postsDisplay}</div>;
};

export default Dashboard;
