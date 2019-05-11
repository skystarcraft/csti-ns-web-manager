
<!--
/**
 * @intro: 排序表格.
 */
-->
<template>
  <ui-container>
    <div>标签管理</div>

		<el-form :inline="true" @submit.native.prevent>
			<el-form-item>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="tag_id"
        label="标签id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="tag_name"
        label="标签名称"
        width="500">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="500">
        <template slot-scope="scope">
          <!-- <el-button @click="handleAdd(scope.row)" type="primary" size="small">添加</el-button> -->
          <!-- <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button> -->
          <el-button @click="del(scope.row)"type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="标签名称" prop="name">
					<el-input v-model="editForm.tag_name" auto-complete="off"></el-input>
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
  name: 'TableTag',
  data() {
    return {
      tableData: [],
      tag: {
        tag_id: '',
        tag_name: '',
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      editForm: {
        tag_name: '',
     },
     addFormVisible: false, // 新增界面是否显示
    }
  },
  mounted() {
    this.getTags();
  },
  methods: {
    add(row) {

    },
    edit(row) {
      console.log(row.tag_id);
    },
    del(row) {
      this.$axios.delete('/manager/tag/' + row.tag_id).then(res => {
        if (res.data.code === 200) {
          this.$message({message: res.data.msg, type: 'success'});
          this.getTags();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getTags() {
      this.$axios.get('/manager/tags').then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
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
     this.editForm.tag_name = row.tag_name
   },
   // 显示新增界面
   handleAdd() {
     this.dialogStatus = 'create'
     this.dialogFormVisible = true
   },
   // 编辑
   updateData() {

   },
   // 新增
   createData: function() {
     this.$axios.post('/manager/tag', {
        tag_name: this.editForm.tag_name
     }).then(res => {
       if (res.data.code === 200) {
         this.$message({message: res.data.msg, type: 'success'});
         this.dialogFormVisible = false
         this.editForm.tag_name = ''
         this.getTags();
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
