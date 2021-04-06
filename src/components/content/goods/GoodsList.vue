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
    }
}
</script>
<style scoped>

</style>