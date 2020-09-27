const itemForm = document.getElementById('item-form')
const itemsAdapter = new ItemsAdapter
const categoryAdapter = new CategoryAdapter
let currentCategory



document.addEventListener('DOMContentLoaded', () => {
    categoryAdapter.fetchCategories()
    itemsAdapter.fetchItems()
    itemForm.addEventListener('submit', itemsAdapter.createItem)
})

