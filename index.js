// products[3].showName() wypisuje index z wywołaniem metody pokaż nazwę

// console.log(products);
// products.push({ id: 6, name: 'Cola', price: 8 })
// console.log(products);

// ----
// dge document.getElementById
// dqs "Document Query Selector"
// dqsa "Document Query Selector All"
// ael "Add Event Listener"
// aelf "Add Event Listener Function"

const products = [
	{
		id: 1,
		name: 'Jabłka',
		price: 5,
		showName: () => console.log('Dodałeś jabłka'),
	},
]
const ulList = document.getElementById('product-list')
const input = document.getElementById('product-input').value
const productBtn = document.getElementById('product-btn')

const showProducts = () => {
	const li = document.createElement('li')
	const productName = products[0].name
	const productPrice = products[0].price
	li.innerText = `${productName}-----------${productPrice}`
	ulList.appendChild(li)
	console.log()
}

const addProduct = (id = '?', name = 'produkt', price = '100', arr = products) => {
	//arr daliśmy na koniec, zeby nie zadziałało jak id??
	arr.push({
		id,
		name,
		price,
		showName: () => console.log(`Właśnie dodałes ${name}`),
	})
}
const delProduct = (index, arr = products) => {
	products.splice(index, 1)
}
const delFirst = (arr = products) => {
	arr.shift() //tu ją inicjalizuje
}
const cancelProduct = (arr = products) => {
	products.pop()
}
const addFirst = (id = '?', name = 'produkt', price = '100', arr = products) => {
	arr.unshift({
		// id: id,
		// name: name,
		// price: price,
		// jeśli parametr obiektu i parametr funkcji są takie same, nie musze powtarzać nazmwy po : czyli id:id zapisuje jako id,
		id,
		name,
		price,
		// showName: () => console.log(`Właśnie dodałes ${name}`),
	})
}

productBtn.addEventListener('click', addProduct())
document.addEventListener('DOMContentLoaded', showProducts())
// addEventListener("click",  , false);
