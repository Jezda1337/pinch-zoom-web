let scale = 1;
const el = document.documentElement;
let newScrollLeft, newScrollTop;

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

      newScrollLeft =
        mouseOffsetX * newScaledWidth - (x - rect.left) + currentScrollLeft;
      newScrollTop =
        mouseOffsetY * newScaledHeight - (y - rect.top) + currentScrollTop;

      el.style.scale = scale;
      // el.style.transition = "all 250ms linear";
      // el.style.transformOrigin = `${x}px ${y}px`;
      el.style.transformOrigin = "top left 0px";
      el.style.scrollBehavior = "unset";
      el.style.backfaceVisibility = "hidden";

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

// el.addEventListener("transitionend", function (e) {
//   e.stopPropagation();
//   e.preventDefault();

// el.style.transformOrigin = "top left 0px";
// el.scrollLeft = newScrollLeft;
// el.scrollTop = newScrollTop;
// });
