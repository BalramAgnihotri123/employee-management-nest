import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { EmployeeDepartment, EmployeePosition } from "./employees.constants";

export type EmployeeDocument = Employee & Document;

@Schema({
    timestamps: true, //adds createdAt and updatedAt when required
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  })
  export class Employee {
    id: mongoose.Types.ObjectId; //* employee id
  
    @Prop()
    email:string;

    @Prop()
    firstName:string;

    @Prop()
    lastName:string;

    @Prop()
    dateOfBirth:number; //* it is in epoch milliseconds passed from 1st january 1970

    @Prop()
    password:string;

    @Prop({ enum: EmployeeDepartment })
    department: EmployeeDepartment

    @Prop({ enum: EmployeePosition })
    position:EmployeePosition;

    @Prop({ default:false })
    isDeleted:false;
  }
  
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
  