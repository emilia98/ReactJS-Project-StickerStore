import React, { Component } from 'react';

class UniversalForm extends Component {
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
    }

    render() {
        return (
            <React.Fragment>

                <div className="row custom-form">
                    <div className="col-lg-6 ">
                        <div className="card">
                            <div className="card-header">
                                <h1>{this.props.title}</h1>
                            </div>
                            <div className="card-body card-block">
                                <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form-horizontal">

                                    {
                                        this.state.children.map((child, i) => {
                                            let { name } = child.props;
                                            let defaultValue = this.state[name];
                                            
                                            if(name === "slug") {
                                                defaultValue = this.state.title.toLowerCase().replace(/\s+/g, '-')
                                            }
                                            return (
                                                <FormRow props={child.props} change={this.change} key={i} id={child.props.name + i} defaultValue={defaultValue}/>
                                        )
                                        })
                                    }
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success btn-lg custom-btn">
                                            Create
                                        </button>
                                        <button type="reset" className="btn btn-danger btn-lg custom-btn">
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const FormRow = (props) => {
    let { change: onChangeEvent, defaultValue} = props;
    let { type, name, title } = props.props;
    
    return (
        <div className="row form-group form-item">
            <div className="col col-md-3">
                <label htmlFor="text-input" className="form-control-label">{title}</label>
            </div>
            <div className="col-12 col-md-9">
                <input type={type} id="text-input" name={name} placeholder={title} className="form-control" onChange={(e) => onChangeEvent(e, name)} value={defaultValue}/>
            </div>
        </div>
    )
}

export default UniversalForm;