const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

function getToys(){
  return fetch('http://localhost3000/toys')
  .then(res =>.json())
}

funtion postToy(toy_info){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj_toy) => {
    let new_toy = renderToys(obj_toy)
    divCollect.appendChild(new_toy)
  })
}

function likes(e){
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch ('http://localhost:3000/toys/${e.target.id}', {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: Json.stringify({
    "likes": more 
  })
  .then(res => res.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = '${more} likes';
  }))
  
}

function renderToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name 

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = '${toy.likes} likes'

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })


  let divCard = document.createElement('div')
  dicCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

addBtn.addEventListener('click', () =>{
  addToy = !addToy 
  if (addToy){
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  }
  else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toyr => {
  toys.forEach (toy => {
    renderToys(toy)
  })
})