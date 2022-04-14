<script setup lang="ts">
const props = defineProps<{ elements: number, total: number }>();

</script>

<template>
  <div>
      En total has introducido el consumo de {{elements}} aparato{{elements > 1 ? 's' : '' }} electrico{{elements > 1 ? 's' : '' }},  {{elements > 1 ? 'de los cuales' : 'del cual' }} el consumo total es de {{total}}€
  </div>  
</template>