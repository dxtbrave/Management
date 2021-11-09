<template>
  <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClosed"
      width="50%">
    <!--  添加分类的表单  -->
    <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
      <!--   角色名称    -->
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <!--   父级分类    -->
      <el-form-item label="父级分类">
        <!--   props 用来指定配置对象     -->
        <!--   options 用来指定数据源     -->
        <el-cascader
            ref="addCateCascader"
            v-model="selectedKeys"
            :options="parentCateList"
            :props="{expandTrigger:'hover',
                     checkStrictly:true,
                     value:cascaderProps.value,
                     label:cascaderProps.label,
                     children: cascaderProps.children}"
            @change="parentCateChange"
            clearable/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisibleChange">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {addCategories} from "@/network/goods/categories";

export default {
  name: "AddCateDialog",
  data() {
    return {
      addCateDialogVisible: false,
      // 添加分类的表单数据
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        // 分类的等级，默认添加的是一级
        cat_level: 0
      },
      //  添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
        ],
      },
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //  选中的父级分类的Id数组
      selectedKeys: []
    }
  },
  props: {
    parentCateList: Array
  },
  mounted() {
    this.$Bus.$on('showAddCateDialog', () => {
      this.addCateDialogVisible = true
    })
  },
  methods: {
    //  监听添加用户对话框的事件
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      // 重置级联选择器
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    // 关闭对话框事件
    addCateDialogVisibleChange() {
      this.addCateDialogVisible = false
    },
    // 选择项发生变化触发这个函数
    parentCateChange() {
      //  如果selectedKeys 数组中的 length 大于0，证明选中的父级分类
      //  反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        this.addCateForm.cat_pid = 0
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 点击确定按钮，添加新的分类
    addCate() {
      this.$refs.addCateFormRef.validate(valid => {
        if (!valid) return
        let {cat_pid, cat_name, cat_level} = this.addCateForm
        addCategories(cat_pid, cat_name, cat_level).then(res => {
          if (res.meta.status !== 201) {
            return this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          }
          // 返回成功的消息
          this.$message.success({
            message: res.meta.msg,
            showClose: true
          })
          //  刷新界面
          this.$emit('updateCateList')
          //  关闭对话框
          this.addCateDialogVisibleChange()
        })
      })
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>