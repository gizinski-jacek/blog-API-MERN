import './App.css';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
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
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

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
						<Route
							path='update/:postid'
							element={<PostForm editing={true} />}
						/>
						<Route
							path='delete/:postid'
							element={<PostDetails deleting={true} />}
						/>
					</Route>
					<Route path='posts'>
						<Route path='' element={<PostList />} />
						<Route path=':postid' element={<Outlet />}>
							<Route
								path=''
								element={
									<>
										<PostDetails />
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
					<Route path='authors' element={<AuthorList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
