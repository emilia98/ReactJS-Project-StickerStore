import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import '../../styles/stickers.css';
import Filter from './Filter';

class Stickers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stickers: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/sticker/active')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data.hasError) {
                return NotificationManager.error(data.msg);
            }

            NotificationManager.info(data.msg);
            this.setState({
                stickers: data.data
            });
        })
        .catch(err => {
            console.log(err);
            NotificationManager.error('An error occurred while tring to get all the stickers!');
        })
    }

    render() {
        console.log(this.state);
       
       return (
        <main class="cd-main-content">
        <Filter />
        <div className="row results">
        {
             this.state.stickers.map(s => {
        return (
            <div className="col-md-4">
                <div className="card">
                <Link className="card-img"  to={`/sticker/details/${s._id}`}>
                    <img className="card-img-top" src={s.mainImg} alt="Card image cap" />
                    </Link>
                    <div className="card-body">
                    <Link to={`/sticker/details/${s._id}`}>
                    <h2 className="card-title sticker"><span>{s.title}</span></h2>
                    </Link>
                    <a href="#" className="">
                    <h2 className="card-title sticker"><i class="far fa-heart"></i></h2>
                    </a>
                        

                        <div className="price col-sm-6 col-xs-6 no-padding">
                            <h3 class="price">{s.price}$</h3>
                        </div>
                        <div className="price col-sm-6 col-xs-6 no-padding">
                            <a href="#" className="btn btn-dark">Buy</a>
                        </div>
                    </div>
                </div>
            </div>
        )
})
}
        </div>
        
        </main> 

       ) 
}
}

export default Stickers;
