import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true, },
    startDate: { type: String, required: true, },
    isCanceled: { type: Boolean, default: false },
    coverImg: { type: String, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})