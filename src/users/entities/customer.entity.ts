import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  EmbeddedDocumentRelationOneN,
  EmbeddedDocumentRelationOneNSchema,
} from './embedded-document-relation-one-n.entity';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  //relación uno a muchos - embebidas
  @Prop({
    type: [{ name: { type: String }, color: { type: String } }],
  })
  skills: Types.Array<Record<string, any>>;

  //tipado para relación embebida uno a muchos
  @Prop({ type: [EmbeddedDocumentRelationOneNSchema] })
  embeddedDocumentRelationOneN: Types.Array<EmbeddedDocumentRelationOneN>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
