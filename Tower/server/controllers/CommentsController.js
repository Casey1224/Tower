import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.deleteComment)
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            let comment = await commentsService.Create(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req, res, next) {
        try {
            const comment = await commentsService.deleteComment(req.params.id)
            return res.remove(comment)
        } catch (error) {
            next(error)
        }

    }
}