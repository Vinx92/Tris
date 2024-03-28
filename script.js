const CASELLE = document.querySelectorAll(".casella");
const CERCHIO = document.querySelector(".cerchio");
const CROCE = document.querySelector(".croce");
const CONT_PULS_MESS = document.querySelector(".cont-puls-mess");
const MESSAGGIO = document.querySelector(".messaggio-risultato");
const PUNTEGGIO_UNO = document.getElementById("punteggio-uno");
const PUNTEGGIO_DUE = document.getElementById("punteggio-due");
const MODALITA_GIOCO = document.getElementById("modalita-gioco");
const CONT_GRID = document.querySelector(".cont-grid");

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

let caselleGiocatoreUno = [];
let caselleGiocatoreDue = [];

let giocoFinito = false;
let modalitaGioco;

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
    document.getElementById("titolo").textContent =
      "GIOCATORE DUE SCEGLI IL TUO TEAM";
    document.getElementById("team-giocatore-uno").src = GIOCATORE_UNO.imgTeam;
  } else if (GIOCATORE_DUE.team === undefined) {
    if (GIOCATORE_UNO.team === "croce") {
      GIOCATORE_DUE.team = "cerchio";
      GIOCATORE_DUE.imgTeam = document.getElementById("scelta-uno").src;
      document.getElementById("team-giocatore-due").src = GIOCATORE_DUE.imgTeam;
      MODALITA_GIOCO.removeAttribute("disabled");
      document.getElementById("titolo").textContent =
        "ORA SCEGLIETE LA MODALITà DI GIOCO";
      // document.querySelector(".scelta-team").classList.add("hide");
      // document.querySelector(".conteiner-gioco").classList.remove("hide");
    }
  }
});

CROCE.addEventListener("click", () => {
  if (GIOCATORE_UNO.team === undefined) {
    GIOCATORE_UNO.team = "croce";
    GIOCATORE_UNO.imgTeam = document.getElementById("scelta-due").src;
    document.getElementById("titolo").textContent =
      "GIOCATORE DUE SCEGLI IL TUO TEAM";
    document.getElementById("team-giocatore-uno").src = GIOCATORE_UNO.imgTeam;
  } else if (GIOCATORE_DUE.team === undefined) {
    if (GIOCATORE_UNO.team === "cerchio") {
      GIOCATORE_DUE.team = "croce";
      GIOCATORE_DUE.imgTeam = document.getElementById("scelta-due").src;
      document.getElementById("team-giocatore-due").src = GIOCATORE_DUE.imgTeam;
      MODALITA_GIOCO.removeAttribute("disabled");
      document.getElementById("titolo").textContent =
        "ORA SCEGLIETE LA MODALITà DI GIOCO";
      // document.querySelector(".scelta-team").classList.add("hide");
      // document.querySelector(".conteiner-gioco").classList.remove("hide");
    }
  }
});

MODALITA_GIOCO.addEventListener("change", () => {
  modalitaGioco = MODALITA_GIOCO.value;
  document.querySelector(".scelta-team").classList.add("hide");
  document.querySelector(".conteiner-gioco").classList.remove("hide");
  document.querySelector(".reset").classList.remove("hide");
});

for (let i = 0; i < CASELLE.length; i++) {
  CASELLE[i].addEventListener("click", () => {
    if (modalitaGioco === "megliotre") {
      if (PUNTEGGIO_UNO.textContent < 3 && PUNTEGGIO_DUE.textContent < 3) {
        if (giocoFinito === false) {
          if (CASELLE[i].childNodes.length === 0) {
            if (GIOCATORE_UNO.turno === true) {
              document
                .getElementById("giocatore-uno-attivo")
                .classList.remove("attivo");
              document
                .getElementById("giocatore-due-attivo")
                .classList.add("attivo");
              const IMG = document.createElement("img");
              IMG.src = GIOCATORE_UNO.imgTeam;
              IMG.alt = "icona cerchio";
              IMG.draggable = false;
              CASELLE[i].appendChild(IMG);
              caselleGiocatoreUno.push(i);
              GIOCATORE_UNO.turno = false;
              GIOCATORE_DUE.turno = true;
            } else {
              document
                .getElementById("giocatore-due-attivo")
                .classList.remove("attivo");
              document
                .getElementById("giocatore-uno-attivo")
                .classList.add("attivo");
              const IMG = document.createElement("img");
              IMG.src = GIOCATORE_DUE.imgTeam;
              IMG.alt = "icona cerchio";
              IMG.draggable = false;
              CASELLE[i].appendChild(IMG);
              caselleGiocatoreDue.push(i);
              GIOCATORE_UNO.turno = true;
              GIOCATORE_DUE.turno = false;
            }
          }

          for (let i = 0; i < COMBINAZIONI.length; i++) {
            if (
              caselleGiocatoreUno.includes(COMBINAZIONI[i][0]) &&
              caselleGiocatoreUno.includes(COMBINAZIONI[i][1]) &&
              caselleGiocatoreUno.includes(COMBINAZIONI[i][2])
            ) {
              PUNTEGGIO_UNO.textContent = convertiStringa(
                PUNTEGGIO_UNO.textContent
              );
              if (PUNTEGGIO_UNO.textContent == 3) {
                CONT_PULS_MESS.classList.remove("hide");
                giocoFinito = true;
                MESSAGGIO.textContent = "GIOCATORE UNO PRIMO AL 3";
              } else {
                CONT_PULS_MESS.classList.remove("hide");
                MESSAGGIO.textContent = "VINCE IL GIOCATORE UNO";

                giocoFinito = true;
              }
            } else if (
              caselleGiocatoreDue.includes(COMBINAZIONI[i][0]) &&
              caselleGiocatoreDue.includes(COMBINAZIONI[i][1]) &&
              caselleGiocatoreDue.includes(COMBINAZIONI[i][2])
            ) {
              PUNTEGGIO_DUE.textContent = convertiStringa(
                PUNTEGGIO_DUE.textContent
              );
              if (PUNTEGGIO_DUE.textContent == 3) {
                CONT_PULS_MESS.classList.remove("hide");
                giocoFinito = true;
                MESSAGGIO.textContent = "GIOCATORE DUE PRIMO AL 3";
              } else {
                CONT_PULS_MESS.classList.remove("hide");
                MESSAGGIO.textContent = "VINCE IL GIOCATORE DUE";

                giocoFinito = true;
              }
            } else {
              let caselleOccupate =
                caselleGiocatoreUno.length + caselleGiocatoreDue.length;
              if (caselleOccupate === 9) {
                CONT_PULS_MESS.classList.remove("hide");
                MESSAGGIO.textContent = "PAREGGIO";
                giocoFinito = true;
              }
            }
          }
        }
      }
    } else {
      if (giocoFinito === false) {
        if (CASELLE[i].childNodes.length === 0) {
          if (GIOCATORE_UNO.turno === true) {
            const IMG = document.createElement("img");
            IMG.src = GIOCATORE_UNO.imgTeam;
            IMG.alt = "icona cerchio";
            IMG.draggable = false;
            CASELLE[i].appendChild(IMG);
            caselleGiocatoreUno.push(i);
            GIOCATORE_UNO.turno = false;
            GIOCATORE_DUE.turno = true;
          } else {
            const IMG = document.createElement("img");
            IMG.src = GIOCATORE_DUE.imgTeam;
            IMG.alt = "icona cerchio";
            IMG.draggable = false;
            CASELLE[i].appendChild(IMG);
            caselleGiocatoreDue.push(i);
            GIOCATORE_UNO.turno = true;
            GIOCATORE_DUE.turno = false;
          }
        }

        for (let i = 0; i < COMBINAZIONI.length; i++) {
          if (
            caselleGiocatoreUno.includes(COMBINAZIONI[i][0]) &&
            caselleGiocatoreUno.includes(COMBINAZIONI[i][1]) &&
            caselleGiocatoreUno.includes(COMBINAZIONI[i][2])
          ) {
            CONT_PULS_MESS.classList.remove("hide");
            MESSAGGIO.textContent = "VINCE IL GIOCATORE UNO";
            PUNTEGGIO_UNO.textContent = convertiStringa(
              PUNTEGGIO_UNO.textContent
            );
            giocoFinito = true;
          } else if (
            caselleGiocatoreDue.includes(COMBINAZIONI[i][0]) &&
            caselleGiocatoreDue.includes(COMBINAZIONI[i][1]) &&
            caselleGiocatoreDue.includes(COMBINAZIONI[i][2])
          ) {
            CONT_PULS_MESS.classList.remove("hide");
            MESSAGGIO.textContent = "VINCE IL GIOCATORE DUE";
            PUNTEGGIO_DUE.textContent = convertiStringa(
              PUNTEGGIO_DUE.textContent
            );
            giocoFinito = true;
          } else {
            let caselleOccupate =
              caselleGiocatoreUno.length + caselleGiocatoreDue.length;
            if (caselleOccupate === 9) {
              CONT_PULS_MESS.classList.remove("hide");
              MESSAGGIO.textContent = "PAREGGIO";
              giocoFinito = true;
            }
          }
        }
      }
    }
  });
}

document.getElementById("rigioca").addEventListener("click", () => {
  if (modalitaGioco == "megliotre") {
    if (PUNTEGGIO_UNO.textContent == 3 || PUNTEGGIO_DUE.textContent == 3) {
      GIOCATORE_UNO.turno = true;
      GIOCATORE_DUE.turno = false;
      caselleGiocatoreUno = [];
      caselleGiocatoreDue = [];
      MESSAGGIO.textContent = "";
      PUNTEGGIO_UNO.textContent = 0;
      PUNTEGGIO_DUE.textContent = 0;
      giocoFinito = false;
      for (let i = 0; i < CASELLE.length; i++) {
        CASELLE[i].innerHTML = "";
      }
      CONT_PULS_MESS.classList.add("hide");
      document
        .getElementById("giocatore-due-attivo")
        .classList.remove("attivo");
      document.getElementById("giocatore-uno-attivo").classList.add("attivo");
    } else {
      GIOCATORE_UNO.turno = true;
      GIOCATORE_DUE.turno = false;
      caselleGiocatoreUno = [];
      caselleGiocatoreDue = [];
      MESSAGGIO.textContent = "";
      giocoFinito = false;
      for (let i = 0; i < CASELLE.length; i++) {
        CASELLE[i].innerHTML = "";
      }
      CONT_PULS_MESS.classList.add("hide");
      document
        .getElementById("giocatore-due-attivo")
        .classList.remove("attivo");
      document.getElementById("giocatore-uno-attivo").classList.add("attivo");
    }
  } else {
    GIOCATORE_UNO.turno = true;
    GIOCATORE_DUE.turno = false;
    caselleGiocatoreUno = [];
    caselleGiocatoreDue = [];
    MESSAGGIO.textContent = "";
    giocoFinito = false;
    for (let i = 0; i < CASELLE.length; i++) {
      CASELLE[i].innerHTML = "";
    }
    CONT_PULS_MESS.classList.add("hide");
    document.getElementById("giocatore-due-attivo").classList.remove("attivo");
    document.getElementById("giocatore-uno-attivo").classList.add("attivo");
  }
});

function convertiStringa(x) {
  let numero = parseInt(x);
  numero += 1;
  return numero;
}
