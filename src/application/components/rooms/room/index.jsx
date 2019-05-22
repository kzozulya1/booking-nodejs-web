import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FormTextComponent from "../../common/form_field/text";
import FormImageUploadComponent from "../../common/form_field/image";
import ImagePreviewComponent from "../../common/image_preview";
import ImageGalleryComponent from "../../common/image_gallery";
import { updateRoomAction, createRoomAction, deleteRoomAction } from "../../../actions/ActionCreator";
var shortid = require('shortid');
import './styles.scss';

const LABEL_ALLOW_SMOKING = 'Allow smoking'
const LABEL_ALLOW_CHILDREN = 'Allow children'
const LABEL_ALLOW_PARKING = 'Allow parking'

/**
 * Room entity
 */
class RoomComponent extends Component {
    /*
    * Constructor
    */
    constructor(props){
        super(props)

        this.state = {
            isEditMode: false,
            lastFocusedTextControl: null,
            address: props.dataObject.address,
            description: props.dataObject.description,
            allow_children: props.dataObject.allow_children,
            allow_parking: props.dataObject.allow_parking,
            allow_smoking: props.dataObject.allow_smoking,
            body_capacity: props.dataObject.body_capacity || 1,
            imgMain: props.dataObject.img_main,
            img1: props.dataObject.img_1,
            img2: props.dataObject.img_2,
            img3: props.dataObject.img_3
        }

        this.onRemoveClick = this.onRemoveClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.onEditPostClick = this.onEditPostClick.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.isInEditableMode = this.isInEditableMode.bind(this)
        this.onBack = this.onBack.bind(this)
        this.updateStateKey = this.updateStateKey.bind(this)
        this.onBodyCapacityChange = this.onBodyCapacityChange.bind(this)
    }

    /**
     * Sanitize value in Yes | No
     */
    getBooleanValue(prop){
        return prop ? 'Yes' : 'No'
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
     * When remove room
     */
    onRemoveClick(){
        confirm("Are you sure?") && this.props.deleteRoomAction(this.props.dataObject.id,this.props.userToken)
            .then(() => {
            })
            .catch((e) => { alert(e) }
            );
    }

    /**
     * When click to edit room
     */
    onEditClick(){
        this.setState({isEditMode: true});
    }

    /**
     * On body capacity change
     * @param event 
     */
    onBodyCapacityChange(event){
        this.setState({body_capacity: parseInt(event.target.value)})
    }

    /**
     * When do apply changes
     */
    onEditPostClick(){
        if (this.validateForm()){
            var data = {
                description: this.state.description,
                address: this.state.address,
                img_main: this.state.imgMain,
                img_1: this.state.img1,
                img_2: this.state.img2,
                img_3: this.state.img3,
                body_capacity: this.state.body_capacity,
                allow_smoking: this.state.allow_smoking ? 1 : 0,
                allow_parking: this.state.allow_parking ? 1 : 0,
                allow_children:this.state.allow_children ? 1 : 0
            };

            //Create new room
            if (!this.props.dataObject.id){
                data.owner_id = this.props.loggedinUser.id

                this.props.createRoomAction(this.props.userToken,data)
                    .then(() => {
                        this.props.onCreateHandler()
                    })
                    .catch((e) => { /*error occur  - stay here, no redirect*/ }
                    );


            }else{
                //Update existing room
                this.props.updateRoomAction(this.props.dataObject.id,this.props.userToken,data)
                    .then(() => {
                        this.setState({isEditMode: false, img1: data.img_1,img2: data.img_2,img3: data.img_3, imgMain: data.img_main});//!!!
                    })
                    .catch((e) => { /*error occur  - stay here, no redirect*/ }
                    );
            }

        }
    }

    /**
     * Validate address and description fields
     */
    validateForm(){
        let result = true;
        result = result && this.refs.description.validate()
        result = result && this.refs.address.validate()
        return result
    }

    /**
     * Check is in editable mode
     */
    isInEditableMode(){
        return this.state.isEditMode || (this.props.isNewMode);
    }

    /**
     * Go back in history
     */
    onBack(){
        if (!this.props.isNewMode){
            //Update room
            this.setState({isEditMode: false});
        }else{
            //New room
            this.props.onCreateHandler()
        }
    }
    
    /**
     * Render component
     */
    render(){
        return (
        <div className="room">
            <div className="description">
                {this.isInEditableMode() ?
                    <div>
                     <FormTextComponent ref="description" key={shortid.generate()} autoFocus={"description" == this.state.lastFocusedTextControl}  type="text" validationRule="noEmpty" defaultValue={this.state.description} failMsg='Please type correct apartment description' placeholder="Apartment description" objectKey="description" onUpdateCallback={this.updateStateKey} />
                    </div>
                :
                    <h3>{this.props.dataObject.description}</h3>
                }

                {this.props.showEditRemoveControls ?
                    <div className="controls-wrapper">
                        <div className="edit-remove-controls">
                            {!this.state.isEditMode &&
                            <span>
                                <span onClick={this.onEditClick} className="room-edit">
                                    <span className="tooltiptext">Edit object registration</span>
                                </span>

                                <span onClick={this.onRemoveClick} className="room-remove">
                                    <span className="tooltiptext">Remove object registration</span>
                                </span>
                            </span>
                            }
                        </div>
                    </div>
                        : ''
                }
            </div>
            

            <div className="images-container">
                {this.isInEditableMode() ?
                    <div className="images-edit-list">
                        <FormImageUploadComponent label="Main image" imgType="imgMain" imageId={this.state.imgMain} onUpdateCallback={this.updateStateKey}  />
                        {[...Array(3)].map( (_,i) =>
                            <FormImageUploadComponent label={"Image "+(i+1)} imgType={"img"+(i+1)} imageId={this.state["img"+(i+1)]} onUpdateCallback={this.updateStateKey}  />
                        )}
                    </div>
                 : 
                 <div className="images-view-list">
                    {this.state.imgMain ?  <ImagePreviewComponent width="210" imageId={this.state.imgMain} /> : ''}
                    {(this.state.img1 || this.state.img2 || this.state.img3) ?
                        <ImageGalleryComponent key={shortid.generate()}  width="50" img1={this.state.img1} img2={this.state.img2} img3={this.state.img3}  />
                    : ''
                    }
                 </div>
                }
            </div>
            <div className="address">
                {this.isInEditableMode() ?
                    <FormTextComponent ref="address" key={shortid.generate()} autoFocus={"address" == this.state.lastFocusedTextControl}  type="textarea" rows="3" objectKey="address" validationRule="noEmpty" defaultValue={this.state.address} failMsg='Please type correct apartment address' onUpdateCallback={this.updateStateKey}  placeholder="Apartment address" />
                :
                    <p>{this.props.dataObject.address.split("\n").map(part => <span key={shortid.generate()}>{part}<br /></span>)}</p>
                }
            </div>
            <div className="body-capacity">
                <span>Allow
                    {this.isInEditableMode() ?
                    <select key={shortid.generate()} onChange={this.onBodyCapacityChange} defaultValue={this.state.body_capacity || this.props.dataObject.body_capacity} >
                            {[...Array(4)].map( (_,i) =>
                                <option value={i+1}>{i+1}</option>
                            )}
                        </select>
                    :
                    <span className="emphasized">&nbsp;{this.props.dataObject.body_capacity}&nbsp;</span>
                    }
                 guest{this.props.dataObject.body_capacity > 1 && "s"}</span>
            </div>
            <div className="options">
                <p>
                    {this.isInEditableMode() ?
                        <span>
                            <input id={"allow_smoking_" + this.props.dataObject.id} type="checkbox" defaultChecked={this.state.allow_smoking || this.props.dataObject.allow_smoking} onChange={(event) => this.updateStateKey("allow_smoking",event.target.checked)} />
                            <label htmlFor={"allow_smoking_" + this.props.dataObject.id}>{LABEL_ALLOW_SMOKING}</label>
                        </span>
                    :
                        <span>
                        <span>{LABEL_ALLOW_SMOKING}:</span>
                        <span className="emphasized">&nbsp;{this.getBooleanValue(this.props.dataObject.allow_smoking)}&nbsp;</span>
                        </span>
                    }
                </p>

                <p>
                    {this.isInEditableMode() ?
                        <span>
                            <input id={"allow_children_" + this.props.dataObject.id} type="checkbox" defaultChecked={this.state.allow_children || this.props.dataObject.allow_children} onChange={(event) => this.updateStateKey("allow_children",event.target.checked)} />
                            <label htmlFor={"allow_children_" + this.props.dataObject.id}>{LABEL_ALLOW_CHILDREN}</label>
                        </span>
                    :
                        <span>
                            <span>{LABEL_ALLOW_CHILDREN}:</span>
                            <span className="emphasized">&nbsp;{this.getBooleanValue(this.props.dataObject.allow_children)}&nbsp;</span>
                        </span>
                    }
                </p>

                <p>
                    {this.isInEditableMode() ?
                        <span>
                            <input id={"allow_parking_" + this.props.dataObject.id} type="checkbox" defaultChecked={this.state.allow_parking || this.props.dataObject.allow_parking} onChange={(event) => this.updateStateKey("allow_parking",event.target.checked)} />
                            <label htmlFor={"allow_parking_" + this.props.dataObject.id}>{LABEL_ALLOW_PARKING}</label>
                        </span>
                    :
                        <span>
                            <span>{LABEL_ALLOW_PARKING}:</span>
                            <span className="emphasized">&nbsp;{this.getBooleanValue(this.props.dataObject.allow_parking)}&nbsp;</span>
                        </span>
                    }
                </p>
            </div>
            
            {/*!this.state.isEditMode && this.props.dataObject.reservations && this.props.dataObject.reservations.map( aReservation =>
                <div key={shortid.generate()} className="room-reservations">
                    <span>Reserved from <span className="emphasized">{aReservation.book_from}</span> to <span className="emphasized">{aReservation.book_to}</span></span><br />
                </div>
             )
            */}

            {!this.state.isEditMode && this.props.dataObject.reservations && this.props.dataObject.reservations.length > 0 && 
                <div key={shortid.generate()} className="room-reservations">
                    <span>Has {`${this.props.dataObject.reservations.length}`} reservation{this.props.dataObject.reservations.length > 1 && "s"}</span><br />
                </div>
            }

            {this.props.showViewMore ?
                (<div className="viewMore">
                    <br /><Link to={'/room/'+this.props.dataObject.id}>View details...</Link>
            </div>)
            : ''
            }

            {this.isInEditableMode() &&
            <div className="room-edit-post-wrapper">
                <span onClick={this.onBack} className="room-go-back">
                    <span className="tooltiptext">Cancel</span>
                </span>

                <span onClick={this.onEditPostClick} className="room-edit-post">
                    <span className="tooltiptext">Apply changes</span>
                </span>
            </div>
            }

        </div>
        )
    }
}

//Map action to component:
const mapDispatchToProps = dispatch => ({
    updateRoomAction: (roomId,userToken,data) => dispatch(updateRoomAction(roomId,userToken,data)),
    createRoomAction: (userToken,data) => dispatch(createRoomAction(userToken,data)),
    deleteRoomAction: (roomId,userToken) => dispatch(deleteRoomAction(roomId,userToken))
})
//Map global state objects to component:
const mapStateToProps = state => ({
    userToken: state.userToken,
    loggedinUser:  state.loggedinUser
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomComponent)
