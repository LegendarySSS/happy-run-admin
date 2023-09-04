<template>
  <div class="analyze-charts-one"
       ref="analyzeOne">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { rankData } from '@/network/request'
export default {
  data() {
    return {
      zong: [],
      kefu: [],
      dateM: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      rankData().then((res) => {
        console.log(res)
        this.zong = res.data.zong
        this.kefu = res.data.kefu
        this.dateM = res.data.dateM
        this.initEcharts()
      })
    },
    initEcharts() {
      var myChart = echarts.init(this.$refs.analyzeOne)
      var option = {
        title: {
          text: '最近一周趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.kefu,
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateM
        },
        yAxis: {
          type: 'value'
        },
        series: this.zong
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.analyze-charts-one {
  width: 100%;
  height: 350px;
}
</style>
