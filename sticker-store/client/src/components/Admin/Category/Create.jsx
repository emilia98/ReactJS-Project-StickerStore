import React, { Component } from 'react';
import UniversalForm from '../utils/UniversalForm';

class CreateCategory extends Component {
    
    render() {
        return (
            <React.Fragment>
                <UniversalForm title="Create Category">
                <input type="text" name="title" title="Title"  />
                <input type="text" name="slug" title="Slug" />
                </UniversalForm>
                    
            </React.Fragment>
              
            
        )
    }
}

export default CreateCategory;