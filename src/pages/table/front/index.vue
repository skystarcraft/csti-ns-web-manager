<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div>前台管理</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="组织介绍"
        width="500">
      </el-table-column>
      <el-table-column
        prop="group_code"
        label="群二维码"
        width="300">
      </el-table-column>
      <el-table-column
        prop="gzh"
        label="公众号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="start"
        label="纳新开始时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="end"
        label="纳新结束时间"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <!-- <el-button @click="del(scope.row)"type="primary" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="介绍">
          <el-input v-model="editForm.introduction" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="群二维码">
          <el-input v-model="editForm.group_code" auto-complete="off"></el-input>
          <form action="/res/uploadimg" method="post" enctype="multipart/form-data" name="form1">
              <p>
                  选择文件: <input type="file" name="fileName" />
              </p>
              <p>
                  <input type="submit" value="提交" />
              </p>
          </form>
        </el-form-item>
        <el-form-item label="公众号">
          <el-input v-model="editForm.gzh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纳新开始日期">
          <el-input v-model="editForm.start" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纳新结束日期">
          <el-input v-model="editForm.end" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

  </ui-container>
</template>
<script type="text/javascript">
export default {
  name: 'TableFront',
  data() {
    return {
      tableData: [],
      front: {
        id: '',
        introduction: '',
        group_code: '',
        gzh: '',
        start: '',
        end: ''
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      editForm: {
        id: '',
        introduction: '',
        group_code: '',
        gzh: '',
        start: '',
        end: ''
      },
    }
  },
  mounted() {
    this.getFront();
  },
  methods: {
    edit(row) {
      console.log(row.id);
    },
    getFront() {
      this.$axios.get('/manager/about').then(res => {
        if (res.data.code === 200) {
          this.front = res.data.data;
          this.tableData.push(this.front);
          // console.log(res.data.data);
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 显示编辑界面
   handleEdit(row) {
     this.dialogStatus = 'update'
     this.dialogFormVisible = true
     this.editForm.id = row.id
     this.editForm.introduction = row.introduction
     this.editForm.group_code = row.group_code
     this.editForm.gzh = row.gzh
     this.editForm.start = row.start
     this.editForm.end = row.end
   },
   // 显示新增界面
   handleAdd() {
     this.dialogStatus = 'create'
     this.dialogFormVisible = true
   },
   // 编辑
   updateData() {
     this.$axios.put('/manager/about', {
       id: this.editForm.id,
       introduction: this.editForm.introduction,
       group_code: this.editForm.group_code,
       gzh: this.editForm.gzh,
       start: this.editForm.start,
       end: this.editForm.end
     }).then(res => {
       if (res.data.code === 200) {
         this.$message({message: res.data.msg, type: 'success'});
         this.dialogFormVisible = false
         this.front = res.data.data;
         this.tableData = [];
         this.tableData.push(this.front);
         this.editForm.introduction = ''
         this.editForm.group_code = ''
         this.editForm.gzh = ''
         this.editForm.start = ''
         this.editForm.end = ''
       } else {
         this.$message.error(res.data.msg);
       }
     })
   },
  },
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
