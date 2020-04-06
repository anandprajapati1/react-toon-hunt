import React from 'react';

export default class Toon extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {fetchedDate: new Date()};
    // }
    
    formatDate(d) {
        let timespan = (Date.now() - new Date(d)) / (1000 * 60 * 60 * 24);    // in days
        let formattedDate = "";

        if (timespan > 365) {
            formattedDate += parseInt(timespan / 365, 10) + "years ";
            timespan = timespan % 365;
        }
        if (timespan > 30) {
            formattedDate += parseInt(timespan / 30, 10) + "months ";
            timespan = timespan % 30;
        }
        return formattedDate + "ago";
    }

    render() {
        const toonData = this.props.toonData;
        return (
            <div className={"toon-item " + this.props.className}>
                <div className="toon-item-container">
                    <figure className={"toon-item-image"}>
                        <img src={toonData.image} />
                        <figcaption>
                            <h3 className={"toon-item-name"}>{toonData.name}</h3>
                            <span>
                                {`id: ${toonData.id} - created ${this.formatDate(toonData.created)}`}
                            </span>
                        </figcaption>
                    </figure>
                    <div className={"toon-item-detail"}>
                        <ul>
                            <li>
                                <span className="label">Status</span>
                                <span className="value">{toonData.status}</span>
                            </li>
                            <li>
                                <span className="label">Species</span>
                                <span className="value">{toonData.species}</span>
                            </li>
                            <li>
                                <span className="label">Gender</span>
                                <span className="value">{toonData.gender}</span>
                            </li>
                            <li>
                                <span className="label">Origin</span>
                                <span className="value">{toonData.origin.name}</span>
                            </li>
                            <li>
                                <span className="label">Last location</span>
                                <span className="value">{toonData.location.name}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <style jsx="true">{`
                    .toon-item {
                        width: 50%;
                        flex: 0 0 50%;
                        padding: 10px;
                    }
                    .toon-item-container {
                        border-radius: 4px;
                        background: #2d2d2d;
                        overflow: hidden;
                    }
                    .toon-item-image {
                        min-height: 220px;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        position: relative;
                    }
                    .toon-item-image figcaption {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: rgba(0,0,0,0.6);
                        color: #dcdcdc;
                        padding: 10px;
                        box-sizing: border-box;
                        font-size: .8rem;
                    }
                    .toon-item-name {
                        margin: 0 0 5px;
                    }
                    .toon-item-detail {
                        padding: 25px 15px;
                    }
                    img {
                        max-width: 100%;
                    }
                    .toon-item-detail ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    @media (min-width: 992px) {
                        .toon-item {
                            width: 25%;
                            flex: 0 0 25%;
                        }
                    }
                    .toon-item-detail li {
                        border-bottom: 1px solid lightgray;
                        padding: 10px 0;
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
                        font-size: .9rem;
                    }
                    .toon-item-detail .label {
                        text-transform: uppercase;
                        color: #dcdcdc;
                    }
                    .toon-item-detail .value {
                        text-transform: capitalize;
                        color: #866b0c;
                        text-align: right;
                    }
                `}</style>
            </div>
        )
    }
}