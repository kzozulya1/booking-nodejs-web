import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import MenuComponent from '../menu';
import LogoComponent from '../logo';
import AuthComponent from '../auth';
import AlertBox from '../common/alert';
import routes, {ROOM_VIEW_ROUTE,ROOMS_ROUTE,MY_ACCOUNT_ROUTE,MY_OBJECTS_ROUTE,MY_RESERVATIONS_ROUTE,REGISTER_ROUTE,LOGIN_ROUTE} from '../../routes';
import { pushUserTokenAction } from "../../actions/ActionCreator";
import {JWT_LOCAL_STORAGE_KEY} from '../../etc/const';
import '../common/styles/reset.css';
import './styles.scss';

/**
 * Main app component
 */
class AppComponent extends Component {

    /*
     * Constructor
     */
    constructor(props){
        super(props)
        this.state = {
            contentVisibility: true
        }
        this.onContentVisibilityToggle = this.onContentVisibilityToggle.bind(this)
    }
    //When click on toggler in menu
    onContentVisibilityToggle(){
        this.setState({
            contentVisibility: !this.state.contentVisibility
        })
    }


    /**
     * After component is loaded, check if local storage has jwt. If yes then add it to store
     * JWT is stored in local browser storage after register/login
     */
    componentDidMount() {
        let jwt = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
        if (jwt){
            this.props.pushUserTokenAction(jwt);
        }
    }

    /*
    *  Render main app
    */
    render(){
        return (
            <div className="main-container">
                <div className="header">
                    <div className="container">
                        <div className="wrapper">
                            <LogoComponent />
                            <MenuComponent onContentVisibilityToggle={this.onContentVisibilityToggle} />
                            <AuthComponent />
                        </div>
                    </div>
                </div>
                <div className={'content' + (!this.state.contentVisibility ? ' hidden' : '')}>
                    <div className="container">
                        <div className="wrapper">
                            <Switch>
                                { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                                { <Redirect to={ROOMS_ROUTE} /> }
                            </Switch>
                        </div>
                    </div>
                </div>
                <AlertBox />
                <div className="footer">
                    <span>Copyright &copy; 2018-2019 Lucky Booking ™. All rights reserved.</span>
                </div>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    pushUserTokenAction: (userToken) => dispatch(pushUserTokenAction(userToken))
})

const mapStateToProps = state => ({
  loggedinUser: state.loggedinUser,
  userToken: state.userToken
})

//with router is need because app componet is used with redux and connect
//proof:  https://reacttraining.com/react-router/web/guides/redux-integration
// solution: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AppComponent))