import React, { Component } from 'react';
import axios from 'axios';
import {Added} from './added';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
     input1: '',
     input2: '',
    }
    this.handleChange       = this.handleChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.componentDidMount  = this.componentDidMount.bind(this);
    this.handleAlertText    = this.handleAlertText.bind(this); 
    setInterval(this.componentDidMount, 60000);
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name] : +event.target.value 
    })
  }

  handleAlertText () {
    var float = this.state.strFloat;
    var target = this.state.targetPrice;
    var newAlert = float - target;  
    
    console.log('newAlert number:' ,newAlert)

      if (newAlert <= 0) {
         console.log('text low alert triggered!');
         
      } 
      else {
        if(newAlert >= 0) { 
        console.log('text high alert triggered!');
        
      }
    }
    
      console.log('target:', this.state.targetPrice);
  }
 
  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => {
        var str       = res.data.bpi.USD.rate;
        var strFloat  = res.data.bpi.USD.rate_float;
        var coinPrice = str.slice(0, str.length -2)
        var timeStamp = res.data.time.updated;
        console.log('Scheduled price call made');
        this.setState({ 
          coinPrice: coinPrice,
          timeStamp: timeStamp,
          strFloat : strFloat  })
        })
  }
    
  handleSubmit = event => {
    event.preventDefault();
      this.setState({
        phone: this.state.input2,
        targetPrice: this.state.input1,
        input1: '',
        input2: '',
      });
    var request     = require('request');
    var targetPrice = this.state.input1;
    var phone       = this.state.input2;
    console.log(targetPrice)
    this.handleAlertText();
    setInterval(this.handleAlertText, 10000);

    request.post('https://textbelt.com/text', {
        form: {
          phone: phone,
          message: 'Your Bitcoin alert has been set with a trigger price of $' + this.state.input1,
          key: 'textbelt',
        },
    }, function(err, httpResponse, body) {
          if (err) {
            //console.error('Error:', err);
            console.log('Error:', err);
            return;
          }
        console.log('POST req made, response body:', JSON.parse(body));
      
    })
  }      


  render() {
    return (
      <div className='container text-light mt-4'>
        <label>
         <h1 className='text-nowrap'>Bitcoin Price Alert</h1>
          <h3>Current price ${ this.state.coinPrice }</h3>
        </label>
          <Added targetPrice={ this.state.targetPrice }
                 phone={ this.state.phone }
                 textResponse={ this.state.body }
          />        
        <div className='row col-4 card-body text-nowrap'>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <label><h5>Enter your target price</h5></label>
                <input className='form-control' 
                       type='number' 
                       name='input1'
                       value={this.state.input1}
                       onChange={ this.handleChange }
                />
            </div>
              <div className='form-group'>
                <label><h5>Phone number to alert</h5></label>
                <input className='form-control' 
                      type='number' 
                      name='input2'
                      value={this.state.input2}
                      onChange={ this.handleChange }
                />
              </div>
              <button className='btn btn-light btn-sm' type='submit'>Set Alert</button>
          </form>
          {/* <div className='card card-footer align-bottom'>
          This can put in a footer, phone for now: {this.state.phone}
          </div>
          <footer className='navbar-fixed-bottom'>
            Some links you might want to check out...
            Slushpool
            Coinbase 
            
          </footer>*/}
        </div>
      </div>
    );
  }
}

export default App;
