import React, {Component} from 'react';
import { connect } from 'react-redux'
import './styles.scss';
import {updateUserAction} from "../../actions/ActionCreator";
import FormTextComponent from "../common/form_field/text";
import FormButtonComponent from "../common/form_field/button";
import {ROOMS_ROUTE} from "../../routes";
import Helmet from "react-helmet";

/**
 * My Account Menu Component
 */
class MyAccountComponent extends Component {
    /*
    * Constructor
    */
    constructor(props){
        super(props)

        this.state = {
            name: props.loggedinUser.name,//and init in componentWillReceiveProps, because prop loggedinUser is send with connect() routine
            password: null,
            password2: null,

            formValidationError: '',
            showPasswordFields: false
        }
        this.onUpdateClick = this.onUpdateClick.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.togglePasswordFieldsVisibility = this.togglePasswordFieldsVisibility.bind(this)
        this.updateStateKey = this.updateStateKey.bind(this)

    }

    /**
     * Call when receive props, init name
     * @param {*} props 
     */
    componentWillReceiveProps(props){
        this.setState({name: props.loggedinUser.name})
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
     *  Toggle PasswordFieldsVisibility
     */
    togglePasswordFieldsVisibility(){
        this.setState({showPasswordFields: !this.state.showPasswordFields});
    }

    /*
     * Validate form
     */
    validateForm(){

        if (!this.refs.name.validate()) return false;
        if (this.state.showPasswordFields){
            if (!this.refs.password.validate()) return false;
            if (!this.refs.password2.validate(this.refs.password.getValue())) return false;
        }
        return true;
    }

    /*
     * On update btn click
     */
    onUpdateClick(e){
        if (this.validateForm()){
            var data = {
                name: this.refs.name.getValue()
            }
            if (this.state.showPasswordFields){
                data.password = this.refs.password.getValue();
            }
            this.props.updateUserAction(data,this.props.userToken)
                .then(() => {
                })
                .catch((e) => { /*error occur  - stay here, no redirect*/ }
                );
        }
    }

    /*
    *  Render component
    */
    render(){
        if (!this.props.loggedinUser.email){
            return (
                <div className="my-account-wrapper">
                    <span>You are not logged in.</span>
                </div>
            );
        }
        
        return (
            <div className="my-account-wrapper">
                
                <Helmet>
                    <title>My Account</title>
                    <meta name="description" content="Update Personal Information" />
                </Helmet>
                
                <div className="page-title">
                    <h2>Edit profile information</h2><br />
                </div>
                <div className="my-account">
                    <p  className="email">Email: <span>{this.props.loggedinUser.email}</span></p>
    
                    <FormTextComponent key="name_txt" defaultValue={this.state.name} objectKey="name" onUpdateCallback={this.updateStateKey} type="text" autoFocus={true} validationRule="noEmpty" failMsg='Please type correct name' ref="name" placeholder="Your Name" />
                    
                    <div className="change-pwd">
                        <input key="cb_change_pwd" defaultChecked={this.state.showPasswordFields} onClick={this.togglePasswordFieldsVisibility} type="checkbox" ref="changePassword" />
                        <label htmlFor='cb_change_pwd'>change password</label>
                    </div>
                    {this.state.showPasswordFields ? <FormTextComponent key="password_txt" type="password" objectKey="password" onUpdateCallback={this.updateStateKey} validationRule="noEmpty" failMsg='Please type your password' ref="password" placeholder="Password"/> : ''}
                    {this.state.showPasswordFields ? <FormTextComponent key="password2_txt" type="password" objectKey="password2" onUpdateCallback={this.updateStateKey} validationRule="noEmptyAndPasswordAreEq" failMsg='Please type your passwords are equal' ref="password2" placeholder="Password Confirm"/> : ''}

                    <FormButtonComponent key="upd_btn" onClick={this.onUpdateClick} label="Update"/>
                </div>
            </div>
           );
    }
}
 
//Map action to component:
const mapDispatchToProps = dispatch => ({
    updateUserAction: (data,userToken) => dispatch(updateUserAction(data,userToken))
})
//Map global state objects to component:
const mapStateToProps = state => ({
    loggedinUser: state.loggedinUser,
    userToken: state.userToken
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountComponent);