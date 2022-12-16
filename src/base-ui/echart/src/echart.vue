<template>
  <div class="cm-echart">
    <div ref="cmEchartRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from 'vue';
import type { EChartsOption } from 'echarts';
import useEchart from '../hooks/useEchart';

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  setup(props) {
    const cmEchartRef = ref<HTMLElement>();

    onMounted(() => {
      const { setOptions } = useEchart(cmEchartRef.value!);

      watchEffect(() => {
        setOptions(props.options);
      });
    });

    return {
      cmEchartRef
    };
  }
});
</script>

<style lang="scss" scoped></style>
