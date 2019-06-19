

votacao_schema = {

    proposicao_tipo : String,
    proposicao_ano : Integer,
    proposicao_numero : Integer,
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