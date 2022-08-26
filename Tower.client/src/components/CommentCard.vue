<template>
    <div class="col-2">
        <img class="img-fluid" :src="comment.creator.picture" alt="" :name="comment.creator.name">
    </div>
    <div>
        <p>{{ comment.body }}</p>
    </div>

</template>
<script>
export default {
    props: { comment: { type: Object, required: true } },
    setup() {
        return {};
    },
};
</script>
<style >
</style>