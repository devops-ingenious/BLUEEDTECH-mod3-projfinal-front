import React from 'react'
import ListTarefa from '../../components/structure/ListTarefa';

const Home = () => {
  return (
    <div className="container">
      {/* <h1 className="text-center h1">PAGINA DA HOME</h1> */}
      <h1 className="text-left h3" style={{ marginTop: '20px' }}>Lista de TAREFAS</h1>
      <ListTarefa/>
    </div>
  )
}

export default Home
