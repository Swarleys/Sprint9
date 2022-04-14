<script setup lang="ts">
const props = defineProps<{ text: string, hour: string, color: string, price: string }>();
</script>

<template>
    <div
        class="px-4 py-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center flex-grow mb-4 max-w-[150px]"
    >
        <p>{{ text }}</p>
        <p>{{ hour }}</p>
        <p
            :class="color === 'green' ? 'bgGreen' : color === 'yellow' ? 'bgYellow' : 'bgRed'"
            class="px-3 py-1 rounded-md"
        >{{ price }} €/kWh</p>
    </div>
</template>

<style scoped>
</style>