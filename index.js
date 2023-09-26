const ContainerCards = document.querySelector(".row")
const search = document.querySelector("input[type=search]")
const CountTot = document.querySelector(".div-animation")
const NavBarList = document.querySelector('.offcanvas-body')

fetch("https://striveschool-api.herokuapp.com/books")
.then(response => response.json())
.then(books => { console.log(books)
  const ArrayCards = books.map( book => /*html*/
              `<div class="col-3 my-5" id="BookInbody_${book.asin}">
                <div class="card">
                    <img src="${book.img}" class="card-img-top" style="height: 450px" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title card-title-inbody">${book.title}</h5>
                      <p class="card-text">Prezzo: ${book.price}€</p>
                      <button type="button" class="btn btn-primary position-relative" onclick='AddBook("${book.price}", "${book.title}", "${book.img}", event, "${book.asin}" )'><span><i class="bi bi-cart cart-main"></i></span>
                      </button>
                      <button type="button" class="btn btn-primary d-none" onclick='RemoveBook("${book.asin}", event)'>X TOGLI DAL CARRELLO X</button>
                    </div>
                </div>
              </div>`
  )
  ContainerCards.innerHTML = ArrayCards.join("")
})
  
function text() {
    const value = document.querySelector("input").value
    const ArrayCardsTitle = document.querySelectorAll(".card-title-inbody")
    const ZeroBooks = document.querySelector(".zero")
    let count = 0
    ArrayCardsTitle.forEach((Title, i) => {
      const ArrayCard = document.querySelectorAll(".col-3")[i]
      const TitleText = Title.innerHTML.toLowerCase()
      !TitleText.includes(value.toLowerCase()) ? (ArrayCard.classList.add("d-none"), count++) : ArrayCard.classList.remove("d-none")
    })
    count === 50 ? ZeroBooks.classList.remove("d-none") : ZeroBooks.classList.add("d-none")
    
  }
  
function AddBook(price, title, img, event, asin) {
  const buttonAdd = event.currentTarget.parentElement.querySelector("button:nth-of-type(1)")
  const buttonRemove = event.currentTarget.parentElement.querySelector("button:nth-of-type(2)")
  
  buttonAdd.classList.add("d-none")
  buttonRemove.classList.remove("d-none")
  CountTot.classList.add("position-relative-animation")
 
  NavBarList.innerHTML +=  /*html*/
    `<div class=" d-flex flex-row my-2 border-bottom border-3 pb-2" id="BookInchart_${asin}" >
    <img style="width: 120px" src="${img}">
    <div class="card-body ms-2">
      <h6 class="card-title card-title-inchart">${title}</h6>
      <p class="card-text">Prezzo: <span class="count-inchart">${price}</span></p>
      <button type="button" class="btn btn-primary" onclick='removefromchart(event, "${asin}")'>X</button>
    </div>
    </div>`
    total()
  }
  
  
  function RemoveBook(asin, event) {
  
      const buttonAdd = event.currentTarget.parentElement.querySelector("button:nth-of-type(1)")
      const buttonRemove = event.currentTarget.parentElement.querySelector("button:nth-of-type(2)")
      const book = document.querySelector("#BookInchart_" + asin)
      buttonAdd.classList.remove("d-none")
      buttonRemove.classList.add("d-none")
      book.remove()
      total()
    
    }

  function removefromchart(event, asin) {
    const book = document.querySelector("#BookInbody_" + asin)
    
      
        const buttonAdd = book.querySelector("button:nth-of-type(1)")
        const buttonRemove = book.querySelector("button:nth-of-type(2)")
        buttonAdd.classList.remove("d-none")
        buttonRemove.classList.add("d-none")
      
     event.currentTarget.parentElement.parentElement.remove()
     total()
  }
  
 
  function total() {
  
    let prezzototale = 0
    const totalPrices = document.querySelectorAll(".count-inchart")
    const totalDOOM = document.querySelectorAll(".total")
    const quantity = document.querySelector(".quantity")
    quantity.innerHTML = totalPrices.length
    totalPrices.forEach(x => {
      prezzototale = prezzototale + parseFloat(x.innerHTML)
      
    })
    totalDOOM.forEach(total => {
      total.innerHTML = prezzototale.toFixed(2)
      })

  if(prezzototale === 0){
    CountTot.classList.remove("position-relative-animation")
  }
  
   
  
 }

  
    
   
   

      
      
  
  
  
  
  



 
  


  
 
  
         
    

