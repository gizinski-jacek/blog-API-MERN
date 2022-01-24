import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import PostsPreview from './components/PostsPreview';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import Comments from './components/Comments';
import CommentDetails from './components/CommentDetails';
import Authors from './components/Authors';
import AuthorDetails from './components/AuthorDetails';
import Dashboard from './components/Dashboard';
import CreatePost from './components/CreatePost';
import LogIn from './components/LogIn';
import Signup from './components/Signup';

const App = () => {
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
					<Route path='posts' element={<Posts posts={posts} />}>
						<Route
							path=':postid'
							element={
								<>
									<PostDetails />
									<Comments />
								</>
							}
						>
							<Route path='comments/:commentid' element={<CommentDetails />} />
						</Route>
					</Route>
					<Route path='authors' element={<Authors />}>
						<Route path=':authorid' element={<AuthorDetails />} />
					</Route>
					<Route
						path='dashboard'
						element={<Dashboard user={user} posts={posts} />}
					/>
					<Route path='create' element={<CreatePost user={user} />} />
					<Route
						path='log-in'
						element={<LogIn user={user} setUser={setUser} />}
					/>
					<Route path='sign-up' element={<Signup />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
