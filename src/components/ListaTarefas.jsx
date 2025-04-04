import { useState, useEffect } from 'react';

// importa o arquivo de CSS
import './ListaTarefas.css';

function ListaTarefas() {
    // armazena a lista de tarefas
    const [tarefas, setTarefas] = useState(() => {
        const tarefasSalvas = localStorage.getItem('tarefas');
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : []; // converte de string para array
    });

    // armazena o nome da nova tarefa
    const [novaTarefa, setNovaTarefa] = useState('');

    // controla se as tarefas estão ordenadas ou não
    const [ordenado, setOrdenado] = useState(() => {
        const ordenadoSalvo = localStorage.getItem('ordenado');
        return ordenadoSalvo ? JSON.parse(ordenadoSalvo) : false; // converte de string para boolean
    });

    // armazena a lista original de tarefas (antes de ordenar)
    const [tarefasOriginais, setTarefasOriginais] = useState(() => {
        const tarefasSalvas = localStorage.getItem('tarefasOriginais');
        return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
    });

    // salva a lista das tarefas no LocalStorage
    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Converte para string e salva
    }, [tarefas]);

    // salva o estado atual de ordenação no LocalStorage
    useEffect(() => {
        localStorage.setItem('ordenado', JSON.stringify(ordenado));
    }, [ordenado]);

    // salva as tarefas em ordem de criação no LocalStorage
    useEffect(() => {
        localStorage.setItem('tarefasOriginais', JSON.stringify(tarefasOriginais));
    }, [tarefasOriginais]);

    // função para adicionar uma nova tarefa
    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') { // verifica se o texto não está vazio
            const novasTarefas = [...tarefas, { texto: novaTarefa, concluida: false }]; // adiciona nova tarefa
            setTarefas(novasTarefas); // atualiza o estado das tarefas
            setTarefasOriginais(novasTarefas); // atualiza a lista original
            setNovaTarefa(''); // limpa o campo
        }
    };

    const removerTarefa = (indice) => { // função para remover uma tarefa da lista
        const novasTarefas = tarefas.filter((_, i) => i !== indice); // remove a tarefa
        setTarefas(novasTarefas); // atualiza o estado das tarefas
        setTarefasOriginais(novasTarefas); // atualiza a lista original
    };

    const marcarConcluida = (indice) => { // função para marcar uma tarefa como concluída
        const novasTarefas = tarefas.map((tarefa, i) =>
            i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa // alterna se esta concluida
        );
        setTarefas(novasTarefas); // atualiza o estado das tarefas
        setTarefasOriginais(novasTarefas); // atualiza a lista original
    };

    const ordenarTarefas = () => { // alterna entre a lista alfabetica e a lista por criação
        if (ordenado) {
            setTarefas(tarefasOriginais); // atualiza lista ordenando por criação
        } else {
            const tarefasOrdenadas = [...tarefas].sort((a, b) => a.texto.localeCompare(b.texto)); // Ordena A-Z
            setTarefas(tarefasOrdenadas); // atualiza lista ordenando em alfabetico
        }
        setOrdenado(!ordenado); // alterna o estado de ordenação
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            {/* campo para adicionar uma nova tarefa */}
            <input
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)} // atualiza o setNovaTarefa com o valor do campo
                placeholder="Digite uma nova tarefa"
            />
            <button onClick={adicionarTarefa}>Adicionar</button> {/* botão para adicionar a tarefa */}
            <button onClick={ordenarTarefas}>
                {ordenado ? 'Ordem de Criação' : 'Ordenar A-Z'} {/* muda o texto do botão */}
            </button>
            <ul>
                {/*apresenta lista de tarefas */}
                {tarefas.map((tarefa, indice) => (
                    <li key={indice}>
                        {/* checkbox para marcar como feito */}
                        <input
                            type="checkbox"
                            checked={tarefa.concluida}
                            onChange={() => marcarConcluida(indice)}
                        />
                        <span>{tarefa.texto}</span>
                        {/* botão para remover a tarefa */}
                        <button onClick={() => removerTarefa(indice)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas; // exporta o componente