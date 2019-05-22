import React, {Component} from 'react';
import ImagePreviewComponent from "../image_preview";
import './styles.scss';

/**
 * Image Preview component
 */
class ImageGalleryComponent extends Component {
    /*
    *  Show image gallery
    */
    render(){ 
        if (this.props.img1 || this.props.img2 || this.props.img3) {
            return (
                <div className="image-gallery-flexbox">
                    {[...Array(3)].map( (_,i) =>
                        this.props["img"+(i+1)] && <ImagePreviewComponent width={this.props.width} imageId={this.props["img"+(i+1)]} />
                    )}
                </div>                        
            );
        }
    }
}
export default ImageGalleryComponent;