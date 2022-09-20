

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
                <h5>Capacity: <b>{{ event.capacity }}</b> </h5>
                <p>Start Date: <b>{{ event.startDate }}</b></p>
                <p>description: <b>{{ event.description }}</b></p>
                <p>location: <b>{{ event.location }}</b></p>
                <p>type: <b>{{ event.type }}</b></p>
                <h6 class="text-danger" v-if="event.isCanceled"><b>is Canceled!</b></h6>

            </div>
            <div class="col-2">

                <button v-if="!userOrCanceled" class="btn btn-danger" @click="isCanceled">Cancel Event</button>

            </div>

            <div class="col-2" v-if="!event.isCanceled">

                <button v-if="!isTicket" class="btn btn-info" @click="ticket"><i class="mdi mdi-heart"></i>
                    Get Ticket</button>
                <button v-else class="btn btn-danger" @click="removeTicket"><i class="mdi mdi-heart-broken"></i>
                    Remove Ticket</button>

            </div>
            <!-- <div class="col-12 d-flex bg-grey p-0">

                <p>Attending:</p>
                <div v-for="t in ticketProfiles" class="col-1 m-2">
                    <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
                    <p></p>
                </div>



            </div> -->
        </div>
        <div class="row bg-grey ">

            <p>Attending:</p>
            <div v-for="t in ticketProfiles" class="col-1 m-2">
                <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
                <p></p>
            </div>



        </div>

        <CommentForm />
        <div class="row m-3">
            <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
            <!-- <button v-if="comment" class="btn btn-info" @click="removeComment"><i class="mdi mdi-heart-broken"></i>
                remove comment</button> -->
        </div>


    </div>
</template>
<script>
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsServices.js';
import { commentsService } from '../services/CommentsService.js';
import { ticketsService } from '../services/TicketsService.js';
import CommentCard from '../components/CommentCard.vue';
import CommentForm from '../components/CommentForm.vue';
import Pop from '../utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';

export default {
    setup() {
        const route = useRoute();
        async function getEventsById() {
            try {
                await eventsService.getById(route.params.eventId);
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
        // async function getCommentProfiles() {
        //     try {
        //         await commentsService.getCommentProfilesByEvent(route.params.eventId)
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }

        onMounted(() => {
            getEventsById();
            getCommentsByEventId();
            getTicketProfiles();
            // getCommentProfiles()
        });

        return {
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            ticketProfiles: computed(() => AppState.ticketProfiles),
            // commentProfiles: computed(() => AppState.commentProfiles),

            userOrCanceled: computed(() => {
                if (AppState.activeEvent.isCanceled || AppState.activeEvent.creatorId !== AppState.account.id) {
                    return true
                }

            }),
            isTicket: computed(() => {
                if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
                    return true
                }
                return false


            }),
            async ticket() {
                try {
                    // if (this.event.isCanceled = false)

                    let newTicket = {
                        eventId: AppState.activeEvent.id,

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
            },
            async isCanceled() {
                try {
                    // let cancelEvent = AppState.activeEvent.find(e => e.accountId == AppState.account.id)
                    if (await Pop.confirm('are you sure you want to cancel?')) {
                        await eventsService.isCanceled(AppState.activeEvent.id)
                    }
                } catch (error) {
                    logger.error(error)
                }
            }





            // async removeComment() {
            //     try {
            //         let commentRemove = AppState.commentProfiles.find(c => c.accountId == AppState.account.id)
            //         await commentsService.removeComment(commentRemove.id)
            //     } catch (error) {
            //         Pop.error(error)
            //     }
            // }

        };
    },
    components: { CommentCard, CommentForm }
};



</script>
<style >

</style>
