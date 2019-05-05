var treeNodesSample = [
        { id:111, pId:0, pre:-1, next:2, extension:"",name:"展开、折叠 自定义图标不同", open:true},
        { id:12, pId:111, pre:11, next:13, extension:"", name:"叶子节点2"},
        { id:11, pId:111, pre:-1, next:12, extension:"", name:"叶子节点1"},
        
        { id:13, pId:111, pre:12, next:-1, extension:"", name:"叶子节点3"},
        { id:2, pId:0, pre:111, next:39, extension:"", name:"展开、折叠 自定义图标相同", open:true},
        { id:22, pId:2, pre:21, next:23, extension:"", name:"叶子节点2"},
        { id:23, pId:2, pre:22, next:-1, extension:"", name:"叶子节点3"},
        { id:31, pId:39, pre:-1, next:32, extension:"", name:"叶子节点1"},
        { id:33, pId:39, pre:32, next:-1, extension:"", name:"叶子节点3--"},
        { id:21, pId:2, pre:-1, next:22, extension:"", name:"叶子节点1"},
        { id:32, pId:39, pre:31, next:33, extension:"", name:"叶子节点2-"},
        { id:39, pId:0, pre:2, next:-1, extension:"", name:"不使用自定义图标", open:true }
    ];

/**
 * G:由于只需要维护前后指针，所以使用链表排序，后发现ztree不严格区分上级节点和下级节点顺序，所以可以用伪链表排序。
 * 这样使得tree结构不必是层级结构也不用dfs，简单的一维结构即可。
 * @param {*} treeNodes 
 */
function mockLinkedListSort(treeNodes){
    //排序优化
    //var stableMark = new Object();
    var levelMark = new Object();

    for(var i = 0; i < treeNodes.length; ++ i){
        
        // if(stableMark.hasOwnProperty(treeNodes[i].id)){
        //     levelMark[treeNodes[i].pId] = treeNodes[i].id;
        //     continue;
        // }
        
        if(treeNodes[i].pre == -1){
            // if(i+1 < treeNodes.length && treeNodes[i].next == treeNodes[i+1].id){
            //     stableMark[treeNodes[i+1].id] = true;
            // }
            levelMark[treeNodes[i].pId] = treeNodes[i].id;
            console.log(treeNodes[i].id + " on first place");
            continue;
        }

        if(levelMark.hasOwnProperty(treeNodes[i].pId) && levelMark[treeNodes[i].pId] == treeNodes[i].pre){
            levelMark[treeNodes[i].pId] = treeNodes[i].id;
            console.log(treeNodes[i].id + " on place");
            continue;
        }

        for(var j = i+1; j < treeNodes.length; ++ j){
            
            if(!levelMark.hasOwnProperty(treeNodes[i].pId)){
                if(treeNodes[i].pId == treeNodes[j].pId && treeNodes[j].pre == -1){
                    var tempNode = treeNodes[i];
                    treeNodes[i] = treeNodes[j];
                    treeNodes[j] = tempNode;
                    levelMark[treeNodes[i].pId] = treeNodes[i].id;
                    console.log("head swap "+treeNodes[j].id+" and "+treeNodes[i].id + " levelMark is "+levelMark[treeNodes[i].pId]);
                    break;
                }
            }else{
                if(treeNodes[i].pId == treeNodes[j].pId && treeNodes[j].pre == levelMark[treeNodes[i].pId]){
                    var tempNode = treeNodes[i];
                    treeNodes[i] = treeNodes[j];
                    treeNodes[j] = tempNode;
                    levelMark[treeNodes[i].pId] = treeNodes[i].id;
                    console.log("other swap "+treeNodes[j].id+" and "+treeNodes[i].id+ " levelMark is "+levelMark[treeNodes[i].pId]);
                    break;
                }
            }
        }
        console.log("tick time");
    }
    return treeNodes;
}

function testMain(){
    mockLinkedListSort(treeNodesSample);
}