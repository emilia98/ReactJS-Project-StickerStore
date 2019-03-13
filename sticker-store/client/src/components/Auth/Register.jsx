import React, { Component } from 'react';
import AuthForm from '../../utils/AuthForm';
import AuthService from '../../services/AuthService';
import { NotificationManager } from 'react-notifications';
import { withRouter} from 'react-router-dom';

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
        return nextState.doRerender || nextState.doRerender !== this.state.doRerender;
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
               
               if(data.hasError) {
                   return NotificationManager.error(data.msg);
               }

               
               

               this.setState({doRerender: false}, () => {
                NotificationManager.success(data.msg);
                this.props.history.push('/login');
               })
               
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
export default withRouter(Register);