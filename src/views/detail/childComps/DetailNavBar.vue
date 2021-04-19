<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click='backClick'>
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" 
                :key='(item,index)'
                 class="title-item"
                 :class="{active: index===currentindex}"
                 @click='itemClick(index)'>
                {{item}}
                 </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';


export default {
    components:{
       NavBar,
    },
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentindex:0,
        }
    },
    methods: {
        itemClick(index){
       this.currentindex=index
       this.$emit('itemClick',index)
        },
        backClick(){
            // this.$router.back()
            this.$router.push({
                path:'/home'
            })
        }
    },
}
</script>
<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;
}
.active{
     color:var(--color-high-text)
}
.back img{
    margin-top: 12px;
}
</style>