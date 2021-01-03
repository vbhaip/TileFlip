import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect';

class MoreInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = { text: '' };

    fetch(process.env.PUBLIC_URL + '/info.md')
      .then(response => response.text())
      .then((text) => {
        this.setState({ text: text });
      });

    if (isMobile) {
      this.margin = 10;
    } else {
      this.margin = 20;
    }
  }

  render () {
    return (
		<div style={{ marginLeft: this.margin + 'vw', marginRight: this.margin + 'vw', color: 'white' }}>
			<ReactMarkdown plugins={[gfm]}>
				{this.state.text}
			</ReactMarkdown>

			<div style={{ textAlign: 'center', marginTop: '2vh' }}>
			<Button variant="contained" color="primary" href="#">
              Back
            </Button>
            </div>
		</div>);
  }
}

export default MoreInfo;
