import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  //Prop => propiedades por defecto es string
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  //price este indexado para que cuando se realice la búsqueda sea de manera rápida
  @Prop({ type: Number, required: true, index: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
//Para realizar una indexacción compuesta, el 1 indica de que forma la va a ordenar, stock indexado en forma descendente
ProductSchema.index({ price: 1, stock: -1 });
