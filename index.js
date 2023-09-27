const ContainerCards = document.querySelector(".row")
const search = document.querySelector("input[type=search]")
const CountTot = document.querySelector(".div-animation")
const NavBarList = document.querySelector('.offcanvas-body')
const NoBooks = document.querySelector(".NoBooks")
const TotalBooks = []
ContainerCards.innerHTML = /*html*/ 

    `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

 fetch("https://striveschool-api.herokuapp.com/books")
 .then(response => response.json())
 .then(books => { const ArrayCards = books
         ArrayCards.forEach(book => { 
                
                 TotalBooks.push(book)
                 /*html*/
                 ContainerCards.innerHTML += `<div class="col-3 my-5" >
                 <div class="card border-0" id="BookInbody_${book.asin}">
                      <a href="/Artists/artist.html?id=${book.asin}">
                         <img src="${book.img}" class="card-img-top " alt="...">
                         <i class="bi bi-plus-circle more fs-2"></i>
                      </a>
                      
                     <div class="card-body text-center">
                       <h5 class="card-title card-title-inbody text">${book.title}</h5>
                       <p class="card-text">Prezzo: <span class="fw-medium">${book.price}€</span></p>
                       <button type="button" class="border-0 btn btn-primary position-relative" onclick='AddBook("${book.asin}")'><span><i class="bi bi-cart cart-main"></i></span>
                       </button>
                       <button type="button" class="btn btn-primary d-none bg-danger text-white border-0" onclick='RemoveBook("${book.asin}")'>X TOGLI DAL CARRELLO X</button>
                       <button type="button" class="btn btn-primary bg-secondary text-white border-0 m-2" onclick='NascondiBook("${book.asin}")'>NASCONDI</button>
                       </div>
                 </div>
               </div>`
           });
    
    })
  .catch(()=>ContainerCards.innerHTML = `<div class="m-5">
                                            <p class="fs-1 fw-bold text-center text-light m-5">...
                                                OOPS SOMETHING WRONG<br>REFRESH THE PAGE</p>
                                         </div>`)
  .finally(() => {ContainerCards.querySelector(".lds-ring").remove()})
  
function text() {
    const value = document.querySelector("input").value 
    const ArrayCardsTitle = document.querySelectorAll(".card-title-inbody")
    
    let count = 0
    ArrayCardsTitle.forEach((title, i) => {
      const ArrayCard = document.querySelectorAll(".col-3")[i]
      const TitleText = title.innerHTML.toLowerCase()
      !TitleText.includes(value.toLowerCase()) ? (ArrayCard.classList.add("d-none"), count++) : ArrayCard.classList.remove("d-none")
    })
    count === 50 ? NoBooks.classList.remove("d-none") : NoBooks.classList.add("d-none")
    
  }
  
function AddBook(asin) {

    const BookInBody = document.querySelector("#BookInbody_" + asin)
    const NavCart = document.querySelector(".nav-cart")
    const ButtonAdd = BookInBody.querySelector("button:nth-of-type(1)")
    const ButtonRemove = BookInBody.querySelector("button:nth-of-type(2)")
    
  
    NavCart.classList.replace("bi-cart", "bi-cart-fill")
    ButtonAdd.classList.add("d-none")
    ButtonRemove.classList.remove("d-none")
    CountTot.classList.add("position-relative-animation")
  
    
     const CorrentBookinArray =  TotalBooks.find(book => book.asin === asin) 
     NavBarList.innerHTML +=  /*html*/
     `<div class=" d-flex flex-row border-bottom border-2 pb-3 pt-3" id="BookIncart_${asin}" >
     <img src="${CorrentBookinArray.img}">
     <div class="card-body d-flex flex-column justify-content-around ms-2">
       <h6 class="card-title card-title-incart">${CorrentBookinArray.title}</h6>
       <div class="d-flex justify-content-between align-items-baseline">
       <p class="card-text">Prezzo: <span class="count-incart fw-medium">${CorrentBookinArray.price}€</span></p>
       <button type="button" class="btn bg-danger text-white" onclick='removefromcart("${asin}")'>X</button>
       </div>
     </div>
     </div>`
    
  animation()
  total()
  }
  
  
  function RemoveBook(asin) {
      
      const BookInCart = document.querySelector("#BookIncart_" + asin)
      const BookInBody = document.querySelector("#BookInbody_" + asin)
      const ButtonAdd = BookInBody.querySelector("button:nth-of-type(1)")
      const ButtonRemove = BookInBody.querySelector("button:nth-of-type(2)")

      ButtonAdd.classList.remove("d-none")
      ButtonRemove.classList.add("d-none")
      BookInCart.remove()
      total()
    
    }

  function removefromcart(asin) {
    const BookInBody = document.querySelector("#BookInbody_" + asin)
    const BookInCart = document.querySelector("#BookIncart_" + asin)
    const ButtonAdd = BookInBody.querySelector("button:nth-of-type(1)")
    const ButtonRemove = BookInBody.querySelector("button:nth-of-type(2)")
    
    ButtonAdd.classList.remove("d-none")
    ButtonRemove.classList.add("d-none")
      
    BookInCart.remove()
    total()
  }

  function RemoveAllBooksFromCart() {
    const AllBooksInBody = document.querySelectorAll(".card")
    
    NavBarList.innerHTML = ""
    AllBooksInBody.forEach(book => {
      const ButtonAdd = book.querySelector(".card button:nth-of-type(1)")
      const ButtonRemove = book.querySelector(".card button:nth-of-type(2)")
      ButtonAdd.classList.remove("d-none")
      ButtonRemove.classList.add("d-none")
    })
    total()
  }

  function NascondiBook(asin) {
    document.querySelector("#BookInbody_" + asin).parentElement.classList.add("d-none")  
  }
  function RefreshBooks() {
    const AllBooksInBody = document.querySelectorAll(".card")
    
    
     AllBooksInBody.forEach(book => {
       book.parentElement.classList.remove("d-none")
      
     })
  }
  
 
  function total() {
  
    const NavCart = document.querySelector(".nav-cart")
    const totalPrices = document.querySelectorAll(".count-incart")
    const TotalDOMandCart = document.querySelectorAll(".total")
    const quantity = document.querySelector(".quantity")
    let prezzototale = 0

    quantity.innerHTML = totalPrices.length
    totalPrices.forEach(x => {
      prezzototale = prezzototale + parseFloat(x.innerHTML)
    })
    TotalDOMandCart.forEach(total => {
      total.innerHTML = `${prezzototale.toFixed(2)}€`
      })

  if(prezzototale === 0){
    NavCart.classList.replace("bi-cart-fill", "bi-cart")
    CountTot.classList.remove("position-relative-animation")
  }
  
   
  
 }

  
 function animation() {
  document.querySelector(".Number-Book-Dinamic > span").classList.add("Animation-Cart");
  setTimeout(() => {
    document.querySelector(".Number-Book-Dinamic > span").classList.remove("Animation-Cart");
  }, 500) }
   
   

      
      
  
  
  
  
  



 
  


  
 
  
         
    

