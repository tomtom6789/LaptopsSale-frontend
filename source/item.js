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
        

        Item.all.push(this)
    }

 
    get category(){
        return Category.all.find((cat) => cat.id == this.category_id)
    }


    addEventListeners() {
        this.element.addEventListener('click', this.handleListClick)
    }


    handleListClick = (e) =>{
        
        if (e.target.className === "delete"){
            let id = e.target.dataset.id
            itemsAdapter.deleteItem(id)
            this.element.remove()
        } else if (e.target.className === "update"){
            let itemId = e.target.dataset.id
            e.target.className = "save"
            e.target.innerText = "Save"
            this.addUpdateItemFields(itemId)
        } else if (e.target.className === "save"){
            let itemId = e.target.dataset.id 
            e.target.className = "update"
            e.target.innerText = "Update"
            itemsAdapter.fetchUpdateRequest(itemId)
         } 
     }
    

    displayToDom(){
        this.itemList.append(this.renderList())
        this.addEventListeners()

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


    addUpdateItemFields(itemId) {
    let item = Item.all.find((i) => i.id == itemId)
    
    let updateForm = `
    <input type="text" value="${this.name}" name="name" id="update-${itemId}-forname">
    <input type="text" value="${this.description}" name="name" id="update-${itemId}-fordescription">
    <input type="number" value="${this.price}" name="price" id="update-${itemId}-forprice">
    `
    let formDiv = document.createElement('div')
    formDiv.id = `update-form-${itemId}`
    formDiv.innerHTML = updateForm
    item.element.querySelector('li').append(formDiv)
   
 }



}