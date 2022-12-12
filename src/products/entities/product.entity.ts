//raw: para manejar las relaciones embebidas
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

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

  //relación uno a uno - embebidas
  //raw: indicando que tiene un sub objecto
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  //una forma de resolver la realción
  category: Record<string, any>;

  //relación uni a uno - referenciada
  //En la DB guardará el id y referido a Brandn.name
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  //el type puede ser el obcjeto o string con el id
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
//Para realizar una indexacción compuesta, el 1 indica de que forma la va a ordenar, stock indexado en forma descendente
ProductSchema.index({ price: 1, stock: -1 });
