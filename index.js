const products = []

const productBtn = document.getElementById('product-btn')
const ulList = document.getElementById('product-list')

const addToList = () => {
	const nameInput = document.getElementById('product-input')
	const priceInput = document.getElementById('price-input')
	const actualPrice = priceInput.value
	const actualName = nameInput.value

	if (actualName.trim() === '') {
		const inputInfo = document.getElementById('input-info')
		inputInfo.innerText = 'Nie dałeś produktu. Mordo'
		return
	}

	addProduct(1, actualName, actualPrice)
	showProducts()
	nameInput.value = ''
	priceInput.value = ''
	const inputInfo = document.getElementById('input-info')
	inputInfo.innerText = 'Daj nazwę i cenę'
}

const showProducts = () => {
	ulList.innerHTML = ''
	products.forEach((product, index) => {
		const li = document.createElement('li')
		li.innerText = `${product.name} - ${product.price}`

		li.addEventListener('click', () => {
			console.log(`Index: ${index}`)
			product.showName()
		})

		ulList.appendChild(li)
	})
}

const addProduct = (id = '?', name = 'produkt', price = '100', arr = products) => {
	arr.push({
		id,
		name,
		price,
		showName: () => console.log(`Właśnie dodałeś ${name}`),
	})
}

productBtn.addEventListener('click', addToList)
document.addEventListener('DOMContentLoaded', showProducts)

// Obsługa zdarzenia keypress na polu tektsowym z nazwą produktu
document.getElementById('product-input').addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addToList()
	}
})

// Obsługa zdarzenia keypress na polu tektsowym z ceną produktu
document.getElementById('price-input').addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addToList()
	}
})
