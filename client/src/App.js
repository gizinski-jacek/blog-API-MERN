import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import PostsPreview from './components/PostsPreview';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import Comments from './components/Comments';
import CommentDetail from './components/CommentDetail';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
	const [posts, setPosts] = useState();

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('http://localhost:4000/api/posts');
				const resJson = await res.json();
				setPosts(resJson);
				console.log(resJson);
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
						<>
							<Nav />
							<Outlet />
							<Footer />
						</>
					}
				>
					<Route
						path='/'
						element={
							<>
								<Home />
								<PostsPreview />
							</>
						}
					/>
					<Route path='posts' element={<Posts />}>
						<Route
							path=':postid'
							element={
								<>
									<PostDetail />
									<Comments />
								</>
							}
						>
							<Route path='comments' element={<CommentDetail />}>
								<Route path=':commentid' element={<CommentDetail />} />
							</Route>
						</Route>
					</Route>
					<Route path='authors'>
						<Route path=':authorid' />
					</Route>
					<Route path='dashboard'>
						<Route path=':userid' />
					</Route>
					<Route path='login' element={<Login />} />
					<Route path='sign-up' element={<Signup />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
