function mySetInterval(callback,delay){
    let timerId=null;
    let isCleared=false;
    function run(){
        if (isCleared) return;

        callback();
        timerId=setTimeout(run,delay);
    }
    timerId=setTimeout(run,delay);
    return{
        id:timerId,
        clear:function(){
            isCleared=true;
            clearTimeout(timerId);
        },
    };
}
function myClearInterval(intervalObj){
    intervalObj.clear();
}

const interval=mySetInterval(()=>{
    console.log("Hello Ruksana");
},1000);
setTimeout(()=>{
    myClearInterval(interval);
    console.log("Stopped!");
},5000);