import React, {Component} from 'react';
import { connect } from 'react-redux'
var shortid = require('shortid');
import './styles.scss';

class FormTextComponent extends Component {
    /*
     * Constructor
     */
     constructor(props){
        super(props)
        this.state = {
            value: this.props.defaultValue || '',
            validationError: ''
        } 
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getValue = this.getValue.bind(this)

        
        this.addErrorNotice = this.addErrorNotice.bind(this)
        this.removeErrorNotice = this.removeErrorNotice.bind(this)
    }
    
    /**
     * Handle Change for input control
     */
    handleChange(event){
        this.setState({value:event.target.value})
        this.props.onUpdateCallback([this.props.objectKey], event.target.value)
        this.props.onUpdateCallback("lastFocusedTextControl", this.props.objectKey)
    };

    /**
     * Add error notice
     */
    addErrorNotice(){
        this.setState({validationError: this.props.failMsg})
    }

    /**
     * Delete error notice
     */
    removeErrorNotice(){
        this.setState({validationError: ''})
    }

    /**
     * Get control value
     */
    getValue() {
        return this.state.value
    }

    /**
     * Validate passwords according to  rules
     */
    validate(password2 = '') {
        var result = true;
        
        switch(this.props.validationRule){
            case 'noEmpty':
                if (!this.getValue()){
                    this.addErrorNotice()
                    result = false
                }else{
                    this.removeErrorNotice()
                }
                break;

            case 'noEmptyAndPasswordAreEq':
                if (!this.getValue() || this.getValue() != password2){
                    this.addErrorNotice();
                    result = false;
                }else{
                    this.removeErrorNotice();
                }
                break;


            case 'email':
                if (!this.getValue().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    this.addErrorNotice();
                    result = false;
                }else{
                    this.removeErrorNotice();
                }
                break;                
            default:
                alert('Unknown validation rule: allowed noEmpty and email only');
        }
        return result;
    }

    /*
    *  Render component
    */
    render(){
        return (
                <div className="form-text-component">
                {this.props.type == 'textarea' ?
                    <textarea cols={this.props.cols}  autoFocus={this.props.autoFocus} rows={this.props.rows} value={this.state.value} placeholder={this.props.placeholder} onChange={this.handleChange} />
                :
                    <input id={Math.random()} autoFocus={this.props.autoFocus} type={this.props.type} value={this.props.defaultValue || this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder} />
                }
                <p className="error">{this.state.validationError}</p>
            </div>
           );
    }
}

export default FormTextComponent