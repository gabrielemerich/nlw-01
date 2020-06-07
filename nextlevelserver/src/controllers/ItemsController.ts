import { Point } from "../models/point";
import {Request, Response} from 'express';
import knex from '../database/connection';
import { Item } from "../models/item";

class ItemsController{
    async index(request: Request, response: Response){
     
        const items: Item[] = await knex('items').select<Item[]>("*")
        return response.json(items);
    }
}

export default ItemsController;