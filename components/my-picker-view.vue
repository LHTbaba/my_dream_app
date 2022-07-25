<template>
	<view>
		<view>
			<uni-popup ref="popup" background-color="#fff">
				<view>
					<view>
						<uni-row>
              <uni-col :span="6">
								<button plain="true" style="margin-top: 20rpx;border-style:none;" @click="cancelChange()"><text class="button-text">取消</text></button>
              </uni-col>
              <uni-col :span="12">
                <uni-search-bar :value="searchKey" placeholder="搜索" clearButton="none" cancelButton="none" @input="search"/>
              </uni-col>
							<uni-col :span="6">
								<button plain="true" style="margin-top: 20rpx;border-style:none;" @click="sureSelect()"><text class="button-text">确定</text></button>
							</uni-col>
						</uni-row>
						<picker-view :value="pickerValue" indicator-style="height:50px;" @change="bindChange">
							<picker-view-column>
								<view class="item" v-for="(item,index) in list" :key="index">{{item.DEPT_NAME}}</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>
 
<script>
	export default {
		props:{
			list: Array, //数据列表
		},
		watch:{
      list(){
				this.init()
			}
		},
		data() {
			const defaultVal= //默认常量
			{
				global:{
					debug:true
					,title:'my-picker-view'
				}
				,show:{
					value:'未选择'
				}
				,search:{
					searchKey:''
				}
				,picker:{
					pickerValue:[0]
					,visible:true
					,pickerList:[]
					,isChoose:false
					,chooseVal:''
				}
			}
			return {
				defaultVal
				,title: ''
				,debug:true
				,pickerValue:[]
				,visible: false
				,pickerList:[]
				,searchKey:''
				,isChoose:true
				,chooseVal:''
			}
		},
		methods: {
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			}
			,sureSelect(){
        // this.value=this.chooseVal.ID
        // this.resetSearch()
				this.$emit('changeUnion', this.chooseVal)
        this.$refs.popup.close()
			}
			,cancelChange(){
				this.$refs.popup.close()
				this.resetSearch()
			}
			,requestList(){//请求列表数据
				this.defaultVal.picker.pickerList=this.list
				this.defaultVal.picker.pickerValue=[0]
				this.defaultVal.picker.chooseVal=this.defaultVal.picker.pickerList[this.defaultVal.picker.pickerValue[0]]
			}
			,resetAll(){//重置或初始化默认设置
				//初始化初始值
				this.debug=this.deepCopy(this.defaultVal.global.debug)
				this.title=this.deepCopy(this.defaultVal.global.title)
				this.searchKey=this.deepCopy(this.defaultVal.search.searchKey)
				this.pickerList=this.deepCopy(this.defaultVal.picker.pickerList)
				this.asc=this.deepCopy(this.defaultVal.picker.asc)
				this.visible=this.deepCopy(this.defaultVal.picker.visible)
				this.pickerValue= this.deepCopy(this.defaultVal.picker.pickerValue)
				this.isChoose=this.deepCopy(this.defaultVal.picker.isChoose)
				this.chooseVal=this.deepCopy(this.defaultVal.picker.chooseVal)
			}
			,init(){
				this.requestList()
				this.resetAll()
			}
			,bindChange(e){
				console.log(e)
				this.chooseVal=this.pickerList[e.detail.value[0]]
			}
			,search(e){
				this.$emit('search', e)
			}
			,resetSearch(){
				this.searchKey=''
				this.pickerList.splice(0,this.pickerList.length)
				this.pickerList= this.deepCopy(this.defaultVal.picker.pickerList);
				this.pickerValue=[this.pickerList.length-1]
				this.chooseVal=this.pickerList[this.pickerValue[0]]
			}
			,debuglog(obj,open){
				if(open==true||open==undefined){
					if(this.debug){
						console.log('debug调试中，检测的对象'+obj+'内容为'+JSON.stringify(eval(obj)))
					}
				}
			}
			,deepCopy(obj) 
			{
				// 判断如果不是引用类型，直接返回数据即可
				if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'undefined' || !obj) 
				{
					return obj
				}  
				return JSON.parse(JSON.stringify(obj));
			}
		}
	}
</script>

<style>
picker-view {
	width: 100%;
	height: 600rpx;
	margin-top:20rpx;
}
.item {
	line-height: 100rpx;
	text-align: center;
}
</style>
