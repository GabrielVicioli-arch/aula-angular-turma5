export interface PedidoVaga {
    id?: string
    titulo: string
    motivo: string
    requisitos: string[]
    quantidade: 0
    aprovacao: 'Pendente' | 'Aprovado' | 'Reprovado'
    gestorId: string
    dataSolicitacao: string
}
