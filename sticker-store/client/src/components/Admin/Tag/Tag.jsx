import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import withListAllService from '../../../hocs/admin/with-list-all-service';
import TagService from '../../../services/TagService';
import { NotificationManager } from 'react-notifications';

const Tag = (props) =>  {
    let tags = props.data;
    return (
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>IsActive</th>
                </tr>
            </thead>
            <tbody>
                {
                    tags.map((tag) => <TagRow tag={tag} rerenderData={props.rerenderData} />)
                }
            </tbody>
        </table>
    )
}

class TagRow extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(e) {
        let target = e.target;
        let id = target.getAttribute('data-id');

        if(id === null) {
            id = target.parentElement.getAttribute('data-id');
        }

        TagService.changeStatus(id)
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(data => {
            if(data.hasError) {
                return NotificationManager.error(data.msg);
            }

            NotificationManager.success(data.msg);
            this.props.rerenderData();
        })
        .catch(err => {
            console.log(err);
            return NotificationManager.error('An error occurred while trying to change the status of a tag!');
        })
    }

    render() {
        let { tag } = this.props;
    return (
        <React.Fragment>
        <tr>
            <td>{tag.title}</td>
            <td>{tag.createdOn}</td>
            <td>
                { tag.isActive ? 
                <span class="table-label table-label-success">Active</span> :
                <span class="table-label table-label-danger">Inactive</span>
                }
            </td>
            <td>
                <div class="table-data-feature">
                    <Link to={'/tag/edit/' + tag._id} class="item" data-toggle="tooltip" data-placement="top" title="Edit" >
                        <i class="zmdi zmdi-edit"></i>
                    </Link>
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" data-id={tag._id} onClick={this.changeStatus}>
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
    heading: 'Tags',
    to: '/tag/create'
}

export default withListAllService(Tag, TagService.listAll, options);