import express from 'express';

import { createUser, createAdmin } from '../controllers/registerController.js';

const registerRouter = express.Router();
//? http://localhost:3000/register

registerRouter
    .route('/user')
    .post(createUser);

registerRouter
    .route('/admin')
    .post(createAdmin);

export default registerRouter;