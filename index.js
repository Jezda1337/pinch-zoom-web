window.addEventListener("load", function () {
  let scale = 1;
  let newScrollLeft, newScrollTop;
  const el = document.documentElement;

  const styling = {
    scale: "initial",
    transition: "initial",
    transformOrigin: "0 0 0",
    scrollBehavior: "unset",
    backfaceVisibility: "hidden",
  };

  el.style.scale = styling.scale;
  el.style.transition = styling.transition;
  el.style.transformOrigin = styling.transformOrigin;
  el.style.scrollBehavior = styling.scrollBehavior;
  el.style.backfaceVisibility = styling.backfaceVisibility;

  function zoom(e) {
    const { x, y, deltaY, shiftKey } = e;

    if (shiftKey && scale >= 1) {
      const allElements = document.querySelectorAll("*");
      e.stopPropagation();
      e.preventDefault();

      scale += deltaY * -0.002;
      scale = Math.min(Math.max(1, scale), 6);

      const rect = el.getBoundingClientRect();
      const currentScrollLeft = el.scrollLeft;
      const currentScrollTop = el.scrollTop;

      const newScaledWidth = el.offsetWidth * scale;
      const newScaledHeight = el.offsetHeight * scale;

      const mouseOffsetX = (x - rect.left) / rect.width;
      const mouseOffsetY = (y - rect.top) / rect.height;

      newScrollLeft =
        mouseOffsetX * newScaledWidth - (x - rect.left) + currentScrollLeft;
      newScrollTop =
        mouseOffsetY * newScaledHeight - (y - rect.top) + currentScrollTop;

      el.style.scale = scale;
      el.style.transformOrigin = "top left 0px";
      el.style.scrollBehavior = "unset";
      el.style.backfaceVisibility = "hidden";

      el.scrollLeft = newScrollLeft;
      el.scrollTop = newScrollTop;

      // elements with sticky position act strange when scale is applyed so this is some workaroud to prevent breaking the layout
      allElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === "sticky") {
          if (scale > 1) element.style.top = "unset";
          else element.style.removeProperty("top");
        }
        if (computedStyle.position === "fixed") {
          if (scale > 1)
            element.parentElement.style.transform = "translateZ(0)";
          else element.parentElement.style.removeProperty("transform");
        }
      });
    }

    if (scale === 1) {
      el.style.scale = "initial";
      el.style.transformOrigin = "initial";
      el.style.scrollBehavior = "initial";
    }
  }

  window.addEventListener("wheel", zoom, { passive: false });
});
