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
      <el-button v-waves class="filter-item" type="primary" @click="handleClear">
        清除
      </el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { clear_viewer } from '../../../../api/nearby'

export default {
  name: 'Index',
  directives: { waves },
  data() {
    return {
      cuid: ''
    }
  },
  methods: {
    handleClear() {
      const params = {
        'uid': this.cuid
      }
      clear_viewer(params).then(response => {
        const res = response
        console.log('res status: ', res.status)
        if (res.status === 'SUCCEED') {
          this.$notify({
            title: '成功',
            message: '清除位置缓存成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '清除位置缓存失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    },
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
