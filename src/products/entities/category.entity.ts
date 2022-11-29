import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Product } from './product.entity';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  products: Array<string>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
