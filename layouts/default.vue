<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import { useRouter } from 'vue-router';
import { useUsers } from '../stores/users';
const storeUsers = useUsers();
const router = useRouter();

const getUsers = () => {
    if (storeUsers.users.length === 0 && !process.server) {
        storeUsers.users = JSON.parse(localStorage.getItem("users") || "[]");
    }
}

onMounted(() => {
    getUsers();
});

router.beforeEach((to, from) => {
	if (to.path === '/calcular' && !storeUsers.isLogged) {
		return '/iniciar'
	}
})

</script>

<template>
	<section>
		<NavBar />
		<slot />
		<Footer />
	</section>
</template>

<style>
</style>