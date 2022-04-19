import request from "@/app/request";
interface Params {
  userId: number;
  movieId: number;
  rating?: number;
}
interface Rating {
  rating: number;
}
export function queryRating<T = Rating>(params: Params) {
  return request<T>({
    url: '/queryRating',
    params
  })
}

export function updateRating(params: Params) {
  return request({
    url: '/updateRating',
    data: params,
    method: 'post'
  })
}