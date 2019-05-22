import React, {Component} from 'react';
import { connect } from 'react-redux'
import RoomComponent from '../../rooms/room';
import {MY_OBJECTS_ROUTE} from '../../../routes';
import Helmet from "react-helmet";
var shortid = require('shortid');
import './styles.scss';

/**
 * Create new my object
 */
class MyObjectCreateComponent extends Component {

    /*
    * Constructor
    */
    constructor(props){
        super(props)
        this.onCreateRoom = this.onCreateRoom.bind(this)
    }
    
    /**
     * Toggle new room mode
     */
    
     onCreateRoom(){
        //Need some time for store data sync
        setTimeout(() => this.props.history.push(MY_OBJECTS_ROUTE), 300)
    }
    

    /*
    *  Render component
    */
    render(){
        return (
                <div className="my-objects-wrapper">
                    <Helmet>
                        <title>Register new object</title>
                        <meta name="description" content="Manage objects for booking" />
                    </Helmet>
                    <div className="page-title">
                        <div>
                            <h2>Register new object</h2><br />
                        </div>
                    </div>
                    <div className="new-object-form-wrapper">
                        <RoomComponent key={shortid.generate()} onCreateHandler={this.onCreateRoom} showViewMore={false} dataObject={{}} isNewMode={true}/>
                    </div>
                </div>
           );
    }
}
//Map global state objects to component:
const mapStateToProps = state => ({
    loggedinUser: state.loggedinUser
})

export default connect(mapStateToProps)(MyObjectCreateComponent);