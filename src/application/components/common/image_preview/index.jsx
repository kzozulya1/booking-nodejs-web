import React, {Component} from 'react';
import { imageServiceDownload } from '../../../etc/config.json';
//import { imageServiceDownload } from 'config.json';
//const { imageServiceDownload } = require("../../../etc/config/"+process.env.NODE_ENV+".json")


import './styles.scss';

/**
 * Image Preview component
 */
class ImagePreviewComponent extends Component {

    /*
    * Constructor
    */
     constructor(props){
         super(props)
         this.clickHandler = this.clickHandler.bind(this)
     }
    /*
    * On image click
    */    
    
    clickHandler(){
        let imgUrl = imageServiceDownload + '?id=' + this.props.imageId
        window.open(imgUrl, "", 'width=1024, height=768, location=0, menubar=0,status=0, titlebar=0, toolbar=0')
    }

    /*
    *  Render button
    * use  <img className="image-preview" width={ this.props.width} onClick={this.clickHandler} src={imageServiceDownload + '?id=' + this.props.imageId} />
    * to omit golang service resample
    */
    render(){ 
        return (
            <img className="image-preview"  onClick={this.clickHandler} src={imageServiceDownload + '?id=' + this.props.imageId + '&w=' + this.props.width } />
           );
    }
}
export default ImagePreviewComponent;