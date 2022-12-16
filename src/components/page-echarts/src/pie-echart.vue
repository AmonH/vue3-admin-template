<template>
  <div class="pie-echart">
    <cm-echart :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import CmEchart from '@/base-ui/echart';

import { ISeriesDataType } from '../types';

export default defineComponent({
  components: {
    CmEchart
  },
  props: {
    seriesData: {
      type: Array as PropType<ISeriesDataType[]>,
      required: true
    }
  },
  setup(props) {
    const chartOptions = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'center'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });

    return {
      chartOptions
    };
  }
});
</script>

<style lang="scss" scoped></style>
