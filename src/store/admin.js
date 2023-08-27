import {writable} from 'svelte/store';
 
let initialAdmin = false;

const adminStore = writable(initialAdmin);

function changeAdmin(){
    adminStore.update(admin => {
        return !admin;
    });
}

export default {
    subscribe: adminStore.subscribe,
    changeAdmin
};