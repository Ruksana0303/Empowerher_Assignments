function createRateLimiter(limit,interval){
    let count=0;
    let timer=null;
    function resetCounter(){
        count=0;
    }
    return function(){
        if(!timer){
            timer=setInterval(resetCounter,interval);
        }
        if(count<limit){
            count++;
            return "Call allowed";
        }
        else{
            return "Rate limit exceeded"
        }
    };
}
const limiter=createRateLimiter(3,5000);
console.log(limiter());
console.log(limiter());
console.log(limiter());
console.log(limiter());
console.log(limiter());