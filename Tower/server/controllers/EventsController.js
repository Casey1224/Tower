import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:id', this.isCanceled)

    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)

        }
    }
    async getAll(req, res, next) {
        try {
            const event = await eventsService.getAll()
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)

        }
    }
    async isCanceled(req, res, next) {
        try {
            const message = await eventsService.isCanceled(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}