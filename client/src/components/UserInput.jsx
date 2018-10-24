import React from 'react';
import Axios from 'axios';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: 'turts',
      _age: 2,
      _weight: 1,
      _heightFt: 0,
      _heightIn: 9
    }
  }

  submit() {
    let newUser = {
      name: this.state._name,
      age: this.state._age,
      weight: this.state._weight,
      height: this.state._heightFt + (this.state._heightIn / 12)
    }
    Axios.post('/user', newUser);
  }

  render() {
    return(
      <div>
        <form>
          <input type='text' value={this.state._name} placeholder='name' onChange={(e) => {this.setState({_name: e.target.value})}}></input>
          <input type='text' value={this.state._age} placeholder='age' onChange={(e) => {!isNaN(e.target.value) ? this.setState({_age: Number(e.target.value)}) : console.log('Invalid Age')}}></input>
          <input type='text' value={this.state._weight} placeholder='weight' onChange={(e) => {this.setState({_weight: Number(e.target.value)})}}></input>
          <input type='text' value={this.state._heightFt} placeholder='height(ft)' onChange={(e) => {this.setState({_heightFt: Number(e.target.value)})}}></input>
          <input type='text' value={this.state._heightIn} placeholder='height(in)' onChange={(e) => {this.setState({_heightIn: Number(e.target.value)})}}></input>
          <button onClick={this.submit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserInput;