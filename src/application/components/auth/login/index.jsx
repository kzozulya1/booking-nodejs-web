import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import api from '../../../api';
import FormTextComponent from '../../common/form_field/text';
import { loginAction } from '../../../actions/ActionCreator'
import {ROOMS_ROUTE} from '../../../routes';
import Helmet from "react-helmet";
var shortid = require('shortid');

import './styles.scss';

/**
 * Authenticate
 */
class AuthLoginComponent extends Component {
     /*
     * Constructor
     */
     constructor(props){
        super(props)
        this.state = {
            login: null,
            password: null,
            formValidationError: ''
        } 
        this.onLoginClick = this.onLoginClick.bind(this)
        this.validateForm = this.validateForm.bind(this)
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
    
    /*
     * Validate form
     */
    validateForm(){
        var result = true;
        for (var ref in this.refs) {
            if(!this.refs[ref].validate()){
                result = false;
            }
        }
        return result
    }

    /*
     * On login btn click
     */
    onLoginClick(e){
        if (this.validateForm()){
            var data = {
                email: this.state.login,
                password: this.state.password
            } 
            
            this.props.loginAction(data)
                .then(() => {
                        this.props.history.push(ROOMS_ROUTE);
                    })
                .catch((e) => { /*error occur  - stay here, no redirect*/ }
                );
        }
    }
    /*
    *  Render register form
    */
    render(){
        return (
              <div className="auth-login-wrapper">
                    <Helmet>
                        <title>Sign in</title>
                        <meta name="description" content="Sign-in" />
                    </Helmet>
                    <div className="auth-login">
                        <h3>Sign in</h3>
                        <FormTextComponent key="login_txt" objectKey="login" onUpdateCallback={this.updateStateKey}  defaultValue={this.state.login || ''} autoFocus={"login" == this.state.lastFocusedTextControl} type="text" validationRule="email" failMsg='Please type correct email' ref="email" placeholder="Your email" />
                        <FormTextComponent key="password_txt" objectKey="password" onUpdateCallback={this.updateStateKey}  defaultValue={this.state.password || ''} type="password" validationRule="noEmpty" failMsg='Please type your password' ref="password" placeholder="Password"/>
                        <div id="login-btn" onClick={this.onLoginClick}>Sign in</div>
                    </div>
              </div>
           );
    }
}

//Map action to component:
 const mapDispatchToProps = dispatch => ({
  loginAction: (data) => dispatch(loginAction(data))
}) 
//Map global state objects to component:
const mapStateToProps = state => ({
  i18n: state.i18nLocale
})
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLoginComponent));