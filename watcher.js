class Watcher{ // 观察者
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 默认先存一个老值
        this.oldValue = this.get()
    }
    get(){
        Dep.target = this; // 把watcher放在target上
        let value = ComplilUtil.getVal(this.vm,this.expr);  // 取值 把这个观察者和数据关联起来
        Dep.target = null; 
        return value;
    }
    update(){ // 更新操作 数据变化后 会调用观察者的update方法
        let newVal = ComplilUtil.getVal(this.vm,this.expr);
        if(newVal !== this.oldValue) {
            this.cb(newVal)
        }
    }
}