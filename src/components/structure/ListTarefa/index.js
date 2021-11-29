import React, { useState, useEffect } from 'react'
import Card from '../Card';
import Api from "../../../api/api";

const ListTarefa = () => {
  const [tarefas, setTarefas] = useState([]);
  useEffect(() => {
    getTarefas();
  }, [])

  const getTarefas = async () => {
    const request = await Api.fetchGetAll();
    // data = recebe os dados da api (musicas).
    const data = await request.json();
    // atualizo meu estado em memoria com as musicas - para atualizar no DOM.
    setTarefas(data);
  }

  const changeStatus = async (id, status) => {
    const request = await Api.fetchPut({ status }, id);
    const data = await request.json();
    alert(data.message);

    await getTarefas();
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 mt-3 g-4 card-area">
      {/* <button onClick={handleButton}>Incrementa</button>
      <p>{count}</p> */}
      {tarefas.map((tarefa) => (
        <Card data={tarefa} changeStatus={changeStatus} key={tarefa._id}/>
      ))}
    </div>
  )
}

export default ListTarefa
