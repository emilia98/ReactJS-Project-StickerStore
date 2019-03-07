import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => (

    <div class="row">
        <div class="page-header">
            <h1>Categories</h1>
            <Link to="/category/create" class="au-btn au-btn-icon au-btn--green au-btn--small">
                <i class="zmdi zmdi-plus"></i>add item</Link>
        </div>

        <div class="col-md-12">
            <div class="table-data__tool">
                
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
            <div class="table-responsive table-responsive-data2">
                <table class="table table-data2">
                    <thead>
                        <tr>
                            <th>
                                <label class="au-checkbox">
                                    <input type="checkbox" />
                                    <span class="au-checkmark"></span>
                                </label>
                            </th>
                            <th>Category Title</th>
                            <th>Category SLug</th>
                            <th>Date</th>
                            <th>IsActive</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [1, 2, 3, 4].map((i) => <CategoryRow key={i} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)

const CategoryRow = (props) => (
    <React.Fragment>
        <tr class="tr-shadow">
            <td>
                <label class="au-checkbox">
                    <input type="checkbox" />
                    <span class="au-checkmark"></span>
                </label>
            </td>
            <td>Category Title</td>
            <td>
                <span class="block-email">Slug</span>
            </td>
            <td>CreationDate</td>
            <td>
                <span class="table-label table-label-danger">isActive</span>
            </td>
            <td>
                <div class="table-data-feature">
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                        <i class="zmdi zmdi-edit"></i>
                    </button>
                    <button class="item" data-toggle="tooltip" data-placement="top" title="Delete">
                        <i class="zmdi zmdi-delete"></i>
                    </button>
                </div>
            </td>
        </tr>
        <tr class="spacer"></tr>
    </React.Fragment>
)

export default Category;