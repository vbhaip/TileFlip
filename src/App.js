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



class App extends React.Component {

  constructor(props){
    super(props)
    this.handleRuleChange = this.handleRuleChange.bind(this)
    this.handleRuleChangeAce = this.handleRuleChangeAce.bind(this);

    this.state = {
      'rule': new Function('n', `return ''`),
      'edgeLength': 10,
      'play': false,
      'editor_val': `function rule(ctx){

        }`
      }

    this.sliderUpdate = this.sliderUpdate.bind(this);
    this.handlePlayChange = this.handlePlayChange.bind(this);

    this.temp = this.temp.bind(this);

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

  sliderUpdate(e){
    this.setState({
      'edgeLength': e.target.value
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

        <Visualization id="viz" edgeLength={this.state.edgeLength} size={window.innerWidth*.25} rule={this.state.rule}
         play={this.state.play}/>
        {
        // <Slider
                // defaultValue={10}
                // valueLabelDisplay="auto"
                // step={1}
                // marks
                // min={4}
                // max={20}
                // onChange={this.sliderUpdate}
                // style={{"width": "50%"}}/>
              }

        {
        //<TextField variant="outlined" onChange={this.handleRuleChange} multiline={true}/>
        }
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
    );
  }

}

export default App;
