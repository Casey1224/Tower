import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
    body: { type: String, required: true, maxlength: 125 },
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    accountId: { type: ObjectId, required: true, ref: 'Account' },

}, {
    timestamps: true, toJSON: { virtuals: true }
})
CommentSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})


