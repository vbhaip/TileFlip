import './App.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Visualization from './Visualization';
import { withTheme } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
// import "ace-builds/src-noconflict/ext-language_tools"

import 'ace-builds/webpack-resolver';

import qs from 'qs';

import base64url from 'base64url';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleRuleChangeAce = this.handleRuleChangeAce.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.handlePlayChange = this.handlePlayChange.bind(this);
    this.setExportInitData = this.setExportInitData.bind(this);
    this.shareURL = this.shareURL.bind(this);
    this.setGifURL = this.setGifURL.bind(this);
    this.updateRefresh = this.updateRefresh.bind(this);
    this.setStateFromQuery = this.setStateFromQuery.bind(this);
    this.progressExample = this.progressExample.bind(this);


    this.rawquery = window.location.search.slice(1);

    if (this.rawquery === '' && window.location.hash.includes('?')) {
      this.rawquery = window.location.hash;
      this.rawquery = this.rawquery.slice(this.rawquery.indexOf('?') + 1);
    }

    this.query = qs.parse(this.rawquery);

    fetch(process.env.PUBLIC_URL + '/examples.txt')
      .then(response => response.text())
      .then((text) => {
        this.examples = text.split('\n\n');

        // get rid of label at the beginning
        this.examples = this.examples.map((item) => item.slice(item.indexOf(':') + 1));

        this.curr_example = 0;

        // no parameters means load example
        if (Object.keys(this.query).length === 0) {
          const query = qs.parse(this.examples[this.curr_example]);
          this.setStateFromQuery(query);
        }

        this.setState({ curr_example: 0, examples: this.examples });
      });

    // defaults
    this.refreshRate = 1000;
    this.edgeLength = 10;
    this.editorVal = `function rule(ctx){

  }`;
    this.play = false;
    this.initdata = [];

    if ('refreshRate' in this.query) {
      this.refreshRate = parseInt(this.query.refreshRate);
    }
    if ('resolution' in this.query) {
      this.edgeLength = parseInt(this.query.resolution);
    }
    if ('code' in this.query) {
      this.editorVal = base64url.decode(this.query.code);
    }
    if ('play' in this.query && this.query.play === 'true') {
      this.play = true;
    }
    if ('state' in this.query) {
      try {
        this.initdata = JSON.parse(this.query.state);
      } catch (e) {
        console.log(e);
      }
    }

    // this.state = {'rule': }

    this.initrule = this.getFunctionFromString(this.editorVal);

    this.state = {
      rule: this.initrule,
      edgeLength: this.edgeLength,
      play: this.play,
      editorVal: this.editorVal,
      refreshRate: this.refreshRate,
      exportInitData: '',
      gifURL: ''
    };


    this.state.initdata = this.initdata;

    //adjust sizes of elements if mobile
    if (isMobile) {
      this.viswidth = window.innerWidth * 0.65;
      this.editorwidth = window.innerWidth * 0.7;
      this.fontSize = 10;
    } else {
      this.viswidth = window.innerHeight * 0.4;
      this.editorwidth = window.innerWidth * 0.4;
      this.fontSize = 14;
    }
  }

  setStateFromQuery (query) {
    /*
    takes a query in the form of a dictionary and
    sets the state accordingly
    */

    if ('refreshRate' in query) {
      this.setState({ refreshRate: parseInt(query.refreshRate) });
    }
    if ('resolution' in query) {
      this.setState({ edgeLength: parseInt(query.resolution) });
    }
    if ('code' in query) {
      const editorVal = base64url.decode(query.code);
      this.setState({ editorVal: editorVal });
      this.setState({ rule: this.getFunctionFromString(editorVal) });
    }
    if ('play' in query && query.play === 'true') {
      this.setState({ play: true });
    } else if ('play' in query && query.play === 'false') {
      this.setState({ play: false });
    }
    if ('state' in query && query.state.length > 0) {
      try {
        this.setState({ initdata: JSON.parse(query.state) });
      } catch (e) {
        console.log(e);
      }
    } else {
      // if no state is set
      this.initdata = {};
      for (let i = 0; i < this.edgeLength ** 2; i++) {
        this.initdata[i] = 0;
      }
      this.setState({ initdata: this.initdata });
    }
  }

  progressExample () {
    // iterates through examples on button press
    this.setState((prevState) => {
      const newExampleInd = (prevState.curr_example + 1) % prevState.examples.length;
      this.setStateFromQuery(qs.parse(prevState.examples[newExampleInd]));
      return { curr_example: newExampleInd };
    });
  }

  setExportInitData (val) {
    this.setState({
      exportInitData: val
    });
  }

  updateRefresh (e, val) {
    this.setState({
      refreshRate: val
    });
  }

  getFunctionFromString (val) {
    // given a string, gets an according function that it corresponds to
    try {
      const f = new Function('x', `
        try{
          // ${val.replace(/\n/g, '')};
          let f = ${val}

          return f(x);
        }
        catch(error){
          return error;
        }
        `);
      // let f = null;

      return f;
      // this.setState({'rule': f});
    } catch (error) {
      console.log(error);
    }

    if (!this.state) {
      return new Function('x', 'return null;');
    }

    // return whatever is existing as a rule
    return this.state.rule;
  }

  handleRuleChangeAce (val) {
    // when editor changes it's text, finds the corresponding function
    this.setState({ editorVal: val });

    const f = this.getFunctionFromString(val);

    this.setState({ rule: f });
  }

  updateResolution (e, val) {
    this.setState({
      edgeLength: val,
      initdata: []
    });
  }

  handlePlayChange (e) {
    this.setState((prevState) => {
      return ({
        play: !prevState.play
      });
    });
  }

  shareURL () {
    //exports current parameters into query string
    const params = {};

    params.refreshRate = this.state.refreshRate;
    params.play = true;
    params.resolution = this.state.edgeLength;
    params.code = base64url.encode(this.state.editorVal);
    params.state = this.state.exportInitData;

    const exportQs = qs.stringify(params);

    let currURL = window.location.toString();

    currURL = currURL.slice(0, currURL.lastIndexOf('/'));

    const newURL = currURL + '?' + exportQs;

    window.history.pushState('', '', newURL);

    window.prompt('Copy to share (Ctrl+C, Enter)', newURL);
  }

  setGifURL (item) {
    this.setState({ gifURL: item });
  }

  // temp(e){
  //   document.getElementsByClassName("ace_text-input")[0]
  //     .innerHTML = "hi"
  // }

  render () {
    return (
      <div className="App">

        <div id='vis-container'>
          { isMobile &&
            <div>
            <p>(Scroll down for the editor!)</p>
            </div>
          }

          <Visualization id="viz" edgeLength={this.state.edgeLength} size={this.viswidth} rule={this.state.rule}
           play={this.state.play} refreshRate={this.state.refreshRate} initdata={this.state.initdata}
           setExportInitData={this.setExportInitData} setGifURL={this.setGifURL}
           isMobile={isMobile}/>

           <p style={{
             color: this.props.theme.palette.lightText.main,
             fontFamily: this.props.theme.typography.fontFamily
           }}>
              Refresh Rate (ms)
           </p>

           <Slider
            defaultValue={this.refreshRate}
            valueLabelDisplay="auto"
            step={100}
            marks
            min={100}
            max={2000}
            value={this.state.refreshRate}
            style={{ width: '50%' }}
            onChange={this.updateRefresh}
           />

           <p style={{
             color: this.props.theme.palette.lightText.main,
             fontFamily: this.props.theme.typography.fontFamily
           }}>
              Resolution
           </p>

          <Slider
            defaultValue={this.edgeLength}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={4}
            max={20}
            value={this.state.edgeLength}
            onChange={this.updateResolution}
            style={{ width: '50%' }}/>

          <br/>
          <br/>

            <Button variant="contained" color="primary" onClick={this.handlePlayChange}>
              {this.state.play ? 'Pause' : 'Play'}
            </Button>

          <br/>
          <br/>
          <Button variant="contained" color="primary" onClick={this.shareURL}>
              Share URL
            </Button>

          <br/>
          <br/>

          <a target="_blank" href={this.state.gifURL === '' ? false : this.state.gifURL} download="evolution.gif" style={{ color: 'inherit', 'text-decoration': 'none' }}>
            <Button variant="contained" color="primary" download={this.state.gifURL} disabled={this.state.gifURL === ''}
            target="_blank">
                {this.state.gifURL !== '' ? 'Download as GIF' : 'GIF not ready'}
              </Button>
          </a>

        </div>

        <div id='controls-container'>

          <AceEditor
            // placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="editor"
            // onLoad={this.handleRuleChangeAce}
            onChange={this.handleRuleChangeAce}
            fontSize={this.fontSize}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.editorVal}
            height={window.innerHeight * 0.5}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: !isMobile,
              showGutter: !isMobile,
              tabSize: 2
            }}

            width={this.editorwidth + 'px'}

            />

            <Button variant="contained" color="primary" onClick={this.progressExample}>
              Next Example
            </Button>

            <br/>
            <br/>

            <Button variant="contained" color="secondary" href="#help">
              Help/More Info
            </Button>

          </div>
      </div>
    );
  }
}

export default withTheme(App);
