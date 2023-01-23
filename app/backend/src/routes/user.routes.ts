import { Router } from 'express';
// import UserService from '../modules/account/services/UserService';
import UserController from '../modules/account/controllers/UserController';

const userController = new UserController();

const userRoute = Router();

// userRoute.post('/login', userController.login);
userRoute.get('/login', userController.login);

export default userRoute;
