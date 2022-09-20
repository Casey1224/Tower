<template>

    <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
        <div class="bg-light border elevation-2 rounded selectable">
            <div class="p-1">
                <img class="img-fluid" :src="event.coverImg" alt="">
                <h6 class="text-dark"><b>{{ event.name }}</b></h6>
                <p class="text-dark">capacity:{{ event.capacity }}</p>
            </div>
        </div>
    </router-link>




</template>
<script>
import { router } from '../router.js'
export default {
    props: { event: { type: Object, required: true } },
    setup(props) {
        return {
            gotTo() {
                router.push({ name: 'EventsDetails', params: { eventId: props.event.id } })
            }
        };
    },
};
</script>
<style >

</style>