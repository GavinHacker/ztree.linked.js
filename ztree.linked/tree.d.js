   var zTree;  
    var demoIframe; 
    var setting = {  
            treeId:"_tree",  
        view: {  
            dblClickExpand: false,  
            showLine: true,  
            selectedMulti: false  
        },  
        edit: {  
            drag: {  
                autoExpandTrigger: true,  
                prev: dropPrev,  
                inner: dropInner,  
                next: dropNext  
            },  
            enable: true,  
            showRemoveBtn: false,  
            showRenameBtn: false  
        },  
        data: {  
            key:{  
                name:"name"  
                },  
            simpleData: {  
                enable:true,  
                idKey: "id",  
                pIdKey: "pId",  
                rootPId: "0"  
            }  
        },  
        callback: {  
            onClick: zTreeOnClick,  
            beforeDrag: beforeDrag,         
            beforeDrop: beforeDrop,          
            beforeDragOpen: beforeDragOpen, 
            onDrag: onDrag,                 
            onDrop: onDrop,                 
            onExpand: onExpand
        }  
    };  

    function dropPrev(treeId, nodes, targetNode) {  
        var pNode = targetNode.getParentNode();  
        if (pNode && pNode.dropInner === false) {  
            return false;  
        } else {  
            for (var i=0,l=curDragNodes.length; i<l; i++) {  
                var curPNode = curDragNodes[i].getParentNode();  
                if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                    return false;  
                }  
            }  
        }  
        return true;  
    }  

    function dropInner(treeId, nodes, targetNode) {  
        if (targetNode && targetNode.dropInner === false) {  
            return false;  
        } else {  
            for (var i=0,l=curDragNodes.length; i<l; i++) {  
                if (!targetNode && curDragNodes[i].dropRoot === false) {  
                    return false;  
                } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {  
                    return false;  
                }  
            }  
        }  
        return true;  
    }  

    function dropNext(treeId, nodes, targetNode) {  
        var pNode = targetNode.getParentNode();  
        if (pNode && pNode.dropInner === false) {  
            return false;  
        } else {  
            for (var i=0,l=curDragNodes.length; i<l; i++) {  
                var curPNode = curDragNodes[i].getParentNode();  
                if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                    return false;  
                }  
            }  
        }  
        return true;  
    }  
  
    var log, className = "labelled", curDragNodes, autoExpandNode;  
    function beforeDrag(treeId, treeNodes) {  
        className = (className === "labelled" ? "":"labelled");  
        for (var i=0,l=treeNodes.length; i<l; i++) {  
            if (treeNodes[i].drag === false) {  
                curDragNodes = null;  
                return false;  
            } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {  
                curDragNodes = null;  
                return false;  
            }  
        }  
        curDragNodes = treeNodes;  
        return true;  
    }  

    function beforeDragOpen(treeId, treeNode) {  
        autoExpandNode = treeNode;  
        return true;  
    }  

    function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {  
        className = (className === "labelled" ? "":"labelled");  
        return true;  
    }  

    function onDrag(event, treeId, treeNodes) {  
        className = (className === "labelled" ? "":"labelled");  
    }  

    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {  
        className = (className === "labelled" ? "":"labelled");  
        console.log(treeNodes[0].id+" "+targetNode.id+" "+treeNodes[0].name);
        console.log(treeNodes[0].getParentNode().id);
        console.log("pre:"+treeNodes[0].getPreNode().id);
        console.log("nxt:"+treeNodes[0].getNextNode().id);

        $.ajax({  
            type:'post',        
            url: "nginx?id=",  
            dataType: "text",  
            async: false,  
            success: function (data) {  
            },  
            error: function (msg) {              
            }  
        });  
    }  

    function onExpand(event, treeId, treeNode) {  
        if (treeNode === autoExpandNode) {  
            className = (className === "labelled" ? "":"labelled");  
        }  
    }  

    function zTreeOnClick(event, treeId, treeNode){
        console.log("click one time."+treeNode.id);
        console.log("p->" + treeNode.pre);
        console.log("n->" + treeNode.next);
    }
