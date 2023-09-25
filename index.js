const ContainerCards = document.querySelector(".row")
const search = document.querySelector("input[type=search]")
const CountTot = document.querySelector(".div-animation")
const NavBarList = document.querySelector('.offcanvas-body')

fetch("https://striveschool-api.herokuapp.com/books")
.then(response => response.json())
.then(books => {
  const ArrayCards = books.map( book => /*html*/
              `<div class="col-3">
                <div class="card">
                    <img src="${book.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">${book.price}€</p>
                      <button type="button" class="btn btn-primary position-relative" onclick='AddBook("${book.price}","${book.title}","${book.img}" )'><span><i class="bi bi-cart cart-main"></i></span>
                      <div class="number-single-book">
                        <span class="SingleCount">1</span>
                      </div>
                      </button>
                      <button type="button" class="btn btn-primary" onclick='RemoveBook("${book.title}")'><i class="bi bi-trash3"></i></i></button>
                    </div>
                </div>
              </div>`
  )
  ContainerCards.innerHTML = ArrayCards.join("")
})
  
function text() {
    const value = document.querySelector("input").value
    const ArrayCardsTitle = document.querySelectorAll(".card-title")
    const ZeroBooks = document.querySelector(".zero")
    let count = 0
    ArrayCardsTitle.forEach((Title, i) => {
      const ArrayCard = document.querySelectorAll(".col-3")[i]
      const TitleText = Title.innerHTML.toLowerCase()
      !TitleText.includes(value.toLowerCase()) ? (ArrayCard.classList.add("d-none"), count++) : ArrayCard.classList.remove("d-none")
    })
    count === 50 ? ZeroBooks.classList.remove("d-none") : ZeroBooks.classList.add("d-none")
    
  }
  
function AddBook(price, title, img) {
  CountTot.classList.add("position-relative-animation")
  const Check = document.querySelectorAll(".ck")
  Check.forEach((book) => {
    if(book.innerHTML === title){
      book.parentElement.parentElement.remove()
      
      } 
  })
  NavBarList.innerHTML +=  /*html*/
    `<div class=" d-flex flex-row">
    <img style="width: 90px" src="${img}">
    <div class="card-body ms-2">
      <h5 class="card-title ck">${title}</h5>
      <p class="card-text">Prezzo: <span class="count">${price}</span></p>
      <button type="button" class="btn btn-primary" onclick='RemoveBook("${title}")'>X</button>
      <div class="d-flex">
        <p class="card-text">Quantità:</p>
        <input type="number" id="points" name="points">
      </div>
    </div>
    </div>`
    total()
  }
  
  function RemoveBook(title) {
    const Check = document.querySelectorAll(".ck")
    Check.forEach((book) => {
      if(book.innerHTML === title)
      book.parentElement.parentElement.remove()
    })
    total()
    }

  
  
 function total() {
  let prezzototale = 0
  const totalPRices = document.querySelectorAll(".count")
  const totalDOOM = document.querySelector(".total")
  
  totalPRices.forEach(x => {
    
    prezzototale = prezzototale + parseFloat(x.innerHTML)
    totalDOOM.innerHTML = prezzototale.toFixed(2)
    
  })
  if(prezzototale === 0){
    totalDOOM.innerHTML = 0
    CountTot.classList.remove("position-relative-animation")
  }
  console.log(prezzototale)
 }

  
    
   
   

      
      
  
  
  
  
  



 
  


  
 
  
         
    

