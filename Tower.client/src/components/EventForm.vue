<template>

    <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
        <div class="col-12"><b>Create Event:</b></div>
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
        <button class="button-85 col-6 mt-4" role="button">Submit</button>
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
/* <!-- HTML !-->
<button class="button-85" role="button">Button 85</button> */

/* CSS */
.button-85 {
    padding: 0.6em 2em;
    border: none;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-85:before {
    content: "";
    background: linear-gradient(45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
}

@keyframes glowing-button-85 {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

.button-85:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
}
</style>