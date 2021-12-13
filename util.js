const ComplilUtil = {
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next) => {//vm.$date.a
            return prev[next]
        }, vm.$data)
    },
    setVal(vm,expr,value){
        expr.split(".").reduce((initData,curProp,index,arr)=>{
            if(index===arr.length-1){
                initData[curProp]=value;
                return;
            }
            return initData[curProp];
        },vm.$data)
    },
    text(node, expr, vm) {
        let value = null;
        let updateFn = this.textUpdater
        value = this.getTextVal(vm, expr);
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], () => {
                // 返回了一个全的字符串
                updateFn && updateFn(node, this.getTextVal(vm, expr))
            })
        })
        updateFn(node, value);
    },
    textUpdater(node, newVal) {
        node.textContent = newVal
    },
    getTextVal(vm, expr) {//获取编译文本后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1])
        })
    },
    //双向绑定，指令
    model(node,vm,expr){
        let value =this.getVal(vm,expr);
        const fn=this.modelUpdater;
        fn(node,value);
        //需要绑定一个监听器来绑定
        node.addEventListener('input',(e)=>{
            const newvalue=e.target.value;
            this.setVal(vm,expr,newvalue)
        })
        new Watcher(vm,expr,newVal=>{
          fn(node,newVal);
        });
    },
    //更新节点
    modelUpdater(node,newVal){
        node.value=newVal
    }
}