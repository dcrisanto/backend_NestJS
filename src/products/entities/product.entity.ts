import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  //Prop => propiedades por defecto es string
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
