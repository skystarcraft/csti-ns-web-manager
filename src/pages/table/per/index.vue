<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div>人员管理</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="uid"
        label="学号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="usex"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类别0-普通用户，1-会员，2-组内成员,3-超级管理员"
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
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">提升为小组成员</el-button>
          <!-- <el-button @click="del(scope.row)"type="primary" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TablePer',
  data() {
    return {
      tableData: [],
      user: {
        uid: '',
        user_name: '',
        usex: '',
        type: '',
        user_birth: '',
        user_address: '',
        user_class: '',
        user_phone: '',
        user_mail: ''
      },
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    edit(row) {
      this.$axios.get('/manager/changeuser/' + row.uid).then(res => {
        if (res.data.code === 200) {
          this.$message({message: res.data.msg, type: 'success'});
          this.getAll();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getAll() {
      this.$axios.get('/manager/allusers').then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          // console.log(res.data.data);
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
