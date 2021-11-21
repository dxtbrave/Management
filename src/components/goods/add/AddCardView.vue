<template>
  <div style="height: 82vh">
    <el-scrollbar style="height: 100%">
      <el-card shadow="hover">
        <!--  提示区  -->
        <el-alert
            title="添加商品信息" type="info" :closable="false" show-icon center>
        </el-alert>
        <!-- 步骤条区 -->
        <el-steps :align-center="true" :space="200" :active="activeIndex - 0" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>

        <!--  tab栏区  -->
        <el-form :model="addGoodsForm"
                 :rules="addGoodsRules"
                 ref="addGoodsFormForm"
                 label-width="100px"
                 label-position="top">
          <el-tabs v-model="activeIndex"
                   :tab-position="'left'"
                   @tab-click="tabClicked"
                   :before-leave="beforeTabLeave">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addGoodsForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="addGoodsForm.goods_number" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                    v-model="addGoodsForm.goods_cat"
                    :options="cateList"
                    :props="{
                expandTrigger: 'hover',
                label:'cat_name',
                value:'cat_id',
                children:'children'
                        }"
                    @change="handleChange"></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <!--   渲染表单的Item项     -->
              <el-form-item :label="item.attr_name"
                            v-for="item in manyTableDate"
                            :key="item.attr_id">
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox border :label="cb"
                               v-for="(cb,i) in item.attr_vals"
                               :key="i"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for="item in onlyTableDate"
                            :key="item.attr_id">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <!--              action 表示图片要上传到的后台API地址-->
              <el-upload
                  :action="uploadURL"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :headers="headerObj"
                  :on-success="handleSuccess"
                  list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
<!--      富文本编辑器         -->
              <quill-editor v-model="addGoodsForm.goods_introduce"/>
              <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import {getCateList, getParamsList,} from "@/network/goods/params";
import {submitGoodsInfo} from "@/network/goods/list";
import {objCloneDeep} from "@/common/common";

export default {
  name: "AddCardView",
  data() {
    return {
      // 步骤条进度
      activeIndex: '0',
      // 添加商品的表单数据对象
      addGoodsForm: {
        goods_name: '',
        goods_price: null,
        goods_weight: null,
        goods_number: null,
        // 商品所属的分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
      //  商品详情描述
        goods_introduce:'',
        // 参数列表
        attrs:[]
      },
      // 添加商品的表单数据验证对象
      addGoodsRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'}
        ]
      },
      // 商品分类列表
      cateList: [],
      // 动态参数列表数据
      manyTableDate: [],
      // 静态属性列表数据
      onlyTableDate: [],
      // 上传图片的URL地址
      uploadURL: 'http://139.9.131.107:8889/api/private/v1/upload',
      // 图片上传组件的header请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath:''
    }
  },
  created() {
    this._getCateList()
  },
  methods: {
    /**
     * 获取所有的商品分类列表
     * @private
     */
    _getCateList() {
      getCateList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error({
            message: res.meta.msg,
            showClose: true
          })
        }
        this.cateList = res.data
      })
    },
    /**
     * 级联选择器选中项变化，触发函数
     */
    handleChange() {
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
      }
    },
    /**
     * 变更标签页时事件
     */
      async beforeTabLeave(activeName, oldActiveName) {
      let length = this.addGoodsForm.goods_cat.length
      let form = this.$refs.addGoodsFormForm
      await form.validate()
      if (oldActiveName === '0' && length !== 3) {
        this.$message.error({
          message: '请先选择商品分类',
          showClose: true
        })
        return false
      }

    },
    /**
     * 标签页点击事件
     */
    tabClicked() {
      switch (this.activeIndex) {
        case "1":
          getParamsList(this.cateId, 'many').then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error({
                message: res.meta.msg,
                showClose: true
              })
            }
            res.data.forEach(item => {
              item.attr_vals = item.attr_vals.length === 0 ? []
                  : item.attr_vals.split(' ')

            })
            this.manyTableDate = res.data
          })
          break;
        case "2":
          getParamsList(this.cateId, 'only').then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error({
                message: res.meta.msg,
                showClose: true
              })
            }
            this.onlyTableDate = res.data
          })
      }
    },
    /**
     * 处理图片预览效果
     */
    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.$Bus.$emit('showPreviewVisible',this.previewPath)
    },
    /**
     * 处理移除图片的操作
     */
    handleRemove(file) {
    // 1. 获取将要删除的图片的临时路径
      const filePath = file.response.data.tmp_path
    // 2. 从pics数组中，找到这个图片的索引值
      const i = this.addGoodsForm.pics.findIndex(x=> x.pic === filePath)
    // 3. 调用数组的splice 方法， 把图片信息对象，从pics 数组中移除
      this.addGoodsForm.pics.splice(i,1)
    },
    /**
     * 监听图片上传成功的事件
     */
    handleSuccess(response) {
    //  1. 拼接得到一个图片信息对象
      const picInfo = {pic:response.data.tmp_path}
    //  2. 将图片信息对象 push 到 pics 数组中
      this.addGoodsForm.pics.push(picInfo)
    },
    /**
     * 添加商品
     */
    add(){
      this.$refs.addGoodsFormForm.validate(valid=>{
          if (!valid)
          {
            return this.$message.error({
              message:'请填写必要的表单项！',
              showClose:true
            })
          }
      //    执行添加的业务逻辑
        const form = objCloneDeep(this.addGoodsForm)
        form.goods_cat = form.goods_cat.join(',')
        // 处理动态参数
        this.manyTableDate.forEach(item=>{
          const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals.join(' ')}
          this.addGoodsForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableDate.forEach(item=>{
          const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals}
          this.addGoodsForm.attrs.push(newInfo)
        })
        form.attrs = this.addGoodsForm.attrs
        submitGoodsInfo(form).then(res=>{
          if (res.meta.status !== 201){
            return this.$message.error({
              message:res.meta.msg,
              showClose:true
            })
          }
          this.$message.success({
            message:res.meta.msg,
            showClose:true
          })
          this.$router.push('/goods')
        })
      })
    }
  },
  computed: {
    cateId() {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 5px !important;
}
.btnAdd{
  margin-top: 15px;
  float: right;
}
</style>