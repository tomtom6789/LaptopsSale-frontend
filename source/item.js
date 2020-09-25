class Item{

    static all = []
    
    constructor({name, description, price, id}){
        this.name = name 
        this.description = description
        this.price = price 
        this.id = id

        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`
        this.itemList = document.getElementById('item-list')

        Item.all.push(this)
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


    displayUpdate(name,description,price){
        this.name = name
        this.description = description
        this.price = price   
     }
}