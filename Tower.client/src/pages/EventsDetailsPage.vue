

<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>{{ event.name }}</h2>
            </div>
            <div class="col-3">
                <img class="img-fluid" :src="event.coverImg" alt="">
            </div>
            <div class="col-2">

                <button v-if="!isTicket" class="btn btn-info" @click="ticket"><i class="mdi mdi-heart"></i>
                    Get Ticket</button>
                <button v-else class="btn btn-danger" @click="removeTicket"><i class="mdi mdi-heart-broken"></i>
                    Remove Ticket</button>
            </div>
            <div class="col-7">
                <div class="row">
                    \
                    <div v-for="t in ticketProfiles" class="col-2">
                        <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
                    </div>

                </div>
            </div>
        </div>

        <CommentForm />
        <div class="row">
            <CommentCard :comment="c" v-for="(c, i) in comments" :key="c.id" />
        </div>


    </div>
</template>
<script>
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsService.js';
import { commentsService } from '../services/CommentsService.js';
import { ticketsService } from '../services/TicketsService.js';
import CommentCard from '../components/CommentCard.vue';
import CommentForm from '../components/CommentForm.vue';
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
        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTicketProfiles() {
            try {
                await ticketsService.getTicketProfilesByEvent(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        onMounted(() => {
            getEventsById();
            getCommentsByEventId();
            getTicketProfiles();
        });

        return {
            event: computed(() => AppState.activeEvents),
            comments: computed(() => AppState.comments),
            ticketProfiles: computed(() => AppState.ticketProfiles),
            isTicket: computed(() => {
                if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
                    return true
                }
                return false

            }),
            async ticket() {
                try {

                    let newTicket = {
                        eventId: AppState.activeEvents.id,

                        accountId: AppState.account.id
                    }
                    logger.log('getting ticket', newTicket)
                    await ticketsService.create(newTicket)
                } catch (error) {
                    Pop.error(error)
                }
            },
            async removeTicket() {
                try {
                    let ticketToRemove = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)
                    await ticketsService.removeTicket(ticketToRemove.id)
                } catch (error) {
                    Pop.error(error)
                }
            }

        };
    },
    components: { CommentCard, CommentForm }
};



</script>
<style >
</style>
