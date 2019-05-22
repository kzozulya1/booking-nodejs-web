import RoomsComponent from '../components/rooms';
import RoomViewComponent from '../components/rooms/view';
import MyAccountComponent from '../components/my_account';
import MyObjectsComponent from '../components/my_objects';
import MyObjectCreateComponent from '../components/my_objects/create';
import MyReservationsComponent from '../components/my_reservations';
import AuthRegisterComponent from '../components/auth/register';
import AuthLoginComponent from '../components/auth/login';

export const ROOMS_ROUTE = '/rooms';
export const ROOM_VIEW_ROUTE = '/room/:id';
export const MY_ACCOUNT_ROUTE = '/myaccount';
export const MY_OBJECTS_ROUTE = '/myobjects';
export const MY_OBJECTS_CREATE_ROUTE = '/myobjectcreate';
export const MY_RESERVATIONS_ROUTE = '/myreservations';
export const REGISTER_ROUTE = '/register';
export const LOGIN_ROUTE = '/login';
export default [
    {
        path: ROOMS_ROUTE,
        component: RoomsComponent,
        exact: true,
    },
    {
        path: ROOM_VIEW_ROUTE,
        component: RoomViewComponent,
        exact: true,
    },
    {
        path: MY_ACCOUNT_ROUTE,
        component: MyAccountComponent,
        exact: true,
    },
    {
        path: MY_OBJECTS_ROUTE,
        component: MyObjectsComponent,
        exact: true,
    },
    {
        path: MY_OBJECTS_CREATE_ROUTE,
        component: MyObjectCreateComponent,
        exact: true,
    },
    {
        path: MY_RESERVATIONS_ROUTE,
        component: MyReservationsComponent,
        exact: true,
    },
    {
        path: REGISTER_ROUTE,
        component: AuthRegisterComponent,
        exact: true,
    },
    {
        path: LOGIN_ROUTE,
        component: AuthLoginComponent,
        exact: true,
    }
];
                              