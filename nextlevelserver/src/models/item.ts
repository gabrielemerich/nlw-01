export class Item {
    public id!: number;
    public title!:string;
    public image!: string;
    public image_url = `http://localhost:3333/uploads/${this.image}`; 
}