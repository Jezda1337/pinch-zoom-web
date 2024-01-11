let scale = 1;
const el = document.documentElement;

el.addEventListener(
  "wheel",
  function (e) {
    const { x, y, deltaY, shiftKey } = e;

    if (shiftKey && scale >= 1) {
      e.stopPropagation();
      e.preventDefault();

      scale += deltaY * -0.004;
      scale = Math.min(Math.max(1, scale), 4);

      const rect = el.getBoundingClientRect();
      const currentScrollLeft = el.scrollLeft;
      const currentScrollTop = el.scrollTop;

      const newScaledWidth = el.offsetWidth * scale;
      const newScaledHeight = el.offsetHeight * scale;

      const mouseOffsetX = (x - rect.left) / rect.width;
      const mouseOffsetY = (y - rect.top) / rect.height;

      const newScrollLeft =
        mouseOffsetX * newScaledWidth - (x - rect.left) + currentScrollLeft;
      const newScrollTop =
        mouseOffsetY * newScaledHeight - (y - rect.top) + currentScrollTop;

      el.style.scale = scale;
      el.style.transformOrigin = "top left 0px";
      el.style.scrollBehavior = "auto";

      el.scrollLeft = newScrollLeft;
      el.scrollTop = newScrollTop;
    }
    if (scale === 1) {
      el.style.scale = "initial";
      el.style.transformOrigin = "initial";
      el.style.scrollBehavior = "initial";
    }
  },
  { passive: false },
);
