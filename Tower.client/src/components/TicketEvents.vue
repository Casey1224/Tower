<template>

    <div class="bg-dark p-2 rounded">
        <img class="img-fluid" :src="ticket.event.coverImg" alt="">
        <h4 class="text-center">{{ ticket.event.name }}</h4>
        <button class="btn btn-danger" @click="removeTicket"><i class="mdi mdi-delete-forever"></i></button>
    </div>



</template>
<script>
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';

export default {
    props: { ticket: { type: Object, required: true } },
    setup(props) {
        return {
            async removeTicket() {
                try {
                    await ticketsService.removeTicket(props.ticket.id)
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