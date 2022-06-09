<script setup lang="ts">
import { ref, computed } from 'vue';
import Calculator from '../components/Calculator.vue';
import TotalMessage from '../components/TotalMessage.vue';
import { useElectricityPrice } from '../stores/electricityPrice';

const storePrices = useElectricityPrice();

if (storePrices.electricityPrices.length === 0) {
    await storePrices.getElectricityPrices();
}

const listOfCosts = ref([] as number[]);
const total = computed(() => listOfCosts.value.reduce((a: number, b: number): number => a + b, 0));

const addCostDevice = (price: number): void => {
  listOfCosts.value.push(price);
}

</script>

<template>
  <div class="max-w-6xl flex flex-col justify-center items-center m-auto">
    <h1 class="mt-14 mb-8 text-4xl mx-auto w-fit ml-4">Calculadora de consumo de electricidad.</h1>
    <p
      class="mb-4 text-xl self-start mx-auto w-fit ml-4"
    >Aqui podras calcular de manera aproximada el coste de tu factura de la luz para el dia de hoy. Para ello tienes que introducir en el siguiente formulario la potencia del dispositivo electronico que vayas a utilizar, la cantidad de horas que pienses usarlo y por ultimo a que hora piensas comenzar a usarlo.</p>
    <p
      class="mb-4 text-xl self-start mx-auto w-fit ml-4"
    >La calculadora realizara el calculo de consumo de la cantidad de horas en consumo continuo desde la hora inicial indicada.</p>
    <TotalMessage
      class="self-start mx-auto w-fit mb-4 ml-4"
      :elements="listOfCosts.length"
      :total="total"
      v-if="listOfCosts.length > 0"
    /> 
    <Calculator @subCostDevice="addCostDevice" />
  </div>
</template>