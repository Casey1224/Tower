<template>
    <div class="modal fade" id="create-event" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-body">
                    <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
                        <div class="col-12">Create event</div>
                        <div class="col-6">
                            <label for="" class="form-label">Name</label>
                            <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
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
                </div>

            </div>
        </div>
    </div>



</template>
<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsServices';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async handleSubmit() {
                try {
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