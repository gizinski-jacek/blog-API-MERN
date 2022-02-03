import './App.css';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomePanel from './components/WelcomePanel';
import PostsPreview from './components/PostsPreview';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import CommentList from './components/CommentList';
import CommentDetails from './components/CommentDetails';
import AuthorList from './components/AuthorList';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import LogIn from './components/LogIn';
import Signup from './components/Signup';

const App = () => {
	const location = useLocation();

	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
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
	}, [location]);

	return (
		<Routes>
			<Route
				path='/'
				element={
					loading ? null : (
						<main className='main'>
							<Navbar
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
							<WelcomePanel />
							<PostsPreview />
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
					<Route path='' element={<Dashboard currentUser={currentUser} />} />
					<Route path='create' element={<PostForm />} />
					<Route path='update/:postid' element={<PostForm editing={true} />} />
					<Route
						path='delete/:postid'
						element={<PostDetails deleting={true} />}
					/>
				</Route>
				<Route path='posts'>
					<Route path='' element={<PostList posts={posts} />} />
					<Route path=':postid' element={<Outlet />}>
						<Route
							path=''
							element={
								<>
									<PostDetails posts={posts} />
									<CommentList currentUser={currentUser} />
								</>
							}
						/>
						<Route
							path='comments/:commentid'
							element={<CommentDetails currentUser={currentUser} />}
						/>
					</Route>
				</Route>
				<Route path='authors' element={<AuthorList posts={posts} />} />
			</Route>
		</Routes>
	);
};

export default App;
