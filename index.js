const productBtn = document.getElementById('product-btn')
const ulList = document.getElementById('product-list')
const nameInput = document.getElementById('product-input')
const priceInput = document.getElementById('price-input')
const clearBtn = document.getElementById('clear-btn')

let products = JSON.parse(localStorage.getItem('products')) || []

const addToList = () => {
	const actualPrice = priceInput.value.trim()
	const actualName = nameInput.value.trim()

	if (actualName === '') {
		const inputInfo = document.getElementById('input-info')
		inputInfo.innerText = 'Nie dodałeś nic do listy! Wpisz nazwę produktu.'
		return
	}
	if (actualPrice === '') {
		priceInput.focus()
		return
	}

	addProduct(actualName, actualPrice)
	showProducts()
	nameInput.value = ''
	priceInput.value = ''
	nameInput.focus()
	const inputInfo = document.getElementById('input-info')
	inputInfo.innerText = 'Daj nazwę i cenę'
}

// const showProducts = () => {
// 	ulList.innerHTML = ''
// 	products.forEach((product, index) => {
// 		const li = document.createElement('li')
// 		// li.innerHTML = ``
// 		const liProduct = document.createElement('div')
// 		liProduct.classList.add('fajny-produkt')
// 		const liSpan = document.createElement('span')
// 		liSpan.innerHTML = `${product.name}`
// 		const liSpan2 = document.createElement('span')
// 		liSpan2.innerHTML = `${product.price}`
// 		liProduct.appendChild(liSpan)
// 		liProduct.appendChild(liSpan2)
// 		li.appendChild(liProduct)
// 		// li.innerHTML = `${product.name} ----------- ${product.price}`
// 		ulList.appendChild(li)
// 	})
// }

// const showProducts = () => {
//     ulList.innerHTML = '';
//     products.forEach(product => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <div class="fajny-produkt">
//                 <span>${product.name}</span>
//                 <span>${product.price}</span>
//             </div>`;
//         ulList.appendChild(li);
//     });
// };
const showProducts = () => {
    ulList.innerHTML = products.map(({ name, price }) => `
        <li>
            <div class="fajny-produkt">
                <span>${name}</span>
                <span>${price}</span>
            </div>
        </li>
    `).join('');
};
const addProduct = (name, price) => {
	products.push({ name, price })
	saveToLocalStorage()
}

const saveToLocalStorage = () => {
	localStorage.setItem('products', JSON.stringify(products))
}

const clearLocalStorage = () => {
	localStorage.removeItem('products') //ze schowka
	products = [] // Czyszczenie tablicy products pamiec podreczna przeglądarki
	ulList.innerHTML = '' // Usuwanie zawartości listy na ekranie
}

productBtn.addEventListener('click', addToList)
clearBtn.addEventListener('click', clearLocalStorage)

// Obsługa zdarzenia keypress na polu tekstowym z nazwą produktu i cenie
nameInput.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addToList()
	}
})

priceInput.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addToList()
	}
})

document.addEventListener('DOMContentLoaded', showProducts)
