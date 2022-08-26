import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
    async getEventTickets(eventId) {
        let tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }
    async getByAccountId(userId) {
        let tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
        return tickets
    }
    async create(newTicket) {
        const event = await eventsService.getEventById(newTicket.eventId)
        if (event.capacity == 0) {
            throw new BadRequest("No capacity available.")
        }
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('profile', 'name picture')
        // @ts-ignore
        event.capacity -= 1
        await event.save()
        return ticket
    }
    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('no tickets with that id')
        }
        // @ts-ignore
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('you cannot remove that Ticket')

        }
        await ticket.remove()
        return 'ticket ended'
    }
}
export const ticketsService = new TicketsService()