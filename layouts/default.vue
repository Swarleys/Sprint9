<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
	<section>
		<NavBar />
		<slot/>
		<Footer/>
	</section>
</template>

<style>
</style>