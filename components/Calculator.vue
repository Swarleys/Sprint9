<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElectricityPrice } from '../stores/electricityPrice';
const storePrices = useElectricityPrice();

const kwh = ref(0);
const startingHour = ref(new Date().getHours());
const manyHours = ref(0);
const price = computed(() => storePrices.electricityPrices.slice(Number(startingHour.value), Number(startingHour.value) + manyHours.value).
    map(({ price }) => Number(price) * kwh.value / 1000).reduce((a: number, b: number): number => (a + b), 0)
);

const priceToFixed = computed(() => Number(price.value.toFixed(2)));

const emits = defineEmits<{
    (e: 'subCostDevice', subTotal: number): void,
}>();

const sendCostDevice = () => {
    price.value > 0 ? emits('subCostDevice', priceToFixed.value) : 0;
    manyHours.value = 0;
    kwh.value = 0;
}

const maxHours = 24 - startingHour.value;
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-3 mt-5 self-center w-full md:w-2/3 pr-4 pl-4">
        <div class="relative z-0 mb-6 w-full group">
            <input type="number" name="floatingWConsume" id="floatingWConsume" v-model="kwh" step="100" min="0"
                class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
            <label for="floatingWConsume"
                class="absolute text-xl text-gray-500 pb-1 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6">Cuantos
                W consume:</label>
        </div>
        <div class="relative z-0 mb-6 w-full group">
            <input type="number" name="manyHours" id="manyHours" v-model="manyHours" step="1" min="0" :max="maxHours"
                class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" " required />
            <label for="floatingWConsume"
                class="absolute text-xl text-gray-500 pb-1 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6">Cuantas
                horas lo tendras encendido:</label>
        </div>
        <div class="mb-5 w-full group">
            <label for="startingHour" class="block text-gray-500 pb-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Hora a la que comenzaras a usarlo:</label>
            <select name="startingHour" id="startingHour" v-model="startingHour" class="w-full border border-blue-500 p-2 rounded-md">
                <option v-for="{ price, formattedHour, hour }  in storePrices.electricityPrices" :value="hour">{{
                        formattedHour
                }} - {{ price }}KWh/€</option>
            </select>
        </div>

        <button @click="sendCostDevice" :disabled="!price" class="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md shadow-blue-700">Añadir consumo de producto.</button>
    </div>
    <p v-if="price" class="pl-4 mt-5 text-xl self-start">Costaria un total de {{ priceToFixed }}€</p>
</template>

<style scoped>
</style>