import type {User} from "@/store/modules/user"
import type {Permission} from "@/store/modules/permission"
export default interface RootStateTypes {
  collapsed: boolean;
  favoriteUpdated: boolean;
  movieUpdated: boolean;
}

export interface AllStoreTypes extends RootStateTypes {
  user: User,
  permission: Permission,
}