import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { ticketsService } from "../services/TicketsService.js"



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

    async getEventById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }
    async isCanceled(eventId, userId) {
        const event = await this.getEventById(eventId)
        // @ts-ignore
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("you cant delete this silly")
        }
        event.isCanceled = true
        await event.save()
        return `event ${event.name} was canceled`
    }
    async editEvent(eventId, eventData) {
        let event = await this.getEventById(eventId)
        if (eventData.isCanceled != true) {
            throw new BadRequest("Can't edit a canceled event")
        }

        event.name = eventData.name || event.name
        event.capacity = eventData.capacity || event.capacity
        event.description = eventData.description || event.description
        event.location = eventData.location || event.location
        event.startDate = eventData.startDate || event.startDate
        event.coverImg = eventData.coverImg || event.coverImg
        event.type = eventData.category || event.type

        await event.save()
        return event
    }
}
export const eventsService = new EventsService()