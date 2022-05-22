<script lang="ts" setup>
import {
  NCard,
  NSpace,
  NTag,
  NA,
  NPageHeader,
  NH3,
  NText,
  NIcon,
  NNumberAnimation,
  NStatistic,
} from "naive-ui";
import {IosSad} from "@vicons/ionicons4";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { useUserInfo } from "@/hooks/store";
import { watchedMovieTags, watchedMovieStatistic } from "@/api/user";
import { movieTagMap } from "@/dicts";

const list = ref<Array<{ id: number; tag_name: string }>>([]);

const statistic = reactive({
  watched: 0,
  laterWatch: 0,
});
const user = useUserInfo();
const router = useRouter();
const handleBack = () => {
  router.back();
};

watchedMovieTags({ userId: user.userId }).then((res) => {
  list.value = res.map(item => {
    return {
      id: item.id,
      tag_name: movieTagMap[item.tag_name],
    };
  });
});

watchedMovieStatistic({
  userId: user.userId,
}).then((res) => {
  statistic.watched = res.watched;
  statistic.laterWatch = res.laterWatch;
});
const jump = () => {
  router.push({ name: "EditProfile" });
};
</script>
<template>
  <n-card>
    <n-page-header subtitle="让别人更懂你" @back="handleBack">
      <template #title>
        <a style="text-decoration: none; color: inherit">个人资料</a>
      </template>
    </n-page-header>
    <n-h3>
      <n-text v-if="user.userName"> 欢迎, {{ user.userName }} </n-text>
      <n-text v-else>
        <n-icon :component="IosSad" />
         额......或许你应该<n-a @click="jump">取个响亮的名字</n-a>?
      </n-text>
    </n-h3>
    <n-space vertical>
      <n-card>
	    <n-space>
		  <n-tag v-for="item of list" :key="item.id">
			{{ item.tag_name }}
	  	  </n-tag>
		</n-space>
      </n-card>

      <n-statistic label="你一共观看了" tabular-nums>
        <n-number-animation
          :from="0"
          :to="statistic.watched"
        />
        <template #suffix> 部电影 </template>
      </n-statistic>

      <n-statistic label="收藏夹里还有" tabular-nums>
        <n-number-animation
          :from="0"
          :to="statistic.laterWatch"
        />
        <template #suffix> 部电影未观看,请记得观看哦~</template>
      </n-statistic>
    </n-space>
  </n-card>
</template>

<style lang="scss"></style>
