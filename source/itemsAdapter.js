/// all fetches here 
class ItemsAdapter {

    constructor() {
        this.baseUrl = "http://localhost:3000/items"
    }

    // GET  //
   fetchItems() {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(array => {
       
        array.data.forEach((e) => {
        new Item(e.attributes)
        })
    })
}

    // Patch //
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


    // Delete //
     deleteItem(id) {
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

    // Post //
    createItem(e) {
        e.preventDefault();

        const name =  document.getElementById('item-name').value
        const description = document.getElementById('item-description').value
        const price = document.getElementById('item-price').value
        const category_name =  document.getElementById('item-category').value


        let newObj = {
           item: {
               name, 
               description, 
               price,
               category_name,
           }
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
            let category = Category.all.find(c => c.id == res.data.attributes.category_id)
         
            if(!category) {
                category = new Category({
                    id: res.data.attributes.category_id,
                    name: res.data.attributes.category_name   
                })
                category.displayToDom();           
            }
                // Category is require to add to dom
            let item = new Item(res.data.attributes);
            if (!!currentCategory && currentCategory.id == item.category_id) {
                item.displayToDom();
            }
        })

        itemForm.reset();
    }
    





}
