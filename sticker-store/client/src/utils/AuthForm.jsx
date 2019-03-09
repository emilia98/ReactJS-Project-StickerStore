import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);

        let obj = {};
        obj.children = [];
        obj.fields = [];

        React.Children.forEach(this.props.children, (child) => {
            obj[child.props.name] = '';
            obj.children.push(child);
            obj.fields.push(child.props.name);
        });

        this.state = obj;
        

        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    change(e, name) {
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {};
        let { fields } = this.state;
        let state = this.state;

        for (let field of fields) {
            data[field] = state[field];
        }

        this.props.sendData(data);
    }

    render() {
        return (
            <React.Fragment>

                <div className="row custom-form">
                    <div className="col-lg-12">
                        <div className="card auth-card">
                            <div className="card-header">
                                <h1>{this.props.title}</h1>
                            </div>
                            <div className="card-body card-block">
                                <form onSubmit={this.onSubmit} className="form-horizontal auth-form">
                                <Errors errors={this.props.errors}/>
                                    {
                                        this.state.children.map((child, i) => 
                                            
                                             (
                                                <FormRow props={child.props} change={this.change} key={i} id={child.props.name + i}/>
                                        )
                                        )
                                    }
                                    <div class="auth-form-btn">
                                        <button type="submit" className="btn btn-danger btn-lg custom-btn">
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-muted">
                        You already have an account! <a href="/login">Login</a>
                    </div>
                        </div>
                       
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const FormRow = (props) => {
    let { change: onChangeEvent} = props;
    let { type, name, title } = props.props;
    
    return (
        <div className="row form-group form-item">
            <div className="col col-md-3">
                <label htmlFor="text-input" className="form-control-label">{title}</label>
            </div>
            <div className="col-12 col-md-9">
                <input type={type} id="text-input" name={name} placeholder={title} className="form-control" onChange={(e) => onChangeEvent(e, name)} />
            </div>
        </div>
    )
}

const Errors = (props) => {
    let { errors } = props;

    if(errors) {
        return errors.map(err => (
            <div class="alert alert-danger">{err}</div>
        ))
    }

    return null;
}

export default AuthForm;