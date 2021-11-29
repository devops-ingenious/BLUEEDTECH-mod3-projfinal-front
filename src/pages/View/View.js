import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import Api from '../../api/api';

const View = () => {
  const [tarefa, setTarefa] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const AbreModal = () => setOpen(true);
  const FechaModal = () => setOpen(false);

  useEffect(() => {
    getTarefaById();
  }, [])

  const { id } = useParams();
  console.log(id);

  const getTarefaById = async () => {
    const request = await Api.fetchGetById(id);
    const tarefa = await request.json();
    setTarefa(tarefa);
  }

  const handleDelete = async() => {
    const response = await Api.fetchDelete(id);
    const data = await response.json();
    if(data.message) {
      console.log('excluído', data.message);
      navigate('/');
    }else {
      alert(data.error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <div className="card bg-dark text-white">
            <h1 className="text-center my-4">{tarefa.titulo}</h1>
            <h4 className="text-center"><b>Descrição: </b> {tarefa.descricao}</h4>
            <h4 className="text-center"><b>Prioridade: </b>{tarefa.prioridade}</h4>
            <h4 className="text-center"><b>Status: </b>{tarefa.status}</h4>
            <h4 className="text-center"><b>Prazo: </b>{moment(tarefa.prazo).format('DD/MM/YYYY')}</h4>
            <h4 className="text-center"><b>Data de Criação: </b>{moment(tarefa.datacriacao).format('DD/MM/YYYY')}</h4>
            <div className="mt-2 mb-3 d-flex justify-content-around card-button">
              <Link to={`/edit/${tarefa._id}`} className="w-25 bg-success btn btn-info text-dark">Editar</Link>
              <button className="w-25 btn btn-danger text-dark" onClick={AbreModal}>Excluir</button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={FechaModal} center showCloseIcon={false}>
        <h3 className="my-4">Deseja realmente EXCLUIR?</h3>
        <div className="d-flex w-50 mx-auto justify-content-around">
          <button className="btn btn-secondary mr-2" onClick={FechaModal}>Não</button>
          <button className="btn btn-danger" onClick={handleDelete}>Sim</button>
        </div>
      </Modal>
    </div>
  )
}

export default View
