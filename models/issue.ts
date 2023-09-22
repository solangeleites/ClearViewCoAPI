import {Model, Schema, model, Types} from "mongoose";

export interface IIsue {
    title: string,
    description: string,
    priority: number,
    user: Types.ObjectId,
    createdAt: Date,
}

const IssueSchema = new Schema<IIsue>({
    title:{
        type: String,
        required: [true, "El titulo es obligatorio"],
    },
    description:{
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    priority:{
        type: Number,
        required: [true, "la prioridad es obligatoria"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

const Issue: Model <IIsue> = model<IIsue>('IIsue', IssueSchema);

export default Issue;