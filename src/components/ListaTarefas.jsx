import { useState, useEffect } from 'react';

import './ListaTarefas.css';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState(() => {
        const savedTarefas = localStorage.getItem('tarefas');
        return savedTarefas ? JSON.parse(savedTarefas) : [];
    });
    const [novaTarefa, setNovaTarefa] = useState('');
    const [ordenado, setOrdenado] = useState(() => {
        const savedOrdenado = localStorage.getItem('ordenado');
        return savedOrdenado ? JSON.parse(savedOrdenado) : false;
    });
    const [tarefasOriginais, setTarefasOriginais] = useState(() => {
        const savedTarefas = localStorage.getItem('tarefasOriginais');
        return savedTarefas ? JSON.parse(savedTarefas) : [];
    });

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    useEffect(() => {
        localStorage.setItem('ordenado', JSON.stringify(ordenado));
    }, [ordenado]);

    useEffect(() => {
        localStorage.setItem('tarefasOriginais', JSON.stringify(tarefasOriginais));
    }, [tarefasOriginais]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            const novasTarefas = [...tarefas, novaTarefa];
            setTarefas(novasTarefas);
            setTarefasOriginais(novasTarefas);
            setNovaTarefa('');
        }
    };

    const removerTarefa = (indice) => {
        const novasTarefas = tarefas.filter((_, i) => i !== indice);
        setTarefas(novasTarefas);
        setTarefasOriginais(novasTarefas);
    };

    const ordenarTarefas = () => {
        if (ordenado) {
            setTarefas(tarefasOriginais);
        } else {
            const tarefasOrdenadas = [...tarefas].sort((a, b) => a.localeCompare(b));
            setTarefas(tarefasOrdenadas);
        }
        setOrdenado(!ordenado);
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <input
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder="Digite uma nova tarefa"
            />
            <button onClick={adicionarTarefa}>Adicionar</button>
            <button onClick={ordenarTarefas}>
                {ordenado ? 'Ordem de Criação' : 'Ordenar A-Z'}
            </button>
            <ul>
                {tarefas.map((tarefa, indice) => (
                    <li key={indice}>
                        {tarefa}{' '}
                        <button onClick={() => removerTarefa(indice)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;