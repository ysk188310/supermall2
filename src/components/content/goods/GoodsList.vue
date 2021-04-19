<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :key='item' :goodsitem='item'></goods-list-item>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    components:{
    GoodsListItem
    },
    props:{
       goods:{
            type:Array,
           default(){
            return []
        }
       }
    },
}
</script>
<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    /* 不包裹 需要设置宽度百分比*/
    justify-content: space-around;
    /* 均等分 */
    padding: 3px;
}
</style>