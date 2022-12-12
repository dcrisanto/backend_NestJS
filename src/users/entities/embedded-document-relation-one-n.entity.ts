import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmbeddedDocumentRelationOneN {
  @Prop()
  name: String;

  @Prop()
  color: String;
}

export const EmbeddedDocumentRelationOneNSchema = SchemaFactory.createForClass(
  EmbeddedDocumentRelationOneN,
);
