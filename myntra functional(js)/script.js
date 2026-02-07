let bagItems=localStorage.getItem('bagItems')?JSON.parse(localStorage.getItem('bagItems')):[]
let display=()=>{
  let container=document.querySelector(".items-container");
  if(!container){
    return;
  }
let innerHtml=''

items.forEach((item)=>{
  innerHtml+=`
     <div class="item-container">
          <img src=${item.image} alt="item image" class="img">
          <div class="rating">
            ${item.rating.stars}⭐|${item.rating.count}
          </div>
          <div class="company-name">${item.company}</div>
          <div class="product-name">${item.item_name} </div>
          <div class="product-price">
            <span class="current-price">${item.original_price}</span>
            <span class="orginan-price">${item.current_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
          </div>
          <button class="btn" onclick="addTobag(${item.id})">Add to Bag</button>
        </div> `

});
container.innerHTML=innerHtml;
}
function displaybagItems(){
  let no=document.querySelector(".bag-item-count");
  if(bagItems.length>0){
    no.style.visibility='visible';
  no.innerText=bagItems.length;
  }else{
  
     no.style.visibility='hidden';
  }
}
function addTobag(id){
  bagItems.push(id);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displaybagItems();

}
display();
displaybagItems();