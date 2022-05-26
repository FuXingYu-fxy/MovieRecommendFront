import type {User} from "@/store/modules/user"
export default interface RootStateTypes {
  collapsed: boolean;
  favoriteUpdated: boolean;
  movieUpdated: boolean;
}

export interface AllStoreTypes extends RootStateTypes {
  user: User
}