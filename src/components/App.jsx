import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:3000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(res => console.log(res))
          .catch(err => console.log(err))
  }

  componentWillMount() {
      this.callAPI();
  }
  
  render() {
		return (
			<div style={{ textAlign: "center" }}>
				<h1>Hello World</h1>
        <p className="App-intro">{this.state.apiResponse}</p>
			</div>
		);
	}
}