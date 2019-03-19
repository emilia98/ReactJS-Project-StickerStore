import React, { Component, Fragment } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import '../../styles/css/style.css';


class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stickers: [],
			isLoading: true,
			isOpened: false,
			query: {
				searchByTitle: '',
				order: null
			},
			rerender: false
		}

		
		this.closeFilters = this.closeFilters.bind(this);
		this.openFilters = this.openFilters.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}
	
	shouldComponentUpdate(prevProps, prevState) {
		console.log(prevState);
		return prevState.rerender !== this.state.rerender;
	}

	handleOnChange(e) {
		let name = e.target.name;
		let value = e.target.value;
		let query = this.state.query;


	   if(this.state.query[name] !== undefined) {
		   query[name] = value;
		   this.setState({query})
	   }


		
	}
	

	closeFilters() {
		this.setState({ isOpened: false, rerender: !this.state.rerender});
	}

	openFilters() {
		this.setState({ isOpened: true, rerender: !this.state.rerender});
	}

	
    render() {
		console.log(this.state);
        return (
			
	<Fragment>
			<div className={this.state.isOpened ? "cd-filter filter-is-visible" : "cd-filter"} >
				<form>
					<div className="cd-filter-block">
						<h4>Search by Sticker Name</h4>
						
						<div className="cd-filter-content">
							<input type="search" name="searchByTitle" placeholder="By title" onChange={this.handleOnChange}/>
						</div>
					</div>
	
					<div className="cd-filter-block">
						<h4>Check boxes</h4>
	
						<ul className="cd-filter-content cd-filters list">
							<li>
								<input className="filter" data-filter=".check1" type="checkbox" id="checkbox1" />
								<label className="checkbox-label" for="checkbox1">Option 1</label>
							</li>
	
							<li>
								<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2" />
								<label className="checkbox-label" for="checkbox2">Option 2</label>
							</li>
	
							<li>
								<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3" />
								<label className="checkbox-label" for="checkbox3">Option 3</label>
							</li><li>
								<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3" />
								<label className="checkbox-label" for="checkbox3">Option 3</label>
							</li>
							<li>
								<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3" />
								<label className="checkbox-label" for="checkbox3">Option 3</label>
							</li>
						</ul>
					</div>
	
					<div className="cd-filter-block">
						<h4>Order By</h4>
						
						<div className="cd-filter-content">
							<div className="cd-select cd-filters">
								<select className="filter" name="order" id="selectThis" onChange={this.handleOnChange}>
								<option value="date">Date Added</option>
									<option value="name-asc">Name (A-Z)</option>
									
									<option value="name-desc">Name (Z-A)</option>
									<option value="price-asc">Price (lowest first)</option>
									<option value="price-desc">Price (highest first)</option>
									
								</select>
							</div>
						</div>
					</div>
	
					<div className="cd-filter-block">
						<h4>Radio buttons</h4>
	
						<ul className="cd-filter-content cd-filters list">
							<li>
								<input className="filter" data-filter="" type="radio" name="radioButton" id="radio1" checked />
								<label className="radio-label" for="radio1">All</label>
							</li>
	
							<li>
								<input className="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2" />
								<label className="radio-label" for="radio2">Choice 2</label>
							</li>
	
							<li>
								<input className="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3" />
								<label className="radio-label" for="radio3">Choice 3</label>
							</li>
						</ul>
					</div>

					<div>
						<button className="btn filter-btn">Submit</button>
						</div>
				</form>
	
				<button className="cd-close" onClick={this.closeFilters}>Close</button>
			</div> 
	
			<button className="cd-filter-trigger" onClick={this.openFilters}>Filters</button>
			</Fragment>
        )
    }
}

export default Filter;
