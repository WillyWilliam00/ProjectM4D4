const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const ContainerArtist = document.querySelector(".row")

fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
 .then(response => response.json())
 .then(artist => {
    ContainerArtist.innerHTML += `<div class="col-3 my-5">
                 <div class="card border-0">
                     <img src="${artist.img}" class="card-img-top"alt="...">
                    
                     <div class="card-body text-center">
                       <h5 class="card-title card-title-inbody text">${artist.title}</h5>
                       <p class="card-text">Prezzo: <span class="fw-medium">${artist.price}€</span></p>
                     </div>
                 </div>
               </div>`
 })
 