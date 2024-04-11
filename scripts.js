const url = './menu.tsv'
const sectionID = ['selezioni', 'pizzeria', 'specialita','beverage', 'cocktails']
const sectionName = ['Le Selezioni', 'La Pizzeria', 'Le Specialità','Il Beverage', 'I Cocktails']

window.addEventListener('load', function() {
    // Seleziona l'elemento a cui vuoi aggiungere la classe
    const preloader = document.querySelector('.preloader');

    // Aggiungi la classe all'elemento
    preloader.classList.add('preloader--hidden');
});

fetch(url)
.then(response => response.text())
.then(data => {
	let csvData = tsvToObjects(data);
	let groupedCategoria = groupBy(csvData, 'Categoria');
	let html = '';

	for( let i = 0; i < sectionName.length; i++){

		category = groupedCategoria[sectionName[i]]
		let groupedSottocategoria = groupBy(category, 'Sottocategoria');

		html += `
			<section class="category" id="${sectionID[i]}">

			<div class="category__sticky watch">
				<div class="container">
					<h2>${sectionName[i]}</h2>
				</div>
				
			</div>
		`

		for( let sottocategoria in groupedSottocategoria ){

			sottoprodotti = groupedSottocategoria[sottocategoria]

			if (sottocategoria != '')
				console.log(sottocategoria)

			html += `
			<div class="category__food container">
				<h3 class="category__food__title watch">${sottocategoria}</h3>
			
			`;

			for( let product in sottoprodotti ){

				html += `
				<div class="food watch">

					<div class="food__header">

						<div class="food__header__title">
							<h4>${sottoprodotti[product].Prodotto}</h4>
						</div>

						<div class="food__header__price">
							<span>${sottoprodotti[product].Prezzo}</span>	
						</div>

					</div>

					<div class="food__description">
						<p>${sottoprodotti[product].Descrizione}</p>
					</div>
				</div>
				`;
			}

			html += `
			</div>`;
			

		}
	
	
		html += `
			</section>`;
	}

	document.querySelector('main').innerHTML += html;

	const pizzeria_text = document.createElement('p')

	pizzeria_text.id = "pizzeria__adds"
	pizzeria_text.className = "container"
	pizzeria_text.textContent = "* Prodotti Surgelati - Coperto € 2,00 - Aggiunte: Patatine, Verdure € 1,00 | Salumi & Formaggi € 1,50 | Doppia Mozzarella € 2,00 | Bresaola, Burrata, Bufala, Stracciatella, Mozzarella senza Lattosio € 3,00 - Pizza formato Famiglia: 2x prezzo Normale."
	document.querySelector('#pizzeria').appendChild(pizzeria_text)

	setup_animation()
})

.catch(console.error);



function tsvToObjects(tsv) {
	let lines = tsv.split('\n');
	let headers = lines[0].split('\t');
	return lines.slice(1).map(line => {
		let obj = {};
		let values = line.split('\t');
		headers.forEach((header, i) => {
			obj[header.trim()] = values[i].trim();
		});
		return obj;
	});
}

const groupBy = (array, key) => {
	return array.reduce((result, currentItem) => {
		(result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
		return result;
	}, {});
}


const setup_animation = () => {
	const menu_item = document.querySelectorAll('.menu__item')

	menu_item.forEach(item => {
		item.addEventListener('click', event => {

			const element = document.getElementById(item.getAttribute('data-item'));
			element.scrollIntoView();
		})

	})

	const watch = document.querySelectorAll('.watch')
	const category = document.querySelectorAll('.category')


	const intersection_observer = new IntersectionObserver( (items) =>{
		items.forEach( item => {
			
			if( item.isIntersecting){
				item.target.classList.add('in-view')
			}
			else{
				item.target.classList.remove('in-view')
			}
		})
	}, { threshold: 0.01} )

	watch.forEach( el => intersection_observer.observe(el))
	
	const menu_observer = new IntersectionObserver( (items) =>{
		items.forEach( item => {

			let selector = `.menu__item[data-item="${item.target.id}"]`;
			let icon_menu = document.querySelector(selector);

			if( item.isIntersecting){
				item.target.classList.add('in-view')

				if(icon_menu)
					icon_menu.classList.add('menu__item--active')

			}
			else{
				item.target.classList.remove('in-view')
				
				if(icon_menu)
					icon_menu.classList.remove('menu__item--active')
			}
		})
	}, { threshold: 0.01} )

	category.forEach( el => menu_observer.observe(el))
}

