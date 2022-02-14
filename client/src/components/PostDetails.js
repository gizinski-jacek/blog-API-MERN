import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import EditCommentForm from './EditCommentForm';
import LoadingIcon from './utils/LoadingIcon';
import nl2br from 'react-nl2br';

const PostDetails = ({ currentUser }) => {
	const navigate = useNavigate();
	const params = useParams();

	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState();
	const [postComments, setPostComments] = useState();
	const [editingComment, setEditingComment] = useState(null);

	useEffect(() => {
		setEditingComment(null);
	}, [currentUser]);

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
					navigate('/posts');
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

	return (
		<>
			{loading ? (
				<LoadingIcon />
			) : post.published ||
			  (!post.published && currentUser?._id === post.author._id) ? (
				<div className='post-details'>
					<article className='post-full'>
						<div className='post-info'>
							<div className='post-metadata'>
								<div className='left'>
									<h2 className='post-author'>
										Author: {post.author.username}
									</h2>
								</div>
								<div className='right'>
									<h5 className='post-created'>
										Published:{' '}
										{new Date(post.createdAt).toLocaleString('en-GB')}
									</h5>
									{post.updatedAt ? (
										<h5 className='post-updated'>
											Updated:{' '}
											{new Date(post.updatedAt).toLocaleString('en-GB')}
										</h5>
									) : null}
								</div>
							</div>
							<h2 className='post-title'>Title: {post.title}</h2>
						</div>
						<div className='post-content'>
							<p className='post-text'>{nl2br(post.text)}</p>
						</div>
					</article>
					<div className='comment-section'>
						{post.published ? (
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
						) : null}
						<CommentList
							currentUser={currentUser}
							postComments={postComments}
							setEditingComment={setEditingComment}
						/>
					</div>
				</div>
			) : (
				<div className='not-found'>
					<div className='not-found-info'>
						<h3>Post not found.</h3>
						<p>
							The post you tried to access was not found. It was either deleted
							or unpublished by the author.
						</p>
						<button
							type='button'
							className='button-m'
							onClick={() => navigate(-1)}
						>
							Go Back
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default PostDetails;
