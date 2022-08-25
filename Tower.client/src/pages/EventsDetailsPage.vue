

<template>

</template>
<script>
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop';
import { computed, onMounted, popScopeId } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
export default {
    setup() {
        const route = useRoute();
        async function getEventsById() {
            try {
                await eventsService.getById(route.params.eventsId);
            } catch (error) {
                Pop.error(error);
            }
        }

        onMounted(() => {
            getEventsById();
        })

        return {
            event: computed(() => AppState.activeEvents)
        };
    },
};
</script>
<style >
</style>
