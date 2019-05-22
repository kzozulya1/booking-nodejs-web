import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import FormTextComponent from '../../common/form_field/text';
import { registerAction } from '../../../actions/ActionCreator'
import {ROOMS_ROUTE} from '../../../routes';
import Helmet from "react-helmet";
import './styles.scss';

/**
 * User register component
 */
class AuthRegisterComponent extends Component {
     /*
     * Constructor
     */
     constructor(props){
        super(props)
        this.state = {
            name: null,
            login: null,
            password: null,
            password2: null,
            formValidationError: ''
        } 
        this.onRegisterClick = this.onRegisterClick.bind(this)
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
            if (ref == "password2") {
                if(!this.refs["password2"].validate(this.state.password)){
                    result = false;
                }
            }else if(!this.refs[ref].validate()){
                result = false;
            }
        }
        return result
    }

    /*
     * On register btn click
     */
    onRegisterClick(e){
        if (this.validateForm()){
            var data = {
                name: this.state.name,//this.refs.name.getValue(),
                email: this.state.login, //this.refs.email.getValue(),
                password: this.state.password//this.refs.password.getValue()
            } 
            
            this.props.registerAction(data)
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
              <div className="auth-register-wrapper">
                <Helmet>
                    <title>Sign Up</title>
                    <meta name="description" content="Register new account" />
                </Helmet>
                <div className="auth-register">
                    <h3>First time on Lucky Booking?</h3>
                    <h2>At once registration</h2>
                    <FormTextComponent key="name_txt" objectKey="name" onUpdateCallback={this.updateStateKey}  defaultValue={this.state.name || ''}  type="text" validationRule="noEmpty" failMsg='Please type your name' ref="name"placeholder="Your name" />
                    <FormTextComponent key="login_txt" objectKey="login" onUpdateCallback={this.updateStateKey}  defaultValue={this.state.login || ''}  type="text" validationRule="email" failMsg='Please type correct email' ref="email" placeholder="Your email" />
                    <FormTextComponent key="password_txt" objectKey="password" onUpdateCallback={this.updateStateKey} type="password" validationRule="noEmpty" failMsg='Please type your password' ref="password" placeholder="Password"/>
                    <FormTextComponent key="password2_txt" type="password" objectKey="password2"  onUpdateCallback={this.updateStateKey} validationRule="noEmptyAndPasswordAreEq" failMsg='Please type your passwords are equal' ref="password2" placeholder="Confirm Password "/>

                    <div id="register-btn" onClick={this.onRegisterClick}>Sign up</div>
                </div>
              </div>
           );
    }
}

//Map action to component:
 const mapDispatchToProps = dispatch => ({
  registerAction: (data) => dispatch(registerAction(data))
}) 
//Map global state objects to component:
const mapStateToProps = state => ({
  i18n: state.i18nLocale
})
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRegisterComponent));