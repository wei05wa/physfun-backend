import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({timestamps : true})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true , unique: true,   match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],})
  email : string;

  @Prop({ type : String, required: true, select : false })
  password: string;

  @Prop({ required: true, default: 'user',type : String , enum: ['user', 'admin'] })
  role: string;

  //Reset password
  @Prop({ required: false })
  resetPasswordToken: string;

  @Prop({ required: false })
  resetPasswordExpire: Date;


}

export const UserSchema = SchemaFactory.createForClass(User);

//hash password before saving in Database
UserSchema.pre<UserDocument>('save',async function(next){

  //Only hash the password if its new or has been modified
  if(!this.isModified('password'))
    return next();


  //Generate salt and hash passwaord

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
})