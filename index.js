window.addEventListener("DOMContentLoaded", () => {
  const scalableWrapper = document.createElement("div");
  scalableWrapper.style.transformOrigin = "top left";
  scalableWrapper.style.overflow = "hidden";

  while (document.body.firstChild) {
    scalableWrapper.appendChild(document.body.firstChild);
  }

  document.body.appendChild(scalableWrapper);

  let zoom = 1;
  const minZoom = 1;
  const maxZoom = 4;
  const zoomSpeed = -0.002;

  const handleZoom = (() => {
    return (e) => {
      const { pageX, pageY, deltaY, shiftKey } = e;

      if (shiftKey) {
        e.preventDefault();

        const newZoom = Math.min(
          Math.max(zoom + deltaY * zoomSpeed, minZoom),
          maxZoom,
        );
        if (newZoom === zoom) return;

        const scaleDiff = newZoom / zoom;

        const scrollLeft = window.scrollX;
        const scrollTop = window.scrollY;
        const newScrollLeft = pageX * scaleDiff - pageX + scrollLeft;
        const newScrollTop = pageY * scaleDiff - pageY + scrollTop;

        zoom = newZoom;
        scalableWrapper.style.transform = `scale(${zoom})`;
        window.scrollTo(newScrollLeft, newScrollTop);
      }
    };
  })();
  window.addEventListener("wheel", handleZoom, { passive: false });
});
