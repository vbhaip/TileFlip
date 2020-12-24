import './App.css';
import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Visualization from './Visualization'

class App extends React.Component {

  constructor(props){
    super(props)
    this.handleRuleChange = this.handleRuleChange.bind(this)

    this.state = {
      'rule': new Function('n', `return ''`)
      }

  }

  handleRuleChange(e) {
    console.log(e.target.value)
    
    try{

      let f = new Function('n', `
        try{
          return ${e.target.value};
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

  render(){
    return (
      <div className="App">

        <Visualization id="viz" edgeLength={15} size={window.innerWidth*.25} rule={this.state.rule}/>
        <TextField variant="outlined" onChange={this.handleRuleChange}/>
        <Button variant="contained" color="primary">
            Done
          </Button>
      </div>
    );
  }

}

export default App;
