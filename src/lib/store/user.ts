import wwsfetch from "$lib/utils/wwsfetch";
import { writable } from "svelte/store";

interface Pfp {
  curr: string;
}
interface User {
  id: number;
  username: string;
  pfp: Pfp
}

export const user = writable<User>()

export function reloadUser() {
  wwsfetch('/users/self', { method: "get" })
    .then(res => res.json())
    .then(data => {
      user.set(data)
    })
    .catch(console.error);
}
