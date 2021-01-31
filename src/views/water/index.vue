<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="cuid"
        placeholder="用户ID"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  name: 'Index',
  directives: { waves },
  data() {
    return {
      cuid: ''
    }
  },
  methods: {
    handleFilter() {
      this.getWaterDetail(this.cuid)
    },
    getWaterDetail() {
      console.log('kobe')
    }
  }
}
</script>

<style scoped>

</style>
