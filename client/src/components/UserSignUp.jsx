import React from 'react';
import Axios from 'axios';

class UserSignUp extends React.Component {
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

  // helper function to ensure specific fields only accepts numbers
  handleNumber(e, state) {
    if (!isNaN(e.target.value)) {
      this.setState({[state]: Number(e.target.value)})
    } else {
      window.alert('Invalid Number');
    }
  }

  submit(e) {
    e.preventDefault();
    let newUser = {
      name: this.state._name[0].toUpperCase() + this.state._name.slice(1),
      age: this.state._age,
      weight: this.state._weight,
      height: Number(this.state._heightFt + (this.state._heightIn / 12))
    }
    Axios.post('/api/user', newUser)
    .then(() => {
      //this.props.getUserData();
    })
    .catch(err => {
      console.error('error signing up', err);
    });
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
        <form>
          <ul>
            <li className=''><input type='text' value={this.state._name} placeholder='name' onChange={(e) => {this.setState({_name: e.target.value})}}></input></li>
            <li className=''><input type='text' value={this.state._age} placeholder='age' onChange={(e) => {this.handleNumber(e, '_age')}}></input></li>
            <li className=''><input type='text' value={this.state._weight} placeholder='weight' onChange={(e) => {this.handleNumber(e, '_weight')}}></input></li>
            <li className=''><input type='text' value={this.state._heightFt} placeholder='height(ft)' onChange={(e) => {this.handleNumber(e, '_heightFt')}}></input></li>
            <li className=''><input type='text' value={this.state._heightIn} placeholder='height(in)' onChange={(e) => {this.handleNumber(e, '_heightIn')}}></input></li>
          </ul>
          <button onClick={(e) => this.submit(e)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserSignUp;