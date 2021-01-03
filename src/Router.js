import React from 'react';
import App from './App';
import MoreInfo from './MoreInfo';
import { createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles';

import {
  // BrowserRouter,
  HashRouter,
  Switch,
  Route
  // Link,
  // useLocation
} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9B6A6C'
    },
    secondary: {
      main: '#6DC0D5'
    },
    error: {
    	main: '#c1666b'
    },
    warning: {
    	main: '#d4b843'
    },
    black: {
    	main: '#020202'
    },
    lightText: {
    	main: '#F7F0F5'
    }
  },
  typography: {
  	fontFamily: "'Oswald'"
  }
});

class Router extends React.Component {
  render () {
    return (

			<HashRouter>
				<Switch>
					<Route exact path="/">
						<ThemeProvider theme={theme}>
							<App/>
						</ThemeProvider>
					</Route>
					<Route exact path="/help">
						<ThemeProvider theme={theme}>
							<MoreInfo/>
						</ThemeProvider>
					</Route>
				</Switch>
			</HashRouter>
    );
  }
}

export default withTheme(Router);
