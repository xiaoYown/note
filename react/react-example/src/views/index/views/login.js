import React, { Component } from 'react';
import cookie from 'react-cookie';
import { saveCookie, getCookie, removeCookie } from 'tools/client';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.login = this.login.bind(this);
	}
	login(){
		console.log('login success');
		saveCookie('session', this.refs.userId.value);
		this.props.router.push({ pathname: '/' });
	}
	render(){
		const login = (
			<div className="login-info">
				<label className="login-item">
					<h4>id</h4>
					<input type="text" ref="userId"/>
				</label>
				<label className="login-item">
					<h4>pwd</h4>
					<input type="text" ref="userPwd"/>
				</label>
				<button onClick={this.login} >Login</button>
			</div>
		);
		const Content = React.createClass({
			render(){
				return login
			}
		});
		return(
			<section className="login-wrap">
				<div>
					<h3>about page</h3>
				</div>
				<Content />
			</section>
		)
	}
};

export default Login
