import React, {Component} from 'react';
import './styles.scss';

/**
 * Button component
 */
class FormButtonComponent extends Component {

    /*
    * Constructor
    */
    constructor(props){
        super(props)
        this.state = {
            selected: props.selected
        }
    }

    setSelected(flag){
        this.setState({
            selected: flag
        });
    }

    getSelected(flag){
        return this.state.selected;
    }

    /*
    *  Render button
    */
    render(){
        return (
                <div className={'form-field-button' + (this.state.selected ? ' form-field-button-selected':'')} onClick={this.props.onClick}>{this.props.label}</div>
           );
    }
}
export default FormButtonComponent;