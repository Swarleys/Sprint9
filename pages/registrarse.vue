<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsers } from '../stores/users';
import { Users } from "../interfaces/interfaces";
import { useRouter } from 'vue-router';
const storeUsers = useUsers();
const typePassword = ref("password");
const checked = ref(false);
const password = ref("");
const confirmPassword = ref("");
const userEmail = ref("");
const router = useRouter();

const validData = computed(() => {
    return password.value.length > 5 && userEmail.value.length > 5 && password.value === confirmPassword.value;
});

const addUser = () => {
    if (userEmail.value.length > 0 && password.value.length > 0) {

        const userExists = storeUsers.users.find((user) => user.userEmail === userEmail.value);

        if (userExists) {
            alert("This email is already registered.")
        } else {
            const newUser: Users = {
                userEmail: userEmail.value,
                password: password.value
            };
            storeUsers.users = [...storeUsers.users, newUser];
            if (!process.server) {
                localStorage.setItem('users', JSON.stringify(storeUsers.users))
                console.log('There are no errors you will be registered right away.');
                storeUsers.isLogged = true;
                userEmail.value = "";
                password.value = "";
                confirmPassword.value = "";
                router.push('/calcular');
            }
        }
    } else {
        console.log('There are errors, fix them.');
    }
}

</script>
<template>
    <div>
        <h1 class="text-4xl text-center px-4 text-gray-900 mt-20 mb-10">Cree su cuenta.</h1>
        <form @submit.prevent class="flex flex-col max-w-md m-auto gap-3">
            <div class="relative z-0 mb-6 w-full group px-4">
                <input type="email" name="floating_email" v-model="userEmail" id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="floating_email"
                    class="absolute flex text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:fill-blue-600 peer-focus:dark:fill-blue-500 peer-focus:px-4">
                    <svg class="w-5 h-5 mr-1" fill="#2563eb" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email
                    address</label>
            </div>
            <div class="relative z-0 mb-6 w-full group px-4">
                <input :type="typePassword" name="floating_password" v-model="password" id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="floating_password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:px-4">Password</label>
            </div>
            <div class="relative z-0 mb-6 w-full group px-4">
                <input :type="typePassword" name="repeat_password" v-model="confirmPassword"
                    id="floating_confirm_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="floating_confirm_password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:px-4">Confirm
                    password</label>
            </div>

            <label for="showPassword" class="text-gray-900 px-4 mb-6">
                <input id="showPassword" type="checkbox" v-model="checked"
                    @click="!checked ? typePassword = 'text' : typePassword = 'password'" />
                Mostrar Password
            </label>
            <button type="submit"
                class="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg shadow-blue-500 mx-4 hover:bg-blue-600
                hover:shadow-blue-600 disabled:bg-gray-500 hover:disabled:bg-gray-600 disabled:shadow-gray-300 disabled:hover:shadow-gray-400 disabled:cursor-not-allowed"
                :disabled="!validData"
                @click="addUser">
                Registrarse</button>
        </form>
    </div>
</template>


<style scoped>
</style>