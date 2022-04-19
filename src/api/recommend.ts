import request from "@/app/request"
export interface MovieInfo {
  id: number;
  poster: string;
  cover: string;
  title_zh: string;
  title_cn: string;
  description: string;
}
type RecommendType =  'Item' | 'User'

export function recommend<T = MovieInfo[]>(params: {userId: string, N?: number}, type: RecommendType){
  return request<T>({
    url: `/recommendBy${type}`,
    params
  });
}

export function hottestMovie<T = MovieInfo[]>() {
  return request<T>({
    url: '/hottestMovieRecommend'
  }) 
}