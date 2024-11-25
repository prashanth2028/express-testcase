import express from 'express';
import {createUser, getUsers , getUserById,updateUser,deleteUser } from './UserController';


const crudRoute = express.Router();

//auth route
crudRoute.get('/users',getUsers);
crudRoute.get('/user/:id' ,getUserById);
crudRoute.post('/users',createUser);
crudRoute.put('/user/:id',updateUser);
crudRoute.delete('/user/:id',deleteUser);

export default crudRoute;