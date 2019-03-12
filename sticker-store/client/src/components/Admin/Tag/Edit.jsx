import React, { Component } from 'react';
import UniversalForm from '../../../utils/UniversalForm';
import TagService from '../../../services/TagService';
import { NotificationManager } from 'react-notifications';

class EditTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            hasError: false,
            tag: null,
            isLoading: true
        }

        this.service = TagService.editPost;
    }

    componentDidMount() {
        TagService.editGet(this.state.id)
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
                tag: data.tag
            })
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('An error occurred while trying to get a tag!');
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
            return null
        }
        // console.log(this.state);
        return (
            <UniversalForm title="Edit Tag" service={this.service} id={this.state.id}>
              <input type="text" name="title" title="Title" defaultValue={this.state.tag.title}/>
            </UniversalForm>
        )
    }
}

export default EditTag;