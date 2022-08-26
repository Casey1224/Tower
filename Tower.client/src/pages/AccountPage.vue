<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>

    <h6>My Events:</h6>

  </div>
  <div class="row">
    <div class="col-3" v-for="e in myTickets" :key="e.id">
      <EventCard :event="e.event" />
    </div>

  </div>

</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'

import EventCard from '../components/EventCard.vue'
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
export default {
  name: "Account",
  setup() {

    async function getTicketEventsByAccount() {
      let account = AppState.account
      await ticketsService.getTicketEventsByAccount(account.id)
      logger.log('got tickets events by account')

    }
    onMounted(async () => {
      getTicketEventsByAccount()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.ticketEvents),


    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
