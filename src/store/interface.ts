import type {User} from "@/store/modules/user"
export default interface RootStateTypes {
  collapsed: boolean;
}

export interface AllStoreTypes extends RootStateTypes {
  user: User
}