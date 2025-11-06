function getScrollPercentage() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  const scrollableHeight = scrollHeight - clientHeight;

  if (scrollableHeight > 0) {
    return (scrollTop / scrollableHeight);
  } else {
    return 0;
  }
}

function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1), 16);
    const bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 0xff,
          ag = (ah >> 8) & 0xff,
          ab = ah & 0xff;
    const br = (bh >> 16) & 0xff,
          bg = (bh >> 8) & 0xff,
          bb = bh & 0xff;
    const rr = Math.round(ar + t * (br - ar));
    const rg = Math.round(ag + t * (bg - ag));
    const rb = Math.round(ab + t * (bb - ab));
    return `rgb(${rr}, ${rg}, ${rb})`;
}

const elements = document.querySelectorAll(".scroll-primary");
const startColor = "#555555"; // aqua
const endColor = "#ff66cc";   // pink
elements.forEach(element => {
    element.style.backgroundColor = lerpColor(startColor, endColor, 0)
});

window.addEventListener('scroll', () => {
    const percentage = getScrollPercentage();
    console.log(lerpColor(startColor, endColor, percentage))
    console.log(percentage)
    elements.forEach(element => {
        element.style.backgroundColor = lerpColor(startColor, endColor, percentage)
    });
});
