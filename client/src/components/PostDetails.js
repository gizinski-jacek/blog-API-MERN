import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostDataWrapper from './utils/PostDataWrapper';

const PostDetails = () => {
	const params = useParams();

	const [postData, setPostData] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/${params.postid}`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setPostData(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className='post-details'>
			{postData ? <PostDataWrapper post={postData} /> : null}
		</div>
	);
};

export default PostDetails;
