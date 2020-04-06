import React, { useState } from "react";
import { connect } from "react-redux";
import { changeFilter, removeFilter } from "../redux/actions";

const FilterNav = ({ filterList, filterChanged, filterRemoved }) => {

    // const filterState = useState([{ key: "", value: [""] }]);
    const filterState = useState({ key: filterList.filterType, value: filterList.list.map(x => { return { checked: false, value: x } }) });
    // console.log('hii', filterState[0]);

    return (
        <div className="filter-box">
            <h3>{filterState[0].key}</h3>
            <ul>
                {filterState[0].value.map(f => <li key={filterState[0].key + "_" + f.value}>
                    <label>
                        <input type="checkbox" name={filterState[0].key + "_" + f.value} onChange={(e) => {
                            f.checked = e.target.checked;
                            if (e.target.checked) {
                                filterChanged([{ key: filterState[0].key, value: [f.value] }])
                            } else {
                                filterRemoved([{ key: filterState[0].key, value: [f.value] }])
                            }
                        }} />{f.value}
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

const mapDispatchToProps = dispatch => ({
    filterChanged: _filterPar => dispatch(changeFilter(_filterPar)),
    filterRemoved: _filterPar => dispatch(removeFilter(_filterPar))
})
export default connect(null, mapDispatchToProps)(FilterNav);