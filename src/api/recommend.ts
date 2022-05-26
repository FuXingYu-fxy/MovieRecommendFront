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

export function recommend<T = MovieInfo[]>(params: {userId: string, N?: number, type: RecommendType, flag: boolean}){
  const {type = 'User', flag = false, ...args} = params;
  return request<T>({
    url: `/recommendBy${type}`,
    params: args,
  }, flag);
}

export function hottestMovie<T = MovieInfo[]>() {
  return request<T>({
    url: '/hottestMovieRecommend'
  }) 
}