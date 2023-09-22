const NavCart = document.querySelector(".div-animation")
const Carts = document.querySelectorAll(".btn-primary:has(.cart-main)")
const Trash = document.querySelectorAll(".btn-primary:has(.bi-trash3)")
const SingleCount = document.querySelectorAll(".SingleCount")


Carts.forEach( (cartMain, i) => {
        let count = 0
        cartMain.addEventListener("click", function() {
        count++
        SingleCount[i].innerText = `${count}`
        NavCart.classList.add("position-relative-animation")
        cartMain.classList.add("single-book-animation")
      });
      
})

Trash.forEach( SingleTrash => {
  SingleTrash.addEventListener("click", function() {
        
      });
})



