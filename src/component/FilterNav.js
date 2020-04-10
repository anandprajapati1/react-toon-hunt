import React, { useState } from "react";
// import { connect } from "react-redux";
// import { changeFilter, removeFilter } from "../redux/actions";

const FilterNav = ({ filterList, onFilterChanged, onFilterRemoved }) => {

    let filterState = { key: filterList.filterType, value: filterList.list.map(x => ({ checked: false, value: x })) };
    // let filterState = useState({ key: filterList.filterType, value: filterList.list.map(x => ({ checked: false, value: x })) });
    console.log('hii', filterList);

    return (
        <div className="filter-box">
            <h3>{filterState.key}</h3>
            <ul>
                {filterState.value.map(f => <li key={filterState.key + "_" + f.value}>
                    <label>
                        <input type="checkbox" name={filterState.key + "_" + f.value} onChange={(e) => {
                            f.checked = e.target.checked;
                            if (e.target.checked) {
                                onFilterChanged([{ key: filterState.key, value: [f.value] }])
                            } else {
                                onFilterRemoved([{ key: filterState.key, value: [f.value] }])
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

// const mapDispatchToProps = dispatch => ({
//     filterChanged: _filterPar => dispatch(changeFilter(_filterPar)),
//     filterRemoved: _filterPar => dispatch(removeFilter(_filterPar))
// })
// export default connect(null, mapDispatchToProps)(FilterNav);
export default FilterNav;