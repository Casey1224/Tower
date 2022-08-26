import { AppState } from "../AppState"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        logger.log('got events', res.data)
        AppState.events = res.data
    }
    async getById(id) {
        const res = await api.get('api/events/' + id)
        logger.log('got events by id', res.data)
        AppState.activeEvent = res.data
    }
    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('creating an event', res.data)
        AppState.events.unshift(res.data)

    }
    async isCanceled(id) {
        const res = await api.delete('api/events/' + id)
        logger.log('event canceled', res.data)
        AppState.activeEvent.isCanceled = true
    }
}



export const eventsService = new EventsService()