import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {ROOMS_ROUTE,MY_ACCOUNT_ROUTE,MY_OBJECTS_ROUTE,MY_RESERVATIONS_ROUTE} from '../../routes';
import './styles.scss';

/**
 * Menu component
 */
class MenuComponent extends Component {

    /*
     * Constructor
     */
    constructor(props){
        super(props)
        this.state = {
            menuVisibility: false,
            menuItemClickFlag: false
        }

        this.onTogglerClick = this.onTogglerClick.bind(this)
        this.onMobileMenuItemClick = this.onMobileMenuItemClick.bind(this)

    }
    
    /*
     * Click handle on toggler sandwich
     */
    onTogglerClick(){
        this.setState({
            menuVisibility: !this.state.menuVisibility
        })

        this.props.onContentVisibilityToggle();
    }

    /*
     * When click at toggle in mobile repesentation
     */
    onMobileMenuItemClick(){
        if (this.state.menuVisibility){
            this.onTogglerClick()
        }
    }

    /*
    *  Render component
    */
    render(){
        return (

            <div className="menuWrapper">
                <div onClick={this.onTogglerClick} className={'mobileToggler' + (this.state.menuVisibility ? ' active' : '')}>
                    <span />
                    <span />
                    <span />
                </div>

                <div className={'menu' + (this.state.menuVisibility ? ' active' : '')}>
                    {this.props.userToken &&
                     <ul>
                        <li className='rooms'>
                          <NavLink onClick={this.onMobileMenuItemClick} activeClassName='selectedMenu' to={ROOMS_ROUTE}>{'All Apartments!'}</NavLink>
                        </li>
                        <li className={'account' + (this.props.userToken ? '' : ' hidden')} >
                            <NavLink onClick={this.onMobileMenuItemClick} activeClassName='selectedMenu' to={MY_ACCOUNT_ROUTE}>{'My Account'}</NavLink>
                        </li>
                        <li className={'reservations' + (this.props.userToken ? '' : ' hidden')}>
                            <NavLink onClick={this.onMobileMenuItemClick} activeClassName='selectedMenu' to={MY_RESERVATIONS_ROUTE}>{'My Reservations' + (this.props.loggedinUser.reservations && this.props.loggedinUser.reservations.length ? '('+ this.props.loggedinUser.reservations.length.toString(10)+')' : '(0)')}</NavLink>
                        </li>
                        <li className={'objects' + (this.props.userToken ? '' : ' hidden')}>
                        <NavLink onClick={this.onMobileMenuItemClick} activeClassName='selectedMenu' to={MY_OBJECTS_ROUTE}>{'My Arartment Objects' + (this.props.loggedinUser.rooms && this.props.loggedinUser.rooms.length ? '('+ this.props.loggedinUser.rooms.length.toString(10)+')' : '(0)') }</NavLink>
                        </li>
                     </ul>
                    }
                </div>
            </div>
           );
    }
}

const mapStateToProps = state => ({
  loggedinUser: state.loggedinUser,
  userToken: state.userToken
})
export default withRouter(connect(mapStateToProps)(MenuComponent))