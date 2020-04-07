import React, { useState } from "react";
import { connect } from "react-redux";
import { changeFilter, removeFilter } from "../redux/actions";

const FilterNav = ({ filterList, filterChanged, filterRemoved }) => {

    // const filterState = useState([{ key: "", value: [""] }]);
    const filterState = useState({ key: filterList.filterType, value: filterList.list.map(x => ({ checked: false, value: x })) });
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
                    padding: 15px;
                }
                .filter-box ul {
                    margin-bottom:0;
                    padding-bottom: 15px;
                    border-bottom: 1px solid gray;
                }
                .filter-box label {
                    margin-bottom: 0;
                    text-transform: capitalize;
                }
                .filter-box input[type=checkbox] {
                    margin: 5px 5px 5px 0;
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