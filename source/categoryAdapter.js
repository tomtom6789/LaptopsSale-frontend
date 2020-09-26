class CategoryAdapter {

    constructor() {
        this.baseUrl = "http://localhost:3000/categories"
    }


   fetchCategories() {
    fetch(this.baseUrl)
    .then(res => res.json())
    .then(array => {
   
       array.data.forEach((e) => {
        this.sanitizeCategory(e)
        
       })
    })
}
    /////// Manipulate the resp as we like 

    sanitizeCategory(resp) {
        let category = new Category({id: resp.id, ...resp.attributes})
        category.displayToDom()

        
    }

}

