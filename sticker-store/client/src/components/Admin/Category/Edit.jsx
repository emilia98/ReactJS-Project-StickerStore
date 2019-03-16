import React, { Component } from 'react';
import UniversalForm from '../../../utils/UniversalForm';
import CategoryService from '../../../services/CategoryService';
import { NotificationManager } from 'react-notifications';

class EditCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            hasError: false,
            category: null,
            isLoading: true
        }

        this.service = CategoryService.editPost;
    }

    componentDidMount() {
        CategoryService.editGet(this.state.id)
        .then(response => {
            if(!response.ok) {
                throw Error("")
            }
            return response.json()
        })
        .then(data => {
            if(data.hasError) {
                NotificationManager.error(data.msg);
                return this.setState({
                hasError: true,
                isLoading: false
            })
            }
            NotificationManager.success(data.msg);
            return this.setState({
                hasError: false,
                isLoading: false,
                category: data.category
            })
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('An error occurred while trying to get a category!');
            this.setState({
                hasError: true,
                isLoading: false
            })
        })
    }
    
  
    render() {
        if(this.state.isLoading) {
            return <h2>Loading...</h2>
        }

        if(this.state.hasError) {
            return null;
        }
        // console.log(this.state);
        return (
            <UniversalForm title="Edit Category" service={this.service} id={this.state.id} redirectTo='/categories'>
              <input type="text" name="title" title="Title"  defaultValue={this.state.category.title}/>
                <input type="text" name="slug" title="Slug" defaultValue={this.state.category.slug}/>
            </UniversalForm>
        )
    }
}

export default EditCategory;