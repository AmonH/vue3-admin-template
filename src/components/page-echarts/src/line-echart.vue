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
      const xLabels: string[] = [],
        valueList: any[] = [];

      props.seriesData.forEach((item) => {
        xLabels.push(item.name);
        valueList.push(item.value);
      });

      return {
        grid: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xLabels
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: valueList,
            type: 'line',
            areaStyle: {}
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
