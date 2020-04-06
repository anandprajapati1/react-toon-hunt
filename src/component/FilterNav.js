import React, { Component } from "react";

class FilterNav extends Component {

    render() {
        let filterData = this.props.filterList;

        return (
            <div className="filter-box">
                <h3>{filterData.filterType}</h3>
                <ul>
                    {filterData.list.map(f => <li key={filterData.filterType + "_" + f}>
                        <label>
                            <input type="checkbox" />{f}
                        </label>
                    </li>)}
                </ul>

                <style jsx="true">{`
                    .filter-box {
                        background: rgba(255,255,255,0.5);
                    }
                `}</style>
            </div>
        )
    }
}

export default FilterNav;