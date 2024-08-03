import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({ collection: "contacts" })
export class Contact extends Document {
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    place: string;
    @Prop({ default: false })
    confirmed: boolean;
    @Prop()
    verificationToken: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact)