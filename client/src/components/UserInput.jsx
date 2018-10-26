import React from 'react';
import Axios from 'axios';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _age: '',
      _weight: '',
      _heightFt: '',
      _heightIn: ''
    }
    this.handleNumber = this.handleNumber.bind(this);
  }

  handleNumber(e, state) {
    if (!isNaN(e.target.value)) {
      this.setState({[state]: Number(e.target.value)})
    } else {
      console.log('Invalid Number');
    }
  }

  submit(e) {
    e.preventDefault();
    let newUser = {
      name: this.state._name,
      age: this.state._age,
      weight: this.state._weight,
      height: Number(this.state._heightFt + (this.state._heightIn / 12))
    }
    Axios.post('/api/user', newUser)
    .then(() => {
      this.props.getUserData();
    });
  }

  render() {
    return(
      <div>
        <h2>User Input</h2>
        <form>
          <input type='text' value={this.state._name} placeholder='name' onChange={(e) => {this.setState({_name: e.target.value})}}></input>
          <input type='text' value={this.state._age} placeholder='age' onChange={(e) => {this.handleNumber(e, '_age')}}></input>
          <input type='text' value={this.state._weight} placeholder='weight' onChange={(e) => {this.handleNumber(e, '_weight')}}></input>
          <input type='text' value={this.state._heightFt} placeholder='height(ft)' onChange={(e) => {this.handleNumber(e, '_heightFt')}}></input>
          <input type='text' value={this.state._heightIn} placeholder='height(in)' onChange={(e) => {this.handleNumber(e, '_heightIn')}}></input>
          <button onClick={(e) => this.submit(e)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserInput;