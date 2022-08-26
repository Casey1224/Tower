<template>

    <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
        <div class="col-12">Create event</div>
        <div class="col-6">
            <label for="" class="form-label">Name</label>
            <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
        </div>
        <div class="col-6">
            <label for="" class="form-label">Capacity</label>
            <input type="text" v-model="editable.capacity" class="form-control" name="name" id="name">
        </div>
        <div class="col-6">
            <label for="" class="form-label">Description</label>
            <input type="text" v-model="editable.description" class="form-control" name="name" id="name">
        </div>
        <div class="col-6">
            <label for="" class="form-label">Location</label>
            <input type="text" v-model="editable.location" class="form-control" name="name" id="name">
        </div>
        <div class="col-6">
            <label for="" class="form-label">Start Date</label>
            <input type="text" v-model="editable.startDate" class="form-control" name="name" id="name">
        </div>
        <div class="col-6">
            <label for="" class="form-label">Cover Image</label>
            <input type="url" v-model="editable.coverImg" class="form-control" name="name" id="name"
                aria-describedby="helpId" placeholder="">
        </div>
        <div class="col-6">
            <label for="" class="form-label ">Type</label>
            <select v-model="editable.type" name="" id="" class="form-control">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>

            </select>
        </div>
        <button class="col-6 btn btn-success">Submit</button>
    </form>

</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsServices.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async handleSubmit() {
                try {
                    editable.value.eventId = route.params.eventId
                    logger.log('creating event', editable.value)
                    await eventsService.createEvent(editable.value)
                    Pop.toast('event created!')
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