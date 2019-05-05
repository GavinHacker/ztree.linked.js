## 对tree的拖拽排序

拖拽排序比较好实现，通过调用ztree的API再加上自定义的操作即可
这里需要的自定义操作是维护以下关系：
    
    pId
    pre
    next

## 对ztree的排序

#### 方法：    
    
    mockLinkedListSort()

###### 考虑过的其他的方案：
    
    1.由于ztree本身是可以支持js构造的对象树的，所以开始实现是考虑使用自定义tree，然后传入ztree，后来发现不能支持双向对象引用。
    2.自定义一个对象树，然后做一个转换函数，转换为ztree需要的简单数据结构，维护指针关系即可。    
    3.自定义一个对象树，然后对象树本身是不互相引用的，用一个函数对自定义树做排序，传入ztree,维护时则只需要维护前后指针和上级指针。

## 一维伪链表

    这种方式数据结构简单，排序算法也很简单属于类冒泡排序，但是时间复杂度要比数字的冒泡排序好。

## 继续完善

    增加，删除，正序，倒序...


