<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Ticket Events</h2>
      </div>
      <div v-for="t in ticketEvents" :key="t.id" class="col-3">
        <TicketEvent :ticket="t" />
      </div>

    </div>
    <div class="row bg-dark py-1 px-5 text-light">
      <div class="col-12">
        <h2>Popular Events</h2>
      </div>
      <div class="col-12">
        filter <i class="mdi mdi-filter"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'sport'">Sport</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'digital'">Digital</div>

    </div>
    <div class="masonry bg-dark">
      <div class="" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { eventsService } from '../services/EventsServices';
import EventCard from '../components/EventCard.vue';
import ticketEvents from '../components/ticketEvents.vue';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService';

export default {
  name: 'Home',
  setup() {
    const filterTerm = ref('')
    async function getEvents() {
      try {
        await eventsService.getAll();
      } catch (error) {
        Pop.error(error)
      }
    }
    // async function getTicketEvents() {
    //   try {
    //     await ticketsService.getTicketEventsByAccount()
    //   } catch (error) {
    //     Pop.error(error)

    //   }
    // }
    onMounted(async () => {
      getEvents();
      // getTicketEvents();
    })
    return {
      filterTerm,
      events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true)),
      // ticketEvents: computed(() => AppState.ticketEvents)
    }
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.masonry {
  columns: 200px;
  column-gap: 1em;

  div {
    display: block;
    margin-bottom: 1em;
  }
}
</style>
