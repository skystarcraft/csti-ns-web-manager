<template>
  <ui-container>
    <div slot="header">CSTI-NS报名信息</div>
    <div>报名状况一览</div>
    <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="uid"
      label="学号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="usex"
      label="性别，1-男，0-女"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user_birth"
      label="生日"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user_address"
      label="入学前地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="user_class"
      label="班级"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user_phone"
      label="手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user_mail"
      label="邮箱"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'Home',
  created () {
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      tableData: [],
      user: {
        uid: '',
        user_name: '',
        usex: '',
        user_birth: '',
        user_address: '',
        user_class: '',
        user_phone: '',
        user_mail: ''
      },
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    getUsers() {
      this.$axios.get('/manager/apply').then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  },
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
