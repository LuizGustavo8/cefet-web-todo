// Exercício 0: Vetor de objetos representando tarefas
const tarefas = [
  { nome: 'Comprar leite', categoria: 'compras', realizada: false },
  { nome: 'Escutar chimbinha', categoria: 'lazer', realizada: true }
];

// Exercício 1: Função que insere UMA tarefa na página
function insereTarefaNaPagina(tarefa) {
  const listaEl = document.querySelector('#lista-tarefas');
  const li = document.createElement('li');

  li.classList.add('item-tarefa');
  li.classList.add('categoria-' + tarefa.categoria);

  if (tarefa.realizada) {
    li.classList.add('marcado');
  }

  li.textContent = tarefa.nome;

  // Opcional 5: click no item alterna realizada/marcado
  li.addEventListener('click', function () {
    tarefa.realizada = !tarefa.realizada;
    li.classList.toggle('marcado');
  });

  listaEl.appendChild(li);
}

// Carrega todas as tarefas existentes na página
function carregaTarefas() {
  const listaEl = document.querySelector('#lista-tarefas');
  // Remove filhos existentes antes de popular
  while (listaEl.firstChild) {
    listaEl.removeChild(listaEl.firstChild);
  }

  for (const tarefa of tarefas) {
    insereTarefaNaPagina(tarefa);
  }
}

// Exercício 2: Incluir nova tarefa ao clicar no botão
function incluirNovaTarefa() {
  const nomeInput = document.querySelector('#nova-tarefa-nome');
  const categoriaSelect = document.querySelector('#nova-tarefa-categoria');

  const nome = nomeInput.value.trim();
  if (nome === '') return;

  const novaTarefa = {
    nome: nome,
    categoria: categoriaSelect.value,
    realizada: false
  };

  tarefas.push(novaTarefa);
  insereTarefaNaPagina(novaTarefa);

  // Limpa o campo e devolve o foco
  nomeInput.value = '';
  nomeInput.focus();
}

document.querySelector('#incluir-nova-tarefa')
  .addEventListener('click', incluirNovaTarefa);

// Opcional 4: Pressionar Enter também inclui a tarefa
document.querySelector('#nova-tarefa-nome')
  .addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      incluirNovaTarefa();
    }
  });

// Opcional 3: Filtrar por categoria
document.querySelector('#filtro-de-categoria')
  .addEventListener('change', function () {
    const categoriaEscolhida = this.value;
    const itens = document.querySelectorAll('.item-tarefa');

    for (const item of itens) {
      if (categoriaEscolhida === '') {
        item.classList.remove('retido-no-filtro');
      } else {
        if (item.classList.contains('categoria-' + categoriaEscolhida)) {
          item.classList.remove('retido-no-filtro');
        } else {
          item.classList.add('retido-no-filtro');
        }
      }
    }
  });

// Inicializa a lista ao carregar
carregaTarefas();