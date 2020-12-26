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

class App extends React.Component {

  constructor(props){
    super(props)
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.handleRuleChangeAce = this.handleRuleChangeAce.bind(this);

    

    this.updateResolution = this.updateResolution.bind(this);
    this.handlePlayChange = this.handlePlayChange.bind(this);

    this.temp = this.temp.bind(this);

    this.updateRefresh = this.updateRefresh.bind(this);

    this.rawquery = window.location.search.slice(1)

    this.query = qs.parse(this.rawquery);


    //defaults
    this.refreshRate = 1000;
    this.edgeLength = 10

    if('refreshRate' in this.query){
      this.refreshRate = parseInt(this.query['refreshRate'])
    }
    if('resolution' in this.query){
      this.edgeLength = parseInt(this.query['resolution'])
    }


    this.state = {
      'rule': new Function('n', `return ''`),
      'edgeLength': this.edgeLength,
      'play': false,
      'editor_val': `function rule(ctx){

        }`,
      'refreshRate': this.refreshRate
      }




  }

  updateRefresh(e, val){
    console.log(val);
    this.setState({
      'refreshRate': val
    });
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
    val = val.slice(val.indexOf('{') + 1, val.indexOf('}')).trim();
    console.log(val)
    try{

      let f = new Function('ctx', `
        try{
          ${val.replace(/\n/g, "")};
        }
        catch(error){
          return error;
        }
        `)
      // let f = null;

      this.setState({'rule': f});

      console.log(f)
    }
    catch(error){
      console.log(error)
    }

  }

  updateResolution(e, val){
    this.setState({
      'edgeLength': val
    })
  }

  handlePlayChange(e){
    this.setState((prevState) =>{
      return ({
        'play': !prevState.play
      });
    });
  }

  temp(e){
    document.getElementsByClassName("ace_text-input")[0]
      .innerHTML = "hi"
  }

  render(){
    return (
      <div className="App">

        <div id='vis-container'>
          <Visualization id="viz" edgeLength={this.state.edgeLength} size={window.innerWidth*.25} rule={this.state.rule}
           play={this.state.play} refreshRate={this.state.refreshRate}/>

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
            onLoad={this.temp}
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
                      
          <Button variant="contained" color="primary" onClick={this.handlePlayChange}>
              {this.state.play ? "Pause" : "Play"}
            </Button>

          </div>
      </div>
    );
  }

}

export default App;
