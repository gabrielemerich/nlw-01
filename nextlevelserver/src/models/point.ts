import { Item } from "./item";

export class Point {
    public name:string;
    public email: string;
    public whatsapp: string;
    public latitude: number;
    public longitude: number;
    public city: string;
    public uf: string;
    public items: Item[];
    public image: string;

    constructor(
         name:string,
         email: string,
         whatsapp: string,
         latitude: number,
         longitude: number,
         city: string,
         uf: string,
         items: Item[],
         image: string
    ){
        this.name = name;
        this.email = email;
        this.whatsapp = whatsapp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.uf = uf;
        this.items = items;
        this.image = image;

    }
}