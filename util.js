const ComplilUtil = {
    getVal(vm, expr) {
        expr = expr.split('.');
        return expr.reduce((prev, next) => {//vm.$date.a
            return prev[next]
        }, vm.$data)
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
    }
}