import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Api from "../../api/api";

const Edit = () => {
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    prioridade: '',
    status: '',
    prazo: '',
    datacriacao: ''
  });

  const [prazoInicial, setPrazoInicial] = useState(moment());
  
  useEffect(() => {
    getTarefaById();
  }, []);

  const { id } = useParams();

  const getTarefaById = async () => {
    const request = await Api.fetchGetById(id);
    const tarefa = await request.json();
    setTarefa(tarefa);
    setPrazoInicial(tarefa.prazo);
  };

  const handleFieldsChange = (evento) => {
    const tarefaEdit = { ...tarefa };
    tarefaEdit[evento.target.name] = evento.target.value;
    setTarefa(tarefaEdit);
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const request = await Api.fetchPut(tarefa, id);
    const data = await request.json();
    alert(data.message);
    navigate(`/view/${id}`);
  }

  const handleBack = () => navigate('/');

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-title">
          <div className="row">
            <div className="col">
              <h3 className="mx-3 my-3">Edição da Tarefa</h3>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="titulo">Título da tarefa</label>
                  <input
                    id="titulo"
                    className="form-control"
                    type="text"
                    // placeholder="Nome da musica"
                    value={tarefa.titulo}
                    onChange={handleFieldsChange}
                    name="titulo"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="descricao">Descrição da tarefa</label>
                  <input
                    id="descricao"
                    type="text"
                    className="form-control"
                    onChange={handleFieldsChange}
                    value={tarefa.descricao}
                    name="descricao"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prioridade">Prioridade da tarefa</label>
                  <select 
                    id="prioridade" 
                    className="form-control" 
                    name="prioridade" 
                    onChange={handleFieldsChange}
                    value={tarefa.prioridade}
                    required
                  >
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
                  <label htmlFor="status">Status da tarefa</label>
                  <select 
                    id="status" 
                    className="form-control"
                    name="status" 
                    onChange={handleFieldsChange}
                    value={tarefa.status}
                    required
                  >
                    <option>A Fazer</option>
                    <option>Fazendo</option>
                    <option>Feita</option>
                  </select>    
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="prazo">Prazo da tarefa</label>
                  <input
                    id="prazo"
                    type="date"
                    onChange={handleFieldsChange}
                    value={tarefa.prazo}
                    className="form-control"
                    name="prazo"
                    min={moment(prazoInicial).format('YYYY-MM-DD')}
                  />
                </div>
              </div>

              <div className="col-4 d-flex align-items-end justify-content-around">
                <button type="submit" className="btn btn-success">
                  Enviar
                </button>
                <button type="button" onClick={handleBack} className="btn btn-danger">
                  Voltar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
