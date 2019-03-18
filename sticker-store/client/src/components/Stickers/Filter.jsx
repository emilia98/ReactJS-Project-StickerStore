import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import '../../styles/stickers.css';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stickers: [],
            isLoading: true
        }
    }

    render() {
        return (
            <main class="cd-main-content">
		<div class="cd-tab-filter-wrapper">
			<div class="cd-tab-filter">
				<ul class="cd-filters">
					<li class="placeholder"> 
						<a data-type="all" href="#0">All</a> 
					</li> 
					<li class="filter"><a class="selected" href="#0" data-type="all">All</a></li>
					<li class="filter" data-filter=".color-1"><a href="#0" data-type="color-1">Color 1</a></li>
					<li class="filter" data-filter=".color-2"><a href="#0" data-type="color-2">Color 2</a></li>
				</ul>
			</div>
		</div>

		<section class="cd-gallery">
			
			<div class="cd-fail-message">No results found</div>
		</section> 

		<div class="cd-filter">
			<form>
				<div class="cd-filter-block">
					<h4>Search</h4>
					
					<div class="cd-filter-content">
						<input type="search" placeholder="Try color-1..." />
					</div>
				</div>

				<div class="cd-filter-block">
					<h4>Check boxes</h4>

					<ul class="cd-filter-content cd-filters list">
						<li>
							<input class="filter" data-filter=".check1" type="checkbox" id="checkbox1" />
			    			<label class="checkbox-label" for="checkbox1">Option 1</label>
						</li>

						<li>
							<input class="filter" data-filter=".check2" type="checkbox" id="checkbox2" />
							<label class="checkbox-label" for="checkbox2">Option 2</label>
						</li>

						<li>
							<input class="filter" data-filter=".check3" type="checkbox" id="checkbox3" />
							<label class="checkbox-label" for="checkbox3">Option 3</label>
						</li>
					</ul> 
				</div> 

				<div class="cd-filter-block">
					<h4>Select</h4>
					
					<div class="cd-filter-content">
						<div class="cd-select cd-filters">
							<select class="filter" name="selectThis" id="selectThis">
								<option value="">Choose an option</option>
								<option value=".option1">Option 1</option>
								<option value=".option2">Option 2</option>
								<option value=".option3">Option 3</option>
								<option value=".option4">Option 4</option>
							</select>
						</div> 
					</div> 
				</div> 

				<div class="cd-filter-block">
					<h4>Radio buttons</h4>

					<ul class="cd-filter-content cd-filters list">
						<li>
							<input class="filter" data-filter="" type="radio" name="radioButton" id="radio1" checked />
							<label class="radio-label" for="radio1">All</label>
						</li>

						<li>
							<input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2" />
							<label class="radio-label" for="radio2">Choice 2</label>
						</li>

						<li>
							<input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3" />
							<label class="radio-label" for="radio3">Choice 3</label>
						</li>
					</ul>
				</div> 
			</form>

			<a href="#0" class="cd-close">Close</a>
		</div>

		<a href="#0" class="cd-filter-trigger">Filters</a>
	</main>
        )
    }
}

export default Filter;
