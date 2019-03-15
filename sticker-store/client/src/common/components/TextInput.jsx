import React, { Component } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }

        // this.validate = this.props.validate;

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        this.setState({ hasError: false });
        this.props.getNewValue(e.target.value, this.props.name)
    }

    render() {
        return (
            <div class="row form-group">
                <div class="col col-md-3">
                    <label for={this.props.name} class="form-control-label">{this.props.label}</label>
                </div>
                <div class="col-12 col-md-9">

                    <InputType isTextarea={this.props.isTextarea} type={this.props.type} name={this.props.name} id={this.props.name} class="form-control" placeholder={this.props.placeholder}
                        handleOnChange={this.handleOnChange} />
                    <ErrorMsg hasError={this.state.hasError} msg="Files should be .png or .jpeg/.jpg" />
                </div>
            </div>

        )
    }
}


const InputType = (props) => {
    if (props.isTextarea) {
        return <textarea name={props.name} id={props.name} class="form-control" placeholder={props.placeholder} onChange={(e) => props.handleOnChange(e)}></textarea>
    }

    return <input type={props.type} name={props.name} id={props.name} class="form-control" placeholder={props.placeholder} onChange={(e) => props.handleOnChange(e)} />
}

const ErrorMsg = (props) => {
    let { hasError, msg } = props;

    if (!hasError) {
        return null;
    }

    return <small id="" class="form-text text-muted input-error">{msg}</small>
}

export default TextInput;