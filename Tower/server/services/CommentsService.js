import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CommentsService {
    async getAll(query = {}) {
        const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
        return comments
    }
    async Create(newComment) {
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getCommentById(commentId) {
        let comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Invalid comment Id')
        }
        return comment
    }

    async deleteComment(commentId, userId) {
        let comment = await this.getCommentById(commentId)
        // @ts-ignore
        if (comment.creatorId.toString() != userId) {
            throw new BadRequest("you dont have permission")
        }
        await comment.remove()

    }

}
export const commentsService = new CommentsService()