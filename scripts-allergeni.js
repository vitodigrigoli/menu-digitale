window.addEventListener('load', function() {
    // Seleziona l'elemento a cui vuoi aggiungere la classe
    const preloader = document.querySelector('.preloader');

    // Aggiungi la classe all'elemento
    preloader.classList.add('preloader--hidden');
});


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


