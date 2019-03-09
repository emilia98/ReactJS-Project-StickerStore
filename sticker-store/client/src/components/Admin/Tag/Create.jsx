import React, { Component } from 'react';
import UniversalForm from '../../../utils/UniversalForm';

class CreateTag extends Component {
    render() {
        return (
            <UniversalForm title="Create Tag">
              <input type="text" name="title" title="Title"/>
            </UniversalForm>
        )
    }
}

export default CreateTag;