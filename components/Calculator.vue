<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElectricityPrice } from '../stores/electricityPrice';
const storePrices = useElectricityPrice();
const kwh = ref(0);
const startingHour = ref(0);
const manyHours = ref(0);
const precio = computed(() => storePrices.electricityPrices.slice(Number(startingHour.value), Number(startingHour.value) + manyHours.value).
    map(({ price }) => Number(price) * kwh.value / 1000).reduce((a: number, b: number): number => (a + b), 0)
);

const precioToFixed = computed(() => Number(precio.value.toFixed(2)));

const emits = defineEmits<{
    (e: 'subTotalPrice', subTotal: number): void,
}>();

const sendEvent = () => {
    precio.value > 0 ? emits('subTotalPrice', precioToFixed.value) : '';
}


</script>


<template>
    <div class="flex flex-col justify-center items-center gap-3 mt-5">
        <div>
            <div>
                <label for="khw" class="block">Cuantos W consume:</label>
                <input type="number" name="kwh" id="kwh" v-model="kwh" />
            </div>
            <div>
                <label for="manyHours" class="block">Cuantas horas lo tendras encendido:</label>

                <input type="number" name="manyHours" id="manyHours" v-model="manyHours" />
            </div>
            <div class="mb-5">
                <label for="startingHour" class="block">Hora a la que comenzaras a usarlo:</label>
                <select name="startingHour" id="startingHour" v-model="startingHour">
                    <option
                        v-for="{ price, formattedHour, hour }  in storePrices.electricityPrices"
                        :value="hour"
                    >{{ formattedHour }} - {{ price }}KWh/€</option>
                </select>
            </div>
            <button @click="sendEvent">Añadir consumo de producto.</button>
            <p v-if="precio" class="mb-5 p-5">Costaria un total de {{ precioToFixed }}€</p>
        </div>
    </div>
</template>


<style scoped>
</style>