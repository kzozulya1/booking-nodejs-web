import React, {Component} from 'react';
import { connect } from 'react-redux'
import './styles.scss';
import {ALERT_UPDATE} from '../../../actions/ActionType'

/**
 * Alert component
 */
class AlertBox extends Component {
     /*
     * Constructor
     */
     constructor(props){
        super(props)
        this.clearLastAlert = this.clearLastAlert.bind(this)
    }
    
     /*
     * Clear last alert
     */
    clearLastAlert(){
        this.props.dispatch({type: ALERT_UPDATE , alert:{type: "",msg: ""}})
    }

    /*
    *  Render component
    */
    render(){
        return (
              <div className={'last-alert-box' + (this.props.lastAlert.msg ? '' : ' hidden-box')}>
                <p className={this.props.lastAlert.type}>{this.props.lastAlert.msg}</p>
                <button className="OKbtn" onClick={this.clearLastAlert}>OK</button>
              </div>
           );
    }
}

const mapStateToProps = state => ({
  lastAlert: state.lastAlert
})

 
export default connect(mapStateToProps)(AlertBox);
