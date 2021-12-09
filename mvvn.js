class MvvC{
    //  初始化获取节点信息，数据
    constructor(option={}){
        this.$el=option.el;
        this.$data=option.data;
        new Observe(this.$data)
        new Compile(this.$el,this)
    }
}