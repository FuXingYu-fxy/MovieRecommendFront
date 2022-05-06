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

export function addUserFavoriteMovie(params: Params) {
  return request({
    url: '/addUserFavoriteMovie',
    method: 'post',
    data: params
  })
}

export function queryFavoriteMovieById<T = any>(params: {id: number}, update = false) {
  // userId
  return request<T>({
    url: '/queryFavoriteMovieById',
    params
  }, update)
}

export function delUserFavoriteMovie(params: Params) {
  return request({
    url: '/delUserFavoriteMovie',
    method: 'post',
    data: params
  })
}

export function queryFavoriteMovie<T = any>(params: Params) {
  return request<T>({
    url: '/queryFavoriteMovie',
    method: 'post',
    data: params
  })
}