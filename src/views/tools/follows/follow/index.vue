<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="uid"
        placeholder="用户id"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="uid" label="uid"></el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="followerCount" label="粉丝"></el-table-column>
      <el-table-column prop="followingCount" label="关注"></el-table-column>
<!--      <el-table-column prop="avatar" label="头像" width="150"></el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary">添加粉丝</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">添加关注</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加关注" :visible.sync="dialogFollow">
      <el-form
        :model="followForm"
        label-position="left"
        label-width="80px"
        style="width: 200px; margin-left:50px;">
        <el-form-item label="关注数: ">
          <el-input v-model="followForm.followNum" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="文件上传: ">
          <el-button size="small" type="primary" @click="uploadFollow">点击上传</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFollow = false">取 消</el-button>
        <el-button type="primary" @click="addFollow()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加粉丝" :visible.sync="dialogFollowing">
      <el-form
        :model="followForm"
        label-position="left"
        label-width="80px"
        style="width: 200px; margin-left:50px;"
      >
        <el-form-item label="粉丝数: ">
          <el-input v-model="followForm.followNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件上传: ">
          <el-button size="small" type="primary" @click="uploadFollow">点击上传</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFollowing = false">取 消</el-button>
        <el-button type="primary" @click="addFollowing()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get_timeline_user } from '../../../../api/timeline'
import { follow_create, following_create } from '../../../../api/friendship'

export default {
  data() {
    return {
      followForm: {
        uid: '',
        followNum: ''
      },
      params: {
        uid: '',
        followNum: ''
      },
      dialogFollow: false,
      dialogFollowing: false,
      uid: '',
      listLoading: false,
      tableData: [],
      user: {
        uid: '',
        name: '',
        followerCount: '',
        followingCount: '',
        avatar: ''
      }
    }
  },
  methods: {
    // 添加关注
    addFollow() {
      this.params.uid = this.uid
      this.params.followNum = this.followForm.followNum
      follow_create(this.params).then(response => {
        if (response.status === 'SUCCEED') {
          this.dialogFollow = false
          this.$message.success('添加关注成功')
        } else {
          this.$message.error(response.errorMessage)
        }
      })
    },
    // 添加粉丝
    addFollowing() {
      this.params.uid = this.uid
      this.params.followNum = this.followForm.followNum
      following_create(this.params).then(response => {
        if (response.status === 'SUCCEED') {
          this.dialogFollowing = false
          this.$message.success('添加粉丝成功')
        } else {
          this.$message.error(response.errorMessage)
        }
      })
    },
    uploadFollow() {
      this.$message.error('抱歉，暂未开放')
    },
    handleEdit(index, row) {
      this.dialogFollowing = true
      // console.log(row)
    },
    handleDelete(index, row) {
      this.dialogFollow = true
      // console.log(index, row)
    },
    handleFilter() {
      this.listLoading = false
      const param = {
        cuid: this.uid,
        ouid: this.uid
      }
      get_timeline_user(param).then(response => {
        if (response.status === 'SUCCEED') {
          this.tableData = []
          if (response.data) {
            this.user.uid = this.uid
            this.user.name = response.data['name']
            this.user.avatar = response.data['avatar']
            this.user.followerCount = response.data['followerCount']
            this.user.followingCount = response.data['followingCount']
            this.tableData.push(this.user)
          }
        } else {
          this.$notify({
            title: '失败',
            message: '查询用户个人信息失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
      console.log('uid: ', this.uid)
    }
  }
}
</script>
