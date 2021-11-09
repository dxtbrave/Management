<template>
  <el-card shadow="hover">
    <!-- 警告区域 -->
    <el-alert title="注意: 只允许为第三级分类设置相关参数!"
              type="warning"
              :closable="false"
              :show-icon="true">
    </el-alert>

    <!-- 选择商品分类区域  -->
    <el-row class="cat_opt">
      <el-col>
        <span style="font-size: 12px">选择商品分类：</span>
        <!--   选择商品分类的级联选择框   -->
        <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="{ expandTrigger: 'hover',
                    value:'cat_id',
                    label:'cat_name',
                    children:'children'}"
            @change="handleChange"></el-cascader>
      </el-col>
    </el-row>

    <!--  Tab页签区域   -->
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <!--    添加动态参数的面板    -->
      <el-tab-pane label="动态参数" name="many">
        <!--    添加参数的按钮    -->
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="showAddParamsDialog">添加参数</el-button>
        <!--        <params-table :TableList="manyTableDate" />-->
        <el-table :data="manyTableDate" border stripe>
          <!--  展开行  -->
          <el-table-column type="expand" align="center">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.attr_vals"
                      :key="index"
                      closable
                      @close="handleClose(index,scope.row)">{{ item }}
              </el-tag>
              <!--  输入文本框  -->
              <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!--   索引列   -->
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--    编辑按钮      -->
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditParamsDialog(scope.row)">编辑
              </el-button>
              <!--    删除按钮      -->
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--    添加静态属性的面板  -->
      <el-tab-pane label="静态属性" name="only">
        <!--    添加属性的按钮    -->
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="showAddParamsDialog">添加属性</el-button>
        <!--        <params-table :TableList="onlyTableDate" :cateId="cateId" :titleText="titleText"/>-->
        <el-table :data="onlyTableDate" border stripe>
          <!--  展开行  -->
          <el-table-column type="expand" align="center">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.attr_vals"
                      :key="index"
                      closable
                      @close="handleClose(index,scope.row)">
                {{ item }}
              </el-tag>
              <!--  输入文本框  -->
              <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!--   索引列   -->
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--    编辑按钮      -->
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditParamsDialog(scope.row)">编辑
              </el-button>
              <!--    删除按钮      -->
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import {getParamsList, deleteParamsById , editParams} from "@/network/goods/params";


export default {
  name: "ParamsCardView",
  data() {
    return {
      // 级联选择框双向绑定的数组
      selectedCateKeys: [],
      //  页签名
      activeName: 'many',
      // 动态参数数据
      manyTableDate: [],
      //  静态属性数据
      onlyTableDate: [],
    }
  },
  props: {
    cateList: Array
  },
  mounted() {
    this.$Bus.$on('updateParamsList', this._getParamsList)
  },
  methods: {

    /**
     * 级联选择框选中项变化，触发函数
     */
    handleChange() {
      this._getParamsList()
    },
    /**
     *  Tab 页签点击事件的处理函数
     */
    handleTabClick() {
      this._getParamsList()
    },
    /**
     * 获取对应参数的参数列表
     * @private
     */
    _getParamsList() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableDate = []
        this.onlyTableDate = []
        return
      }
      //  证明选中的是三级分类
      //  根据所选分类的 Id 和当前所处的面板，获取对应的参数
      getParamsList(this.cateId, this.activeName).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ?
              item.attr_vals.split(' ') : []
          // 控制文本框的显示与隐藏
          item.inputVisible = false
          // 文本框中输入的值
          item.inputValue = ''
        })

        if (this.activeName === 'many') {
          this.manyTableDate = res.data
        } else {
          this.onlyTableDate = res.data
        }

      })
    },
    /**
     * 显示添加参数dialog页面
     */
    showAddParamsDialog() {
      this.$Bus.$emit('showAddParamsDialog', this.titleText, this.cateId)
    },
    /**
     * 显示 修改页面
     * @param value
     */
    showEditParamsDialog(value) {
      this.$Bus.$emit('showEditParamsDialog', this.titleText, value)
    },
    /**
     * 删除参数
     */
    async removeParams(attr_id) {
      let result = await this.$confirm('此操作将永久删除该参数, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => res).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // 删除功能的业务逻辑
      if (result !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      } else {
        deleteParamsById(this.cateId, attr_id).then(res => {
          if (res.meta.status !== 200) {
            this.$message.error({
              message: res.meta.msg,
              showClose: true
            })
          } else {
            this.$message.success({
              message: res.meta.msg,
              showClose: true
            })
            // 发送刷新界面指令
            this._getParamsList()
          }
        })
      }
    },
    /**
     *  文本框失去焦点，或按下了 Enter 都会触发
     */
    handleInputConfirm(row){
      if (row.inputValue.trim().length === 0 ){
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 如果没有return 则证明输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      let {cat_id,attr_id,attr_name,attr_sel} = row
      let attr_vals = row.attr_vals.join(' ')
      this.saveAttrVals(cat_id,attr_id,attr_name,attr_sel,attr_vals)
    },
    /**
     * 点击按钮，展示文本输入框
     */
    showInput(row){
      row.inputVisible = true
    //  让文本框自动获得焦点
    //  $nextTick方法的作用，就是当页面上元素被重新渲染之后
    //  才会指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    /**
     * 保存修改标签
     */
    saveAttrVals(cat_id,attr_id,attr_name,attr_sel,attr_vals){
      editParams(cat_id,attr_id,attr_name,attr_sel,attr_vals).then(res=>{
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
      })
    },
    /**
     *  删除标签事件
     */
    async handleClose(index,row){
      let result = await this.$confirm('此操作将永久删除该标签, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => res).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (result !== 'confirm') {
        return this.$message.info({
          message: '已经取消删除',
          showClose: true
        })
      }
      row.attr_vals.splice(index,1)
      let {cat_id,attr_id,attr_name,attr_sel} = row
      let attr_vals = row.attr_vals.join(' ')
      this.saveAttrVals(cat_id,attr_id,attr_name,attr_sel,attr_vals)
    }
  },
  computed: {
    // 如果按钮需要被禁用 ，则返回true，否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类的Id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    },
  }
}
</script>

<style scoped>
.cat_opt {
  margin: 15px 0;
}

.el-tag {
  margin: 10px;
}
.button-new-tag{
  margin: 10px;
}

.input-new-tag{
  width: 150px;
  margin: 10px;
}
</style>