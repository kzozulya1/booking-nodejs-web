import React, {Component} from 'react';
import { imageServiceUpload } from '../../../../etc/config.json';
//const { imageServiceUpload } = require("../../../../etc/config/"+process.env.NODE_ENV+".json")


import ImagePreviewComponent from "../../image_preview";
import axios from 'axios';
import './styles.scss';

/**
 * Form Image Upload  component
 */
class FormImageUploadComponent extends Component {
    /*
    * Constructor
    */
    constructor(props){
        super(props)
         this.state = {
            selectedFile: null,
            progressMsg: ''
        }
        
        this.uploadHandler = this.uploadHandler.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.onChangeDeleteImage = this.onChangeDeleteImage.bind(this)
    }

    /*
    * Change file
    */    
    fileChangedHandler(event){
         this.uploadHandler(event.target.files[0])    
    }
    
    /*
    * On upload
    */    
    uploadHandler(targetFile){
        let formData = new FormData()
        formData.append(
            'file',
            targetFile,
            targetFile.name
        )
        axios.post(imageServiceUpload, formData,{
            onUploadProgress: progressEvent => ((progressEvent.loaded / progressEvent.total) == 1) ? this.setState({progressMsg: null}) : this.setState({progressMsg: 'Please wait...'})
        }).then( response => {
            this.props.onUpdateCallback(this.props.imgType, response.data.id)
        }).catch( err => alert(err))
    }

    /*
    *  If delete image option selected
    */
    onChangeDeleteImage() {
        this.props.onUpdateCallback(this.props.imgType, null)
    }
    
    /*
    *  Render button
    */
    render(){ 
        var imgWidth = "35"
        return (
                <div className="form-image-component">
                    <span className="img-label">{this.props.label}:</span>
                    <div className="control">
                        {this.props.imageId && <ImagePreviewComponent width={imgWidth} imageId={this.props.imageId} /> }
                        <input type="file" onChange={this.fileChangedHandler} accept="image/jpeg" />
                        {this.state.progressMsg ?
                            <span className="progress-bar">{this.state.progressMsg}</span>
                        :
                        ''
                        }
                        {this.props.imageId && 
                            <div className="delete-option">
                                <button onClick={this.onChangeDeleteImage}>Delete</button>
                            </div>
                        }
                        
                    </div>
                </div>
           );
    }
}
export default FormImageUploadComponent;