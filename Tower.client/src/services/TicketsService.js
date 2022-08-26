import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";







class TicketsService {
    async create(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('created ticket!', res.data)
        AppState.ticketProfiles.push(res.data)
    }
    async getTicketProfilesByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('got ticket profile by event', res.data)
        AppState.ticketProfiles = res.data
    }
    async getTicketEventsByAccount() {
        const res = await api.get('account/tickets')
        logger.log('got tickets events by account')
        AppState.ticketEvents = res.data
    }
    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)

        logger.log('removed ticket', res.data)
        AppState.ticketProfiles = AppState.ticketProfiles.filter(t => t.id != eventId)
        AppState.ticketEvents = AppState.ticketEvents.filter(t => t.id != eventId)
    }
}
export const ticketsService = new TicketsService()