class Compile{
    constructor(el,vm){
        this.el = !this.isElementNode(el)?document.querySelector(el):el;
        this.vm=vm;
        if(!this.el){
            return
        }
        let node =this.nodeFragment(this.el)
        this.compile(node);
        this.el.appendChild(node)
    }
    //1、处理节点
    nodeFragment(node){
        //创建虚拟节点放在内存中处理；（提供性能）
        let  fragment=document.createDocumentFragment();
        //定义变量
        let firstChild;
        while(firstChild=node.firstChild){
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    //2、编译，拿到vue定义的指令，text;进行转义
    compile(node){
        //获取$el下的子节点，需要处理的节点
        const childNodes=node.childNodes;
        //console.log(typeof childNodes);
       Array.from(childNodes).forEach(item=>{
            if(this.isElementNode(item)){
                //console.log(item)
                this.compileElemnet(item)
                this.compile(item)
            }else{
                //文本
                this.compileText(item);
            }
        })
    }
    //3、处理文本
    compileText(node){
        const content = node.textContent;
        //判断是{{}}拦截下来，进行拼接
        if(/\{\{(.+?)\}\}/.test(content)){
            ComplilUtil['text'](node,content,this.vm)
        }
    }

    //4、处理节点
    compileElemnet(node){
        const attrs=node.attributes;
        console.log(attrs)
        //遍历节点
        Array.from(attrs).forEach(item=>{
            //结构化赋值
            let {name,value:expr}=item;
            if(this.isDirctive(name)){
                //只考虑到v-model的情况
                let [,directive]=name.split("-");
                console.log(directive,'directive')
                let [directiveName,eventName]=directive.split(":");
                ComplilUtil[directive](node,this.vm,expr,eventName)
            }
        })
    }
    //工具方法
    //1、判断是否为元素节点
    isElementNode(node){
        return node.nodeType===1
    }
    //2、判断是否为指令
    isDirctive(attr){
        return attr.includes('v-')
    }
}
