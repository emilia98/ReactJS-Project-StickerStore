import React from 'react';
import { Link } from 'react-router-dom';
import withListAllService from '../../../hocs/admin/with-list-all-service';
import TagService from '../../../services/TagService';

const Tag = (props) =>  {
    let tags = props.data;
    return (<table class="table table-data2">
                    <thead>
                        <tr>
                            <th>
                                <label class="au-checkbox">
                                    <input type="checkbox" />
                                    <span class="au-checkmark"></span>
                                </label>
                            </th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>IsActive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tags.map((tag) => <TagRow tag={tag} />)
                        }
                    </tbody>
                </table>)
}

const TagRow = (props) => {
    let { tag } = props;
    return (
        <React.Fragment>
        <tr class="tr-shadow">
            <td>
                <label class="au-checkbox">
                    <input type="checkbox" />
                    <span class="au-checkmark"></span>
                </label>
            </td>
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
                    <Link to={'/edit/' + tag._id} class="item" data-toggle="tooltip" data-placement="top" title="Edit" >
                        <i class="zmdi zmdi-edit"></i>
                    </Link>
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete">
                        <i class="zmdi zmdi-delete"></i>
                    </button>
                </div>
            </td>
        </tr>
        <tr class="spacer"></tr>
    </React.Fragment>
    )
}

const options = {
    heading: 'Tags',
    to: '/tag/create'
}

export default withListAllService(Tag, TagService.listAll, options);