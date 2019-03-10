import React, { Component } from 'react';
import UniversalForm from '../../../utils/UniversalForm';
import withCreateService from '../../../hocs/with-create-service';
import TagService from '../../../services/TagService';

class CreateTag extends Component {
    constructor(props) {
        super(props);

        this.service = TagService.create;
    }
    
  
    render() {
        return (
            <UniversalForm title="Create Tag" service={this.service}>
              <input type="text" name="title" title="Title"/>
            </UniversalForm>
        )
    }
}

export default CreateTag;