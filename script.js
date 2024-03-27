const CASELLE = document.querySelectorAll(".casella");
const CERCHIO = document.querySelector(".cerchio");
const CROCE = document.querySelector(".croce");
const COMBINAZIONI = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let CASELLE_GIOCATORE_UNO = [];
let CASELLE_GIOCATORE_DUE = [];

const GIOCATORE_UNO = {
  team: undefined,
  turno: true,
};
const GIOCATORE_DUE = {
  team: undefined,
  turno: false,
};

CERCHIO.addEventListener("click", () => {
  if (GIOCATORE_UNO.team === undefined) {
    GIOCATORE_UNO.team = "cerchio";
    GIOCATORE_UNO.imgTeam = document.getElementById("scelta-uno").src;
    document.getElementById("titolo").textContent = "SCEGLIE IL GIOCATORE DUE";
    document.getElementById("team-giocatore-uno").src = GIOCATORE_UNO.imgTeam;
  } else if (GIOCATORE_DUE.team === undefined) {
    if (GIOCATORE_UNO.team === "croce") {
      GIOCATORE_DUE.team = "cerchio";
      GIOCATORE_DUE.imgTeam = document.getElementById("scelta-uno").src;
      document.getElementById("team-giocatore-due").src = GIOCATORE_DUE.imgTeam;
      document.querySelector(".scelta-team").classList.add("hide");
      document.querySelector(".conteiner-gioco").classList.remove("hide");
    }
  }
});

CROCE.addEventListener("click", () => {
  if (GIOCATORE_UNO.team === undefined) {
    GIOCATORE_UNO.team = "croce";
    GIOCATORE_UNO.imgTeam = document.getElementById("scelta-due").src;
    document.getElementById("titolo").textContent = "SCEGLIE IL GIOCATORE DUE";
    document.getElementById("team-giocatore-uno").src = GIOCATORE_UNO.imgTeam;
  } else if (GIOCATORE_DUE.team === undefined) {
    if (GIOCATORE_UNO.team === "cerchio") {
      GIOCATORE_DUE.team = "croce";
      GIOCATORE_DUE.imgTeam = document.getElementById("scelta-due").src;
      document.getElementById("team-giocatore-due").src = GIOCATORE_DUE.imgTeam;
      document.querySelector(".scelta-team").classList.add("hide");
      document.querySelector(".conteiner-gioco").classList.remove("hide");
    }
  }
});

for (let i = 0; i < CASELLE.length; i++) {
  CASELLE[i].addEventListener("click", () => {
    if (CASELLE[i].childNodes.length === 0) {
      if (GIOCATORE_UNO.turno === true) {
        const IMG = document.createElement("img");
        IMG.src = GIOCATORE_UNO.imgTeam;
        IMG.alt = "icona cerchio";
        IMG.draggable = false;
        CASELLE[i].appendChild(IMG);
        CASELLE_GIOCATORE_UNO.push(i);
        GIOCATORE_UNO.turno = false;
        GIOCATORE_DUE.turno = true;
      } else {
        const IMG = document.createElement("img");
        IMG.src = GIOCATORE_DUE.imgTeam;
        IMG.alt = "icona cerchio";
        IMG.draggable = false;
        CASELLE[i].appendChild(IMG);
        CASELLE_GIOCATORE_DUE.push(i);
        GIOCATORE_UNO.turno = true;
        GIOCATORE_DUE.turno = false;
      }
    }

    // Verifico la vincita
    for (let i = 0; i < COMBINAZIONI.length; i++) {
      // Ciclo per tutti gli elementi dell'array delle varie combinazioi vincenti
      // Controllo che tutti e tre gli elementi della combinazione vincente corrente
      // siano presenti nell'array di uno dei due giocatori
      if (
        CASELLE_GIOCATORE_UNO.includes(COMBINAZIONI[i][0]) &&
        CASELLE_GIOCATORE_UNO.includes(COMBINAZIONI[i][1]) &&
        CASELLE_GIOCATORE_UNO.includes(COMBINAZIONI[i][2])
      ) {
        alert("Giocatore uno ha vinto");
      } else if (
        CASELLE_GIOCATORE_DUE.includes(COMBINAZIONI[i][0]) &&
        CASELLE_GIOCATORE_DUE.includes(COMBINAZIONI[i][1]) &&
        CASELLE_GIOCATORE_DUE.includes(COMBINAZIONI[i][2])
      ) {
        alert("Giocatore due ha vinto");
      }
    }
  });
}


document.getElementById("rigioca").addEventListener("click", () => {
  GIOCATORE_UNO.turno = true;
  GIOCATORE_DUE.turno = false;
  CASELLE_GIOCATORE_UNO = [];
  CASELLE_GIOCATORE_DUE = [];
  for (let i = 0; i < CASELLE.length; i++) {
    CASELLE[i].innerHTML = "";
  }
});
