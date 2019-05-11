<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div>资源管理</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="rid"
        label="资源id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="rname"
        label="资源名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="rscore"
        label="资源所耗积分"
        width="200">
      </el-table-column>
      <el-table-column
        prop="rdownload"
        label="下载次数"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ruid"
        label="上传用户学号"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <!-- <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button> -->
          <el-button @click="del(scope.row)"type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TableRes',
  data() {
    return {
      tableData: [],
      res: {
        rid: '',
        rname: '',
        rscore: '',
        rdownload: '',
        ruid: '',
      },
    }
  },
  mounted() {
    this.getRes();
  },
  methods: {
    edit(row) {
      console.log(row.rid);
    },
    del(row) {
      this.$axios.delete('/res/res/' + row.rid).then(res => {
        if (res.data.code === 200) {
          this.$message({message: res.data.msg, type: 'success'});
          this.getRes();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getRes() {
      this.$axios.get('/res/allres').then(res => {
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
