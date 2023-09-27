const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const ContainerArtist = document.querySelector(".row")

ContainerArtist.innerHTML = /*html*/ `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`



fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
  .then(response => response.json())
  .then(artist => {
    console.log(artist)

    ContainerArtist.innerHTML += `
    <div class="card mb-3 p-0 border-0" style="max-width: 800px;">
        <div class="row">
          <div class="col-md-4 border-0 p-0">
            <img src="${artist.img}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 p-0">
            <div class="card-body p-4">
              <h5 class="card-title">${artist.title}</h5>
              <p class="card-text">Prezzo: <span class="fw-medium">${artist.price}€</span></p>
              <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                 It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                 essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem 
                 Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
                 including versions of Lorem Ipsum.</p>
            </div>
           </div>
        </div>
      </div>`
  })
  .finally(() => {
    ContainerArtist.querySelector(".lds-ring").remove()
    document.querySelector(".col-12 a").classList.remove("d-none")
  })