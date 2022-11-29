import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
