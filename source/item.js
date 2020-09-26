class Item{

    static all = []
    
    constructor({name, description, price, id, category_id}){
        this.name = name 
        this.description = description
        this.price = price 
        this.id = id
        this.category_id = category_id

        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`


        this.itemList = document.getElementById('item-list')
        this.element.addEventListener('click', this.handleListClick)

        Item.all.push(this)
    }

    get category() {
        return Category.all.find((cat) => cat.id == this.category_id)
    }



    handleListClick = (e) =>{
        console.log(this)
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
    

    displayToDom(){
        this.itemList.append(this.renderList())
    }

    renderList() {   
        this.element.innerHTML =   
         `
        <li>
        <strong class="name">${this.name}</strong>:
        <span class="description">${this.description}</span>
        $<span class="price">${this.price}</span>
        </li>
        <button class="delete" data-id="${this.id}">Delete</button>
        <button class="update" data-id="${this.id}">Update</button>
        `
        return this.element
    }  

    displayUpdate({name,description,price}){
        this.name = name
        this.description = description
        this.price = price 
        this.renderList()
     }
}