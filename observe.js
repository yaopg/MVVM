class Observe {
    constructor(data){
        this.observer(data);
    }
    observer(data){
        if(data&& typeof(data)=="object"){
            for(let key in data){
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(obj,key,value){
        this.observer(value);
        let dep = new Dep()
        Object.defineProperty(obj,key,{
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set:(newVal)=>{
                if(newVal != value){
                    this.observer(newVal)
                    value = newVal
                    dep.notify(); // 通知watcher，调用update
                }
            }
        })
    }
}