<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" :key='(item,index)' 
      class="tab-control-item"
      :class="{active: index===currentindex}"
      
      @click="tabclick(index)"
     >
     <!-- Vue使用一个index记录选择的元素并更改样式 -->
            <span>{{item}}</span>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },data() {
        return {
            currentindex:0
        }
    },
    methods: {
        tabclick(index){
            this.currentindex=index
        }
    },
}
</script>
<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color:var(--color-high-text)
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>