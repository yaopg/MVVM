class MvvC{
    //  初始化获取节点信息，数据
    constructor(option={}){
        this.$el=option.el;
        this.$data=option.data;
        new Observe(this.$data)
        new Compile(this.$el,this)
        //代理$data
        Object.keys(this.$data).forEach(key=>{
            this.proxy(key)
        })
    }
    proxy(key){
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(value){
                this.$data[key]=value
            }
        })
    }
}