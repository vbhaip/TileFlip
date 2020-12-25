import './App.css';
import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider'
import Visualization from './Visualization'

class App extends React.Component {

  constructor(props){
    super(props)
    this.handleRuleChange = this.handleRuleChange.bind(this)

    this.state = {
      'rule': new Function('n', `return ''`),
      'edgeLength': 10,
      'play': false
      }

    this.sliderUpdate = this.sliderUpdate.bind(this);
    this.handlePlayChange = this.handlePlayChange.bind(this);

  }

  handleRuleChange(e) {
    console.log(e.target.value)
    
    try{

      let f = new Function('n', `
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
        <TextField variant="outlined" onChange={this.handleRuleChange} multiline={true}/>
        <Button variant="contained" color="primary" onClick={this.handlePlayChange}>
            {this.state.play ? "Pause" : "Play"}
          </Button>
      </div>
    );
  }

}

export default App;
