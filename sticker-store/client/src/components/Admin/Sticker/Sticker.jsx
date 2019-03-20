import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import withListAllService from '../../../hocs/admin/with-list-all-service';
import StickerService from '../../../services/StickerService';
import { NotificationManager } from 'react-notifications';

const Sticker = (props) => {
    let stickers = props.data;
    
    return (
        <table class="table">
            <thead>
                <tr>
                <th>Sticker Image</th>
                    <th>Sticker Title</th>
                    <th>Sticker Price</th>
                    <th>Sticker Quantity</th>
                    <th>Date</th>
                    <th>IsActive</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    stickers.map((sticker) => <StickerRow sticker={sticker} rerenderData={props.rerenderData} />)
                }
            </tbody>
        </table>
    )
}

class StickerRow extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(e) {
        let target = e.target;
        let id = target.getAttribute('data-id');

        console.log(id);
        if (id === null) {
            id = target.parentElement.getAttribute('data-id');
        }

        StickerService.changeStatus(id)
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
                return NotificationManager.error('An error occurred while trying to change the status of a sticker!');
            })
    }

    render() {
        let { sticker } = this.props;
    return (
        <React.Fragment>
        <tr>
        <td>
            <img src={sticker.mainImg} alt={sticker.title} />
        </td>
            <td>{sticker.title}</td>
           
            <td>{sticker.price}</td>
            <td>{sticker.qty}</td>
            <td>{sticker.createdOn}</td>
            <td>
                { sticker.isActive ? 
                <span className="table-label table-label-success">Active</span> :
                <span class="table-label table-label-danger">Inactive</span>
                }
            </td>
            <td>
                <div class="table-data-feature">
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" data-id={sticker._id} onClick={this.changeStatus}>
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
    heading: 'Stickers',
    to: '/sticker/create'
}

export default withListAllService(Sticker, StickerService.listAll, options);
