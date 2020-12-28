import './App.css';
import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider'
import Visualization from './Visualization'


import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/ext-language_tools"

import "ace-builds/webpack-resolver";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import qs from 'qs'

import base64url from 'base64url'

class App extends React.Component {

  constructor(props){
    super(props)
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.handleRuleChangeAce = this.handleRuleChangeAce.bind(this);
    this.updateResolution = this.updateResolution.bind(this);
    this.handlePlayChange = this.handlePlayChange.bind(this);
    this.setExportInitData = this.setExportInitData.bind(this);
    this.shareURL = this.shareURL.bind(this);
    this.setGifURL = this.setGifURL.bind(this);
    this.updateRefresh = this.updateRefresh.bind(this);
    this.setStateFromQuery = this.setStateFromQuery.bind(this);
    this.progressExample = this.progressExample.bind(this);

    // this.downloadGif = this.downloadGif.bind(this);


    // this.temp = this.temp.bind(this);

    this.rawquery = window.location.search.slice(1)

    this.query = qs.parse(this.rawquery);


    fetch(process.env.PUBLIC_URL + '/examples.txt')
      .then(response => response.text())
      .then((text) => {
        this.examples = text.split("\n\n")
        console.log(this.examples);
        this.curr_example = 0;

        // no parameters means load example
        if(Object.keys(this.query).length === 0){
          let query = qs.parse(this.examples[this.curr_example]);
          this.setStateFromQuery(query);
        }

        this.setState({'curr_example': 0, 'examples': this.examples})

      })


    


    //defaults
    this.refreshRate = 1000;
    this.edgeLength = 10;
    this.editor_val = `function rule(ctx){

        }`;
    this.play = false;
    this.initdata = [];
    

    if('refreshRate' in this.query){
      this.refreshRate = parseInt(this.query['refreshRate'])
    }
    if('resolution' in this.query){
      this.edgeLength = parseInt(this.query['resolution'])
    }
    if('code' in this.query){
      this.editor_val = base64url.decode(this.query['code'])
    }
    if('play' in this.query && this.query['play'] === 'true'){
      this.play = true;
    }
    if('state' in this.query){
      try{
        this.initdata = JSON.parse(this.query['state'])
      }
      catch(e){
        console.log(e);
      }

    }


    this.initrule = this.getFunctionFromString(this.editor_val)


    this.state = {
    'rule': this.initrule,
    'edgeLength': this.edgeLength,
    'play': this.play,
    'editor_val': this.editor_val,
    'refreshRate': this.refreshRate,
    'exportInitData': '',
    'gifURL': ''
    }

    // console.log(this.initdata)

    // if(this.initdata.length === this.edgeLength){
    this.state.initdata = this.initdata;
    // }


  }

  setStateFromQuery(query){

    if('refreshRate' in query){
      this.setState({'refreshRate': parseInt(query['refreshRate'])})
    }
    if('resolution' in query){
      this.setState({'edgeLength': parseInt(query['resolution'])})
    }
    if('code' in query){
      let editor_val = base64url.decode(query['code']);
      this.setState({'editor_val' : editor_val});
      this.setState({'rule': this.getFunctionFromString(editor_val)})
    }
    if('play' in query && query['play'] === 'true'){
      this.setState({'play': true})
    }
    if('state' in query){
      try{
        this.setState({'initdata': JSON.parse(query['state'])});
      }
      catch(e){
        console.log(e);
      }

    }


  }

  progressExample(){
    this.setState((prevState) => {
      let new_example_ind = (prevState.curr_example + 1) % prevState.examples.length;
      this.setStateFromQuery(qs.parse(prevState.examples[new_example_ind]));
      return {'curr_example': new_example_ind}
    });

  }


  setExportInitData(val){
    this.setState({
      'exportInitData': val
    })
  }

  updateRefresh(e, val){
    console.log(val);
    this.setState({
      'refreshRate': val
    });
  }

  getFunctionFromString(val){

    try{

      let f = new Function('x', `
        try{
          // ${val.replace(/\n/g, "")};
          let f = ${val}

          return f(x);
        }
        catch(error){
          return error;
        }
        `)
      // let f = null;

      return f;
      // this.setState({'rule': f});

      console.log(f)
    }
    catch(error){
      console.log(error)
    }


    if(this.state){
      return new Function('x', 'return null;')
    }

    //return whatever is existing as a rule 

    return this.state.rule;

  }

  handleRuleChange(e) {
    console.log(e)
    // console.log(e.target.value)

    try{

      let f = new Function('ctx', `
        try{
          ${e.target.value.replace(/\n/g, "")};
        }
        catch(error){
          return error;
        }
        `)

      this.setState({'rule': f});

      console.log(f)
    }
    catch(error){
      console.log(error)
    }

  }


  handleRuleChangeAce(val) {
    this.setState({'editor_val': val})
    // val = val.slice(val.indexOf('{') + 1, val.indexOf('}')).trim();
    console.log(val)

    console.log(base64url.encode(val))

    let f = this.getFunctionFromString(val);
    
    this.setState({'rule': f});



  }

  updateResolution(e, val){
    this.setState({
      'edgeLength': val,
      'initdata': []
    })
  }

  handlePlayChange(e){
    this.setState((prevState) =>{
      return ({
        'play': !prevState.play
      });
    });
  }

  shareURL(){
    let params = {};

    params['refreshRate'] = this.state.refreshRate;
    params['play'] = true
    params['resolution'] = this.state.edgeLength
    params['code'] = base64url.encode(this.state.editor_val)
    params['state'] = this.state.exportInitData;

    let export_qs = qs.stringify(params);

    let curr_url = window.location.toString();

    curr_url = curr_url.slice(0, curr_url.lastIndexOf('/'))

    let new_url = curr_url + '?' + export_qs;

    console.log(new_url)

    window.history.pushState('', '', new_url);

    window.prompt("Copy to share (Ctrl+C, Enter)",new_url)

  }

  setGifURL(item){
    this.setState({'gifURL': item})
  }

  // temp(e){
  //   document.getElementsByClassName("ace_text-input")[0]
  //     .innerHTML = "hi"
  // }


  render(){
    return (
      <div className="App">

        <div id='vis-container'>
          <Visualization id="viz" edgeLength={this.state.edgeLength} size={window.innerWidth*.25} rule={this.state.rule}
           play={this.state.play} refreshRate={this.state.refreshRate} initdata={this.state.initdata}
           setExportInitData={this.setExportInitData} setGifURL={this.setGifURL}/>

           <br/>
           Refresh Rate (ms)
           <br/>

           <Slider
            defaultValue={this.refreshRate}
            valueLabelDisplay="auto"
            step={100}
            marks
            min={200}
            max={2000}
            style={{'width': '50%'}}
            onChange={this.updateRefresh}
           />
          
           <br/>
           Resolution
           <br/>

          <Slider
            defaultValue={this.edgeLength}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={4}
            max={15}
            onChange={this.updateResolution}
            style={{"width": "50%"}}/>


          <br/>
          <br/>

            <Button variant="contained" color="primary" onClick={this.handlePlayChange}>
              {this.state.play ? "Pause" : "Play"}
            </Button>

          <br/>
          <br/>
          <Button variant="contained" color="primary" onClick={this.shareURL}>
              Share Creation
            </Button>

          <br/>
          <br/>
          
          <a href={this.state.gifURL} download="evolution.gif" style={{'color': 'inherit', 'text-decoration': 'none'}}>
            <Button variant="contained" color="primary" download={this.state.gifURL} disabled={this.state.gifURL === ''}
            target="_blank">
                {this.state.gifURL !== '' ? "Download as GIF" : "GIF not ready"}
              </Button>
          </a>
                

        </div>
        {
        //<TextField variant="outlined" onChange={this.handleRuleChange} multiline={true}/>
        }
        <div id='controls-container'>

          <AceEditor
            // placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="editor"
            // onLoad={this.handleRuleChangeAce}
            onChange={this.handleRuleChangeAce}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.editor_val}
            height={window.innerWidth*.3}
            setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }}

            />

            <Button variant="contained" color="primary" onClick={this.progressExample}>
              Next Example
            </Button>
                      
          

          </div>
      </div>
    );
  }

}

export default App;
