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
        legend: {
          show: true,
          top: 'bottom'
        },
        grid: {
          top: 20,
          bottom: 20,
          left: '10%',
          right: '10%'
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              show: false
            },
            data: props.seriesData
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
