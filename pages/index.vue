<script setup lang="ts">
import CardHour from '../components/CardHour.vue';
import PromotedData from '../components/PromotedData.vue';
import { useElectricityPrice } from '../stores/electricityPrice';

const storePrices = useElectricityPrice();

await storePrices.getElectricityPrices();

let userHour = new Date().getHours();
let userMinutes = new Date().getMinutes();
let formatTime = (hour, minutes) => {
    let formattedHour = hour < 10 ? `0${hour}` : hour;
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHour}:${formattedMinutes}h`;
};
let userTime = formatTime(userHour, userMinutes);

let { price, color } = storePrices.electricityPrices.find((hourlyPrice) => hourlyPrice.hour === userHour);
let nextCheapestData = storePrices.electricityPrices.slice(userHour);
let [nextCheapestHour] = nextCheapestData.sort(({ price: a }, { price: b }) => Number(a) - Number(b));
let {
    formattedHour: nextFormattedHour,
    color: nextColor,
    price: nextPrice,
    hour: nextHour
} = nextCheapestHour;
</script>

<template>
    <section class="m-6 sm:m-auto md:min-w-[700px] lg:min-w-5xl">
        <h1 class="text-4xl text-center mt-20 mb-10">Ahorra en electricidad.</h1>
        <section class="flex gap-3 justify-between sm:justify-center">
            <PromotedData :color="color" :price="price" :hour="userTime" text="Hora actual" />
            <PromotedData
                v-if="userHour !== nextHour"
                :color="nextColor"
                :price="nextPrice"
                :hour="`${nextFormattedHour}h`"
                text="Siguiente ahorro"
            />
            <PromotedData v-else :color="color" :price="price" :hour="userTime" text="¡Aprovecha!" />
        </section>
        <p class="px-4 py-2 bg-white rounded-xl shadow-md w-fit my-4 mx-auto">{{ storePrices.electricityPrices[0].day }}</p>
        <CardHour v-if="storePrices.electricityPrices.length > 0" />
    </section>
</template>

<style scoped>
</style>.