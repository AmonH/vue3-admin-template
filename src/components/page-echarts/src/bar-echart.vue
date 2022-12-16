<template>
  <div class="pie-echart">
    <cm-echart :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import * as echarts from 'echarts';

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
          data: xLabels,
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: valueList
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
