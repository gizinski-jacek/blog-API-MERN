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
import useFetchComments from './components/hooks/useFetchComments';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
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
				setUser(resJson.currentUser);
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

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						loading ? null : (
							<main className='main'>
								<Nav user={user} setUser={setUser} />
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
							user ? <Navigate to='/dashboard' /> : <LogIn setUser={setUser} />
						}
					/>
					<Route
						path='sign-up'
						element={user ? <Navigate to='/dashboard' /> : <Signup />}
					/>
					<Route path='posts'>
						<Route path='' element={<Posts posts={posts} />} />
						<Route
							path=':postid'
							element={
								<>
									{/* Fetch here post's comments? */}
									<useFetchComments setComments={setComments} />
									<PostDetails posts={posts} />
									<CommentForm user={user} setComments={setComments} />
									<Comments comments={comments} />
								</>
							}
						>
							<Route path='comments/:commentid' element={<CommentDetails />} />
						</Route>
					</Route>
					<Route path='authors' element={<Authors posts={posts} />} />
					<Route
						path='dashboard'
						element={
							user ? (
								<>
									<Outlet />
								</>
							) : (
								<Navigate to='/log-in' />
							)
						}
					>
						<Route path='' element={<Dashboard user={user} posts={posts} />} />
						<Route
							path='create'
							element={<PostForm user={user} setPosts={setPosts} />}
						/>
						<Route
							path=':postid/update'
							element={<PostForm posts={posts} editing={true} />}
						/>
						<Route
							path=':postid/delete'
							element={<PostDetails posts={posts} deleting={true} />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
