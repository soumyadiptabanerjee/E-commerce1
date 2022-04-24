let products = [
    {
        title: 'Cannon EOS',
        price: 36000.00,
        image: '1.jpg',
        tag: 'eos',
        incart: 0
    },
    {
        title: 'Sony DSLR',
        price: 40000.00,
        image: '5.jpg',
        tag: 'dslr1',
        incart: 0
    },
    {
        title: 'Sony DSLR',
        price: 50000.00,
        image: '2.jpg',
        tag: 'dslr2',
        incart: 0
    },
    {
        title: 'Olympus DSLR',
        price: 80000.00,
        image: '3.jpg',
        tag: 'dslr3',
        incart: 0
    },
    {
        title: 'Titan Model#301',
        price: 13000.00,
        image: '9.jpg',
        tag: '#301',
        incart: 0
    },
    {
        title: 'Titan Model#201',
        price: 3000.00,
        image: '10.jpg',
        tag: '#201',
        incart: 0
    },
    {
        title: 'HMT Milan',
        price: 8000.00,
        image: '11.jpg',
        tag: 'milan',
        incart: 0
    },
    {
        title: 'Faber Luba',
        price: 18000.00,
        image: '12.jpg',
        tag: 'faber',
        incart: 0
    },
    {
        title: 'H&W',
        price: 800.00,
        image: '8.jpg',
        tag: 'h&w',
       incart: 0
    },
    {
        title: 'Luis Phil',
        price: 1000.00,
        image: '6.jpg',
        tag: 'luis',
        incart: 0
    },
    {
        title: 'John Zok',
        price: 1500.00,
        image: '13.jpg',
        tag: 'zuk',
        incart: 0
    },
    {
        title: 'Jhalsani',
        price: 1300.00,
        image: '14.jpg',
        tag: 'jhalsani',
        incart: 0
    },
]
let carts = document.querySelectorAll('.add_cart'); 

for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// we are using this function as when we were adding to cart, the product number beside cart was also changing acc to local storage but when we were refreshing the page the product number beside cart in navbar was also refreshed to 0 though we had the local storage values. 
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector(' .span').textContent = productNumbers;
    }
}

function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
// we are using if else beacuse when there is nothing in local storage we are wanted to getItem as there is nothing so it returns NaN and when we were simply setItem('cartsNumber', productNumbers + 1) then it was returning NaN so for that reason we made a if else for case 1. if there is nothing, case 2. if there is then adding that with currrent.
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector(' .span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(' .span').textContent = 1;
    }
    setItems(products);
}

function setItems(products){
     let cartItems = localStorage.getItem('productInCart');
     cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    }
    else{
        products.incart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem('productInCart',JSON.stringify(cartItems));

}

function totalCost(products){
     let getCost = localStorage.getItem('totalCost');

     if(getCost != null){
        getCost = parseInt(getCost);
        localStorage.setItem('totalCost', getCost + products.price);
     } else {
        localStorage.setItem('totalCost', products.price);
     }
}

function displayCart(){
    
     let cartItems = localStorage.getItem('productInCart');
     cartItems = JSON.parse(cartItems);
     let productContainer = document.querySelector('.products');
     let getCost = localStorage.getItem('totalCost');
     if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item,k) => { 
            productContainer.innerHTML += `
            <div class='row mt-3 remove' style='border-bottom: 1px solid grey'>
            <div class='products col-5' id='itemList'>
              <div class='row'>
              <div class='col-2 title'>
              <i class="bi bi-x-circle text-danger" onclick='removeData(${k})'></i>
              </div>
               <div class='col-5'>
            <img src='./img/${item.image}' class='img'>
            </div>
            <div class='col-5 title'>
            <span>${item.title}</span>
            </div>
           </div>
            </div>
            <div class='price col-2 title'>Rs.${item.price}.00</div>
            <div class='col-3 title'>
            <i class="bi bi-plus-circle me-2 text-success" onclick='increeData(${k})'></i>
            ${item.incart}
            <i class="bi bi-dash-circle ms-2 text-danger" onclick='decreeData(${k})'></i>
            </div>
            <div class='col-2 title item_price'>
            Rs.${item.incart * item.price}.00
            </div>
            </div> 
            `
        });

        productContainer.innerHTML += `
        <div class='row mt-3 '>
        <div class='col-12'>
        <div class='row'>
        <div class='col-10 '>Total Amount</div>
        <div class='col-2 '>Rs.${getCost}</div>
        </div>
        </div>
        </div>
        `
     }
}
function removeData(rid){
    let getCost= localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productInCart');
    let cartNUmbers = localStorage.getItem('cartNumbers');
    cartItems = JSON.parse(cartItems);
    const arr_cart = Object.entries(cartItems);
    arr_cart.splice(rid,1);
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    let incart_arr = Object.entries(cartItems);
    if(cartItems){
        localStorage.setItem('cartNumbers', cartNUmbers - incart_arr[rid][1].incart);
        document.querySelector('.span').textContent = cartNUmbers - incart_arr[rid][1].incart;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(' .span').textContent = 1;
    }
    if(getCost !=null){
        localStorage.setItem('totalCost', getCost - (incart_arr[rid][1].price*incart_arr[rid][1].incart));
    }
    else{
        localStorage.setItem('totalCost', products.price);
    }
    
    displayCart();
}

function increeData(rid){
    let cartItems = localStorage.getItem('productInCart');
    
    let getCost= localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
     cartItems = JSON.parse(cartItems);
     const arr_cart = Object.entries(cartItems);
    if(arr_cart != null){
        arr_cart[rid][1].incart += 1;
    }
    else{
        arr_cart[rid][1].incart = 1;
    }
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    let incart_arr = Object.entries(cartItems);
    if(getCost !=null){
        localStorage.setItem('totalCost', getCost + (incart_arr[rid][1].price));
        
    }
    else{
        localStorage.setItem('totalCost', getCost *incart_arr[rid][1].incart);
    }
    window.location.reload();
}


function decreeData(rid){
    let cartItems = localStorage.getItem('productInCart');
    let cartNUmbers = localStorage.getItem('cartNumbers');
    cartNUmbers = parseInt(cartNUmbers);
    let getCost= localStorage.getItem('totalCost');
    getCost = parseInt(getCost);
     cartItems = JSON.parse(cartItems);
     const arr_cart = Object.entries(cartItems);
     let incart_arr = Object.entries(cartItems);
    if(arr_cart != null){
        if(arr_cart[rid][1].incart>0){
            arr_cart[rid][1].incart -= 1;
            localStorage.setItem('totalCost', getCost - (incart_arr[rid][1].price));
        }
        else if(arr_cart[rid][1].incart<=1){
            arr_cart.splice(rid,1);
            localStorage.setItem('totalCost', getCost);
            localStorage.setItem('cartNumbers', cartNUmbers - 1);
            document.querySelector('.span').textContent = cartNUmbers - 1;
        }
    }
    else{
        arr_cart[rid][1].incart = 1;
    }
    const arr = Object.fromEntries(arr_cart);
    localStorage.setItem('productInCart',JSON.stringify(arr));
    window.location.reload();
}
function showSuccess(){
    let cartItems = localStorage.getItem('productInCart');
    let cartNUmbers = localStorage.getItem('cartNumbers');
    cartNUmbers = parseInt(cartNUmbers);
    if(cartNUmbers >= 1){
        window.location.href = 'success.html';
      }
    else{
        window.location.href = '';
    }
}
displayCart();
onLoadCartNumbers();
