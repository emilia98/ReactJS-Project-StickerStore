import React, { Component } from 'react';
import FileInput from './subcomponents/FileInput';
import StickerService from '../../../services/StickerService';
import TextInput from '../../../common/components/TextInput';
import CategoryList from './subcomponents/CategoryList';
import { NotificationManager } from 'react-notifications';
import { withRouter} from 'react-router-dom';

class CreateSticker extends Component {
    constructor(props) {
        super(props);


        this.service = StickerService;
        this.state = {
            images: "",
            title: "",
            categories: [],
            tags: [],
            price: "",
            qty: "",
            description: "",
            doRerender: false,
            mainImg: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.getNewValue = this.getNewValue.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.doRerender;
    }
    

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData();


        formData.append("mainImg", this.state.mainImg[0])
        formData.append("title", this.state.title);
        formData.append("price", this.state.price);
        formData.append("qty", this.state.qty);
        formData.append("description", this.state.description);
        formData.append('tags', this.state.tags);
      
        let categories = this.state.categories;

        for (let i = 0; i < categories.length; i++) {
            formData.append('categories', categories[i])
        }
        
        let images = this.state.images;

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i], images.name)
        }

    fetch('http://localhost:8080/sticker/create', {
        method: 'post',
       
        body: formData
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.errors && data.errors.length > 0) {
                return this.setState({
                    errors: data.errors
                })
            }
            if(data.hasError) {
                return NotificationManager.error(data.msg);
            } 

           // console.log(data);

            NotificationManager.success(data.msg);
            this.props.history.push('/admin');
        })
        .catch(err => {
            console.log(err);
            return NotificationManager.error('An error occurred while trying to create a new sticker!');
        })
        
    }

    getNewValue(value, field) {
        let obj = [];
        obj[field] = value;
        obj.doRerender = false;
        this.setState(obj);
    }
    

    render() {
        return (
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <strong>Basic Form</strong> Elements
                                    </div>
                        <div class="card-body card-block">
                            <form onSubmit={this.onSubmit} encType="multipart/form-data" class="form-horizontal">
                            <FileInput name="mainImg" ext="image/png, image/jpeg" multiple={false} getNewValue={this.getNewValue} />
                                <FileInput name="images" ext="image/png, image/jpeg" multiple={true} getNewValue={this.getNewValue} />
                                <TextInput type="text" name="title" label="Title" getNewValue={this.getNewValue} placeholder="React Sticker"/>
                                <TextInput type="text" name="price" label="Price per Unit" getNewValue={this.getNewValue} placeholder="0.40"/>
                                <TextInput type="text" name="qty" label="Quantity" getNewValue={this.getNewValue} placeholder="10"/>
                                <TextInput type="text" name="tags" label="Tags" getNewValue={this.getNewValue} placeholder="cats, animals" showLabels={true}/>                           
                                <TextInput isTextarea={true} name="description" label="Description" getNewValue={this.getNewValue} placeholder="Type the description here"/>
                                <CategoryList getNewValue={this.getNewValue}/>
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

/*
validator => from frontend
error =>from backend
*/



export default withRouter(CreateSticker);