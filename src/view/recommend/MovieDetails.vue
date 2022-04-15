<script lang="ts" setup>
import { NCard, NText, NRate } from "naive-ui";
import { ref } from "vue";
import cover from "/halo_cover.jpg";
import poster from "/halo_poster.jpg"

interface Props {
  id: string;
}
defineProps<Props>();

const rate = ref(0);
const handleChangeRate = (val: number) => {
  rate.value = val
}
</script>
<template>
  <n-card>
    <!-- <n-gradient-text>电影详情页: {{ id }}</n-gradient-text> -->
    <!-- <img class="poster" :src="poster"/> -->
    <div class="container">
      <div class="poster" :style="`background-image: url(${poster})`">
      </div>
      <div class="movie-info-container">
        <img class="cover" :src="cover"/>
        <div class="text-container">
          <span>光环</span>
          <span>动作冒险</span>
          <p>剧情简介</p>
          <p>一场史诗般的26世纪人类与被称为‘星盟’的外来威胁间的冲突。改编自同名游戏。《光晕》系列讲述了26世纪时，人类与外星种族之间的史诗级宇宙战争。核心人物士官长Master Chief，他是人类阻止外星大军「星盟」毁灭文化的唯一希望。16岁的Quan Ah，精明﹑胆大的她在殖民星的关键时刻遇上士官长。Catherine Halsey博士创造了超级士兵 - 斯巴达战士，人造智能Cortana可能是人类能否生存下去的关键，Soren-066是个道德观复杂的私掠船船长，即将与在军中时的军士长兼前好友士官长有所冲突。Margaret Parangosky上将是美国海军情报局的领导。斯巴达战士Vannak-134，有强化神经机器的他是个童年时期就被征召的超级士兵，士官长的副手斯巴达战士Riz-028，她是个专注﹑专业的士兵，犹如杀戮机器一般，还有有胆识﹑好奇心重的斯巴达战士新人Kai-125。</p>
          <p>看过这部电影？ 给个<n-text type="success">评分吧</n-text></p>
          <n-rate allow-half :value="rate" :on-update:value="handleChangeRate"/>
        </div>
      </div>
    </div>
    
  </n-card>
</template>

<style lang="scss" scoped>
.container {
  height: 500px;
  position: relative;
}
.poster {
  height: 100%;
  width: 100%;
  background: no-repeat center top / cover;
  filter: brightness(0.2);
  position: absolute;
}
.movie-info-container {
  display: flex;
  padding: 0 80px;
  justify-content: center;
  // align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .cover {
    display: block;
    transform: scale(.8);
    border-radius: 15px;
    cursor: pointer;
    transition: .5s;
    height: 100%;
    &:hover {
      cursor: wait;
    }
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    padding: 50px 0;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
