import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  products: Array<string>;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
