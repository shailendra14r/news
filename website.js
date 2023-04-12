console.log('CArousel');
const xhr=new XMLHttpRequest();
xhr.open('GET','https://newsapi.org/v2/top-headlines?country=in&apiKey=086bea84da3f4e019c2cfd7f46e920ea',true);
xhr.onload=function(){
    let i=1;
    let obj=JSON.parse(this.responseText);
    array=obj.articles;
    console.log(obj);
    array.forEach(function(e){
    if(e.urlToImage===null){
        console.log('null');
        i--;
    }
    else if(i<=5){
        let div=document.createElement('div');
        div.setAttribute('class','carousel-item size');
        div.setAttribute('data-bs-interval','5000');
        if(i==1){
            div.setAttribute('class','carousel-item active');
        }
    div.innerHTML=`<img src="${e.urlToImage}" class="d-block size" alt="Erorr">
    <div class="carousel-caption d-none d-md-block">
        <a class="text-white" href="${e.url}">${e.title}</p>
      </div>`;
      document.getElementById('setitem').appendChild(div);
    }
    else{
        let card=document.createElement('div');
    card.setAttribute('class','card w-100 my-1');
    card.innerHTML=`<h5 class="card-header">${e.title}</h5>
    <div class="card-body position-relative">
      <img src="${e.urlToImage}" height="150px" width="300px alt="Error in loading image">
      <div class="position-absolute top-0 end-0">
      <button class="like" id="like${i}">
      <i class="fa fa-thumbs-up"></i>
      </button>
      <button class="bookmark" id="bookmark${i}">
      <i class="fa fa-bookmark" aria-hidden="true"></i>
      </div>
      <p class="card-text">${e.description}</p>
      <a href="${e.url}" class="btn btn-link" target="_blank">Read More</a>
    </div>`;
    document.getElementById('detailnews').appendChild(card);
    }
    let list=document.createElement('div');
    list.innerHTML=`<a class='text-dark' href='${e.url}'>${e.title}<hr></a>`;
    document.getElementById('headline').appendChild(list);
    i++;
});
}
xhr.send();

//Currency Exhange Rate
{
    let curFrom=["USD","GBP","BTC","ETH"];
    let curTo=["INR","INR","USD","USD"];
    for(let i=0;i<4;i++){
    const exh=new XMLHttpRequest();
    exh.open('GET',`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${curFrom[i]}&to_currency=${curTo[i]}&apikey=I15T2OYI893QW2HX`,true);
    exh.onload=function(){
        console.log(this.responseText);
        let obj=JSON.parse(this.responseText);
        let exdiv=document.createElement('div');
        exdiv.innerHTML=`1${curFrom[i]}=${parseInt(obj["Realtime Currency Exchange Rate"]["5. Exchange Rate"]).toFixed(2)}${curTo[i]}`;
        document.getElementById('forex').appendChild(exdiv);
    }
    exh.send();
}
}


//Like button
setTimeout(()=>{
    let obj=document.querySelectorAll('.like');
    obj.forEach(function(e){
        let id=e.id;
        document.getElementById(`${id}`).addEventListener('click',()=>{
            e.classList.toggle('text-primary');
        });
    });
    obj=document.querySelectorAll('.bookmark');
    obj.forEach(function(e){
        let id=e.id;
        document.getElementById(`${id}`).addEventListener('click',()=>{
            e.classList.toggle('text-warning');
        });
    });
},2000);

document.getElementById('btn').addEventListener('click',function(){
    console.log('CLicked');
    let value=document.getElementById('search').value;
    console.log(value);
    let xhr=new XMLHttpRequest();
    xhr.open('GET',`https://newsapi.org/v2/top-headlines?q=${value}&apiKey=086bea84da3f4e019c2cfd7f46e920ea`,true);
    xhr.onreadystatechange=function(){
        console.log(xhr.readyState);
    }
    xhr.onload=function(){
      console.log('loaded');
      let obj=JSON.parse(this.responseText);
      console.log(obj);
      array=obj.articles;
      document.getElementById('newsarea').innerHTML=``;
      array.forEach(function(e){
      let card=document.createElement('div');
      card.setAttribute('class','card w-100 my-2');
      card.innerHTML=`<h5 class="card-header">${e.title}</h5>
      <div class="card-body">
        <img src="${e.urlToImage}" height="150px" width="300px alt="Error in loading image">
        <p class="card-text">${e.description}</p>
        <p class="card-text">${e.content}</p>
        <a href="${e.url}" class="btn btn-link" target="_blank">Read More</a>
      </div>`;
      document.getElementById('newsarea').appendChild(card);
    });
  };
    xhr.send();
  });
