import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

function withListAllService(Component, service, options) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: [],
                isLoading: false,
                status: false
            }
            this.service = service;
            this.rerenderData = this.rerenderData.bind(this);
            this.callService = this.callService.bind(this);
        }

        componentDidMount() {
            this.setState( {
                isLoading: true
            })
           this.callService();
        }

        componentDidUpdate(prevProps, prevState) {
            if(prevState.status !== this.state.status) {
                this.callService();
                return true;
            }
            return false;
        }

        callService() {
            this.service()
            .then(response => response.json())
            .then(data => {
                
                if(data.hasError) {
                    this.setState( { isLoading: false })
                    return NotificationManager.error(data.msg);
                }

               NotificationManager.success(data.msg);
                this.setState( {
                    isLoading: false,
                    data: data.data
                })
            })
            .catch(err => {
                console.log(err);
                NotificationManager.error('An error occurred while trying to fetch all the tags');
                this.setState( { isLoading: false })
                return;
            })
        }

        rerenderData() {
            this.setState({
                status: !this.state.status
            });
        }
        
        render() {
            return (
                <div class="row user-data">
        <div class="page-header">
            <h1>{options.heading}</h1>
            {options.missingBtn ? null : 
            <Link to={options.to} class="au-btn au-btn-icon au-btn--green au-btn--small">
                <i class="zmdi zmdi-plus"></i>Add New</Link>
                }
        </div>

        <div class="col-md-12">
            <div class="table-data__tool ">
                
                <div class="table-data__tool-left">
                <form class="form-header" action="" method="POST">
                    <input class="au-input au-input--xl" type="text" name="search" placeholder="Search by Category" />
                    <button class="au-btn--submit" type="submit">
                        <i class="zmdi zmdi-search"></i>
                    </button>
                </form>
                
                   
                </div>
                <div class="table-data__tool-right">
                <div class="rs-select2--light rs-select2--sm">
                        <select class="js-select2" name="time">
                            <option selected="selected">Today</option>
                            <option value="">3 Days</option>
                            <option value="">1 Week</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                    </div>
                    <div class="rs-select2--dark rs-select2--sm rs-select2--dark2">
                    <button class="au-btn-filter">
                        <i class="zmdi zmdi-filter-list"></i>filters</button>
                    </div>
                </div>
            </div>
            <div class="table-responsive table-responsive-data">
               {
                   this.state.isLoading ? <h2>Loading...</h2> :<Component data={this.state.data} rerenderData={this.rerenderData}/>
               }
            </div>
        </div>
    </div>
            )
        }
    }
}

export default withListAllService;