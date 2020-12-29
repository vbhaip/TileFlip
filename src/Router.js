import React from 'react'
import App from './App'
import MoreInfo from './MoreInfo'

import {
  BrowserRouter,
  HashRouter,
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

			<HashRouter>
				<Switch>
					<Route exact path="/">
						<App/>
					</Route>
					<Route exact path="/help">
						<MoreInfo/>
					</Route>
				</Switch>
			</HashRouter>
			)
	}
}

export default Router;