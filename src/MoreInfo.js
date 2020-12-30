import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Button from '@material-ui/core/Button';

class MoreInfo extends React.Component {
	constructor(props){
		super(props)
		this.state = {'text': ''}

		fetch(process.env.PUBLIC_URL + '/info.md')
			.then(response => response.text())
			.then((text) =>{
				this.setState({'text': text})
			})

	}

	render(){

		return (
		<div style={{marginLeft: '20vw', marginRight: '20vw', 'color': 'white'}}>
			<ReactMarkdown plugins={[gfm]}>
				{this.state.text}
			</ReactMarkdown>

			<div style={{'textAlign': 'center'}}>
			<Button variant="contained" color="primary" href="#">
              Back
            </Button>
            </div>
		</div>)
	}
}

export default MoreInfo;