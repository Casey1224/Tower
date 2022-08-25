import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
    async getTickets(eventId) {
        let tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
        return tickets
    }
    async getTicketsById(accountId) {
        let tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('events')
        return tickets
    }
    async create(newTicket) {
        // const event = await eventsService.getEventById(id)
        // event.capacity = -1
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('profile', 'name picture')
        // await ticket.populate('events')
        return ticket
    }
    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('no tickets with that id')
        }
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('you cannot remove that Ticket')

        }
        await ticket.remove()
        return 'ticket ended'
    }
}
export const ticketsService = new TicketsService()