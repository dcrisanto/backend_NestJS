import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  products: Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
