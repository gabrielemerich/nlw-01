import { Point } from "../models/point";
import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController{

    async filterPoints(request: Request, response: Response){
        const {city,uf,items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item=> Number(item.trim()));

        const points = await knex('points')
        .join('point_items','points.id','=','point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points)
    }

    async index(request: Request, response: Response){
        const items: Point[] = await knex('points').select<Point[]>("*")
        return response.json(items);
    }

    async create(request: Request, response: Response){
        //const signup: Point = JSON.parse(JSON.stringify(request.body)) as Point;
        const point: Point = request.body;
        const pointItems = point.items;
        point.image = request.file.filename;
        const trx = await knex.transaction();
        delete point.items;
        const insertedIds = await trx('points').insert(point);
        const point_id = insertedIds[0];
        
        const split_pointItems = String(pointItems).split(',');

        const insertPointItems = split_pointItems.map(item_id =>{
            return{
                item_id,
                point_id
            }
        })
        
        await trx('point_items').insert(insertPointItems);
        await trx.commit();

        return response.json({
            id: point_id, point
        })
    } 

    async show(request: Request, response: Response){
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();
        if(!point){
            return response.status(400).json({message: 'Point not found'});
        }

            const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);
            return response.json({point,items});

            
    }
}

export default PointsController;