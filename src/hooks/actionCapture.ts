import { updateRating } from "@/api/movie";
import useStore from "@/hooks/store";
type capture = (
  movied: number,
  delay?: number,
  value?: number
) => [() => void, () => void, (implicit?: number) => void];
/**
 * 返回开始计时器和终止计时器, 计时器结束后发送隐反馈数据
 * @param movieId 电影id
 * @param delay 倒计时长,单位是`ms`
 * @param value 隐反馈分值, 取值区间`[1,5]`, 默认是`1`, 可取小数
 * @returns [start, end]
 */
const useActionCapture: capture = (movieId, delay = 2000, value = 1) => {
  const store = useStore();
  let timer = -1;

  const timeoutStart = () => {
    timer = setTimeout(() => {
      timer = -1;
      // 鼠标悬停超过1.5s, 认为用户对其有兴趣
      updateImplicitRating();
    }, delay) as unknown as number;
  };
  const timeoutEnd = () => {
    if (timer !== -1) {
      clearTimeout(timer);
      timer = -1;
    }
  };
  const updateImplicitRating = (implicit = value) => {
    updateRating({
      userId: store.getters["user/userId"],
      movieId,
      implicitRating: implicit,
    });
  };
  return [timeoutStart, timeoutEnd, updateImplicitRating];
};

export default useActionCapture;
