import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js"
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
    }

    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            let ticket = await ticketsService.create(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const message = await ticketsService.remove(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)

        }
    }
    // }
    // async getTickets(req, res, next) {
    //     try {
    //         const tickets = await ticketsService.getTickets()
    //         return res.send(tickets)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    // async getTicketsById(req, res, next) {
    //     try {
    //         let ticket = await ticketsService.getByAccountId(req.params.id)
    //         return res.send(ticket)
    //     } catch (error) {
    //         next(error)
    //     }
    // }


}