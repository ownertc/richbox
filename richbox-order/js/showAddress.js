new Vue({
    el:"#app",
    data:{
        queryParams:{
            userId:''
        },
        list:[]

    },
    methods:{
        // goConfirmOrder(addressInfo){
        //     addressInfo.userid=this.queryParams.userId
        //     window.sessionStorage.setItem('addressInfo',JSON.stringify(addressInfo))
        //     window.location.href="./confirmOrder.html"
        // },
        getAddressList(){
            addressList(this.queryParams).then(res=>{
                if(res.Code===200){
                    this.list=res.Data
                }else{
                    this.$toast(res.ShowData)
                }
            })
        },
        getUserId(userId){
            var reg = new RegExp('(^|&)' + userId + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    },
    mounted() {
        // if(window.localStorage.getItem('userInfo')){
        //     var u = navigator.userAgent;
        //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        //     var userInfo=JSON.parse(window.localStorage.getItem('userInfo'))
        //     if(isAndroid){
        //         userInfo=JSON.parse(userInfo)
        //     }
         this.queryParams.userId=this.getUserId('userId');
        // }else{
        //     this.$toast("获取用户信息失败！")
        // }
        this.getAddressList()

    }
})