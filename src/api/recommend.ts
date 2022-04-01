import request from "@/app/request"

export function recommendByUserId(params: {userId: string, N?: number}) {
  return request({
    url: "/recommend",
    params
  })
}

export function getMovieInfo(params: {movieId: string}) {
  return request({
    url: "/getMovieInfo",
    params
  })
}