const itemList = document.getElementById('item-list')
const itemForm = document.getElementById('item-form')
const itemName = document.getElementById('item-name')
const itemDescription = document.getElementById('item-description')
const itemPrice = document.getElementById('item-price')





document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
    itemForm.addEventListener('submit', handleFormSubmit)
})


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
}





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
    <div id="item-${item.id}>
    <li>
    $<span class="price">${item.attributes.price}</span>
    <strong class="name">${item.attributes.name}</strong>:
    <span class="description">${item.attributes.description}</span>
    </li>
    </div>
    `
}
