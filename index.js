// Pobranie referencji do elementów HTML
const productBtn = document.getElementById('product-btn')
const ulList = document.getElementById('product-list')
const nameInput = document.getElementById('product-input')
const priceInput = document.getElementById('price-input')
const clearBtn = document.getElementById('clear-btn')
const inputInfo = document.getElementById('input-info') // Referencja do elementu wyświetlającego informacje dla użytkownika

// Inicjalizacja tablicy przechowującej produkty (pobranie danych z local storage lub inicjalizacja pustej tablicy)
let products = JSON.parse(localStorage.getItem('products')) || []

// Funkcja dodająca produkt do listy
const addToList = event => {
	const actualPrice = priceInput.value.trim() // Pobranie ceny produktu (pozbycie się białych znaków na początku i końcu)
	const actualName = nameInput.value.trim() // Pobranie nazwy produktu (pozbycie się białych znaków na początku i końcu)

	if (actualName === '') {
		inputInfo.innerText = 'Nie dodałeś nic do listy! Wpisz nazwę produktu.'
		return
	}

	if (actualPrice === '' && event.target.id !== 'price-input') {
		// Komunikat "Dodaj cenę"
		inputInfo.innerText = 'Dodaj cenę'
		priceInput.focus()
		return
	}

	if (actualPrice === '' && ((event && event.key === 'Enter') || event.target.id === 'price-input')) {
		// Komunikat "Nie podałeś ceny" po naciśnięciu Enter na polu ceny lub po kliknięciu w pole ceny
		inputInfo.innerText = 'Nie podałeś ceny'
		priceInput.focus()
		return
	}

	// Po dodaniu produktu, jeśli lista nie jest pusta, ustaw informację dla użytkownika na domyślną
	if (products.length !== 0) {
		inputInfo.innerText = 'Daj nazwę i cenę'
	}

	addProduct(actualName, actualPrice)
	showProducts()
	nameInput.value = ''
	priceInput.value = ''
	nameInput.focus()
}

// Funkcja wyświetlająca produkty na liście
const showProducts = () => {
	// Wyczyszczenie zawartości listy
	ulList.innerHTML = ''

	// Dodanie każdego produktu do listy
	products.forEach(({ name, price }) => {
		const li = document.createElement('li') // Utworzenie nowego elementu <li>
		li.innerHTML = `<div class="fajny-produkt"><div class="fajna-nazwa-cena">
		<div class="name-li">${name}..............</div>
		<div class="name-li">${price}</div></div>
		<div class="tools">
		<button class="complete"><i class="fas fa-check"></i></button>
		<button class="edit">EDIT</button>
		<button class="delete"><i class="fas fa-times"></i></button>
		</div>
        </div>`
		ulList.appendChild(li) // Dodanie elementu <li> do listy <ul>
	})
}

{
	/* <div class="tools">
<button class="complete"><i class="fas fa-check"></i></button>
<button class="edit">EDIT</button>
<button class="delete"><i class="fas fa-times"></i></button>
</div>
 */
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
		showName: () => console.log(`Właśnie dodałeś ${name}`),
	})
}

// Funkcja dodająca produkt do tablicy
const addProduct = (name, price) => {
	products.push({ name, price }) // Dodanie nowego produktu do tablicy
	saveToLocalStorage() // Zapisanie tablicy do local storage
}

// Funkcja zapisująca tablicę produktów do local storage
const saveToLocalStorage = () => {
	localStorage.setItem('products', JSON.stringify(products)) // Zapisanie tablicy do local storage w formacie JSON
}

// Funkcja usuwająca wszystkie produkty z local storage i wyczyszczająca listę na stronie
const clearLocalStorage = () => {
	localStorage.removeItem('products') // Usunięcie danych z local storage
	products = [] // Wyczyszczenie tablicy produktów
	ulList.innerHTML = '' // Wyczyszczenie listy na stronie
}

// Nasłuchiwanie zdarzeń na przyciskach
productBtn.addEventListener('click', addToList) // Dodawanie produktu po kliknięciu przycisku "Dodaj"
clearBtn.addEventListener('click', clearLocalStorage) // Czyszczenie listy po kliknięciu przycisku "Wyczyść"

// Obsługa klawiszy na polu nazwy produktu
nameInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addToList() // Dodawanie produktu po naciśnięciu klawisza "Enter"
	} else if (event.key === 'Tab' && !event.shiftKey) {
		event.preventDefault() // Zapobieganie domyślnej akcji dla Tab (przejście do następnego pola)
		priceInput.focus() // Przejście do pola ceny po naciśnięciu Tab
	}
})

// Obsługa klawiszy na polu ceny produktu
priceInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addToList() // Dodawanie produktu po naciśnięciu klawisza "Enter"
	} else if (event.key === 'Tab' && event.shiftKey) {
		event.preventDefault() // Zapobieganie domyślnej akcji dla Shift + Tab (przejście do poprzedniego pola)
		nameInput.focus() // Powrót do pola nazwy po naciśnięciu Shift + Tab
	}
})

// Wyświetlenie produktów na liście po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
	showProducts() // Wywołanie funkcji wyświetlającej produkty
	inputInfo.innerText = 'Daj nazwę i cenę' // Ustawienie domyślnej informacji dla użytkownika
	nameInput.focus()
})

// Nasłuchiwanie kliknięcia na pole wprowadzania ceny
priceInput.addEventListener('click', function () {
	inputInfo.innerText = 'Dodaj cenę'
})
priceInput.addEventListener('focus', function () {
	inputInfo.innerText = 'Dodaj cenę'
})

nameInput.addEventListener('focus', function () {
	inputInfo.innerText = 'Dodaj nazwę'
})

nameInput.addEventListener('blur', function (event) {
	if (event.target !== priceInput) {
		inputInfo.innerText = 'Daj nazwę i cenę'
	}
})

// document.addEventListener('click', function (event) {
// 	if (event.target !== priceInput && event.target !== nameInput) {
// 		inputInfo.innerText = 'Daj nazwę i cenę'
// 	}
// })
aaa