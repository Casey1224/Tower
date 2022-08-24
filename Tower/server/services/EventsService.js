import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {
    async create(newEvent) {
        const event = await dbContext.Events.create(newEvent)
        await event.populate('creator', 'name picture')
        return event
    }
    async getAll() {

        const events = await dbContext.Events.find().sort({ createdAt: -1 }).populate('creator', 'name picture')
        return events
    }
    async getById() {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }
    async isCanceled(eventId, userId) {
        const event = await this.getById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("you cant delete this silly")
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return `event ${event.name} was canceled`
    }
}
export const eventsService = new EventsService()