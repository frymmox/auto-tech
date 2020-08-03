<template>
  <div class="main">
    <section class="grid">
      <div class="grid__wrap">
        <range-slider :startValue="10" />
      </div>
    </section>
  </div>
</template>

<script>
  import RangeSlider from '@/components/RangeSlider'

  export default {
    components: {
      RangeSlider
    }
  }
</script>

<style lang="less">
  @import '@/assets/variables.less';

  .grid {
    width: 100%;
    padding-right: @blockGap;
    padding-left: @blockGap;
    padding-top: @blockGap;
    padding-bottom: @blockGap;

    @media (max-width: @breakpoint-sm - 1px) {
      padding-right: @blockGap / 2;
      padding-left: @blockGap / 2;
    }
  }

  .grid__wrap {
    max-width: @elementBase-maxWidth;
    margin-right: auto;
    margin-left: auto;
  }
</style>
