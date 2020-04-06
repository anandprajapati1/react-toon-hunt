import React, { Component } from 'react';

class FilterCloud extends Component {
    render() {
        return (
            <div className="filter-cloud">
                <ul>
                    {this.props.filters.map((f, i) =>
                        <li className="filter-item" key={i}>
                            <a>{f.label}</a>
                        </li>
                    )}
                </ul>
                <style jsx="true">{`
                    .filter-cloud ul {
                        display: flex;
                    }
                    .filter-cloud li a{
                        background: rgba(255, 0, 255, 0.5);
                        padding: 5px 10px;
                        margin-right: 10px;
                    }
                
                `}</style>
            </div>
        );
    }
}

export default FilterCloud;