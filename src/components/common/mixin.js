// import { debouce } from './utils'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
        }
    },
    mounted() {
        // const refresh = debouce(this.$refs.scroll.refresh, 500)
        const refresh = this.$refs.scroll.refresh
        this.itemImgListener = () => {
            refresh();
        }
        this.$bus.$on('itemimageload', this.itemImgListener)
        console.log('我是混入的内容');
    },
}