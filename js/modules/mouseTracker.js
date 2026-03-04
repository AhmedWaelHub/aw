export function createMouseTracker(options = {}) {
  const {
    trackerId = "mouse-tracker",
    offset = 16,
    idleTimeout = 100,
  } = options;

  const mousePoint = document.getElementById(trackerId);
  let mouseX = 0;
  let mouseY = 0;
  let isMoving = false;
  let mouseStopTimer;

  function onMouseMove(e) {
    mouseX = e.pageX + offset;
    mouseY = e.pageY + offset;
    if (!isMoving) {
      isMoving = true;
      mousePoint.classList.add("moved");
    }
    clearTimeout(mouseStopTimer);
    mouseStopTimer = setTimeout(() => {
      mousePoint.classList.remove("moved");
      isMoving = false;
    }, idleTimeout);
  }

  function updateMousePoint() {
    if (isMoving) {
      mousePoint.style.left = mouseX + "px";
      mousePoint.style.top = mouseY + "px";
    }
    requestAnimationFrame(updateMousePoint);
  }

  function init() {
    if (!mousePoint) return;
    mousePoint.classList.remove("moved");
    document.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(updateMousePoint);
  }

  return { init };
}
