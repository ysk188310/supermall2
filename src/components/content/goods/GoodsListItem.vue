<template>
    <div>
        <img :src="goodsitem.show.img" alt="">
    </div>
</template>
<script>
export default {
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>

</style>