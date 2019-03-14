import React, { Component } from 'react';
import {hasOnlyImageFiles} from './validations';

class FormRow extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
/*
        this.state = {
            field: "",
            errors: {
                files: null
            }
        }*/

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    render() {
        return (
            <input type="file" name="images" accept="image/png, image/jpeg" multiple="true" 
            onChange={(e) => this.handleOnChange(e, "images", true)} value=""/>
        )
    }
}




export default FormRow;