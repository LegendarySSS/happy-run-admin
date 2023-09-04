<template>
  <div class="analyze-charts-one" ref="analyzeThree">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { serviceEnter } from '@/network/request'
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      serviceEnter().then((res) => {
        this.kefu = res.data.kefu
        this.num = res.data.num
        this.initEcharts()
      })
    },
    initEcharts () {
      var myChart = echarts.init(this.$refs.analyzeThree)
      var option = {
        title: {
          text: '客服录入统计',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.kefu
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.num,
            type: 'bar'
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
  .analyze-charts-one{
    width: 100%;
    height: 350px;
  }
</style>
