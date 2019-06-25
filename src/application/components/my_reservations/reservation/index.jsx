import React, {Component} from 'react';
import { connect } from 'react-redux'
import RoomComponent from "../../rooms/room";
import FormButtonComponent from "../../common/form_field/button";
var shortid = require('shortid');
import api from '../../../api';
import { getMeDataAction } from '../../../actions/ActionCreator';

import './styles.scss';

/**
 * Reservation component
 */
class ReservationComponent extends Component {
    /*
    * Constructor
    */
    constructor(props){
        super(props)
        this.state = {
            showViewMore: true,
            roomChildComponent: '',
            showViewMoreContent: false
        }

        this.onShowViewMoreClick = this.onShowViewMoreClick.bind(this)
        this.onRemoveClick = this.onRemoveClick.bind(this)
        this.onShowViewMoreMouseOut = this.onShowViewMoreMouseOut.bind(this)

    }

    /**
     * Cancel reservation
     */
    onRemoveClick(){
        if (confirm("Are you sure?")){
            api.cancelReservation(this.props.data.id, this.props.userToken).then(
                ()=> {
                    getMeDataAction(this.props.dispatch,this.props.userToken);
                }
            )
        }
    }

    /**
     * Show view more click
     */
    onShowViewMoreClick() {
        api.getRoomById(this.props.data.room_id).then(
            ({data})=> {
                    this.setState({
                        roomChildComponent: <RoomComponent key={shortid.generate()} showViewMore={false} dataObject={data}  />,
                        showViewMoreContent: true
                    })
            }
        )
    }

    /**
     * When mouse leaves the show view more
     */
    onShowViewMoreMouseOut() {
        this.setState({
            showViewMoreContent: false
        });
    }

    /*
    *  Render component
    */
    render(){
        return (
                <div className="reservation">
                    <div className="head row">
                        <span>Created at: <span className="emphasized">{this.props.data.created_at}</span></span>
                            <span onClick={this.onRemoveClick} className="remove">
                                <span className="tooltiptext">Cancel your reservation</span>
                            </span>
                    </div>

                    <div className="from row">
                        <span>Book from: <span className="emphasized">{this.props.data.book_from}</span></span>
                    </div>

                    <div className="from row">
                        <span>Book to: <span className="emphasized">{this.props.data.book_to}</span></span>
                    </div>

                    <div className="notes row">
                        { this.props.data.notes &&
                       <span>Your wishes: <span className="emphasized">{this.props.data.notes}</span></span>
                        }
                    </div>

                    <div className="reservation-view-more-wrapper">

                        {this.state.showViewMore ?
                            (<div className="viewMore">
                                <br /><a href="javascript:void(0)" onMouseOver={this.onShowViewMoreClick} onClick={this.onShowViewMoreClick} onMouseOut={this.onShowViewMoreMouseOut} >View apartment details...</a>
                        </div>)
                        : ''
                        }

                        <div className={'room-info ' + (this.state.showViewMoreContent ? '' : 'room-info-hide') }>
                            {this.state.roomChildComponent}
                        </div>
                    </div>
                </div>
         );
    }
}

export default ReservationComponent;