import React, { Component } from 'react'

const App = React.createClass({
	render() {
		return (
			<div className="content">
				{this.props.children}
			</div>
		)
	}
});

export default App
