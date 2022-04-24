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
onLoadCartNumbers()
var addCart_btn = document.querySelectorAll('.add_cart');
for(let i in addCart_btn){
    addCart_btn[i].addEventListener('click', () => {
        totalCost(products[i]);
        cartNumbers(products[i]);
        pro_details(products[i]);
    })
}

function totalCost(products){
 
    let cartcost = localStorage.getItem('totalcost');
    if(cartcost!=null){
    cartcost=parseInt(cartcost);
    localStorage.setItem('totalcost', cartcost + products.price);
    }
    else{
        localStorage.setItem('totalcost', products.price);
    }
}

function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.countItem').textContent= productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.countItem').textContent = 1;
    }
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    document.querySelector('.countItem').textContent = productNumbers;
}




