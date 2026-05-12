import React from 'react'

export default function Atividade(props)
{
    function prioridadeLabel(param) {
        switch (param) {
            case 'Baixa':
            case 'Normal':
            case 'Alta':
                return param
            default: return 'Não definido';
        }
    }

    function prioridadeStyle(param) {
        switch (param) {
            case 'Baixa': return 'smile';
            case 'Normal': return 'meh';
            case 'Alta': return 'frown';
            default: return 'Não definido';
        }
    }

    function prioridadeBorder(param) {
        switch (param) {
            case 'Baixa': return 'border-success';
            case 'Normal': return 'border-warning';
            case 'Alta': return 'border-danger';
            default: return 'border-secondary';
        }
    }

    function prioridadeTextStyle(param) {
        switch (param) {
            case 'Baixa': return 'text-success';
            case 'Normal': return 'text-warning';
            case 'Alta': return 'text-danger';
            default: return 'text-secondary';
        }
    }

    return (
        <div className={"card mb-2 shadow-sm border-2 " + prioridadeBorder(props.ativ.prioridade)}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5>
                        <span className="badge bg-secondary me-1">{props.ativ.id}</span>
                        - {props.ativ.titulo}
                    </h5>
                    <h6>Prioridade:
                        <span className={"ms-1 " + prioridadeTextStyle(props.ativ.prioridade)}>
                            <i className={"me-1 far fa-" + prioridadeStyle(props.ativ.prioridade)}></i>
                            {prioridadeLabel(props.ativ.prioridade)}
                        </span>
                    </h6>
                </div>
                <p className="card-text">{props.ativ.descricao}</p>
                <div className="d-flex justify-content-end pt-2 m-0 border-top">
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => props.pegarAtividade(props.ativ.id)}>
                        <i className="fas fa-pen me-2"></i>
                        Editar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => props.handleConfirmModal()}>
                        <i className="fas fa-trash me-2"></i>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}