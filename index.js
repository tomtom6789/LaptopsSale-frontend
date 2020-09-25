const itemList = document.getElementById('item-list')
const itemForm = document.getElementById('item-form')
const itemName = document.getElementById('item-name')
const itemDescription = document.getElementById('item-description')
const itemPrice = document.getElementById('item-price')





document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
    itemList.addEventListener('click', handleListClick)
})

function handleListClick(e){
    if (e.target.className === "delete"){
        let id = e.target.dataset.id
         deleteItem(id)
    
     } 
 }




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



///// Add laptops to Dom

function fetchItems() {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(addItems)
}

function addItems(response) {
    response.data.forEach( item => {
        addItemToDom(item)
    })

}


function addItemToDom(item){
    itemList.innerHTML += `
    <div id="item-${item.id}">
    <li>
    <strong class="name">${item.attributes.name}</strong>:
    <span class="description">${item.attributes.description}</span>
    $<span class="price">${item.attributes.price}</span>
    </li>
    <button class="delete" data-id="${item.id}"> Delete </button>
    <button class="update" date-id="${item.id}"> Update </button>
    </div>`
}




