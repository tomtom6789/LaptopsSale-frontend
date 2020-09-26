/// all fetches here 
class ItemsAdapter {

    constructor() {
        this.baseUrl = "http://localhost:3000/items"
    }


   fetchItems() {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(array => {
       
        array.data.forEach((e) => {
           let item =  new Item(e.attributes)
           item.displayToDom()
        })
    })
}


fetchUpdateRequest(itemId) {
    let name = document.getElementById(`update-${itemId}-forname`).value
    let description = document.getElementById(`update-${itemId}-fordescription`).value
    let price = document.getElementById(`update-${itemId}-forprice`).value

    let updateObj = {
        name,
        description,
        price
    }

    let configUpdateObj = {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json", 
            "Accepts": "application.json"
        },
        body: JSON.stringify(updateObj)
    }
    fetch(this.baseUrl + `/${itemId}`, configUpdateObj)
    .then(res => res.json())
    .then(resp => {
        let item = Item.all.find((e) => e.id === resp.data.attributes.id )
        item.displayUpdate(resp.data.attributes)
    })

    let form = document.getElementById(`update-form-${itemId}`)
    form.remove()
}
}
