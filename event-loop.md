# 事件循环

**浏览器**
1. 执行所有同步任务
2. 执行所有微任务(Promise，MutationObserver，Fetch基于Promise)
3. 执行一个宏任务(定时器回调 / DOM 事件回调 / AJAX 回调)   
4. 检查是否存在微任务
5. 存在跳转至2，不存在跳转至3。重复执行直到所有任务清空   
   
**Node**
1. 执行所有同步任务
2. poll阶段，I/O操作等外部输入数据。如果poll队列不为空，则按顺序执行，如果为空并且没有其它异步任务，则一直等待
3. check阶段，setImmediately
4. close callback阶段，socket关闭回调
5. timer阶段，setTimeout,setInterval
6. I/O callback阶段，处理一些上个循环少数未执行的I/O操作
7. prepare阶段，闲置，nodejs内部适用       
   
当队列为空或者执行的回调函数数量到达系统阈值，就会进入下一个阶段。按照顺序反复运行   

以上阶段不包括Process.nextTick，Promise等微任务，这些任务会放到单独的微任务队列中，微任务队列会在以上阶段执行之前清空