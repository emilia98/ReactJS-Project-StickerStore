import React, { Component } from 'react';
import {hasOnlyImageFiles} from '../validations';

class FileInput extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            hasError: false
        }
/*
        this.state = {
            field: "",
            errors: {
                files: null
            }
        }*/

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e, field) {

            if(!hasOnlyImageFiles(e.target.files)) {
                return this.setState({ hasError: true})
            } 

            this.setState({ hasError: false});
            this.props.getNewValue(e.target.files, this.props.name)
    }

    render() {
        return (
            <div class="row form-group">
            <div class="col col-md-3">
                <label for="file-multiple-input" class=" form-control-label">Multiple File input</label>
            </div>
            <div class="col-12 col-md-9">
            <input type="file" name={this.props.name} accept={this.props.ext} multiple={this.props.multiple} 
            onChange={(e) => this.handleOnChange(e, "images")} />
            <ErrorMsg hasError={this.state.hasError} msg="Files should be .png or .jpeg/.jpg"/>
            </div>
        </div>
           
        )
    }
}

const ErrorMsg = (props) => {
    let { hasError, msg} = props;

    if(!hasError) {
        return null;
    }

    return <small id="" class="form-text text-muted input-error">{msg}</small>
}




export default FileInput;