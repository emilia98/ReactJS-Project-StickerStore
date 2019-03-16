import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import withListAllService from '../../../hocs/admin/with-list-all-service';
import CategoryService from '../../../services/CategoryService';
import { NotificationManager } from 'react-notifications';

const Category = (props) => {
    let categories = props.data;
    
    return (
        <table class="table">
            <thead>
                <tr>
                    <th>Category Title</th>
                    <th>Category Slug</th>
                    <th>Date</th>
                    <th>IsActive</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map((category) => <CategoryRow category={category} rerenderData={props.rerenderData} />)
                }
            </tbody>
        </table>
    )
}

class CategoryRow extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(e) {
        let target = e.target;
        let id = target.getAttribute('data-id');

        if (id === null) {
            id = target.parentElement.getAttribute('data-id');
        }

        CategoryService.changeStatus(id)
            .then(response => response.json())
            .then(data => {
                if (data.hasError) {
                    return NotificationManager.error(data.msg);
                }
                
                console.log(data);

                NotificationManager.success(data.msg);
                this.props.rerenderData();
            })
            .catch(err => {
                console.log(err);
                return NotificationManager.error('An error occurred while trying to change the status of a tag!');
            })
    }

    render() {
        let { category } = this.props;
    return (
        <React.Fragment>
        <tr>
            <td>{category.title}</td>
            <td>{category.slug}</td>
            <td>{category.createdOn}</td>
            <td>
                { category.isActive ? 
                <span class="table-label table-label-success">Active</span> :
                <span class="table-label table-label-danger">Inactive</span>
                }
            </td>
            <td>
                <div class="table-data-feature">
                    <Link to={'/category/edit/' + category._id} class="item" data-toggle="tooltip" data-placement="top" title="Edit" >
                        <i class="zmdi zmdi-edit"></i>
                    </Link>
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" data-id={category._id} onClick={this.changeStatus}>
                        <i class="zmdi zmdi-delete"></i>
                    </button>
                </div>
            </td>
        </tr>
    </React.Fragment>
    )
    }
}

const options = {
    heading: 'Categories',
    to: '/category/create'
}

export default withListAllService(Category, CategoryService.listAll, options);
