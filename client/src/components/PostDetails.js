import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostDataWrapper from './utils/PostDataWrapper';

const PostDetails = (props) => {
	const params = useParams();

	const thePost = props.posts?.filter((post) => post._id === params.postid)[0];

	return (
		<div className='post-details'>
			{thePost ? <PostDataWrapper post={thePost} /> : null}
		</div>
	);
};

export default PostDetails;
