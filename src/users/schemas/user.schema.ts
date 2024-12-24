import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
