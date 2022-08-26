import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async create(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('Comment Created!', res.data)
        AppState.comments.push(res.data)
    }
    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('got comment by Id', res.data)
        AppState.comments = res.data
    }
    // async getCommentEventsByAccount() {
    //     const res = await api.get('account/comments')
    //     logger.log('got tickets events by account')
    //     AppState.commentEvents = res.data
    // }
    async removeComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        logger.log('removed ticket', res.data)
        AppState.comments = res.data
    }
    //     async removeComment(commentId) {
    //         const res = await api.delete('api/comments/' + commentId)

    //         logger.log('removed comment', res.data)
    //         AppState.commentProfiles = AppState.commentProfiles.filter(c => c.id != eventId)
    //         AppState.commentEvents = AppState.commentEvents.filter(c => c.id != eventId)
    //     }
}

export const commentsService = new CommentsService()