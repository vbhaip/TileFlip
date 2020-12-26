import React from 'react'
import App from './App'

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

class Router extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (

			<BrowserRouter>
			<App/>
			</BrowserRouter>
			)
	}
}

export default Router;