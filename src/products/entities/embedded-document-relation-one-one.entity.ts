import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmbeddedDocumentRelationOneOne {
  @Prop()
  name: String;

  @Prop()
  image: String;
}

export const EmbeddedDocumentRelationOneOneSchema =
  SchemaFactory.createForClass(EmbeddedDocumentRelationOneOne);
