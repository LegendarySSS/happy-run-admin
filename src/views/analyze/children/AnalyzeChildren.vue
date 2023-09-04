<template>
  <div class="analyze-children">
    <el-card shadow="never"
             class="analyze-children-card"
             ref="analyze">
      <el-row>
        <el-col :span="16">
          <i class="el-icon-s-data"></i>
          <span class="analyze-children-title">用户数据分析</span>
        </el-col>
        <!-- <el-col :span="8">
                   <el-date-picker
                    v-model="dataPicker"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                    </el-date-picker>
              </el-col> -->
      </el-row>
    </el-card>
    <el-card shadow="never"
             class="analyze-chart">
      <el-row>
        <el-col :span="8">
          <analyze-charts-one></analyze-charts-one>
        </el-col>
        <el-col :span="8">
          <analyze-charts-two></analyze-charts-two>
        </el-col>
        <el-col :span="8">
          <analyze-charts-three></analyze-charts-three>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import AnalyzeChartsOne from './analyzecharts/AnalyzeChartsOne.vue'
import AnalyzeChartsTwo from './analyzecharts/AnalyzeChartsTwo.vue'
import AnalyzeChartsThree from './analyzecharts/AnalyzeChartsThree.vue'
export default {
  components: {
    AnalyzeChartsOne,
    AnalyzeChartsTwo,
    AnalyzeChartsThree
  },
  data() {
    return {
      dataPicker: ''
    }
  },
  watch: {
    dataPicker(val) {
      console.log(val)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.analyze-children {
  .analyze-children-card {
    font-size: 20px;
    color: #4c9fff;
    .analyze-children-title {
      padding-left: 10px;
    }
  }
  .analyze-chart {
    margin-top: 30px;
    height: 500px;
  }
}
</style>
