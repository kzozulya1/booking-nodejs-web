import React, {Component} from 'react';
import { connect } from 'react-redux'
import RoomComponent from '../rooms/room';
import FormButtonComponent from "../common/form_field/button";
import { NavLink, withRouter } from 'react-router-dom';
import {MY_OBJECTS_CREATE_ROUTE} from '../../routes';
var shortid = require('shortid');
import Helmet from "react-helmet";

import './styles.scss';

/**
 * My objects
 */
class MyObjectsComponent extends Component {

    /*
    * Constructor
    */
    constructor(props){
        super(props)
       
        this.state = {
            isNewMode: false
        }
    }
    /**
     * Template for Create new object
     */
    newObjectButtonTemplate(){
        return( <div className="new-object-btn-wrapper">
                   <NavLink key={Math.random()}activeClassName='selectedMenu' to={MY_OBJECTS_CREATE_ROUTE}>
                        <FormButtonComponent ref="new-object-btn" label="Create new apartment object"/>
                   </NavLink>
                </div>);
    }

    /*
    *  Render component
    */
    render(){
        return (
                <div className="my-objects-wrapper">
                    <Helmet>
                        <title>My Objects</title>
                        <meta name="description" content="Manage apartment objects" />
                    </Helmet>
                    <div className="page-title">
                        <div>
                            {(!this.props.loggedinUser.rooms || !this.props.loggedinUser.rooms.length) ?
                               <div>
                                   <h3>You have no any registered apartment objects at the moment</h3>
                                   <br />
                               </div>
                            :
                                <div>
                                    <h2>Your apartment objects</h2>
                                    <br />
                                </div>
                            }
                        </div>
                    </div>

                    {this.newObjectButtonTemplate()}
                    
                    <div className="my-objects">
                        {this.props.loggedinUser.rooms &&
                            this.props.loggedinUser.rooms.map(aRoom =>
                                <RoomComponent key={shortid.generate()} showEditRemoveControls={true} showViewMore={false} dataObject={aRoom} />
                            )
                            }
                    </div>
                    
                </div>
           );
    }
}

//Map global state objects to component:
const mapStateToProps = state => ({
    loggedinUser: state.loggedinUser
})

export default withRouter(connect(mapStateToProps)(MyObjectsComponent))