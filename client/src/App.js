import './App.css';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import PostsPreview from './components/PostsPreview';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import Comments from './components/Comments';
import CommentForm from './components/CommentForm';
import CommentDetails from './components/CommentDetails';
import Authors from './components/Authors';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import LogIn from './components/LogIn';
import Signup from './components/Signup';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [posts, setPosts] = useState();
	const [comments, setComments] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/authUser', {
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
					headers: { 'Content-type': 'application/json' },
				});
				const resJson = await res.json();
				setCurrentUser(resJson);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('/api/posts');
				const resJson = await res.json();
				setPosts(resJson);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/comments`, {
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

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						loading ? null : (
							<main className='main'>
								<Nav
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
								/>
								<Outlet />
								<Footer />
							</main>
						)
					}
				>
					<Route
						path=''
						element={
							<>
								<Home />
								<PostsPreview posts={posts} />
							</>
						}
					/>
					<Route
						path='log-in'
						element={
							currentUser ? (
								<Navigate to='/dashboard' />
							) : (
								<LogIn setCurrentUser={setCurrentUser} />
							)
						}
					/>
					<Route
						path='sign-up'
						element={currentUser ? <Navigate to='/dashboard' /> : <Signup />}
					/>
					<Route path='posts'>
						<Route path='' element={<Posts posts={posts} />} />
						<Route path=':postid' element={<Outlet />}>
							<Route
								path=''
								element={
									<>
										<PostDetails posts={posts} />
										<CommentForm
											currentUser={currentUser}
											setComments={setComments}
										/>
										<Comments comments={comments} />
									</>
								}
							/>
							<Route
								path='comments/:commentid'
								element={
									<CommentDetails
										currentUser={currentUser}
										setComments={setComments}
										comments={comments}
									/>
								}
							/>
						</Route>
					</Route>
					<Route path='authors' element={<Authors posts={posts} />} />
					<Route
						path='dashboard'
						element={
							currentUser ? (
								<>
									<Outlet />
								</>
							) : (
								<Navigate to='/log-in' />
							)
						}
					>
						<Route
							path=''
							element={
								<Dashboard
									currentUser={currentUser}
									posts={posts}
									setPosts={setPosts}
								/>
							}
						/>
						<Route path='create' element={<PostForm setPosts={setPosts} />} />
						<Route
							path=':postid/update'
							element={
								<PostForm posts={posts} setPosts={setPosts} editing={true} />
							}
						/>
						<Route
							path=':postid/delete'
							element={
								<PostDetails
									posts={posts}
									setPosts={setPosts}
									deleting={true}
								/>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
