let page = document.querySelector(".bag-items-container");
let prize=document.querySelector(".bag-summary");

function disp(){
  let totalMrp=0;
let discount=0;
let amount=0;
let count=0;
  
  let bag = items.filter(item => bagItems.includes(Number(item.id)));
let inner='';
bag.forEach(el=>{
  inner+=`<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${el.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${el.company}</div>
              <div class="item-name">${el.item_name}</div>
              <div class="price-container">
                <span class="current-price">${el.current_price}</span>
                <span class="original-price">${el.original_price}</span>
                <span class="discount-percentage">(${el.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${el.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${el.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="remove(${el.id})">X</div>
          </div>`
          totalMrp+=el.original_price;
          count++;
          discount+=el.original_price*el.discount_percentage/100;


});
amount=totalMrp-discount+99;
page.innerHTML=inner;
prize.innerHTML=`<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${count} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${amount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}
disp();
function remove(Id){
bagItems=bagItems.filter(id=>{
  if(id!=Id){
    return true
  }
  else{
    return false
  }
})
 localStorage.setItem('bagItems',JSON.stringify(bagItems));
disp();
displaybagItems();
}
