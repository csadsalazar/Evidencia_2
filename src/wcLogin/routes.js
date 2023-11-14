import { Router } from '@vaadin/router';

import '../wcAdmin/dashboard-admin'
import '../wcUser/dashboard-user'
import './wcLogin'
import '../wcSignUp/registro'

const routes = [
  {
    path: '/',
    component: 'login-component'
  },
  {
    path: '/Dashboard-Admin',
    component: 'admin-dashboard'
  },{
    path: '/Dashboard-User',
    component: 'user-dashboard'
  },{
    path: '/Login',
    component: 'login-hola'
  },
];

const durus = document.getElementById('durus');
const router = new Router(durus);
router.setRoutes(routes);
