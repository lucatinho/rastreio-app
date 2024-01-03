export class Rastreio {
  codigo: string
  host: string
  eventos: Evento[]
  time: number
  quantidade: number
  servico: string
  ultimo: string

  constructor() {
    this.eventos = new Array<Evento>();
  }
}

export class Evento {
  data: string
  hora: string
  local: string
  status: string
  subStatus: any[]
}
