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
    // async getById(id) {
    //     const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
    //     if (!Comment) {
    //         throw new BadRequest('no comment by that id')
    //     }
    //     return comment
    // }
    // async deleteComment(commentId, userId) {
    //     const comment = await this.getById(commentId)
    //     if (comment.creatorId.toString() != userId) {
    //         throw new Forbidden("you don't have permission")
    //     }
    //     comment.remove()
    // }

    async getCommentById(commentId) {
        let comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Invalid comment Id')
        }
        return comment
    }
    async deleteComment(commentId, userId) {
        let comment = await this.getCommentById(commentId)
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden("you dont have permission")
        }
        await comment.remove()
        return comment

    }

}
export const commentsService = new CommentsService()