import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // customer
      id: '',
      name: '',
      address: '',
      home_phone: '',
      cell_phone: '',

      // car
      license: '',
      year: '',
      make: '',
      model: '',
      cid: '',

      // default to customer form
      form: 'customer'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeCustomer = this.makeCustomer.bind(this);
    this.makeCar = this.makeCar.bind(this);

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (this.state.form == 'customer') {
      // TODO: create POST request that sends customer/car data to endpoint
      axios.post("http://localhost:5000/customer", {
        // customer
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        home_phone: this.state.home_phone,
        cell_phone: this.state.cell_phone,

      })
        .then((response) => {
          console.log("Creating Customer with id: " + this.state.id +
            ", name: " + this.state.name +
            ", address: " + this.state.address +
            ", home phone: " + this.state.home_phone +
            ", and cell phone: " + this.state.cell_phone)

          console.log(response);

          // clear state
          this.setState({
            id: '',
            name: '',
            address: '',
            home_phone: '',
            cell_phone: '',
            license: '',
            year: '',
            make: '',
            model: '',
            cid: '',
          })
        })

    } else if (this.state.form == 'car') {
      axios.post("http://localhost:5000/car", {
        // car
        license: this.state.license,
        year: this.state.year,
        make: this.state.make,
        model: this.state.model,
        cid: this.state.cid,

      })
        .then((response) => {
          console.log("Creating Car with license: " + this.state.license +
            ", year: " + this.state.year +
            ", make: " + this.state.make +
            ", and model: " + this.state.model +
            ", with customer id" + this.state.cid)

          console.log(response);

          // clear state
          this.setState({
            id: '',
            name: '',
            address: '',
            home_phone: '',
            cell_phone: '',
            license: '',
            year: '',
            make: '',
            model: '',
            cid: '',
          })
        })
    }

    event.preventDefault();
  }

  customerForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Customer Id: </label>
            <input name="id" type="text" value={this.state.id} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Name: </label>
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Address: </label>
            <input name="address" type="text" value={this.state.address} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Home Phone: </label>
            <input name="home_phone" type="text" value={this.state.home_phone} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Cell Phone: </label>
            <input name="cell_phone" type="text" value={this.state.cell_phone} onChange={this.handleChange} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

  carForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> License: </label>
            <input name="license" type="text" value={this.state.license} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Year: </label>
            <input name="year" type="text" value={this.state.year} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Make: </label>
            <input name="make" type="text" value={this.state.make} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Model: </label>
            <input name="model" type="text" value={this.state.model} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label> Customer Id: </label>
            <input name="cid" type="text" value={this.state.cid} onChange={this.handleChange} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

  makeCustomer() {
    console.log('Make Customer');
    this.setState({ form: 'customer' });
  }


  makeCar() {
    console.log('Make Car');
    this.setState({ form: 'car' });
  }

  render() {
    let form;

    if (this.state.form == 'customer') {
      form = this.customerForm();
    } else if (this.state.form == 'car') {
      form = this.carForm();
    }

    const btnStyle = {
      height: "200px",
      width: "200px",
      padding: "15px",
      margin: "15px"
    }
    return (
      <div className="App">
        <label> <h5>EDIT: </h5> </label>
        <button style={btnStyle} onClick={this.makeCustomer} class="btn btn-primary">Customer</button>
        <button style={btnStyle} onClick={this.makeCar} class="btn btn-primary">Car</button>
        {form}
      </div>
    );
  }
}

export default App;
