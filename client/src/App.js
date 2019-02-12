import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			title: '',
			contents: '',
			id: '',
			isEditing: false,
		};
	}

	componentDidMount() {
		this.getPosts();
	}
	handleChanges = e => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	getPosts = () => {
		axios.get('http://localhost:5000/api/posts').then(res => {
			this.setState({ posts: res.data });
		});
	};
	deletePost = (e, id) => {
		e.preventDefault();
		axios.delete(`http://localhost:5000/api/posts/${id}`).then(res => {
			console.log(res);
			axios.get('http://localhost:5000/api/posts').then(res => {
				this.setState({ posts: res.data });
			});
		});
	};

	addPost = e => {
		e.preventDefault();
		let post = { title: this.state.title, contents: this.state.contents };
		axios.post('http://localhost:5000/api/posts', post).then(res => {
			console.log(res);
			axios.get('http://localhost:5000/api/posts').then(res => {
				this.setState({ posts: res.data });
			});
		});
	};

	updatePost = (e, post) => {
		e.preventDefault();
		console.log('update post');
		this.setState({
			title: post.title,
			contents: post.contents,
			id: post.id,
			isEditing: true,
		});
	};
	submitPost = e => {
		console.log('submit post');
		e.preventDefault();
		// let id = this.state.id;
		let changed = { title: this.state.title, contents: this.state.contents };
		axios.put(`http://localhost:5000/api/posts/${this.state.id}`, changed).then(res => {
			console.log('put response', res);
			axios.get('http://localhost:5000/api/users').then(res => {
				this.setState({ posts: res.data });
			});
		});
		this.setState({ isEditing: false });
	};
	render() {
		return (
			<div className="App">
				<form>
					<input
						name="title"
						required
						value={this.state.title}
						placeholder="Title"
						onChange={e => this.handleChanges(e)}
					/>
					<input
						name="contents"
						required
						value={this.state.contents}
						placeholder="Contents"
						onChange={e => this.handleChanges(e)}
					/>
					<button
						onSubmit={e => {
							this.state.isEditing ? this.submitPost(e) : this.addPost(e);
						}}>
						{this.state.isEditing ? 'Submit Edit' : 'Add Post'}
					</button>
				</form>
				<div className="posts">
					{this.state.posts.map(post => (
						<div key={post.id} className="post">
							<h3>{post.title}</h3>
							<p>{post.contents}</p>
							<button onClick={e => this.deletePost(e, post.id)}>Delete</button>
							<button onClick={e => this.updatePost(e, post)}>Edit</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
