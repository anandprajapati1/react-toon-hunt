import React, { useState } from "react";
import { connect } from "react-redux";
import { searchQuery } from "../redux/actions";

const FilterForm = ({querySubmitted}) => {
    //>> Create state with name inputValue
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="form">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search by name"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    aria-label="Search by name" aria-describedby="button-addon" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={() => {
                        querySubmitted(inputValue)
                        // setInputValue('');
                    }} id="button-addon">Search</button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    querySubmitted: text => dispatch(searchQuery(text))
})
export default connect(null, mapDispatchToProps)(FilterForm);