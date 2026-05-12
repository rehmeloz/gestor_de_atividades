import { useState, useEffect } from 'react'
import './App.css'
import AtividadeForm from './components/AtividadeForm';
import Atividade from './components/Atividade';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function App() {
    const [showAtividadeModal, setShowAtividadeModal] = useState(false);
    const [atividades, setAtividades] = useState([]);
    const [atividade, setAtividade] = useState({ id: 0 });

    const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

    const pegaTodasAtividades = async () => {
        const response = await api.get('atividade');
        return response.data;
    }

    useEffect(() => {
        const getAtividades = async () => {
            const todasAtividades = await pegaTodasAtividades();
            if (todasAtividades) setAtividades(todasAtividades);
        }
        getAtividades();
    }, [])

    const addAtividades = async (ativ) => 
    {
        handleAtividadeModal();
        const response = await api.post('atividade', ativ);
        setAtividades([...atividades, response.data]);
    }

    function cancelarAtividade() {
        setAtividade({ id: 0 });
        handleAtividadeModal();
    }

    const atualizaAtividade = async (ativ) =>
    {
        handleAtividadeModal();
        const response = await api.put(`atividade/${ativ.id}`, ativ);
        const { id } = response.data;
        setAtividades(atividades.map(item => item.id === id ? response.data : item));
        setAtividade({ id: 0 });
    }

    const deletarAtividade = async (id) =>
    {
        if (await api.delete(`atividade/${id}`))
        {
            const atividadesFiltradas = atividades.filter(atividade => atividade.id != id);
            setAtividades([...atividadesFiltradas]);
        }
    }

    function pegarAtividade(id) {
        const atividade = atividades.filter(atividade => atividade.id == id);
        setAtividade(atividade[0]);
        handleAtividadeModal();
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-2">
                <h2 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id : ''}</h2>
                <Button variant="outline-secondery" onClick={handleAtividadeModal}>
                    <i className="fas fa-plus "></i>
                </Button>
            </div>
 
            <AtividadeLista
                atividades={atividades}
                deletarAtividade={deletarAtividade}
                pegarAtividade={pegarAtividade}
            />

            <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                       Atividade { atividade.id !== 0 ? atividade.id : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AtividadeForm
                        addAtividades={addAtividades}
                        cancelarAtividade={cancelarAtividade}
                        atualizaAtividade={atualizaAtividade}
                        ativSelecionada={atividade}
                        atividades={atividades}
                    />
                </Modal.Body>
            </Modal>
      
        </>
    );
}

export default App;
