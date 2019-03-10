import React, { Component } from 'react';
import AuthForm from '../../utils/AuthForm';
import AuthService from '../../services/AuthService';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: null,
            doRerender: false
        }
        this.service = AuthService.signUp;

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return nextState.doRerender && nextState.doRerender !== this.state.doRerender;
    }

     onFormSubmit(data) {
        this.service(data)
           .then(response => response.json())
           .then(data => {
            console.log(data);
               if(data.errors) {
                   return this.setState({
                       errors: data.errors
                       ,doRerender: true
                   })
               }

               this.setState({doRerender: false})

               
           })
           .catch(err => console.log(err))
    }
    
    render() {
        console.log('register');
        return (
            <React.Fragment>
<AuthForm title="Sign Up" sendData={this.onFormSubmit} errors={this.state.errors}>
            <input type="text" name="username" title="Username" />
            <input type="text" name="email" title="Email"/>
            <input type="password" name="password" title="Password" />
            </AuthForm>  
            </React.Fragment>
            
        )
    }
}


function validateData(data) {
    
}
export default Register;
/*
<div class="card text-center auth-card">
                    <div class="card-header auth-form">
                      <h3>Sign Up</h3>
                    </div>
                    <div class="card-body">
                            <form class="auth-form">
                                    <div class="form-group ">
                                      <label for="exampleInputEmail1">Email address</label>
                                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div class="form-group ">
                                      <label for="exampleInputPassword1">Password</label>
                                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                  </form>
                    </div>
                    <div class="card-footer text-muted">
                        You already have an account! <a href="/login">Login</a>
                    </div>
                  </div>
*/