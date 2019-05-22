import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import {REGISTER_ROUTE,LOGIN_ROUTE} from '../../routes';
import { logoutAction } from '../../actions/ActionCreator'
import {ROOMS_ROUTE} from '../../routes';
import './styles.scss'

class AuthComponent extends Component {
    /*
     * Constructor
     */
     constructor(props){
        super(props)
        this.onLogoutClick = this.onLogoutClick.bind(this)
    }
    
    /*
     * On Logout Click
     */
    onLogoutClick(){
        this.props.logoutAction();
        this.props.history.push(ROOMS_ROUTE);
    }
    
    
    /*
    *  Render component
    */
    render(){
        return (
            <div className="auth">
                <ul>
                    <li className={'user-name' + (this.props.userToken ? '' : ' hidden')} >
                        <span>Hello, {this.props.loggedinUser.name + '  '}</span>
                    </li>
                    <li className={'register' + (this.props.userToken ? ' hidden' : '')} >
                        <NavLink to={REGISTER_ROUTE}>{'Sign up'}</NavLink>
                    </li>
                    <li className={'login' + (this.props.userToken ? ' hidden' : '')}>
                        <NavLink to={LOGIN_ROUTE}>{'Sign in'}</NavLink>
                    </li>
                    
                    <li className={'logout' + (this.props.userToken ? '' : ' hidden')} >
                        <a href="javascript:void(0);" onClick={this.onLogoutClick}>Logout</a>
                    </li>

                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logoutAction())
}) 

const mapStateToProps = state => ({
  loggedinUser: state.loggedinUser,
  userToken: state.userToken
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthComponent))