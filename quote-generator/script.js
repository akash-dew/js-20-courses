//http://api.forismatic.com/api/1.0/
let quotesArr = [];
let h1 = document.querySelector('h1')
let h2 = document.querySelector('h4')
let btn1 = document.querySelector('.button-secondary')
let btn2 = document.querySelector('.button-success')

 
function singleQuote(){    
    let quote = quotesArr[Math.floor(Math.random() * quotesArr.length)];
    h1.innerText = quote.text;

    if(!quote.author){
        h2.innerText = 'Unknown'
    }else{
        h2.innerText = quote.author;
    }    
}

function tweet(){
    window.open('akash', '_black')
} 

btn2.addEventListener('click', singleQuote)
btn1.addEventListener('click', tweet)


async function getQuote(){
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = "https://type.fit/api/quotes"

    try{
        const response = await fetch(apiUrl)
        quotesArr = await response.json();
        
        singleQuote()


    }catch(error){
        console.log('opps ' + error )
    } 

}

getQuote();














