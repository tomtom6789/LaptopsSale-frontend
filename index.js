const itemList = document.getElementById('item-list')
const itemForm = document.getElementById('item-form')
const itemName = document.getElementById('item-name')
const itemDescription = document.getElementById('item-description')
const itemPrice = document.getElementById('item-price')
const itemsAdapter = new ItemsAdapter



document.addEventListener('DOMContentLoaded', () => {
    itemsAdapter.fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    itemList.addEventListener('click', handleListClick)
})

//Add laptops to Dom
// function fetchItems() {
//     fetch('http://localhost:3000/items')
//     .then(res => res.json())
//     .then(addItems)
// }

// function addItems(response) {
//     response.data.forEach( item => {
//         addItemToDom(item)
//     })
//     debugger;

// }


// function addItemToDom(item){
//     itemList.innerHTML += `
//     <div id="item-${item.id}">
//         <li>
//         <strong class="name">${item.attributes.name}</strong>:
//         <span class="description">${item.attributes.description}</span>
//         $<span class="price">${item.attributes.price}</span>
//         </li>
//         <button class="delete" data-id="${item.id}">Delete</button>
//         <button class="update" data-id="${item.id}">Update</button>
//         </div>`
// }


/// Add new laptop to Dom and Api
function handleFormSubmit(e) {
    e.preventDefault()
    let newObj = {
        name: itemName.value,
        description: itemDescription.value, 
        price: itemPrice.value 
    }
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newObj)
    }
    fetch('http://localhost:3000/items', configObj) 
    .then (resp => resp.json())
    .then (res => {
        addItemToDom(res.data)
    })
    itemForm.reset()
}



/////// Update 
function handleListClick(e){
    if (e.target.className === "delete"){
        let id = e.target.dataset.id
         deleteItem(id)
    } else if (e.target.className === "update"){
        let itemId = e.target.dataset.id
        e.target.className = "save"
        e.target.innerText = "Save"
        addUpdateItemFields(itemId)
    } else if (e.target.className === "save"){
        let itemId = e.target.dataset.id 
        e.target.className = "update"
        e.target.innerText = "Update"
        itemsAdapter.fetchUpdateRequest(itemId)
     } 
 }
//  function fetchUpdateRequest(itemId) {
//      let updateName = document.getElementById(`update-${itemId}-forname`)
//      let updateDescription = document.getElementById(`update-${itemId}-fordescription`)
//      let updatePrice = document.getElementById(`update-${itemId}-forprice`)

//      let updateObj = {
//          name: updateName.value, 
//          description: updateDescription.value, 
//          price: updatePrice.value 
//      }

//      let configUpdateObj = {
//          method: "PATCH", 
//          headers: {
//              "Content-Type": "application/json", 
//              "Accepts": "application.json"
//          },
//          body: JSON.stringify(updateObj)
//      }
//      fetch(`http://localhost:3000/items/${itemId}`, configUpdateObj)
//      .then(res => res.json())
//      .then(data => displayUpdate(data.data))
  
//      let form = document.getElementById(`update-form-${itemId}`)
//      form.remove()
     
//  }
 
 function displayUpdate(item){
    
    document.querySelector(`#item-${item.id} li .name`).innerText = item.attributes.name 
    document.querySelector(`#item-${item.id} li .description`).innerText = item.attributes.description
    document.querySelector(`#item-${item.id} li .price`).innerText = item.attributes.price 
 }

 function addUpdateItemFields(itemId) {
    let item = document.querySelector(`#item-${itemId} li`)
    let price = document.querySelector(`#item-${itemId} li .price`).innerHTML
    let description = document.querySelector(`#item-${itemId} li .description`).innerHTML
    let name = document.querySelector(`#item-${itemId} li .name`).innerHTML
    
    let updateForm = `
    <input type="text" value="${name}" name="name" id="update-${itemId}-forname">
    <input type="text" value="${description}" name="name" id="update-${itemId}-fordescription">
    <input type="number" value="${price}" name="price" id="update-${itemId}-forprice">
    `
    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${itemId}`
    formDiv.innerHTML = updateForm
    item.append(formDiv)
   
 }


//// Delete Fetch 
function deleteItem(id) {
    /// delete form Dom
    let item = document.getElementById(`item-${id}`)
    item.remove()
    /// delete form backend 
    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    fetch(`http://localhost:3000/items/${id}`, configObj) 
    .then (resp => resp.json())
    .then (res => {
       alert(res.message)
    })
}





