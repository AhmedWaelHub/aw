// entry point that wires together reusable modules
import { createNavbar } from "./modules/navbar.js";
import { createMouseTracker } from "./modules/mouseTracker.js";
import { createAnimationObserver } from "./modules/animationObserver.js";

// instantiate with defaults; options can be passed for different pages
const navbar = createNavbar();
const tracker = createMouseTracker();
const animObserver = createAnimationObserver();

// bootstrap
navbar.init();
tracker.init();
animObserver.init();
