new Vue({
    el:"#app",
    data:{
        orderDetail:{},
    },
    methods:{
        getOrderDetail(id){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              })
            foodsOrderDetail(id).then(res=>{
                this.$indicator.close()
                if(res.Code===200){
                   this.orderDetail=res.Data
                }else{
                    this.$toast(res.ShowData)
                }
            
            })
        }
       
    },
 mounted(){
     var  ordernum= window.location.href.split('?')[1]
     ordernum=ordernum.split('=')[1]
     this.getOrderDetail(ordernum)
    	 }
})