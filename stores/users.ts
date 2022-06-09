import { Users } from "../interfaces/interfaces";
import { defineStore } from "pinia";

export const useUsers = defineStore('users', {
    state: () => ({
        users: [] as Users[],
        isLogged: false,
    }),
    actions: {
        singInUser() {
            const userExists = this.users.find((user) => user.userEmail === this.userEmailLogIn);

            if (userExists) {
                if (this.passwordLogIn === userExists.password) {
                    console.log(`Correct user, welcome back ${userExists.firstName}`);
                    this.isLogged = true;
                    this.resetLogIn()
                } else {
                    console.log("Introduce un usuario valido.");
                }
            } else {
                alert("Introduce un usuario valido.");
            }
        },
        logOut() {
            this.isLogged = false;
        },
    }
})
