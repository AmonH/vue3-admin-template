<template>
  <!-- 商品统计 -->
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="7">
        <cm-card title="分类商品数量(饼图)">
          <pie-echart :seriesData="goodsCountData" />
        </cm-card>
      </el-col>
      <el-col :span="10">
        <cm-card title="不同城市商品销量">
          <map-echart :seriesData="cityGoodsSale" />
        </cm-card>
      </el-col>
      <el-col :span="7">
        <cm-card title="分类商品数量(玫瑰图)">
          <rose-echart :seriesData="goodsCountData" />
        </cm-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <cm-card title="分类商品的销量">
          <line-echart :seriesData="goodsSale" />
        </cm-card>
      </el-col>
      <el-col :span="12">
        <cm-card title="分类商品的收藏">
          <bar-echart :seriesData="goodsFavor" />
        </cm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import CmCard from '@/base-ui/card';
import { PieEchart } from '@/components/page-echarts';
import { useStore } from '@/store';
import RoseEchart from '@/components/page-echarts/src/rose-echart.vue';
import LineEchart from '@/components/page-echarts/src/line-echart.vue';
import BarEchart from '@/components/page-echarts/src/bar-echart.vue';
import MapEchart from '@/components/page-echarts/src/map-echart.vue';

export default defineComponent({
  components: {
    CmCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore();
    store.dispatch('analysis/getDashboardDataAction');

    const goodsCountData = computed(() => {
      return store.state.analysis.goodsCount.map((item) => ({
        name: item.name,
        value: item.goodsCount
      }));
    });
    const goodsSale = computed(() => {
      return store.state.analysis.goodsSale.map((item) => ({
        name: item.name,
        value: item.goodsCount
      }));
    });
    const goodsFavor = computed(() => {
      return store.state.analysis.goodsFavor.map((item) => ({
        name: item.name,
        value: item.goodsFavor
      }));
    });
    const cityGoodsSale = computed(() => {
      return store.state.analysis.cityGoodsSale.map((item) => ({
        name: item.address,
        value: item.count
      }));
    });

    return {
      goodsCountData,
      goodsSale,
      goodsFavor,
      cityGoodsSale
    };
  }
});
</script>

<style lang="scss" scoped>
.dashboard {
  background: #eaeaea;
}

:deep .el-row {
  padding-bottom: 20px;
}
</style>
