import React, {Component} from 'react';
import { connect } from 'react-redux'
import RoomComponent from './room';
import { getRoomsFirstBatchAction } from '../../actions/ActionCreator'
import './styles.scss';
import Helmet from "react-helmet";
var shortid = require('shortid');


class RoomsComponent extends Component {
    
    /*
     * When navigated in SPA after Server rendered another landing page
     * Before component would be rendered
     */
    componentDidMount(){
        if ( this.props.rooms.length <= 0 ) {
            this.props.getRoomsFirstBatchAction()
        }
    } 

    /*
    *  Render component
    */
    render(){
        const {rooms} = this.props
        return (
              <div className="rooms-wrapper">
                  
                  <Helmet>
                    <title>Apartments</title>
                    <meta name="description" content="Book rooms in all over the world" />
                  </Helmet>
                  
                  <div className="page-title">
                    <h2>Apartments for booking</h2><br />
                  </div>
                  
                  {!this.props.userToken &&
                    <div className="guest-warning">
                        <span>In order to make reservations you should be logged in</span><br />
                     </div>
                  }
                  
                  <div className="all-rooms">
                        {rooms.map(aRoom =>
                           <RoomComponent key={shortid.generate()}  showViewMore={this.props.userToken ? true : false} dataObject={aRoom} />
                        )}
                  </div>
              </div>
           );
    }
}

RoomsComponent.serverPrefetch = getRoomsFirstBatchAction; // static declaration of data requirements

//Map action to component:
const mapDispatchToProps = dispatch => ({
  getRoomsFirstBatchAction: () => dispatch(getRoomsFirstBatchAction())
})


//Map global state objects to component:
const mapStateToProps = state => ({
  rooms: state.rooms,
  i18n: state.i18nLocale,
  userToken: state.userToken
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoomsComponent);