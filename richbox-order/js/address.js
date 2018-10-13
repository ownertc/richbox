new Vue({
    el:"#app",
    data:{
        queryParams:{
            userId:103
        },
        list:[]

    },
    methods:{
        goConfirmOrder(addressInfo){
        addressInfo.userid=this.queryParams.userId
       window.sessionStorage.setItem('addressInfo',JSON.stringify(addressInfo))
       window.location.href="./confirmOrder.html"
        },
        getAddressList(){
            addressList(this.queryParams).then(res=>{
                if(res.Code===200){
                this.list=res.Data
                }else{
                    this.$toast(res.ShowData)
                }
            })
        }
    },
    mounted() {
        if(window.localStorage.getItem('userInfo')){
            var userInfo=JSON.parse(window.localStorage.getItem('userInfo'))
            this.queryParams.userId=userInfo.userId
        }else{
            this.$toast("获取用户信息失败！")
        }
        this.getAddressList()
        
    }
})