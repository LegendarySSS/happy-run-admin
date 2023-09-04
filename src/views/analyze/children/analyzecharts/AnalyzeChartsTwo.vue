<template>
  <div class="analyze-charts-one"
       ref="analyzeTwo">

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { consultMajor } from '@/network/request'

export default {
  data() {
    return {
      infoclass: [],
      list: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      consultMajor().then((res) => {
        this.infoclass = res.data.infoclass
        this.list = res.data.list
        this.initEcharts()
      })
    },
    initEcharts() {
      var myChart = echarts.init(this.$refs.analyzeTwo)
      var option = {
        title: {
          text: '服务分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          bottom: 0,
          data: this.infoclass
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
