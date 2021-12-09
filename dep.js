class Dep{
    constructor(){
        this.subs = []; // 这里存放所有的watcher
    }
    addSub(watcher){ // 添加watcher
        this.subs.push(watcher)
    }
    // 发布
    notify(){
        this.subs.forEach(watcher => watcher.update());
    }
}