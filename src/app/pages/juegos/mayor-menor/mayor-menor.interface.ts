export interface Baraja {
  "success": boolean,
  "deck_id": string,
  "shuffled": boolean,
  "cards": Carta[],
  "remaining": number
}

export enum Comparacion {
  Mayor = ">",
  Menor = "<",
  Iguales = "=="
}

export enum EstadoJuego {
  Esperando = "esperando",
  Jugando = "jugando",
  Gano = "gano",
  Perdio = "perdio",
  Empato = "empato"
}

export interface Carta {
  "code": string,
  "image": string,
  "images": {
    "svg": string,
    "png": string
  },
  "value": string | Number,
  "suit": string
}