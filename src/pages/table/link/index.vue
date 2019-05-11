<!--
/**
 * @intro: 基本表格.
 */
-->
<template>
  <ui-container>
    <div>连接管理</div>

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
        prop="id"
        label="id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="link_name"
        label="链接名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="link_addr"
        label="链接地址"
        width="500">
      </el-table-column>
      <el-table-column
        prop="type"
        label="链接类型，0-友情链接，1-工具链接"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <!-- <el-button @click="add(scope.row)" type="primary" size="small">添加</el-button> -->
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="del(scope.row)"type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="链接名称">
          <el-input v-model="editForm.link_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="editForm.link_addr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接类型">
          <el-input v-model="editForm.type" auto-complete="off"></el-input>
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
  name: 'TableLink',
  data() {
    return {
      tableData: [],
      link: {
        id: '',
        link_name: '',
        link_addr: '',
        type: 0,
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      editForm: {
        id: '',
        link_name: '',
        link_addr: '',
        type: 0,
      },
    }
  },
  mounted() {
    this.getLinks();
  },
  methods: {
    add(row) {

    },
    edit(row) {
      console.log(row.article_id);
    },
    del(row) {
      this.$axios.delete('/manager/link/' + row.id).then(res => {
        if (res.data.code === 200) {
          this.$message({message: res.data.msg, type: 'success'});
          this.getLinks();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getLinks() {
      this.$axios.get('/manager/links').then(res => {
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
     this.editForm.id = row.id
     this.editForm.link_name = row.link_name
     this.editForm.link_addr = row.link_addr
     this.editForm.type = row.type
   },
   // 显示新增界面
   handleAdd() {
     this.dialogStatus = 'create'
     this.dialogFormVisible = true
   },
   // 编辑
   updateData() {
     if (this.editForm.type === 0 || this.editForm.type === 1 || this.editForm.type === '0' || this.editForm.type === '1') {
       this.$axios.put('/manager/link', {
         id: this.editForm.id,
         link_name: this.editForm.link_name,
         link_addr: this.editForm.link_addr,
         type: this.editForm.type
       }).then(res => {
         if (res.data.code === 200) {
           this.$message({message: res.data.msg, type: 'success'});
         } else {
           this.$message.error(res.data.msg);
         }
         this.dialogFormVisible = false
         this.editForm.link_name = ''
         this.editForm.link_addr = ''
         this.editForm.type = 0
         this.getLinks();
       })
     } else {
       this.$message.error("类型只能是0或1！");
     }

   },
   // 新增
   createData: function() {
     console.log(this.editForm.type);
     if (this.editForm.type === 0 || this.editForm.type === 1 || this.editForm.type === '0' || this.editForm.type === '1') {
       this.$axios.post('/manager/link', {
         link_name: this.editForm.link_name,
         link_addr: this.editForm.link_addr,
         type: this.editForm.type
       }).then(res => {
         if (res.data.code === 200) {
           this.$message({message: res.data.msg, type: 'success'});
           this.dialogFormVisible = false
           this.editForm.id = ''
           this.editForm.link_name = ''
           this.editForm.link_addr = ''
           this.editForm.type = 0
           this.getLinks();
         } else {
           this.$message.error(res.data.msg);
         }
       })
     } else {
       this.$message.error("类型只能是0或1！");
     }
   },
  },
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
