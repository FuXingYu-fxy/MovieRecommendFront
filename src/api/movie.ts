import request from "@/app/request";
interface Params {
  userId: string;
  movieId: string;
  rating?: string;
}
interface RequestBody {
  userId: number;
  movieId: number;
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
interface UpdateRating extends RequestBody {
  rating: number;
  implicitRating?: number;
}
interface UpdateImplicitRating extends RequestBody {
  rating?: number;
  implicitRating: number;
}
export function updateRating(body: UpdateRating | UpdateImplicitRating) {
  return request({
    url: '/updateRating',
    data: body,
    method: 'post'
  })
}

export function addUserFavoriteMovie(body: RequestBody) {
  return request({
    url: '/addUserFavoriteMovie',
    method: 'post',
    data: body
  })
}

/**
 * 根据userId查询电影
 */
export function queryFavoriteMovieById<T = any>(params: {id: string}, update = false) {
  // userId
  return request<T>({
    url: '/queryFavoriteMovieById',
    params
  }, update)
}

export function delUserFavoriteMovie(body: RequestBody) {
  return request({
    url: '/delUserFavoriteMovie',
    method: 'post',
    data: body
  })
}

/**
 * 根据userId、MovieId查询电影
 */
export function queryFavoriteMovie<T = any>(body: RequestBody) {
  return request<T>({
    url: '/queryFavoriteMovie',
    method: 'post',
    data: body
  })
}

interface SearchParams {
  key: string;
}

/**
 * 站外搜索
 */
export function outsiteSearch<T = any>(params: SearchParams) {
  return request<T>({
    url: '/outsiteSearch',
    params
  })
}

/**
 * 站内搜索
 */
export function search<T = any>(params: SearchParams) {
  return request<T>({
    url: '/search',
    params,
  })
}

export function getAllTags<T = Array<{id: number, tag_name: string}>>() {
  return request<T>({
    url: '/tag_list',
  })
}