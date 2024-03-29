import express from 'express';
import PointsContoller from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsContoller();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/filter', pointsController.filterPoints);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()

        })
    }), 
    pointsController.create,
    
);
routes.get('/points/:id', pointsController.show);

export default routes;