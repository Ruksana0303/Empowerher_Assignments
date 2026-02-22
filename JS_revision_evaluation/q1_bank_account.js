function createBankAccount(initialBalance=0){
    let balance=initialBalance;
    let transactions=[];
    function deposit(amount){
        if(amount<=0){
            return "Deposit amount must be positive"
        }
        balance+=amount;
        transactions.push({type:"deposit",amount,date:new Date()});
        return `Deposited ${amount}`;
    }
    function withdraw(amount){
        if (amount<=0){
            return "Withdrawal amount must be positive";
        }
        if(amount>balance){
            return "Insufficient balance";
        }
        balance -= amount;
        transactions.push({type:"withdraw" ,amount,date:new Date()});
        return `Withdrew ${amount}`;

    }
    function getBalance(){
        return balance;
    }
    function getTransactionHistory(){
        return [...transactions];
    }
    return{
        deposit,
        withdraw,
        getBalance,
        getTransactionHistory,
    };
}

const myaccount=createBankAccount(1000);
console.log(myaccount.deposit(500));
console.log(myaccount.withdraw(200));
console.log(myaccount.getBalance());