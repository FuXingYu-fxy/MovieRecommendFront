import {key} from "@/store/index"
import {useStore as baseUseStore} from "vuex"
import type {AllStoreTypes} from "@/store/interface"

export default function useStore<T = AllStoreTypes>() {
  return baseUseStore<T>(key)
}