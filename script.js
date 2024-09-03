const currencyEl_one=document.querySelector("#currency-one");
const amountEl_one=document.querySelector("#amount-one")
const currencyEl_two=document.querySelector("#currency-two");
const amountEl_two=document.querySelector("#amount-two");
const rateEl=document.querySelector("#rate");
const swap=document.querySelector("#swap");

//function to call api here we are calling it by URL so promise returned

async function calculate(){
    const currencyone=currencyEl_one.value;
    const currencytwo=currencyEl_two.value;
    //console.log(currencyone,currencytwo);
    try{
        const response=await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyone}`);
        //console.log(response);
        const data=await response.json()//the data we got is in not readable format so convert the response to json
        const currency_two_rate=data.rates[currencytwo];
        //console.log(data.rates);
        //console.log(currency_two_rate);
        rateEl.innerHTML=`1 ${currencyone} = ${currency_two_rate} ${currencytwo}`;
       amountEl_two.value=(amountEl_one.value*currency_two_rate).toFixed(2);//upto two decimal values;

    }
    catch(error){
        console.log(error);
    }

}
currencyEl_one.addEventListener("change",()=>{
calculate();
});
currencyEl_two.addEventListener("change",calculate);
amountEl_one.addEventListener("input",calculate);
swap.addEventListener("click",()=>{
const temp=currencyEl_one.value;
currencyEl_one.value=currencyEl_two.value;
currencyEl_two.value=temp;
calculate();
});
calculate();