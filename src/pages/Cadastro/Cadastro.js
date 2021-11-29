import React from 'react';
import moment from 'moment';
import Api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {

  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    // target = quem disparou o evento
    console.log(evento.target);
    const titulo = evento.target.titulo.value;
    const descricao = evento.target.descricao.value;
    const prioridade = evento.target.prioridade.value;
    const status = evento.target.status.value;
    const prazo = evento.target.prazo.value;

    const tarefa = {
      titulo,
      descricao,
      prioridade,
      status,
      prazo
    }

    const request = await Api.fetchPost(tarefa);
    if(request.status === 500) {
      alert('ERRO NO SERVIDOR')
    }

    const result = await request.json();
    if(result.error) {
      console.log(result.error);
    }else {
      alert(result.message);
      navigate('/');
    }
  }
  
  const handleBack = () => navigate('/');
  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-title">
          <div className="row">
            <div className="col">
              <h3 className="mx-3 my-3">Cadastro de Tarefas</h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="nome">Título da Tarefa</label>
                  <input id="titulo" className="form-control" type="text" name="titulo" required />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="descricao">Descrição da Tarefa</label>
                  <input id="descricao" type="text" className="form-control" name="descricao" required />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prioridade">Prioridade da Tarefa</label>
                  <select id="prioridade" className="form-control" name="prioridade" required>
                    <option value="">Selecione</option>
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="status">Status da Tarefa</label>
                  <select id="status" className="form-control" name="status" required>
                    <option>A Fazer</option>
                    <option>Fazendo</option>
                    <option>Feita</option>
                  </select>     
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prazo">Prazo da Tarefa</label>
                  <input id="prazo" type="date" className="form-control" name="prazo" min={moment().format('YYYY-MM-DD')} required />
                </div>
              </div>
              <div className="col-4 d-flex align-items-end justify-content-around">
                <button type="submit" className="btn btn-success">Enviar</button>
                <button type="button" onClick={handleBack} className="btn btn-danger">Voltar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
