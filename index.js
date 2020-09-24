const itemList = document.getElementById('item-list')

function fetchItems(){
fetch('http://localhost:3000/categories')
.then(res => res.json())
.then(addItemsToDom)
}
function addItemsToDom(response) {
    response.included.forEach(item => {
        itemList.innerHTML += `<li id="item-${item.id}">${item.attributes.name}`
    })
}

fetchItems()



