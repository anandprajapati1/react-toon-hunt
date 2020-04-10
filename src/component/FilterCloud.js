import React from 'react';

const FilterCloud = ({ filters, onFilterRemoved }) => {
    return (
        <div className="filter-cloud">
            <ul>
                {filters.map((f, i) => {
                    if (f.key) {
                        return f.value.map(v => <li className="filter-item" key={`${i}_${v}`}>
                            <button class="btn btn-outline-success btn-sm" title={`Remove filter: ${v}`}
                                onClick={() => { onFilterRemoved([{ key: f.key, value: [v] }]); return false; }}>{v}</button>
                        </li>)
                    }
                })}
            </ul>
            <style jsx="true">{`
                .filter-cloud ul li{
                    display: inline-block;
                }
                .filter-cloud li button {
                    margin-right: 10px;
                }
            `}</style>
        </div>
    );
}

export default FilterCloud;