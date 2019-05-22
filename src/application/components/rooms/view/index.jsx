import React, {Component} from 'react';
import { connect } from 'react-redux'
import api from "../../../api";
import FormButtonComponent from "../../common/form_field/button";
import RoomReserveComponent from "./reserve";
import ImagePreviewComponent from "../../common/image_preview";
import ImageGalleryComponent from "../../common/image_gallery";
import Helmet from "react-helmet";
var shortid = require('shortid');
import './styles.scss';

/**
 * Room view and reserve
 */
class RoomViewComponent extends Component {
   /*
   * Constructor
   */
   constructor(props){
        super(props)
        this.state = {
            room: {},
            room_owner: {},
            room_owner_rooms_count:0,
            showReservationForm: false
        }
        
        
        this._getRoomById = this._getRoomById.bind(this)
        this.onReserveClick = this.onReserveClick.bind(this)
    }

    /**
     * Get room by ID
     */
    _getRoomById(roomId){
        var self = this;
        api.getRoomById(roomId).then(
            ({data})=> {
                this.setState({
                    room: data
                });

                //User token is unavailable when render from server - so allow to get user data w/o being authenticated
                api.getUserById(data.owner_id).then(
                    ({data})=> {
                        self.setState({
                            room_owner: data,
                            room_owner_rooms_count:data.rooms.length
                        });
                    },
                    error => console.log("Error in XHR api: get user by id: " + error)
                );
            },
            error => console.log("Error in XHR api: get room by id: " + error)
        );
    }

    /*
    * After component would be rendered
    */
    componentDidMount(){
        let roomId = this.props.match.params.id;
        var self = this;
        this._getRoomById(roomId)
    }
    /*  
    * On reserve btn click
    */
    onReserveClick(){
        let reserveBtn = this.refs.reservebtn
        reserveBtn.setSelected(!reserveBtn.getSelected())
        this.setState({
            showReservationForm: !this.state.showReservationForm
        })
    }

    /*
    *  Render component
    */
    render(){
        return (
            <div className="room-view-wrapper">
                <Helmet>
                    <title>Room View</title>
                    <meta name="description" content="View room information" />
                </Helmet>
                
                <div className="page-title">
                    <h2>{`${this.state.room.description} apartment reservation`}</h2><br />
                </div>
            
                <div className="room-view">
                    <div className="room-info">
                        <div className="description">
                            <h2>{this.state.room.description}</h2>
                        </div>

                        <div className="images-view-list">
                        {this.state.room.img_main ?  <ImagePreviewComponent width="210" imageId={this.state.room.img_main} /> : ''}
                        {(this.state.room.img_1 || this.state.room.img_2 || this.state.room.img_3) ?
                            <ImageGalleryComponent key={shortid.generate()}  width="50" img1={this.state.room.img_1} img2={this.state.room.img_2} img3={this.state.room.img_3}  />
                        : ''
                        }
                 </div>

                        <div className="address">
                            <p>Address: {this.state.room.address}</p>
                        </div>
                        <div className="body-capacity">
                            <p>Allow <span className="emphasize">{this.state.room.body_capacity}</span> guest{this.state.room.body_capacity > 1 && "s"}</p>
                        </div>
                        <div className="options">
                            <p>Allow smoking: <span className="emphasize">{this.state.room.allow_smoking ? '+' : '-'}</span></p>
                            <p>Allow children: <span className="emphasize">{this.state.room.allow_children ? '+' : '-'}</span></p>
                            <p>Parking available: <span className="emphasize">{this.state.room.parking_available ? '+' : '-'}</span></p>
                            <br />

                            <p className="owner-label">Apartment's owner:</p>
                            <p><span className="emphasize">{this.state.room_owner.name}</span></p>
                            <p><a href={'mailto:' + this.state.room_owner.email}>{this.state.room_owner.email}</a></p>
                            <p>Owns <span className="emphasize">{this.state.room_owner_rooms_count}</span> room{(this.state.room_owner_rooms_count > 1) ? 's' : ''}</p>
                            <FormButtonComponent key="reservebtn" ref="reservebtn" onClick={this.onReserveClick} label="Choose arrival dates" />
                        </div>
                    </div>
                    {this.state.showReservationForm &&
                        <RoomReserveComponent room_id={this.state.room.id} />
                    }
                </div>
             </div>
        );
    }
}

export default RoomViewComponent