import React from 'react';
import Toon from './Toon';
// import { connect } from 'react-redux';

export class ToonList extends React.Component {
    render() {
        return (
            <div className="toon-list-wrapper row">
                {this.props.toonsData.map(t => <Toon className="toon-item col-md-3 col-sm-6" toonData={t} key={t.id} />)}

                <style jsx="true">{`
                .toon-list-wrapper {
                    padding: 15px;
                    box-sizing: border-box;
                    background: #1f1f1f;
                }
    
                .toon-list-wrapper>.toon-item {
                }
    
                @media screen and (min-width: 992px) {
                    .toon-list-wrapper>.toon-item {
                    }
                }
            `}</style>
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     toonsData: state.listReducer
// })

// export default connect(mapStateToProps)(ToonList)
export default ToonList;