var swiper = new Swiper(".mySwiper", {
  loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });
    const cartIcon=document.querySelector(".cart-icon");
    const cartTab=document.querySelector(".cart-tab");
    const closeBtn=document.querySelector(".close-btn");
    const cardList=document.querySelector(".card-list");
    const cartList=document.querySelector(".cart-list");
    const cartValue=document.querySelector(".cart-value");
    const T=document.querySelector(".total");
    let minus;
    let plus;

    let cartBtn;
    let total=0;
     let cart=[];
     let Au=()=>{
      minus.forEach(el=>{
        el.addEventListener("click",(e)=>{
    cart.forEach(el=>{
      if(el.id==e.target.id){
        if(el.qty>0){
        el.qty--;
        showqty();
        }
      }
    });
        });
      });
      plus.forEach(el=>{
        el.addEventListener("click",(e)=>{
    cart.forEach(el=>{
      if(el.id==e.target.id){
        el.qty++;
        showqty();
      }
    });

      })
     })
    }
    let showqty=()=>{
         cartList.innerHTML="";
         total=0;
      cart.forEach(el=>{
         cartList.innerHTML+=`<div class="item">
              <div class="item-image">
                <img src="${el.image}">
              </div>
              <div>
                <h4>${el.name}</h4>
                <h4 class="item-total">${el.price}</h4>
              </div>
              <div class="flex">
                <a href="#" class="quantity-btn" >
                  <i class="fa-solid fa-minus" id=${el.id}></i>
                </a>
                <h4 class="quantity-value">${el.qty}</h4>
                <a href="#" class="quantity-btn" >
                  <i class="fa-solid fa-plus" id=${el.id}></i>
                </a>
              </div>

            </div>`
            total+=(el.qty)*(Number(el.price.replace("$", "")));


      });
        T.innerText="$"+Math.ceil(total);
        minus=document.querySelectorAll(".fa-minus");
      plus=document.querySelectorAll(".fa-plus");
      Au();

    }
     let itemCounter=()=>{

cartValue.innerText=cart.length;
     }
     let pp=(id)=>{
    let existing = cart.find(item => item.id == id);

  if (existing) {
    existing.qty += 1;
  } else {
    let product = productList.find(el => el.id == id);
    cart.push({ ...product, qty: 1 });
  }
      showqty();
    
      
      
     }
     
    
     
    let iu=()=>{
         cartBtn=document.querySelectorAll(".cart-btn");
         ev();
}
let ev=()=>{
  cartBtn.forEach(el=>{
    el.addEventListener("click",(e)=>{
      e.preventDefault();
      pp(e.target.id);
      itemCounter();     
    })
  })
}
    let showCard=()=>{
            productList.forEach(el => {
   let a= cardList.innerHTML;
   
   cardList.innerHTML=a+`<div class="order-card">
            <div class="card-image">
              <img src="${el.image}">
            </div>
            <h4>${el.name}</h4>
            <h4 class="price">${el.price}</h4>
            <a href="#" class="btn cart-btn" id="${el.id}">Add to Cart</a>
          </div>`;

      
    });
    }
    
    cartIcon.addEventListener("click",(e)=>{
      e.preventDefault();

      cartTab.classList.add("cart-tab-active")
    });
    closeBtn.addEventListener("click",(e)=>{
      cartTab.classList.remove("cart-tab-active");
      e.preventDefault();
    })
    let productList=[];
    const initApp=()=>{
      fetch("product.json").then
      (  Response=> Response.json()
      ).then(data=>{
        productList=data;
        showCard();
        iu();
  
      })
    }
    initApp();


    


  
    