<script setup lang="ts">
import { ref, computed } from 'vue';
import Calculator from '../components/Calculator.vue';
import TotalMessage from '../components/TotalMessage.vue';

const listOfCosts = ref([] as number[]);
const total = computed(() => listOfCosts.value.reduce((a: number, b: number): number => a + b, 0));

const show = (price: number): void => {
  listOfCosts.value.push(price);
}

</script>

<template>
  <div class="max-w-6xl flex flex-col justify-center items-center m-auto">
    <h2 class="mt-14 mb-8 text-4xl">Calculadora de consumo de electricidad.</h2>

    <p
      class="mb-4 text-xl self-start"
    >Aqui podras calcular de manera aproximada el coste de tu factura de la luz para el dia de hoy. Para ello tienes que introducir en el siguiente formulario la potencia del dispositivo electronico que vayas a utilizar, la cantidad de horas que pienses usarlo y por ultimo a que hora piensas comenzar a usarlo.</p>
    <p
      class="mb-4 text-xl self-start"
    >La calculadora realizara el calculo de consumo de la cantidad de horas en consumo continuo desde la hora inicial indicada.</p>
    <TotalMessage
      class="self-start"
      :elements="listOfCosts.length"
      :total="total"
      v-if="listOfCosts.length > 0"
    /> 
    <Calculator class="self-start" @subTotalPrice="show" />
  </div>
</template>