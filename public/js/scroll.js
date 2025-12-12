function getScrollPercentage() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  const scrollOffset = 750
  scrollTop = scrollTop - scrollOffset
  const scrollableHeight = scrollHeight - clientHeight - scrollOffset;

  if (scrollableHeight > 0 && scrollTop > 0) {
    console.log(scrollTop / scrollableHeight)
    return (scrollTop / scrollableHeight);
  } else {
    return 0;
  }
}

function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1, 7), 16);
    const bh = parseInt(b.slice(1, 7), 16);

    const ar = (ah >> 16) & 0xff,
          ag = (ah >> 8) & 0xff,
          ab = ah & 0xff;

    const br = (bh >> 16) & 0xff,
          bg = (bh >> 8) & 0xff,
          bb = bh & 0xff;

    const aAlpha = a.length === 9 ? parseInt(a.slice(7, 9), 16) / 255 : 1;
    const bAlpha = b.length === 9 ? parseInt(b.slice(7, 9), 16) / 255 : 1;

    const rr = Math.round(ar + t * (br - ar));
    const rg = Math.round(ag + t * (bg - ag));
    const rb = Math.round(ab + t * (bb - ab));
    const ra = aAlpha + t * (bAlpha - aAlpha);

    return `rgba(${rr}, ${rg}, ${rb}, ${ra})`;
}

const elements = document.querySelectorAll(".scroll-primary");
const startColor = "#555555FF";
const endColor   = "#99999955"; // your choice

function apply(t) {
  const overlay = lerpColor(startColor, endColor, t);

  elements.forEach(el => {
    if (el.classList.contains("rainbow-fade-border")) {
      // solid inside, rainbow only in ::before
      el.style.background = "#999";
      el.style.setProperty("--overlay", overlay);
    } else {
      // full rainbow background fades
      el.style.background = `
        linear-gradient(${overlay}, ${overlay}),
        var(--rainbow-bg)
      `;
    }
  });
}

apply(0);
window.addEventListener("scroll", () => apply(getScrollPercentage()));
