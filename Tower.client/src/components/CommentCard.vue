<template>
    <div class="col-2">
        <img class="img-fluid" :src="comment.creator.picture" alt="" :name="comment.creator.name">
    </div>
    <div>
        <p>{{ comment.body }}</p>
        <button class="btn btn-info" @click="removeComment"><i class="mdi mdi-heart-broken"></i>
            remove comment</button>
    </div>
</template>
<script>
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';
export default {
    props: { comment: { type: Object, required: true } },
    setup(props) {
        return {
            async removeComment() {
                try {
                    await commentsService.removeComment(props.comment.id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>
<style >
</style>