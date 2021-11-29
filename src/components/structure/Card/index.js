import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data: tarefa, changeStatus }) => {
  const handleIniciar = (event) => {
    event.preventDefault();
    event.stopPropagation();
    changeStatus(tarefa._id, 'Fazendo');
  }

  const handleFinalizar = (event) => {
    event.preventDefault();
    event.stopPropagation();
    changeStatus(tarefa._id, 'Feito');
  }

  return (
    <Link to={`/view/${tarefa._id}`} className="col text-decoration-none text-black">
      <div className="card bg-dark" >
        {/* <img src={tarefa.status} alt={tarefa.titulo} className="card-img-top" /> */}
        <div className="card-body card-tarefa">
          <h3 className="card-title text-light">{tarefa.titulo}</h3>

          <span className="badge bg-primary">{tarefa.prioridade}</span>
          <span className={`badge ${tarefa.status === 'Feita' ? 'bg-success' : 'bg-secondary'}`} style={{ marginLeft: '10px' }}>{tarefa.status}</span>

          {tarefa.status === 'A Fazer' && (
            <button type="button" onClick={handleIniciar} className="btn btn-sm btn-danger" style={{ marginTop: '10px', display: 'block' }}>
              Iniciar
            </button>
          )}
          {tarefa.status === 'Fazendo' && (
            <button type="button" onClick={handleFinalizar} className="btn btn-sm btn-danger" style={{ marginTop: '10px', display: 'block' }}>
              Finalizar
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Card
