import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import { User } from './user.entity';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  user: User;

  @Prop({ required: true })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
