<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="uid"
        placeholder="用户ID"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" @click="handleClear">
        查询
      </el-button>
    </div>

    <el-dialog title="常用位置" :visible.sync="showDialog">
      <el-table :data="positionArray">
        <el-table-column prop="country" label="国家"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="time" label="时间" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { weibo_position } from '../../../../api/nearby'
import { formatDate } from '@/utils/formatDate'

export default {
  name: 'Index',
  directives: { waves },
  filters: {
    formatDateFilter(time) {
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  data() {
    return {
      uid: '',
      showDialog: false,
      positionArray: [],
      position: {
        time: '',
        isIp: '',
        country: '',
        province: '',
        city: ''
      }
    }
  },
  methods: {
    handleClear() {
      const params = {
        'uid': this.uid,
        'access_key': 'lvzhou20200709',
        'type': '1',
        'deep': '3'
      }
      weibo_position(params).then(response => {
        const res = response
        if (res.status === 'SUCCEED') {
          this.positionArray = []
          // this.position.city = res.data
          if (res.data) {
            this.position.city = res.data['city']
            this.position.time = this.getYMDHMS(res.data['time'])
            this.position.country = res.data['country']
            this.position.province = res.data['province']
            this.positionArray.push(this.position)
            this.showDialog = true
          } else {
            this.showDialog = true
          }
        } else {
          this.$notify({
            title: '失败',
            message: '查询微博常用位置失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    // 使用es6的padStart()方法来补0
    getYMDHMS(timestamp) {
      const time = new Date(timestamp * 1000)
      const year = time.getFullYear()
      const month = (time.getMonth() + 1).toString().padStart(2, '0')
      const date = (time.getDate()).toString().padStart(2, '0')
      const hours = (time.getHours()).toString().padStart(2, '0')
      const minute = (time.getMinutes()).toString().padStart(2, '0')
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
    },
    handleFilter() {
      this.getWaterDetail(this.uid)
    },
    getWaterDetail() {
      console.log('kobe')
    }
  }
}
</script>

<style scoped>

</style>
