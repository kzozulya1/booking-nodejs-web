import React, {Component} from 'react';
import { connect } from 'react-redux'
import './styles.scss';
import ReservationComponent from "./reservation"
import {dateConvert, applyDateFormatting} from '../../helper/date_convert';
import Helmet from "react-helmet";

class MyReservationsComponent extends Component {

    /*
    * Constructor
    */
    constructor(props){
        super(props)
        this.state = {
            showViewMore: true,
            roomChildComponent: ''
        }
    }

    /*
    *  Render component
    */
    render(){
        let hasReservations =  this.props.loggedinUser.reservations && this.props.loggedinUser.reservations.length
        if (hasReservations){
            var reservations = this.props.loggedinUser.reservations.map(aReservation => {
                aReservation.created_at = dateConvert(aReservation.created_at)
                aReservation.book_from = dateConvert(aReservation.book_from)
                aReservation.book_to = dateConvert(aReservation.book_to)
                return aReservation
            })
        }
            
        return (
            <div className="reservations-wrapper">
                <Helmet>
                    <title>My Reservations</title>
                    <meta name="description" content="Manage reservations" />
                </Helmet>
                
                <div className="page-title">
                    {hasReservations ?
                        <h2>Your apartment reservations</h2>
                    :
                        <h3>You have no any reservations at the moment</h3>
                    }
                </div>
                
                {hasReservations ?
                    <div className="all-reservations">
                        {reservations.map(aReservation => 
                            <ReservationComponent dispatch={this.props.dispatch} userToken={this.props.userToken} data={aReservation} />
                        )}
                    </div>
                    : ''
                }


            </div>
           );
    }
}

const mapStateToProps = state => ({
    loggedinUser: state.loggedinUser,
    userToken: state.userToken
})

export default connect(mapStateToProps)(MyReservationsComponent);