

votacao_schema = {

    proposicao_id : Integer,
    votacoes : Array<Votacao>
}

Votacao  = {
    resumo : String,
    data: String,
    hora: String,
    objetivo: String,
    codigoSessao: String,
    votos: [
        {
            deputado_id: Integer,
            voto : String
        }
            ]
    orientacao: [

        {
            bancada : String,
            orientacao :String
        }
    ]
}