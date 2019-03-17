import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import withListAllService from '../../../hocs/admin/with-list-all-service';
import UserService from '../../../services/UserService';
import { NotificationManager } from 'react-notifications';

const User = (props) => {
    let users = props.data;
    
    return (
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Created On</th>
                    <th>IsActive</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => <UserRow user={user} rerenderData={props.rerenderData} />)
                }
            </tbody>
        </table>
    )
}

class UserRow extends React.Component {
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

        UserService.changeStatus(id)
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
                return NotificationManager.error('An error occurred while trying to change the status of a user!');
            })
    }

    render() {
        let { user } = this.props;
    return (
        <React.Fragment>
        <tr>
            <td>
                <div className="table-data__info">
                    <h4>{user.username}</h4>
                    <span>{user.email}</span>
                </div>
            </td>
            <td>{user.createdOn}</td>
            <td>
                { user.isActive ? 
                <span class="table-label table-label-success">Active</span> :
                <span class="table-label table-label-danger">Inactive</span>
                }
            </td>
            <td>
                <div class="table-data-feature">
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" data-id={user._id} onClick={this.changeStatus}>
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
    heading: 'Users',
    missingBtn: true
}

export default withListAllService(User, UserService.listAll, options);
