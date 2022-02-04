import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import EditCommentForm from './EditCommentForm';
import LoadingIcon from './utils/LoadingIcon';
import nl2br from 'react-nl2br';

const PostDetails = ({ currentUser, deleting }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState();
	const [postComments, setPostComments] = useState();
	const [editingComment, setEditingComment] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const resPost = await fetch(`/api/posts/${params.postid}`, {
					method: 'GET',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
				});
				const resComments = await fetch(
					`/api/posts/${params.postid}/comments`,
					{
						method: 'GET',
						mode: 'cors',
						headers: { 'Content-type': 'application/json' },
					}
				);
				const postJson = await resPost.json();
				const commentsJson = await resComments.json();
				if (resPost.status !== 200) {
					console.log(resPost);
					navigate('/error', { state: postJson });
				} else {
					setPost(postJson);
					setPostComments(commentsJson);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [params.postid, navigate]);

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/api/posts/${params.postid}`, {
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include',
				headers: { 'Content-type': 'application/json' },
			});
			const resJson = await res.json();
			if (res.status !== 200) {
				console.log(resJson);
			}
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className='post-details'>
					{deleting ? (
						<div className='post-delete-controls'>
							<h1>Delete this post?</h1>
							<button type='submit' className='button-m' onClick={handleDelete}>
								Delete
							</button>
						</div>
					) : null}
					{post ? (
						<article className='post-full'>
							<div className='post-info'>
								<div className='post-metadata'>
									<div className='left'>
										<h3 className='post-author'>
											Author: {post.author.username}
										</h3>
									</div>
									<div className='right'>
										<h4 className='post-created'>
											Published:{' '}
											{new Date(post.create_timestamp).toLocaleString('en-GB')}
										</h4>
										{post.update_timestamp ? (
											<h4 className='post-updated'>
												Last updated:{' '}
												{new Date(post.update_timestamp).toLocaleString(
													'en-GB'
												)}
											</h4>
										) : null}
									</div>
								</div>
								<h2 className='post-title'>Title: {post.title}</h2>
							</div>
							<div className='post-content'>
								<p className='post-text'>{nl2br(post.text)}</p>
							</div>
						</article>
					) : null}
					<div className='comment-section'>
						<div className='comment-controls'>
							<CommentForm
								currentUser={currentUser}
								setPostComments={setPostComments}
							/>
							{editingComment ? (
								<EditCommentForm
									editingComment={editingComment}
									setPostComments={setPostComments}
									setEditingComment={setEditingComment}
								/>
							) : null}
						</div>
						<CommentList
							currentUser={currentUser}
							postComments={postComments}
							setEditingComment={setEditingComment}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default PostDetails;
