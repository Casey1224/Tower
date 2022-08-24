import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 1, maxlength: 20 },
    capacity: { type: Number, required: true, minlength: 1, maxlength: 500 },
    description: { type: String, required: true, minlength: 1, maxlength: 500 },
    location: { type: String, required: true, minlength: 1, maxlength: 50 },
    startDate: { type: String, required: true, },
    isCanceled: { type: Boolean, required: true, default: false }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})