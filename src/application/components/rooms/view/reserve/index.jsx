import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { lastAlertUpdateAction,createReservationAction } from "../../../../actions/ActionCreator";
import FormButtonComponent from "../../../common/form_field/button";
import {MY_RESERVATIONS_ROUTE} from '../../../../routes';
import DayPicker from 'react-day-picker';
import FormTextComponent from "../../../common/form_field/text";
import 'react-day-picker/lib/style.css';
import './styles.scss';

/**
 * Room reserve
 */
class RoomReserveComponent extends Component {
   /*
   * Constructor
   */
    constructor(props){
        super(props)
        this.state = {
            room: {},
            room_owner: {},
            room_owner_rooms_count:0,
            date_from: '',
            date_to: '',
            wishes: ''
        }

        this.onReserveClick = this.onReserveClick.bind(this)
        this.handleDateFromClick = this.handleDateFromClick.bind(this)
        this.handleDateToClick = this.handleDateToClick.bind(this)
        this.updateStateKey = this.updateStateKey.bind(this)
    }

/**
     * Update state object key
     * @param {*} key 
     * @param {*} value 
     */
    updateStateKey(key, value){
        this.setState({[key]: value})
    }

    /**
     * Date from click handler
     */
    handleDateFromClick(day, { selected }) {
        this.refs.dayfrompickerwrapper.classList.remove('day-picker-red-border');
        this.setState({
            date_from: selected ? undefined : day,
        });
    }

    /**
     * Date to click handler
     */
    handleDateToClick(day, { selected }) {
        this.refs.daytopickerwrapper.classList.remove('day-picker-red-border');
        this.setState({
            date_to: selected ? undefined : day,
        });
    }

    /**
     * On Reserve button click - validations
     */
    onReserveClick(){
        let dateFrom = new Date(this.state.date_from)
        let dateTo = new Date(this.state.date_to)
        let wishes = this.state.wishes
        let now = new Date()
        
        var error=[];

        if (dateFrom < now){
            error.push("Check in date must be greater than now")
        }
        if (dateTo < now){
            error.push("Check out date must be greater than now");
        }
        if (dateFrom >= dateTo ){
            error.push("Check out date must be greater than Check-in date")
        }
        if (!this.state.date_from){
            this.refs.dayfrompickerwrapper.classList.add('day-picker-red-border');
        }
        if (!this.state.date_to){
            this.refs.daytopickerwrapper.classList.add('day-picker-red-border');
        }
        
        if (error.length){
            this.props.lastAlertUpdateAction({type:"error", msg:error.join(" and ")});
        }else{
            let postData = {
                book_from: this._formatDateForApi(dateFrom),
                book_to: this._formatDateForApi(dateTo),
                notes: wishes /*this.refs.notes.value*/
            }

            this.props.createReservationAction(this.props.room_id,this.props.userToken, postData)
                .then(() => {
                    this.props.history.push(MY_RESERVATIONS_ROUTE);
                })
                .catch((e) => { /*error occur  - stay here, no redirect*/ }
                );
        }        
    }

    /**
     * Prepare correct date format for API
     */
    _formatDateForApi(date){
        console.log("Date is " + date.toLocaleDateString())
        
        let dateArray = date.toLocaleDateString().split('.');
        return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0] + ' 00:00:00'
    }

    /*
    *  Render component
    */
    render(){
        return (
            <div className="room-reservation">

                <div className="check-in-date">
                    <span className="label">Check in date:</span>
                    <div className="picker">
                        <span>{this.state.date_from ? this.state.date_from.toLocaleDateString() : 'Please select a date'}</span>
                    </div><br />
                    
                    <div key="checkin_date" ref="dayfrompickerwrapper">
                        <DayPicker key="checkin_date_picker" showOutsideDays selectedDays={this.state.date_from} ref="datefrompicker" onDayClick={this.handleDateFromClick} />
                    </div>                    
                </div>
                
                <div className="check-out-date">
                    <span className="label">Check out date:</span>
                    <div className="picker">
                        <span >{this.state.date_to ? this.state.date_to.toLocaleDateString() : 'Please select a date'}</span>
                    </div><br />
                    <div key="checkout_date" ref="daytopickerwrapper">
                        <DayPicker key="checkout_date_picker"  showOutsideDays selectedDays={this.state.date_to} ref="datetopicker" onDayClick={this.handleDateToClick} />
                    </div>
                </div>
                
                <div className="notes">
                    <p className="label">Your wishes:</p>
                    <FormTextComponent ref="notes" key="notes_txt" autoFocus={true}  type="textarea" rows="5" objectKey="wishes" defaultValue={this.state.wishes || ''} onUpdateCallback={this.updateStateKey} placeholder="You can place here all your wishes and desires related apartments" />
                </div>
                
                <FormButtonComponent key="reserve_btn" ref="reservebtn"  onClick={this.onReserveClick} label="Reserve"/>
                
            </div>
        );
    }
}

//Map action to component:
const mapDispatchToProps = dispatch => ({
lastAlertUpdateAction: (alert) => dispatch(lastAlertUpdateAction(alert)),
createReservationAction: (roomId,userToken,data) => dispatch(createReservationAction(roomId,userToken,data))
})

//Map global state objects to component:
const mapStateToProps = state => ({
    userToken: state.userToken
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomReserveComponent));