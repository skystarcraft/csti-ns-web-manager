<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div>文章管理</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="aid"
        label="文章id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="article_title"
        label="标题"
        width="500">
      </el-table-column>
      <el-table-column
        prop="article_view"
        label="预览次数"
        width="200">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="作者学号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="adate"
        label="发表日期"
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
  name: 'TableArticle',
  data() {
    return {
      tableData: [],
      article: {
        aid: '',
        article_title: '',
        article_view: '',
        uid: '',
        adata: '',
      },
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    edit(row) {
      console.log(row.aid);
    },
    del(row) {
      this.$axios.delete('/manager/article/' + row.aid).then(res => {
        if (res.data.code === 200) {
          this.$message({message: res.data.msg, type: 'success'});
          this.getArticles();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getArticles() {
      this.$axios.get('/manager/articles').then(res => {
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
