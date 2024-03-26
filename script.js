const CASELLE = document.querySelectorAll(".casella");
const CERCHIO = document.querySelector(".cerchio");
const CROCE = document.querySelector(".croce");
console.log(CASELLE);
console.log(CERCHIO);
console.log(CROCE);

for (let i = 0; i < CASELLE.length; i++) {
  CASELLE[i].addEventListener("click", () => {
    if (CASELLE[i].childNodes.length === 0) {
      const IMG = document.createElement("img");
      IMG.src = "asset/cerchio.png";
      IMG.alt = "icona cerchio";
      IMG.draggable = false;
      CASELLE[i].appendChild(IMG);
      console.log(CASELLE[i]);
    }
  });
}