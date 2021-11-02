<template>
  <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      @close="setRoleDialogClosed"
      width="50%">
    <div>
      <p>当前的用户：{{userInfo.username}}</p>
      <p>当前的角色：{{userInfo.role_name}}</p>
      <p>分配新角色：
        <el-select v-model="selectedRoleId"
                   :loading="loading"
                   @focus="_getRolesList"
                   placeholder="请选择">
          <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
          </el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setRoleDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {getRolesList , saveUserRole} from "@/network/users";

export default {
  name: "SetRoleDialog",
  data(){
    return{
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible:false,
    // 需要被分配角色的用户信息
      userInfo:{},
      // 所有角色的数据列表
      rolesList:[],
    //  已选中的角色Id值
      selectedRoleId:'',
    //  加载页面显示
      loading:true
    }
  },
  mounted() {
    this.$Bus.$on('setRole',(scopeRow)=>{

      this.userInfo = scopeRow
      console.log(this.userInfo)
      this.setRoleDialogVisible = true
    })
  },
  methods:{

    /**
     * 监听分分配角色的关闭的事件
     */
    setRoleDialogClosed(){
      this.selectedRoleId = ''
      this.userInfo = {}
    },

    /**
     * 关闭弹窗
     */
    setRoleDialogVisibleChange() {
      this.setRoleDialogVisible = false
    },

    _getRolesList(){
      // 在展示对话框之前，获取所有角色的列表
      getRolesList().then(res=>{
        //  返回错误信息
        if (res.meta.status !== 200){
          return this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }
        this.rolesList = res.data
        this.loading = false
      })
    },
    // 点击按钮，分配角色
    saveRoleInfo(){
      if (!this.selectedRoleId){
        return this.$message.error({
          message:'请选择要分配的角色',
          showClose:true
        })
      }
      saveUserRole(this.userInfo.id,this.selectedRoleId).then(res=>{
        if (res.meta.status !== 200){
          return this.$message.error({
            message:res.meta.msg,
            showClose:true
          })
        }
        this.$message.success({
          message:res.meta.msg,
          showClose:true
        })
        this.$emit('updateUserList')
        this.setRoleDialogVisibleChange()
      })
    }
  }
}
</script>

<style scoped>

</style>