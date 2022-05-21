import {key} from "@/store/index"
import {useStore as baseUseStore} from "vuex"
import type {AllStoreTypes} from "@/store/interface"

export default function useStore<T = AllStoreTypes>() {
  return baseUseStore<T>(key)
}

export function useUserInfo(): {
  userId: number;
  userName: string;
  account: string;
} {
  const store = useStore();
  return {
    userId: store.getters["user/userId"],
    userName: store.getters["user/userName"],
    account: store.getters["user/account"],
  }
}