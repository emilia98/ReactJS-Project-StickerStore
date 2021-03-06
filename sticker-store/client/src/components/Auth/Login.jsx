import React, { Component } from 'react';
import AuthForm from '../../utils/AuthForm';
import AuthService from '../../services/AuthService';
import { NotificationManager } from 'react-notifications';
import { withRouter} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: null,
            doRerender: false
        }
        this.service = AuthService.signIn;

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.doRerender || nextState.doRerender !== this.state.doRerender;
    }

     onFormSubmit(data) {
        this.service(data)
           .then(response => response.json())
           .then(data => {
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
                sessionStorage.setItem('user', JSON.stringify({
                    authToken: data.token,
                    username: data.username
                }));
                this.props.history.push('/');
               })
               
           })
           .catch(err => console.log(err))
    }
    
    render() {
        return (
            <React.Fragment>
<AuthForm title="Sign In" sendData={this.onFormSubmit} errors={this.state.errors}>
            <input type="text" name="username" title="Username" />
            <input type="password" name="password" title="Password" />
            </AuthForm>  
            </React.Fragment>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

function validateData(data) {
    
}
export default withRouter(Login);