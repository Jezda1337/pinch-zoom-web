let scale = 1
const el = document.documentElement

el.addEventListener("wheel", function(e) {
	const {x, y, deltaY, shiftKey} = e
	
	scale += deltaY * -0.004
	scale = Math.min(Math.max(1, scale), 4)
	if(shiftKey && scale >= 1) {
		e.stopPropagation()
		e.preventDefault()

		const rect = el.getBoundingClientRect()
		const currentScrollLeft = el.scrollLeft
		const currentScrollTop = el.scrollTop

		const newScaledWidth = el.offsetWidth * scale
		const newScaledHeight = el.offsetHeight * scale

		const mouseOffsetX = (x - rect.left) / rect.width
		const mouseOffsetY = (y - rect.top) / rect.height

		const newScrollLeft = (mouseOffsetX * newScaledWidth) - (x - rect.left) + currentScrollLeft
		const newScrollTop = (mouseOffsetY * newScaledHeight) - (y - rect.top) + currentScrollTop
		
		el.style.scale = scale
		el.style.transformOrigin = "0 0"

		el.scrollLeft = newScrollLeft
		el.scrollTop = newScrollTop
	}
	if(scale === 1) {
		el.style.scale = "initial"
		el.style.transformOrigin = "initial"
	}
}, {passive: false})

