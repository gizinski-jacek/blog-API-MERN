import { useEffect } from 'react';
import { useParams } from 'react-router';

const useFetchComments = ({ setComments }) => {
	const params = useParams();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/posts/${params.postid}/comments`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setComments(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
};

export default useFetchComments;
