const ContainerCards = document.querySelector(".row")
const search = document.querySelector("input[type=search]")
const CountTot = document.querySelector(".div-animation")
const NavBarList = document.querySelector('.offcanvas-body')
const NoBooks = document.querySelector(".NoBooks")

fetch("https://striveschool-api.herokuapp.com/books")
.then(response => response.json())
.then(books => { console.log(books)
  const ArrayCards = books.map( book => /*html*/
              `<div class="col-3 my-5" id="BookInbody_${book.asin}">
                <div class="card border-0">
                    <img src="${book.img}" class="card-img-top" style="height: 450px" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title card-title-inbody text">${book.title}</h5>
                      <p class="card-text">Prezzo: <span class="fw-medium">${book.price}€</span></p>
                      <button type="button" class="border-0 btn btn-primary position-relative" onclick='AddBook("${book.price}", "${book.title}", "${book.img}", event, "${book.asin}" )'><span><i class="bi bi-cart cart-main"></i></span>
                      </button>
                      <button type="button" class="btn btn-primary d-none bg-danger text-white border-0" onclick='RemoveBook("${book.asin}", event)'>X TOGLI DAL CARRELLO X</button>
                    </div>
                </div>
              </div>`
  )
  ContainerCards.innerHTML = ArrayCards.join("")
})
  
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
  
function AddBook(price, title, img, event, asin) {
  const NavCart = document.querySelector(".nav-cart")
  const buttonAdd = event.currentTarget.parentElement.querySelector("button:nth-of-type(1)")
  const buttonRemove = event.currentTarget.parentElement.querySelector("button:nth-of-type(2)")  
  
  NavCart.classList.replace("bi-cart", "bi-cart-fill")
  buttonAdd.classList.add("d-none")
  buttonRemove.classList.remove("d-none")
  CountTot.classList.add("position-relative-animation")
 
  NavBarList.innerHTML +=  /*html*/
    `<div class=" d-flex flex-row border-bottom border-2 pb-3 pt-3" id="BookIncart_${asin}" >
    <img src="${img}">
    <div class="card-body d-flex flex-column justify-content-around ms-2">
      <h6 class="card-title card-title-incart">${title}</h6>
      <div class="d-flex justify-content-between align-items-baseline">
      <p class="card-text">Prezzo: <span class="count-incart fw-medium">${price}€</span></p>
      <button type="button" class="btn bg-danger text-white" onclick='removefromcart(event, "${asin}")'>X</button>
      </div>
    </div>
    </div>`

    animation()
    total()
  }
  
  
  function RemoveBook(asin, event) {
      const buttonAdd = event.currentTarget.parentElement.querySelector("button:nth-of-type(1)")
      const buttonRemove = event.currentTarget.parentElement.querySelector("button:nth-of-type(2)")
      const book = document.querySelector("#BookIncart_" + asin)

      
      buttonAdd.classList.remove("d-none")
      buttonRemove.classList.add("d-none")
      book.remove()
      total()
    
    }

  function removefromcart(event, asin) {
    const book = document.querySelector("#BookInbody_" + asin)
    const buttonAdd = book.querySelector("button:nth-of-type(1)")
    const buttonRemove = book.querySelector("button:nth-of-type(2)")
    
    buttonAdd.classList.remove("d-none")
    buttonRemove.classList.add("d-none")
      
     event.currentTarget.parentElement.parentElement.parentElement.remove()
     total()
  }
  
 
  function total() {
  
    let prezzototale = 0
    const NavCart = document.querySelector(".nav-cart")
    const totalPrices = document.querySelectorAll(".count-incart")
    const TotalDOMandCart = document.querySelectorAll(".total")
    const quantity = document.querySelector(".quantity")

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
   
   

      
      
  
  
  
  
  



 
  


  
 
  
         
    

