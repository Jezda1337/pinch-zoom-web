window.addEventListener("load", function () {
  class ZoomHandler {
    constructor(elementSelector = "html") {
      this.element = null
      this.scale = 1
      this.selectElement(elementSelector)
      this.addListeners()
    }

    selectElement(elementSelector) {
      const queried = document.querySelector(elementSelector)
      if (queried === null) throw new Error("Zoom element not found")
      this.element = queried

      this.styling = {
        scale: "initial",
        transition: "initial",
        transformOrigin: "0 0 0",
        scrollBehavior: "unset",
        backfaceVisibility: "hidden",
      }

      this.applyInitialStyles()
    }

    applyInitialStyles() {
      Object.keys(this.styling).forEach((key) => {
        this.element.style[key] = this.styling[key]
      })
    }

    zoom(e) {
      const { x, y, deltaY, shiftKey } = e

      if (shiftKey && this.scale >= 1) {
        const allElements = document.querySelectorAll("*")
        e.stopPropagation()
        e.preventDefault()

        this.scale += deltaY * -0.002
        this.scale = Math.min(Math.max(1, this.scale), 6)

        const rect = this.element.getBoundingClientRect()
        const currentScrollLeft = this.element.scrollLeft
        const currentScrollTop = this.element.scrollTop

        const newScaledWidth = this.element.offsetWidth * this.scale
        const newScaledHeight = this.element.offsetHeight * this.scale

        const mouseOffsetX = (x - rect.left) / rect.width
        const mouseOffsetY = (y - rect.top) / rect.height

        const newScrollLeft =
          mouseOffsetX * newScaledWidth - (x - rect.left) + currentScrollLeft
        const newScrollTop =
          mouseOffsetY * newScaledHeight - (y - rect.top) + currentScrollTop

        this.element.style.scale = this.scale
        this.element.style.transformOrigin = "top left 0px"
        this.element.style.scrollBehavior = "unset"
        this.element.style.backfaceVisibility = "hidden"

        this.element.scrollLeft = newScrollLeft
        this.element.scrollTop = newScrollTop

        allElements.forEach((element) => {
          const computedStyle = window.getComputedStyle(element)
          if (computedStyle.position === "sticky") {
            if (this.scale > 1) element.style.top = "unset"
            else element.style.removeProperty("top")
          }
          if (computedStyle.position === "fixed") {
            if (this.scale > 1)
              element.parentElement.style.transform = "translateZ(0)"
            else element.parentElement.style.removeProperty("transform")
          }
        })
      }

      if (this.scale === 1) {
        this.applyInitialStyles()
      }
    }

    addListeners() {
      this.element.addEventListener("wheel", this.zoom.bind(this), {
        passive: false,
      })
    }
  }

  new ZoomHandler()
})
