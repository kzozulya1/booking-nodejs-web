import axios from 'axios';
import { apiPrefix } from '../etc/config.json';

export default {
    /**
     * List all rooms  +
     */
    listAllRooms() {
        return axios.get(`${apiPrefix}/api/v1/rooms/`);
    },

    /**
     * Get Room by ID  +
     */
    getRoomById(id) {
        return axios.get(`${apiPrefix}/api/v1/rooms/${id}`);
    },

    /**
     * Register new user +
     */
    createUser(data){
        return axios.post(`${apiPrefix}/api/v1/users/`,data,  { headers:{"Content-Type": "application/json" }} );
    },
    /**
     * Sign in user +
     */
    loginUser(data){
        return axios.post(`${apiPrefix}/api/v1/users/login`,data,  { headers:{"Content-Type": "application/json" }} );
    },
    /**
     * Update user data +
     */
    updateUser(data,userToken){
        return axios.put(`${apiPrefix}/api/v1/users/me`,data,  { headers:{"Content-Type": "application/json", "api-token": userToken}} );
    },
    /**
     * Get info about logged in user +
     */
    me(userToken){
        return axios.get(`${apiPrefix}/api/v1/users/me`,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    },

    /**
     * Get info about logged in user +
     */
    getUserById(id){
        return axios.get(`${apiPrefix}/api/v1/users/${id}`,{ headers:{"Content-Type": "application/json"}});
    },

    /**
     * Add reservation +
     */
    createReservation(roomId,userToken,data){
        return axios.post(`${apiPrefix}/api/v1/reservations/room/${roomId}`,data,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    },

    /**
     * Remove reservation +
     */
    cancelReservation(reservationId,userToken){
        return axios.delete(`${apiPrefix}/api/v1/reservations/${reservationId}`,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    },

    /**
     * Update object (apartment) +
     */
    updateRoom(roomId,userToken,data){
        return axios.put(`${apiPrefix}/api/v1/rooms/${roomId}`,data,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    },

    /**
     * Create object (apartment) +
     */
    createRoom(userToken,data){
        return axios.post(`${apiPrefix}/api/v1/rooms/`,data,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    },

    /**
     * Delete object (apartment)
     */
    deleteRoom(roomId,userToken){
        return axios.delete(`${apiPrefix}/api/v1/rooms/${roomId}`,{ headers:{"Content-Type": "application/json", "api-token": userToken}});
    }
}