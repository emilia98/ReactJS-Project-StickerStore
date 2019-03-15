import React from 'react';
import CategoryService from '../../../../services/CategoryService';
import { NotificationManager } from 'react-notifications';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: []
        }
    }
    componentDidMount() {
        CategoryService.listAll()
        .then(response => response.json())
        .then(data => {
            if(data.hasError) {
                return  this.setState({
                    isLoading: false
                }, function() {
                    NotificationManager.error(data.msg)
                })
            }

            this.setState({
                isLoading: false,
                data: data.data
            }, function() {
                NotificationManager.success(data.msg)
            })
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('An error occurred while trying to get all the categories');
        }) 
    }
    render() {
        return (
            <div class="row form-group">
                <div class="col col-md-3">
                    <label for="multiple-select" class=" form-control-label">Multiple select</label>
                </div>
                <div class="col col-md-9">
                    <Select isLoading={this.state.isLoading} categories={this.state.data} getNewValue={this.props.getNewValue}/>
                </div>
            </div>
        )
    }
}

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        let options = e.target.options;
        let selected = [];

        for(let index in options) {
            let option = options[index];
            
            if(option.selected) {
                // selected.push({ id: option.value , text: option.text})
                selected.push(option.value);
            }
        }

        this.props.getNewValue(selected, "categories");
    }
    render() {
        let { isLoading, categories } = this.props;

    if(isLoading) {
        return <p>Loading</p>
    }

    return (
        <select name="categories" multiple="true" class="form-control"  onChange={this.onSelect}>
        {categories.map(category => (
            <option value={category._id}>{category.title}</option>
        ))}
        </select>
    )
    }
}
export default CategoryList;