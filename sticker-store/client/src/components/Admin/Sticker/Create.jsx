import React, { Component } from 'react';
import {hasOnlyImageFiles} from './validations';
import FileInput from './subcomponents/FileInput';
import StickerService from '../../../services/StickerService';

class CreateSticker extends Component {
    constructor(props) {
        super(props);


        this.service = StickerService;
        this.state = {
            images: "",
            doRerender: false
        }

        
        this.onSubmit = this.onSubmit.bind(this);
        this.getNewValue = this.getNewValue.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.doRerender;
    }
    

    onSubmit(e) {
        e.preventDefault();

        console.log('submit');

        let data = {
            images: this.state.images
        };

        console.log(data);

        this.service.create(data)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    getNewValue(value, field) {
        let obj = [];
        obj[field] = value;
        obj.doRerender = false;
        this.setState(obj)
    }

    render() {
        console.log(this.state);
        return (
            <div class="row">
            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <strong>Basic Form</strong> Elements
                                    </div>
                                    <div class="card-body card-block">
                                        <form onSubmit={this.onSubmit} enctype="multipart/form-data" class="form-horizontal">
                                            <FileInput name="images" ext="image/png, image/jpeg" multiple="true" getNewValue={this.getNewValue}/>
                                            <button type="submit" class="btn btn-primary btn-sm">
                                            <i class="fa fa-dot-circle-o"></i> Submit
                                        </button>
                                        </form>
                                    </div>
                                </div>
            </div>
            </div>
        )
    }
}




export default CreateSticker;