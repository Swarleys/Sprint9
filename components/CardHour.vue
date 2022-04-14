<script setup lang="ts">
import { useElectricityPrice } from '../stores/electricityPrice';
const storePrices = useElectricityPrice();
</script>

<template>
	<section class="m-6 sm:m-auto md:min-w-[700px] lg:max-w-[976px]">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mx-6">
			<div
				class="px-4 py-2 max-w-s bg-white rounded-xl shadow-xl overflow-hidden flex flex-row items-center justify-center flex-grow"
				v-for="({ hour, formattedHour, price, zone, expensive, color }) in storePrices.electricityPrices"
				:key="hour"
			>
				<div class="flex flex-row flex-1 pr-2">
					<span class="text-s leading-5 font-semibold">{{ formattedHour }}h</span>
					<span class="text-s leading-5 font-semibold ml-2">{{ zone }}</span>
				</div>
				<div class="flex flex-row">
					<span
						class="flex text-s leading-5 font-semibold rounded-md content-around items-center justify-center"
					>{{ price }} €/kWh</span>
					<span
						:class="color === 'green' ? 'bgGreen' : color === 'yellow' ? 'bgYellow' : 'bgRed'"
						class="px-3 py-1 flex text-s leading-5 font-semibold rounded-md items-center justify-center ml-2 min-w-[50px]"
					>{{ expensive }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style>

</style>