let mobile;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
mobile = true;
document.body.classList.add('_mobile');
} else {
document.body.classList.add('_desktop');
mobile = false;
}
if(mobile === false) {
function tool_create(classes, position, theme) {
	const elms = document.querySelectorAll(classes);
	if(elms && elms.length > 0) {
		elms.forEach(classes_item => {
			const attr = classes_item.dataset.tool;
			classes_item.insertAdjacentHTML('afterbegin', `<div class="tooltip ${theme + ' ' + position}">${attr}</div>`)
		})
	}
}

tool_create('.tool.top', 'top', 'light');
tool_create('.tool.right', 'right', 'light');
}

// filter
const filter_wrappers = document.querySelectorAll('.filter__wrapper');
let anime_time = 300;
if(filter_wrappers && filter_wrappers.length > 0) {
filter_wrappers.forEach(filter_wrap => {
	const filter_items = filter_wrap.querySelectorAll('.filter__item');
	const filter_elms = filter_wrap.querySelectorAll('.filter__el');
	filter_wrap.addEventListener('click', (e) => filter_click(e, filter_items, filter_elms));
})
}

function filter_click(e, filter_items, filter_elms) {
const el = e.target;
const filter_el = el.classList.contains('filter__el');
if(filter_el) {
	filter_elms.forEach(i => {
		if(i.classList.contains('_active') && i != el) {
			i.classList.remove('_active')
		}
		if(i == el) {
			i.classList.add('_active')
			return
		}
		
	})
	const attr = el.dataset.filter;
	if(attr) {
		filter_items_filter(filter_items, attr)
	}
}
}
function filter_items_filter(filter_items, attr) {
filter_items.forEach(filter_item => {
	const is_hide = filter_item.classList.contains('_hide');
	if(filter_item.classList.contains(`${attr}`)) {
		if(is_hide) {
			filter_item.classList.add('_anime')
			setTimeout(() => {
				filter_item.classList.remove('_hide')
				filter_item.classList.remove('_anime')
			}, anime_time)
		}
	} else {
		if(!is_hide) {
			filter_item.classList.add('_anime')
			setTimeout(() => {
				filter_item.classList.add('_hide')
				filter_item.classList.remove('_anime')
			}, anime_time)
		}
	}
})
}
var swiper = new Swiper(".swiper.reviews_slider", {
speed: 800,
autoplay: {
	delay: 2000,
},
grabCursor: true,
spaceBetween: 50,
pagination: {
	el: ".swiper-pagination",
	clickable: true,
},
});
// scroll sections active link

const sections = document.querySelectorAll('section[id]');
const header_items = document.querySelector('.header__items');

const sections_arr = [];

sections.forEach(i => {
	const section_h = i.offsetHeight,
		section_top = i.offsetTop,
		section_id = i.id,
		section_menu_link = header_items.querySelector(`a[href="${'#' + section_id}"`);
		section_menu_link.addEventListener('click', (e) => section_menu_link_click(e, section_top))
	sections_arr.push({
		section_h,
		section_top,
		section_id,
		el: section_menu_link
	})
})
function scroll_active() {
	const scrollY = window.pageYOffset;	
	sections_arr.forEach(i => {
		const section_top = i.section_top - 68
		if(scrollY > section_top && scrollY <= section_top + i.section_h) {
			i.el.classList.add('_active');
		} else {
			i.el.classList.contains('_active') && i.el.classList.remove('_active');
		}
	})
}

window.addEventListener('scroll', function() {
	scroll_active();
})

function section_menu_link_click(e, top) {
	e.preventDefault();
	window.scrollTo({
		top: top,
		behavior: 'smooth'
	})
}

// toggle mode

const toggle_btn = document.querySelector('.toggle_mode');

toggle_btn.addEventListener('click', function(e) {
	e.currentTarget.classList.toggle('_active');
	document.body.classList.toggle('_light_theme');
})

// anime 
function anime_start() {
	const animeItems = document.querySelectorAll('.anime-items');
	if(animeItems.length > 0) {
		window.addEventListener('scroll', animScroll);
		function animScroll(params) {
			for (var i = 0; i < animeItems.length; i++) {
				const animeItem = animeItems[i];
				const animeItemHeight = animeItem.offsetHeight;
				const animeItemOffset = getOffset(animeItem).top;
				const animeStart = 4;

				let animeItemPoint = window.innerHeight - animeItemHeight / animeStart;
				if(animeItemHeight > window.innerHeight) {
					animeItemPoint = window.innerHeight - window.innerHeight / animeStart;
				}
				if( (pageYOffset > animeItemOffset - animeItemPoint) && pageYOffset < (animeItemOffset + animeItemHeight) ) {
					animeItem.classList.add('anime-show');
				} else {
					if(!animeItem.classList.contains('anime-one') ) {
						animeItem.classList.remove('anime-show');
					}
				}
			}
		}
		function getOffset(el) {
		    const 	rect = el.getBoundingClientRect(),
			      	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		 	  		scrollTop = window.pageYOffset || document.documentElement.scrollTop
		    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
		}
		setTimeout( () => {animScroll()}, 500)
	}
}
function loaded () {
	setTimeout(() => {
		const preloader = document.querySelector('.preloader');
		if(preloader) {
			preloader.classList.add('_hide');
			setTimeout(() => {
				preloader.remove()
				anime_start();
			}, 1100)
		}
	}, 1200)
}

document.body.onload = loaded;
