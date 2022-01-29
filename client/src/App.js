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
	const [allPosts, setAllPosts] = useState();
	const [allComments, setAllComments] = useState();

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
				if (res.status !== 200) {
					setCurrentUser(null);
				} else {
					setCurrentUser(resJson);
				}
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
				setAllPosts(resJson);
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
				setAllComments(resJson);
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
								<PostsPreview allPosts={allPosts} />
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
						<Route path='' element={<Posts allPosts={allPosts} />} />
						<Route path=':postid' element={<Outlet />}>
							<Route
								path=''
								element={
									<>
										<PostDetails allPosts={allPosts} />
										<CommentForm
											currentUser={currentUser}
											setAllComments={setAllComments}
										/>
										<Comments allComments={allComments} />
									</>
								}
							/>
							<Route
								path='comments/:commentid'
								element={
									<CommentDetails
										currentUser={currentUser}
										setAllComments={setAllComments}
										allComments={allComments}
									/>
								}
							/>
						</Route>
					</Route>
					<Route path='authors' element={<Authors allPosts={allPosts} />} />
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
									allPosts={allPosts}
									setAllPosts={setAllPosts}
								/>
							}
						/>
						<Route
							path='create'
							element={<PostForm setAllPosts={setAllPosts} />}
						/>
						<Route
							path=':postid/update'
							element={
								<PostForm
									allPosts={allPosts}
									setAllPosts={setAllPosts}
									editing={true}
								/>
							}
						/>
						<Route
							path=':postid/delete'
							element={
								<PostDetails
									allPosts={allPosts}
									setAllPosts={setAllPosts}
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
