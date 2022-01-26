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
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState();

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
						<main className='main'>
							<Nav user={user} setUser={setUser} />
							<Outlet />
							<Footer />
						</main>
					}
				>
					<Route
						path='/'
						element={
							<>
								<Home />
								<PostsPreview posts={posts} />
							</>
						}
					/>
					<Route path='posts' element={<Posts posts={posts} />} />
					<Route
						path='posts/:postid'
						element={
							<>
								<PostDetails posts={posts} />
								<CommentForm user={user} />
								<Comments />
							</>
						}
					>
						<Route path='comments/:commentid' element={<CommentDetails />} />
					</Route>
					<Route path='authors' element={<Authors posts={posts} />} />
					<Route
						path='dashboard'
						element={
							loading ? null : user ? (
								<Dashboard user={user} posts={posts} />
							) : (
								<Navigate to='/log-in' />
							)
						}
					/>
					<Route
						path='dashboard/create'
						element={
							loading ? null : user ? (
								<PostForm user={user} />
							) : (
								<Navigate to='log-in' />
							)
						}
					/>
					<Route
						path='dashboard/:postid/update'
						element={
							loading ? null : user ? (
								<PostForm posts={posts} editing={true} />
							) : (
								<Navigate to='log-in' />
							)
						}
					/>
					<Route
						path='dashboard/:postid/delete'
						element={
							loading ? null : user ? (
								<PostDetails posts={posts} deleting={true} />
							) : (
								<Navigate to='log-in' />
							)
						}
					/>
					<Route
						path='log-in'
						element={
							loading ? null : user ? (
								<Navigate to='/dashboard' />
							) : (
								<LogIn setUser={setUser} />
							)
						}
					/>
					<Route
						path='sign-up'
						element={
							loading ? null : user ? <Navigate to='/dashboard' /> : <Signup />
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
