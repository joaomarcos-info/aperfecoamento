(() => {
  "use strict";

  /* CONFIGURAÇÕES */
  const STORAGE = {
    players: "missaoWindows.players.v1",
    current: "missaoWindows.currentPlayer.v1",
    prefs: "missaoWindows.preferences.v1"
  };

  const CONFIG = {
    attemptSize: 5,
    finalAttemptSize: 7,
    difficultyXp: { 1: 10, 2: 20, 3: 30 },
    practicalBonus: 10,
    perfectBonus: { 1: 20, 2: 40, 3: 70 },
    completionBonus: { 1: 15, 2: 30, 3: 55 },
    maxHistory: 160
  };

  const COMPETENCIES = [
    { id: "windows", nome: "Windows" },
    { id: "arquivos", nome: "Arquivos" },
    { id: "produtividade", nome: "Produtividade" },
    { id: "rede", nome: "Rede" },
    { id: "seguranca", nome: "Segurança" },
    { id: "perifericos", nome: "Periféricos" },
    { id: "diagnostico", nome: "Diagnóstico" },
    { id: "decisao", nome: "Decisão" }
  ];

  const SKILL_METRICS = [
    { id: "reconhecer", nome: "Reconhecer" },
    { id: "executar", nome: "Executar" },
    { id: "interpretar", nome: "Interpretar" },
    { id: "diagnosticar", nome: "Diagnosticar" },
    { id: "decidir", nome: "Decidir" }
  ];

  const LAB_TYPE_LABELS = {
    drag_files: "Arrastar arquivos",
    content_drag: "Arrastar por conteúdo",
    order_steps: "Ordenação",
    associate: "Associação",
    command_input: "Digitação de comando",
    terminal: "Terminal simulado",
    explorer: "Explorador simulado",
    settings: "Configurações simuladas",
    error_hunt: "Caça ao erro",
    classify: "Classificação",
    procedure: "Montagem de procedimento",
    branching: "Cenário ramificado",
    checklist: "Checklist prático",
    clue: "Investigação por pistas",
    fill_blank: "Preenchimento",
    path_build: "Construção de caminho",
    task_manager: "Gerenciador simulado",
    multiselect: "Multisseleção",
    open_response: "Resposta aberta",
    office_shift: "Expediente Digital"
  };

  const LEVELS = [
    { nivel: 1, cargo: "Iniciante Digital", xp: 0 },
    { nivel: 2, cargo: "Explorador do Windows", xp: 300 },
    { nivel: 3, cargo: "Operador Digital", xp: 800 },
    { nivel: 4, cargo: "Analista de Estação", xp: 1500 },
    { nivel: 5, cargo: "Especialista Windows", xp: 2500 },
    { nivel: 6, cargo: "Mestre do Escritório Digital", xp: 4000 }
  ];

  const TYPE_LABELS = {
    quiz: "Questão tradicional",
    certo_errado: "Certo ou errado",
    aconteceria: "O que aconteceria?",
    ferramenta: "Qual ferramenta usar?",
    comando: "Qual comando usar?",
    pratica: "Missão prática guiada",
    investigacao: "Investigação no Windows",
    situacao: "Situação-problema",
    sequencia: "Sequência correta",
    diagnostico: "Diagnóstico",
    melhor_solucao: "Escolha a melhor solução",
    identifique_erro: "Identifique o erro",
    cenario: "Cenário de escritório",
    tempo: "Desafio contra o tempo",
    integradora: "Missão integradora",
    ordem: "Ordenar etapas",
    associacao: "Associação"
  };

  const MODULES = [
    { id: "mod1", nome: "Módulo 01", subtitulo: "Explorador Windows" },
    { id: "mod2", nome: "Módulo 02", subtitulo: "Arquivos e Produtividade" },
    { id: "mod3", nome: "Módulo 03", subtitulo: "Diagnóstico e Manutenção" },
    { id: "mod4", nome: "Módulo 04", subtitulo: "Rede" },
    { id: "mod5", nome: "Módulo 05", subtitulo: "Periféricos e Escritório" },
    { id: "mod6", nome: "Módulo 06", subtitulo: "Central de Suporte" }
  ];

  const normalizeAlternatives = (alternativas, correta) => alternativas.map((item, index) => {
    if (typeof item === "object" && item !== null) {
      return {
        id: item.id || `op${index + 1}`,
        texto: item.texto,
        correta: Boolean(item.correta)
      };
    }
    return {
      id: `op${index + 1}`,
      texto: item,
      correta: typeof correta === "string" ? item === correta : index === correta
    };
  });

  const q = (id, tipo, titulo, dificuldade, categoria, competencia, pergunta, alternativas, correta, explicacao, extra = {}) => ({
    id,
    tipo,
    titulo,
    dificuldade,
    categoria,
    competencia,
    pergunta,
    alternativas: normalizeAlternatives(alternativas, correta),
    explicacao,
    instrucao: extra.instrucao || [],
    dicas: extra.dicas || [],
    tags: extra.tags || [],
    tempoLimite: extra.tempoLimite || 0,
    ordem: extra.ordem || null
  });

  /* BANCO DE QUESTÕES E MISSÕES */
  const MISSIONS = [
    {
      id: "m01",
      numero: 1,
      modulo: "mod1",
      titulo: "Explorando o Windows",
      categoria: "windows",
      dificuldade: 1,
      etapas: 5,
      desbloqueio: { xp: 0 },
      banco: [
        q("m01-q01", "quiz", "Explorador imediato", 1, "windows", "windows", "Você precisa abrir rapidamente o Explorador de Arquivos para localizar uma pasta da aula. Qual atalho resolve isso?", ["Win + E", "Win + P", "Ctrl + P", "Alt + F4"], 0, "Win + E abre o Explorador de Arquivos. É um dos atalhos mais úteis para navegar por pastas.", { tags: ["atalho"] }),
        q("m01-q02", "comando", "Painel de Configurações", 1, "windows", "windows", "Qual atalho abre diretamente as Configurações do Windows 11?", ["Win + I", "Win + R", "Ctrl + Shift + Esc", "Win + L"], 0, "Win + I abre Configurações, onde ficam opções de sistema, som, rede, privacidade e aplicativos.", { tags: ["atalho"] }),
        q("m01-q03", "pratica", "Executar na prática", 1, "windows", "windows", "Depois de abrir a janela Executar, qual é a função principal dela?", ["Abrir programas, pastas, comandos e caminhos digitados", "Mostrar somente a lista de impressoras", "Apagar arquivos temporários automaticamente", "Trocar a senha do usuário"], 0, "A janela Executar aceita comandos como winver, msinfo32, cmd e caminhos de pastas.", { instrucao: ["Pressione Win + R.", "Observe a janela que apareceu.", "Não digite nada por enquanto.", "Volte para o navegador usando Alt + Tab."], tags: ["atalho", "pratica"] }),
        q("m01-q04", "aconteceria", "Alternando programas", 1, "windows", "produtividade", "Você está com navegador, Explorador e Bloco de Notas abertos. O que acontece ao pressionar Alt + Tab?", ["Aparece a troca entre janelas abertas", "O computador bloqueia a tela", "A janela ativa é fechada imediatamente", "O menu de impressão é aberto"], 0, "Alt + Tab alterna entre programas abertos. É útil para ir ao Windows e voltar ao jogo sem fechar a página.", { tags: ["atalho"] }),
        q("m01-q05", "certo_errado", "Área de trabalho em segundos", 1, "windows", "produtividade", "Win + D mostra a área de trabalho e pode trazer as janelas de volta se for pressionado novamente.", ["Certo", "Errado"], 0, "Win + D minimiza/mostra as janelas para revelar a área de trabalho. Pressionar novamente restaura a visualização anterior.", { tags: ["atalho"] }),
        q("m01-q06", "tempo", "Acesso rápido", 1, "windows", "windows", "Seu professor pediu para abrir as Configurações e conferir uma opção do sistema. Qual escolha é mais rápida?", ["Win + I", "Win + D", "Ctrl + A", "Print Screen"], 0, "Win + I é o caminho direto para Configurações. Atalhos reduzem cliques e ajudam em suporte.", { tempoLimite: 25, tags: ["atalho"] })
      ]
    },
    {
      id: "m02",
      numero: 2,
      modulo: "mod1",
      titulo: "Descobrindo Seu Computador",
      categoria: "diagnostico",
      dificuldade: 1,
      etapas: 5,
      desbloqueio: { xp: 0 },
      banco: [
        q("m02-q01", "pratica", "Versão do Windows", 1, "diagnostico", "diagnostico", "Que tipo de informação a janela aberta pelo comando winver apresenta?", ["Versão e compilação do Windows", "Temperatura do processador", "Senha da rede Wi-Fi", "Lista completa de arquivos pessoais"], 0, "winver mostra informações sobre a edição, versão e compilação do Windows. Não exibe dados pessoais nem desempenho em tempo real.", { instrucao: ["Pressione Win + R.", "Digite winver.", "Pressione Enter.", "Observe a janela Sobre o Windows."], tags: ["comando", "pratica"] }),
        q("m02-q02", "pratica", "Informações do Sistema", 2, "diagnostico", "diagnostico", "No msinfo32, onde você localiza processador, memória instalada, fabricante, modelo e tipo do sistema?", ["Resumo do Sistema", "Histórico de proteção", "Fila de impressão", "Lixeira"], 0, "O msinfo32 abre Informações do Sistema. A tela Resumo do Sistema reúne os dados principais da máquina.", { instrucao: ["Pressione Win + R.", "Digite msinfo32.", "Pressione Enter.", "Observe o painel Resumo do Sistema."], tags: ["comando", "pratica"] }),
        q("m02-q03", "diagnostico", "Tipo do sistema", 2, "diagnostico", "diagnostico", "No campo Tipo do sistema aparece PC baseado em x64. O que isso representa?", ["Arquitetura de 64 bits do computador/sistema", "Velocidade atual da internet", "Quantidade de monitores conectados", "Nome do usuário logado"], 0, "x64 indica arquitetura de 64 bits, informação importante para compatibilidade de programas e drivers.", { dicas: ["Procure uma informação estrutural do computador.", "x64 está ligado à arquitetura do sistema."] }),
        q("m02-q04", "pratica", "Identidade da máquina", 1, "diagnostico", "windows", "Qual comando mostra o nome do computador no Prompt de Comando?", ["hostname", "whoami", "winver", "cleanmgr"], 0, "hostname retorna o nome do computador. É útil para identificar máquinas em laboratório ou rede.", { instrucao: ["Pressione Win + R.", "Digite cmd e pressione Enter.", "Digite hostname.", "Observe a linha exibida."], tags: ["comando", "pratica"] }),
        q("m02-q05", "pratica", "Usuário em sessão", 1, "diagnostico", "seguranca", "Ao digitar whoami no Prompt, que informação costuma aparecer?", ["O usuário atualmente autenticado", "A lista de impressoras instaladas", "O espaço livre em disco", "A versão do navegador"], 0, "whoami indica a conta em uso. Em suporte, ajuda a confirmar se o aluno está usando a conta correta.", { instrucao: ["Abra o Prompt pelo menu Iniciar ou pelo Executar com cmd.", "Digite whoami.", "Pressione Enter.", "Observe o texto apresentado."], tags: ["comando", "pratica"] }),
        q("m02-q06", "comando", "Relatório no terminal", 2, "diagnostico", "diagnostico", "Qual comando do Windows gera um relatório textual com várias informações do sistema no Prompt?", ["systeminfo", "tasklist", "arp -a", "nslookup"], 0, "systeminfo lista dados do sistema, instalação, BIOS, memória e hotfixes. Pode demorar alguns segundos.", { dicas: ["O nome do comando é bem literal.", "Ele combina system + info."], tags: ["comando"] })
      ]
    },
    {
      id: "m03",
      numero: 3,
      modulo: "mod2",
      titulo: "Arquivos e Pastas",
      categoria: "arquivos",
      dificuldade: 1,
      etapas: 5,
      desbloqueio: { xp: 0 },
      banco: [
        q("m03-q01", "quiz", "Nova pasta", 1, "arquivos", "arquivos", "Qual atalho cria uma nova pasta no Explorador de Arquivos?", ["Ctrl + Shift + N", "Ctrl + Alt + Del", "Win + V", "Alt + Tab"], 0, "Ctrl + Shift + N cria uma pasta nova no local atual do Explorador.", { tags: ["atalho"] }),
        q("m03-q02", "situacao", "Copiar sem remover", 1, "arquivos", "arquivos", "Você precisa enviar uma cópia de um arquivo para outra pasta, mantendo o original no lugar. Qual ação usar?", ["Copiar e colar", "Recortar e colar", "Shift + Delete", "Renomear extensão"], 0, "Copiar cria uma duplicata. Recortar move o arquivo e remove da pasta original.", { tags: ["atalho"] }),
        q("m03-q03", "sequencia", "Organização correta", 2, "arquivos", "arquivos", "Qual sequência é mais adequada para criar uma pasta chamada Relatórios e colocar nela um arquivo copiado?", ["Criar pasta, renomear, copiar arquivo, abrir pasta, colar", "Excluir arquivo, abrir Lixeira, restaurar, compactar", "Abrir Configurações, som, entrada, testar microfone", "Pressionar Win + P, duplicar tela, limpar disco"], 0, "A sequência descreve criação, nomeação e transferência segura por cópia.", { dicas: ["Pense na ordem que evita perder o arquivo original.", "Primeiro prepare o destino, depois copie e cole."] }),
        q("m03-q04", "identifique_erro", "Extensão não é decoração", 2, "arquivos", "arquivos", "Um aluno renomeou relatório.docx para relatório.pdf e achou que converteu o arquivo. Qual é o erro?", ["Trocar a extensão no nome não converte o formato real", "Todo arquivo vira PDF automaticamente no Windows 11", "Arquivos DOCX não possuem extensão", "O correto seria apagar o arquivo original"], 0, "Renomear a extensão não converte o conteúdo. Para gerar PDF, use exportar/salvar como PDF ou Microsoft Print to PDF.", { dicas: ["Nome e formato não são a mesma coisa.", "Converter exige um aplicativo ou recurso apropriado."] }),
        q("m03-q05", "certo_errado", "Desfazer uma ação", 1, "arquivos", "produtividade", "Ctrl + Z pode desfazer muitas ações recentes no Explorador, como renomear ou mover um arquivo.", ["Certo", "Errado"], 0, "Ctrl + Z desfaz ações em vários contextos. Ainda assim, é melhor conferir se a ação foi revertida corretamente.", { tags: ["atalho"] }),
        q("m03-q06", "pratica", "Propriedades do arquivo", 1, "arquivos", "arquivos", "Na janela Propriedades de um arquivo, qual informação pode ser consultada com segurança?", ["Tamanho, tipo e data de modificação", "Senha de todos os usuários", "Temperatura da CPU", "Histórico completo de navegação"], 0, "Propriedades mostra tipo, local, tamanho, datas e atributos do arquivo.", { instrucao: ["Abra o Explorador com Win + E.", "Clique com o botão direito em um arquivo de teste.", "Escolha Propriedades.", "Observe as informações exibidas."], tags: ["pratica"] })
      ]
    },
    {
      id: "m04",
      numero: 4,
      modulo: "mod2",
      titulo: "Detetive de Arquivos",
      categoria: "arquivos",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 0 },
      banco: [
        q("m04-q01", "pratica", "Extensões visíveis", 2, "arquivos", "arquivos", "Ao ativar Extensões de nomes de arquivos, o que muda no Explorador?", ["Os finais como .pdf, .docx e .xlsx passam a aparecer", "Todos os arquivos são convertidos para PDF", "O computador apaga arquivos duplicados", "A internet fica mais rápida"], 0, "Mostrar extensões ajuda a reconhecer o tipo real do arquivo e evitar enganos com nomes parecidos.", { instrucao: ["Abra o Explorador.", "Acesse Exibir.", "Entre em Mostrar.", "Ative Extensões de nomes de arquivos."], tags: ["pratica", "nova"] }),
        q("m04-q02", "pratica", "Itens ocultos", 2, "arquivos", "seguranca", "O que a opção Itens ocultos permite visualizar?", ["Arquivos e pastas marcados como ocultos", "A senha salva do usuário", "Somente arquivos maiores que 1 GB", "A velocidade da placa de vídeo"], 0, "Itens ocultos exibe arquivos/pastas com atributo oculto. Isso deve ser usado com cuidado para não alterar itens do sistema.", { instrucao: ["Abra o Explorador.", "Acesse Exibir.", "Entre em Mostrar.", "Ative Itens ocultos.", "Observe se novos itens aparecem."], tags: ["pratica"] }),
        q("m04-q03", "investigacao", "Busca por tipo", 2, "arquivos", "arquivos", "Se você digitar *.pdf na pesquisa de uma pasta, qual é o objetivo?", ["Localizar arquivos PDF naquela pasta e subpastas", "Criar um PDF novo em branco", "Compactar todos os documentos", "Restaurar arquivos da Lixeira"], 0, "O asterisco funciona como curinga. *.pdf busca arquivos cujo nome termina com .pdf.", { instrucao: ["Abra uma pasta no Explorador.", "Clique na caixa de pesquisa.", "Digite *.pdf.", "Observe como a busca filtra os resultados."], dicas: ["O símbolo * representa qualquer nome.", "O final .pdf filtra pelo tipo/extensão."], tags: ["pratica"] }),
        q("m04-q04", "situacao", "Arquivo de ontem", 2, "arquivos", "diagnostico", "Você lembra que editou um documento ontem, mas não sabe o nome. Qual estratégia é mais adequada?", ["Pesquisar e ordenar ou filtrar por data de modificação", "Alterar o nome de todos os arquivos", "Esvaziar a Lixeira", "Executar ping google.com"], 0, "A data de modificação ajuda a encontrar arquivos recentes sem depender do nome exato.", { dicas: ["A evidência disponível é quando o arquivo foi alterado.", "Use data de modificação no Explorador."] }),
        q("m04-q05", "identifique_erro", "Atalho falso", 2, "arquivos", "seguranca", "Um arquivo chamado boleto.pdf.exe aparece quando extensões estão visíveis. Qual sinal exige atenção?", ["A extensão real é .exe, não .pdf", "Todo boleto deve terminar com .exe", "O nome ter duas palavras impede abertura", "Arquivos PDF nunca podem ser baixados"], 0, "Com extensões visíveis, fica claro que o arquivo executável pode estar disfarçado. Isso é uma questão de segurança.", { dicas: ["Observe o último ponto do nome.", "A extensão real é a última parte."] }),
        q("m04-q06", "ferramenta", "Pesquisa eficiente", 1, "arquivos", "arquivos", "Qual recurso do Explorador ajuda quando você lembra apenas parte do nome do arquivo?", ["Caixa de pesquisa da pasta", "Mixer de volume", "Win + P", "Gerenciador de Tarefas"], 0, "A caixa de pesquisa permite procurar por parte do nome, tipo e outros critérios." )
      ]
    },
    {
      id: "m05",
      numero: 5,
      modulo: "mod2",
      titulo: "Lixeira e Recuperação",
      categoria: "arquivos",
      dificuldade: 1,
      etapas: 5,
      desbloqueio: { xp: 80 },
      banco: [
        q("m05-q01", "pratica", "Excluir e restaurar", 1, "arquivos", "arquivos", "Depois de excluir normalmente um arquivo de teste e restaurá-lo pela Lixeira, para onde ele retorna?", ["Para a pasta original de onde foi excluído", "Para a pasta Downloads sempre", "Para a área de transferência", "Para uma pasta ZIP"], 0, "A restauração pela Lixeira devolve o item para o local original.", { instrucao: ["Crie um arquivo de teste sem dados importantes.", "Exclua usando Delete ou botão direito > Excluir.", "Abra a Lixeira.", "Restaure o arquivo e veja onde ele apareceu."], tags: ["pratica"] }),
        q("m05-q02", "certo_errado", "Delete comum", 1, "arquivos", "arquivos", "Ao usar Delete em um arquivo local comum, ele normalmente vai para a Lixeira e pode ser restaurado.", ["Certo", "Errado"], 0, "Em arquivos locais comuns, Delete envia para a Lixeira. Em alguns locais, como unidades removíveis ou rede, o comportamento pode variar." ),
        q("m05-q03", "melhor_solucao", "Exclusão permanente", 2, "arquivos", "seguranca", "Qual cuidado é correto sobre Shift + Delete?", ["Ele pode excluir sem passar pela Lixeira; use somente em arquivos de teste ou quando tiver certeza", "Ele melhora o desempenho do processador", "Ele cria backup automático", "Ele abre Configurações"], 0, "Shift + Delete tende a remover permanentemente. Em laboratório, deve ser usado com extrema cautela e nunca em dados importantes.", { dicas: ["A tecla Shift muda o comportamento da exclusão.", "A Lixeira pode ser pulada."] }),
        q("m05-q04", "situacao", "Antes de esvaziar", 1, "arquivos", "decisao", "Antes de esvaziar a Lixeira em um computador de laboratório, qual atitude é mais responsável?", ["Conferir se não há arquivos que alguém precise recuperar", "Apagar System32 para liberar espaço", "Desativar o antivírus", "Formatar o disco"], 0, "Esvaziar a Lixeira remove a recuperação simples. Conferir antes evita perda acidental." ),
        q("m05-q05", "diagnostico", "Arquivo não encontrado", 2, "arquivos", "diagnostico", "Um aluno excluiu um arquivo por engano há poucos minutos. Qual local deve ser verificado primeiro?", ["Lixeira", "Gerenciador de Dispositivos", "Prompt com tracert", "Configurações de microfone"], 0, "A Lixeira é o primeiro ponto de recuperação para exclusões comuns." ),
        q("m05-q06", "pratica", "Criar teste seguro", 1, "arquivos", "seguranca", "Por que a atividade pede um arquivo de teste sem dados importantes?", ["Para praticar recuperação sem risco de perder informação real", "Porque arquivos importantes não possuem extensão", "Para acelerar o Wi-Fi", "Para alterar a BIOS"], 0, "Atividades práticas devem priorizar ações reversíveis e seguras.", { instrucao: ["Crie um arquivo simples de teste.", "Use um nome claro como teste-lixeira.txt.", "Não utilize arquivos pessoais importantes.", "Pratique exclusão e restauração somente com esse arquivo."], tags: ["pratica"] })
      ]
    },
    {
      id: "m06",
      numero: 6,
      modulo: "mod2",
      titulo: "Área de Transferência",
      categoria: "produtividade",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 120 },
      banco: [
        q("m06-q01", "pratica", "Histórico com Win + V", 2, "produtividade", "produtividade", "Depois de copiar três textos diferentes e pressionar Win + V, o que deve ser exibido?", ["Um histórico com itens copiados recentemente", "A janela de projeção da tela", "O relatório de memória RAM", "A Lixeira do Windows"], 0, "Win + V abre o histórico da área de transferência quando o recurso está ativado.", { instrucao: ["Copie três textos simples de fontes diferentes.", "Pressione Win + V.", "Se for solicitado, ative o histórico.", "Observe a lista de itens copiados."], tags: ["atalho", "pratica", "nova"] }),
        q("m06-q02", "situacao", "Dados de cadastro", 2, "produtividade", "produtividade", "Você precisa copiar nome, telefone, e-mail e endereço de fontes diferentes. Qual recurso facilita alternar entre vários itens copiados?", ["Histórico da área de transferência com Win + V", "Win + P", "Shift + Delete", "tracert"], 0, "O histórico permite recuperar itens copiados anteriormente sem voltar à fonte toda hora.", { tags: ["atalho", "nova"] }),
        q("m06-q03", "quiz", "Recortar ou copiar", 1, "produtividade", "arquivos", "Qual atalho move o conteúdo selecionado para a área de transferência, removendo-o do local original?", ["Ctrl + X", "Ctrl + C", "Ctrl + A", "Ctrl + Shift + Esc"], 0, "Ctrl + X recorta. Ctrl + C copia sem remover.", { tags: ["atalho"] }),
        q("m06-q04", "certo_errado", "Colar não é copiar", 1, "produtividade", "produtividade", "Ctrl + V cola o conteúdo que já está na área de transferência.", ["Certo", "Errado"], 0, "Ctrl + V insere o conteúdo copiado ou recortado no local ativo.", { tags: ["atalho"] }),
        q("m06-q05", "identifique_erro", "Copiou por cima", 2, "produtividade", "decisao", "Um aluno copiou um novo texto e perdeu o item anterior porque não conhecia Win + V. Qual era a melhor estratégia?", ["Usar o histórico da área de transferência para recuperar itens recentes", "Reiniciar o computador a cada cópia", "Apagar os arquivos temporários", "Mudar o projetor para duplicar"], 0, "O histórico ajuda quando várias informações precisam ser copiadas em sequência.", { dicas: ["O problema envolve vários itens copiados.", "Win + V guarda histórico quando ativado."] }),
        q("m06-q06", "pratica", "Fixar item copiado", 2, "produtividade", "produtividade", "No histórico da área de transferência, para que serve fixar um item?", ["Manter um item importante disponível por mais tempo", "Transformar texto em imagem", "Abrir o Prompt de Comando", "Bloquear a tela"], 0, "Fixar um item no Win + V evita que ele desapareça rapidamente do histórico.", { instrucao: ["Pressione Win + V.", "Passe o mouse sobre um item do histórico.", "Procure a opção de fixar, quando disponível.", "Observe a indicação visual do item fixado."], tags: ["pratica", "nova"] })
      ]
    },
    {
      id: "m07",
      numero: 7,
      modulo: "mod2",
      titulo: "Multitarefa",
      categoria: "produtividade",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 170 },
      banco: [
        q("m07-q01", "pratica", "Snap Layouts", 2, "produtividade", "produtividade", "Ao pressionar Win + Z em uma janela compatível, o que aparece?", ["Layouts para organizar a janela na tela", "A lista de redes Wi-Fi", "A Lixeira", "A janela Sobre o Windows"], 0, "Win + Z mostra opções de Snap Layouts para encaixar janelas em áreas da tela.", { instrucao: ["Abra uma janela do Explorador ou navegador.", "Pressione Win + Z.", "Observe os layouts exibidos.", "Volte ao jogo com Alt + Tab."], tags: ["atalho", "pratica", "nova"] }),
        q("m07-q02", "situacao", "PDF e anotação", 2, "produtividade", "decisao", "Você precisa consultar um PDF enquanto digita informações em outro programa. Qual organização é mais adequada?", ["Dividir as janelas lado a lado com Snap", "Maximizar uma janela e esconder a outra", "Esvaziar a Lixeira", "Executar arp -a"], 0, "Janelas lado a lado reduzem alternância e melhoram a produtividade." ),
        q("m07-q03", "quiz", "Encaixe lateral", 1, "produtividade", "produtividade", "Qual atalho encaixa a janela ativa à esquerda da tela?", ["Win + Seta para a esquerda", "Win + V", "Win + L", "Ctrl + P"], 0, "Win + seta para a esquerda encaixa a janela no lado esquerdo. A seta para a direita encaixa no outro lado.", { tags: ["atalho"] }),
        q("m07-q04", "aconteceria", "Janela à direita", 1, "produtividade", "produtividade", "O que acontece ao pressionar Win + seta para a direita em uma janela ativa?", ["A janela é encaixada no lado direito", "O computador entra em suspensão", "O áudio muda para o monitor", "O arquivo é compactado"], 0, "Esse atalho faz parte dos recursos de organização de janelas do Windows.", { tags: ["atalho"] }),
        q("m07-q05", "melhor_solucao", "Muitas janelas abertas", 2, "produtividade", "decisao", "Em uma rotina com navegador, planilha e Explorador abertos, qual combinação ajuda a manter o fluxo?", ["Alt + Tab para alternar e Snap para organizar", "Shift + Delete em arquivos do sistema", "Desativar permissões do microfone", "Trocar extensão de arquivos"], 0, "Alternância e organização visual são recursos complementares de produtividade.", { dicas: ["Uma parte muda de janela, outra organiza a tela.", "Alt + Tab e Snap trabalham bem juntos."] }),
        q("m07-q06", "pratica", "Comparação de pastas", 2, "produtividade", "arquivos", "Para comparar duas pastas abertas, qual resultado é esperado ao encaixar uma à esquerda e outra à direita?", ["As duas ficam visíveis ao mesmo tempo", "Uma pasta apaga a outra", "O Windows cria um ZIP automático", "A rede é reiniciada"], 0, "Encaixar janelas lado a lado permite comparar, arrastar e conferir arquivos com menos erro.", { instrucao: ["Abra duas janelas do Explorador.", "Use Win + seta para a esquerda em uma.", "Use Win + seta para a direita na outra.", "Observe a comparação lado a lado."], tags: ["pratica"] })
      ]
    },
    {
      id: "m08",
      numero: 8,
      modulo: "mod2",
      titulo: "Áreas de Trabalho Virtuais",
      categoria: "produtividade",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 220 },
      banco: [
        q("m08-q01", "pratica", "Nova área de trabalho", 2, "produtividade", "produtividade", "O que acontece ao pressionar Win + Ctrl + D?", ["Uma nova área de trabalho virtual é criada", "A tela é projetada em outro monitor", "A Lixeira é esvaziada", "O Prompt executa ipconfig"], 0, "Win + Ctrl + D cria uma nova área de trabalho virtual, útil para separar tarefas.", { instrucao: ["Pressione Win + Ctrl + D.", "Observe a nova área de trabalho.", "Use Win + Ctrl + seta para voltar se precisar.", "Retorne ao jogo."], tags: ["atalho", "pratica", "nova"] }),
        q("m08-q02", "aconteceria", "Aplicativos continuam abertos", 2, "produtividade", "produtividade", "Você abriu um aplicativo em uma segunda área de trabalho e voltou para a primeira. O aplicativo desapareceu ou continua aberto?", ["Continua aberto, mas fica em outra área de trabalho", "Foi desinstalado", "Virou arquivo oculto", "Foi movido para a Lixeira"], 0, "Áreas virtuais organizam janelas, não encerram aplicativos.", { dicas: ["Pense em organização visual, não em fechar programas.", "A janela fica separada em outro espaço."] }),
        q("m08-q03", "quiz", "Navegar entre áreas", 1, "produtividade", "produtividade", "Qual atalho alterna entre áreas de trabalho virtuais?", ["Win + Ctrl + seta esquerda/direita", "Ctrl + P", "Win + R", "Ctrl + Shift + Esc"], 0, "Win + Ctrl + setas navega entre áreas virtuais abertas.", { tags: ["atalho"] }),
        q("m08-q04", "pratica", "Fechar área virtual", 2, "produtividade", "produtividade", "Ao fechar uma área de trabalho virtual com Win + Ctrl + F4, o que acontece com as janelas abertas nela?", ["Elas são movidas para outra área de trabalho", "São apagadas do disco", "A conta do usuário é removida", "O Windows perde a rede"], 0, "Fechar a área virtual não desinstala nem exclui arquivos; as janelas são realocadas.", { instrucao: ["Crie uma área virtual com Win + Ctrl + D.", "Abra uma janela simples nela.", "Pressione Win + Ctrl + F4.", "Observe para onde a janela foi."], tags: ["atalho", "pratica"] }),
        q("m08-q05", "situacao", "Separar tarefas", 2, "produtividade", "decisao", "Você quer separar pesquisa da aula e arquivos administrativos para não misturar janelas. Qual recurso é mais adequado?", ["Áreas de trabalho virtuais", "Esvaziar Lixeira", "ipconfig /all", "Microsoft Print to PDF"], 0, "Áreas virtuais ajudam a organizar contextos de trabalho sem fechar programas." ),
        q("m08-q06", "certo_errado", "Não é outro usuário", 1, "produtividade", "windows", "Uma área de trabalho virtual cria uma nova conta de usuário separada.", ["Certo", "Errado"], 1, "Áreas virtuais não são contas de usuário; são espaços de organização de janelas dentro da mesma sessão." )
      ]
    },
    {
      id: "m09",
      numero: 9,
      modulo: "mod2",
      titulo: "Capturas de Tela",
      categoria: "produtividade",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 280 },
      banco: [
        q("m09-q01", "pratica", "Captura seletiva", 2, "produtividade", "produtividade", "Qual recurso aparece ao pressionar Win + Shift + S?", ["Ferramentas para recortar uma área da tela", "A janela de versões do Windows", "A fila de impressão", "O Gerenciador de Dispositivos"], 0, "Win + Shift + S abre a captura de tela com opções de seleção. É útil para registrar só o necessário.", { instrucao: ["Pressione Win + Shift + S.", "Observe a barra de captura.", "Cancele com Esc se não quiser capturar.", "Volte ao jogo."], tags: ["atalho", "pratica", "nova"] }),
        q("m09-q02", "melhor_solucao", "Privacidade na captura", 2, "seguranca", "seguranca", "Você precisa mostrar uma mensagem de erro, mas há dados pessoais na tela. Qual opção protege melhor a privacidade?", ["Capturar somente a região da mensagem", "Capturar a tela inteira sem conferir", "Enviar foto do monitor com tudo aberto", "Desativar o antivírus"], 0, "Captura seletiva reduz exposição de dados que não fazem parte do problema.", { dicas: ["O objetivo é mostrar só o necessário.", "Região selecionada protege melhor que tela inteira."] }),
        q("m09-q03", "quiz", "Print Screen", 1, "produtividade", "produtividade", "A tecla Print Screen é associada principalmente a qual ação?", ["Capturar a tela", "Abrir o menu Iniciar", "Criar uma pasta", "Testar DNS"], 0, "Print Screen captura a tela ou abre ferramenta de recorte dependendo da configuração do Windows." ),
        q("m09-q04", "situacao", "Evidência para suporte", 2, "produtividade", "diagnostico", "Um erro aparece por poucos segundos. Qual atitude melhora a comunicação com o suporte?", ["Capturar a mensagem ou anotar exatamente o texto", "Ignorar a mensagem e reiniciar sem observar", "Apagar a pasta Downloads", "Trocar o nome do computador"], 0, "Evidências claras ajudam a diagnosticar o problema sem adivinhação." ),
        q("m09-q05", "pratica", "Área retangular", 2, "produtividade", "produtividade", "Na ferramenta de captura, qual modo costuma permitir selecionar uma parte retangular da tela?", ["Recorte retangular", "Gateway padrão", "Histórico da área de transferência", "Somente segunda tela"], 0, "O recorte retangular é a opção comum para capturar uma área específica.", { instrucao: ["Pressione Win + Shift + S.", "Observe os ícones de modo de captura.", "Identifique o recorte retangular.", "Cancele ou finalize a captura."], tags: ["pratica"] }),
        q("m09-q06", "certo_errado", "Dados sensíveis", 2, "seguranca", "seguranca", "Antes de enviar uma captura, é recomendável conferir se dados pessoais, senhas ou informações de terceiros aparecem nela.", ["Certo", "Errado"], 0, "Capturas podem revelar mais do que o problema. Conferir antes de compartilhar é uma prática de segurança." )
      ]
    },
    {
      id: "m10",
      numero: 10,
      modulo: "mod2",
      titulo: "Compactação",
      categoria: "arquivos",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 350 },
      banco: [
        q("m10-q01", "pratica", "Criar ZIP", 2, "arquivos", "arquivos", "Ao compactar uma pasta com três arquivos para ZIP, o que ocorre?", ["É criado um arquivo .zip contendo cópias compactadas dos itens", "Os arquivos originais são apagados sempre", "O Windows formata o disco", "A rede é desconectada"], 0, "Compactar cria um arquivo ZIP que agrupa itens. Normalmente os originais permanecem no local.", { instrucao: ["Crie uma pasta de teste com três arquivos simples.", "Clique com o botão direito na pasta.", "Escolha Compactar para arquivo ZIP.", "Observe o novo arquivo criado."], tags: ["pratica"] }),
        q("m10-q02", "situacao", "Enviar vários documentos", 2, "arquivos", "decisao", "Você precisa enviar muitos documentos relacionados em um único anexo. Qual recurso ajuda?", ["Compactar em ZIP", "Win + D", "ping 127.0.0.1", "Esvaziar a Lixeira"], 0, "ZIP agrupa arquivos e simplifica envio e organização." ),
        q("m10-q03", "diagnostico", "Abrir ou extrair", 2, "arquivos", "arquivos", "Qual é a diferença prática entre abrir um arquivo dentro do ZIP e extrair?", ["Extrair cria uma cópia normal fora do ZIP para uso completo", "Abrir dentro do ZIP sempre converte para PDF", "Extrair apaga o Windows", "Não existe diferença"], 0, "Alguns programas funcionam melhor com arquivos extraídos, porque eles ficam em uma pasta normal.", { dicas: ["Pense no arquivo ainda dentro do pacote.", "Extrair tira os itens do pacote compactado."] }),
        q("m10-q04", "certo_errado", "ZIP é backup?", 2, "arquivos", "seguranca", "Um arquivo ZIP pode ajudar a organizar cópias, mas não substitui uma rotina de backup em local seguro.", ["Certo", "Errado"], 0, "Compactar não garante backup se o ZIP ficar no mesmo disco e ele falhar. Backup precisa de estratégia própria." ),
        q("m10-q05", "pratica", "Extrair arquivos", 2, "arquivos", "arquivos", "Ao escolher Extrair tudo em um ZIP, qual resultado é esperado?", ["Uma pasta comum com os arquivos extraídos", "A remoção do usuário do Windows", "A alteração do gateway", "O bloqueio da tela"], 0, "Extrair tudo cria uma pasta com os arquivos acessíveis fora do pacote ZIP.", { instrucao: ["Clique com o botão direito em um arquivo ZIP de teste.", "Escolha Extrair tudo.", "Confirme a pasta de destino.", "Observe os arquivos extraídos."], tags: ["pratica"] }),
        q("m10-q06", "identifique_erro", "Arquivo aberto dentro do pacote", 2, "arquivos", "diagnostico", "Um aluno editou um documento aberto diretamente de dentro do ZIP e não encontrou a alteração depois. Qual hipótese faz sentido?", ["Ele deveria ter extraído antes de editar para salvar em uma pasta normal", "O ZIP apagou o teclado", "O arquivo virou driver", "A extensão .zip é sempre vírus"], 0, "Editar diretamente dentro de compactados pode confundir o local de salvamento. Extrair antes evita esse problema." )
      ]
    },
    {
      id: "m11",
      numero: 11,
      modulo: "mod3",
      titulo: "Armazenamento",
      categoria: "diagnostico",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 450 },
      banco: [
        q("m11-q01", "pratica", "Armazenamento em Configurações", 2, "diagnostico", "diagnostico", "Em Configurações > Sistema > Armazenamento, que tipo de informação você encontra?", ["Uso de espaço por categorias como aplicativos, temporários e sistema", "Senha de todos os usuários", "Temperatura exata do gabinete", "Histórico de chamadas telefônicas"], 0, "A tela de armazenamento mostra consumo por categoria e ajuda a investigar falta de espaço.", { instrucao: ["Abra Configurações com Win + I.", "Acesse Sistema.", "Entre em Armazenamento.", "Observe as categorias de uso."], tags: ["pratica"] }),
        q("m11-q02", "comando", "Limpeza de Disco", 1, "diagnostico", "diagnostico", "Qual comando abre a Limpeza de Disco clássica do Windows?", ["cleanmgr", "winver", "hostname", "tracert"], 0, "cleanmgr abre a ferramenta Limpeza de Disco. Use opções comuns com cuidado e leia antes de confirmar.", { tags: ["comando"] }),
        q("m11-q03", "melhor_solucao", "Disco quase cheio", 2, "diagnostico", "decisao", "O disco C tem somente 4 GB livres. Qual deveria ser uma primeira atitude segura?", ["Verificar categorias de armazenamento e arquivos temporários antes de apagar algo", "Apagar a pasta System32", "Formatar o disco sem backup", "Remover drivers aleatoriamente"], 0, "Investigar antes de apagar evita danos. Nunca apague pastas do sistema para liberar espaço.", { dicas: ["A primeira etapa é diagnóstico seguro.", "Configurações de armazenamento ajuda a entender o consumo."] }),
        q("m11-q04", "investigacao", "Este Computador", 1, "diagnostico", "diagnostico", "No Explorador, a área Este Computador permite observar principalmente o quê?", ["Unidades de armazenamento e espaço livre/total", "Somente permissões do microfone", "A rota até google.com", "O histórico da área de transferência"], 0, "Este Computador mostra discos e unidades conectadas, com indicadores de espaço.", { instrucao: ["Abra o Explorador com Win + E.", "Clique em Este Computador.", "Observe as unidades e barras de espaço.", "Não apague nada nessa atividade."], tags: ["pratica"] }),
        q("m11-q05", "certo_errado", "Arquivos temporários", 2, "diagnostico", "seguranca", "Arquivos temporários podem ocupar espaço, mas a remoção deve ser feita por ferramentas do Windows e com leitura das opções.", ["Certo", "Errado"], 0, "Ferramentas como Armazenamento e Limpeza de Disco oferecem opções mais seguras do que apagar pastas manualmente." ),
        q("m11-q06", "diagnostico", "SSD e HDD", 2, "diagnostico", "diagnostico", "Por que identificar se o computador usa SSD ou HDD pode ser relevante?", ["Ajuda a interpretar desempenho e decisões de armazenamento", "Define o idioma do teclado", "Informa a senha do Wi-Fi", "Troca automaticamente o monitor"], 0, "SSD e HDD têm características diferentes de velocidade e capacidade. Essa informação apoia diagnósticos de lentidão." )
      ]
    },
    {
      id: "m12",
      numero: 12,
      modulo: "mod3",
      titulo: "Gerenciador de Tarefas",
      categoria: "diagnostico",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 550 },
      banco: [
        q("m12-q01", "pratica", "Abrir Gerenciador", 1, "diagnostico", "diagnostico", "Qual atalho abre diretamente o Gerenciador de Tarefas?", ["Ctrl + Shift + Esc", "Win + V", "Win + P", "Ctrl + C"], 0, "Ctrl + Shift + Esc abre o Gerenciador de Tarefas, ferramenta essencial para processos e desempenho.", { instrucao: ["Pressione Ctrl + Shift + Esc.", "Observe o Gerenciador de Tarefas.", "Se abrir em modo simples, expanda a visualização.", "Volte ao jogo."], tags: ["atalho", "pratica"] }),
        q("m12-q02", "pratica", "Desempenho", 2, "diagnostico", "diagnostico", "Na guia Desempenho, quais recursos aparecem para monitoramento?", ["CPU, memória, disco, rede e GPU quando disponível", "Somente documentos do Word", "Apenas senhas salvas", "Somente itens da Lixeira"], 0, "A guia Desempenho mostra gráficos e uso de recursos de hardware.", { instrucao: ["Abra o Gerenciador de Tarefas.", "Clique em Desempenho.", "Observe os painéis de CPU, memória, disco e rede.", "Não encerre processos nessa etapa."], tags: ["pratica"] }),
        q("m12-q03", "investigacao", "Ordenar por memória", 2, "diagnostico", "diagnostico", "Ao ordenar processos por memória, o que fica no topo?", ["Os processos que mais estão usando RAM naquele momento", "Sempre o mesmo programa em todos os computadores", "A lista de impressoras", "Os arquivos ocultos"], 0, "O topo varia por computador, mas a interpretação é: maior consumo de memória no momento.", { instrucao: ["Abra Processos no Gerenciador de Tarefas.", "Clique no cabeçalho Memória.", "Observe a ordenação.", "Não finalize processos desconhecidos."], tags: ["pratica"] }),
        q("m12-q04", "diagnostico", "CPU alta", 2, "diagnostico", "diagnostico", "Um computador está lento e um processo aparece com CPU muito alta por vários minutos. Qual interpretação inicial é adequada?", ["Esse processo pode estar exigindo muito processamento e merece investigação", "A tela está com brilho baixo", "O teclado mudou de idioma", "O arquivo está em ZIP"], 0, "CPU alta persistente pode indicar tarefa pesada, travamento ou comportamento anormal. Investigue antes de agir." ),
        q("m12-q05", "certo_errado", "Inicialização", 2, "diagnostico", "produtividade", "A seção Aplicativos de Inicialização ajuda a identificar programas que iniciam junto com o Windows.", ["Certo", "Errado"], 0, "Programas iniciando automaticamente podem impactar tempo de boot e desempenho." ),
        q("m12-q06", "comando", "Lista de processos", 2, "diagnostico", "diagnostico", "Qual comando do Prompt lista processos em execução de forma textual?", ["tasklist", "whoami", "winver", "cleanmgr"], 0, "tasklist exibe processos no terminal. É uma alternativa de consulta textual ao Gerenciador de Tarefas.", { tags: ["comando"] })
      ]
    },
    {
      id: "m13",
      numero: 13,
      modulo: "mod3",
      titulo: "Processos e Programas Travados",
      categoria: "diagnostico",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 650, completed: ["m12"] },
      banco: [
        q("m13-q01", "situacao", "Não está respondendo", 2, "diagnostico", "decisao", "Um aplicativo conhecido aparece como Não está respondendo e você já aguardou alguns instantes. Qual procedimento é apropriado?", ["Usar o Gerenciador de Tarefas para finalizar esse aplicativo específico", "Finalizar processos desconhecidos do Windows", "Apagar arquivos do sistema", "Desativar o antivírus"], 0, "Finalizar tarefa pode resolver um aplicativo travado, mas deve ser feito no programa correto, não em processos essenciais.", { dicas: ["A ação deve mirar o aplicativo conhecido.", "Evite processos do sistema que você não conhece."] }),
        q("m13-q02", "melhor_solucao", "Antes de finalizar", 2, "diagnostico", "decisao", "Antes de finalizar um editor de texto travado, qual cuidado reduz perda de trabalho?", ["Aguardar um pouco e verificar se há opção de salvar/recuperar", "Desligar o computador pela tomada", "Remover drivers", "Executar tracert"], 0, "Encerrar força o fechamento. Sempre que possível, tente salvar ou aguarde recuperação automática." ),
        q("m13-q03", "diagnostico", "Processo desconhecido", 2, "diagnostico", "seguranca", "Por que não é recomendado encerrar processos desconhecidos aleatoriamente?", ["Eles podem ser componentes importantes do Windows ou de segurança", "Porque todos são arquivos PDF", "Porque isso aumenta o espaço livre", "Porque impede capturas de tela"], 0, "Processos do sistema sustentam funções do Windows. Encerrar sem entender pode causar instabilidade." ),
        q("m13-q04", "ferramenta", "Ferramenta correta", 1, "diagnostico", "diagnostico", "Qual ferramenta nativa é mais indicada para ver e finalizar um aplicativo travado?", ["Gerenciador de Tarefas", "Lixeira", "Winver", "Microsoft Print to PDF"], 0, "O Gerenciador de Tarefas lista aplicativos e processos e permite finalizar tarefas." ),
        q("m13-q05", "certo_errado", "Finalizar tarefa", 2, "diagnostico", "seguranca", "Finalizar tarefa deve ser usado com critério, especialmente quando o processo não é claramente o aplicativo travado.", ["Certo", "Errado"], 0, "O recurso é útil, mas ações sem critério podem fechar componentes importantes ou causar perda de dados." ),
        q("m13-q06", "comando", "Monitor de Recursos", 3, "diagnostico", "diagnostico", "Qual comando abre o Monitor de Recursos, útil para análise mais detalhada?", ["resmon", "hostname", "winver", "nslookup"], 0, "resmon abre o Monitor de Recursos, com detalhes de CPU, memória, disco e rede.", { dicas: ["O nome lembra resource monitor.", "É uma abreviação: resmon."], tags: ["comando"] })
      ]
    },
    {
      id: "m14",
      numero: 14,
      modulo: "mod4",
      titulo: "Rede Básica",
      categoria: "rede",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 700 },
      banco: [
        q("m14-q01", "pratica", "ipconfig", 2, "rede", "rede", "Após executar ipconfig, em qual item você encontra o endereço atribuído ao computador na rede?", ["Endereço IPv4", "Nome do processador", "Extensão do arquivo", "Fila de impressão"], 0, "O IPv4 indica o endereço do computador naquela rede. O valor varia entre máquinas.", { instrucao: ["Abra o Prompt de Comando.", "Digite ipconfig.", "Pressione Enter.", "Procure o item Endereço IPv4."], tags: ["comando", "pratica"] }),
        q("m14-q02", "pratica", "ipconfig detalhado", 2, "rede", "rede", "Qual comando exibe mais detalhes de rede, incluindo DNS e endereço físico?", ["ipconfig /all", "ipconfig /mini", "winver /all", "print /pdf"], 0, "ipconfig /all mostra mais detalhes dos adaptadores, incluindo DNS, DHCP e endereço físico.", { instrucao: ["No Prompt, digite ipconfig /all.", "Compare com o ipconfig simples.", "Observe que há mais campos.", "Não altere configurações."], tags: ["comando", "pratica"] }),
        q("m14-q03", "diagnostico", "Gateway", 2, "rede", "rede", "Em rede local, o Gateway Padrão geralmente representa o quê?", ["O equipamento usado como saída para outras redes, como o roteador", "A extensão de documentos do Word", "O nome do monitor", "A tecla de captura"], 0, "O gateway costuma ser o roteador ou dispositivo que encaminha tráfego para fora da rede local.", { dicas: ["Pense na saída da rede local.", "Geralmente é o roteador."] }),
        q("m14-q04", "certo_errado", "IPv4 varia", 1, "rede", "rede", "O endereço IPv4 exibido no ipconfig pode variar de um computador para outro.", ["Certo", "Errado"], 0, "Endereços são atribuídos por rede e dispositivo. Por isso, perguntas práticas devem focar no item, não no valor universal." ),
        q("m14-q05", "comando", "Adaptadores", 2, "rede", "rede", "Qual comando ajuda a ver detalhes dos adaptadores de rede no Prompt?", ["ipconfig /all", "tasklist", "cleanmgr", "Win + V"], 0, "ipconfig /all lista adaptadores e detalhes como DNS, DHCP, gateway e endereço físico.", { tags: ["comando"] }),
        q("m14-q06", "investigacao", "Adaptador correto", 2, "rede", "diagnostico", "Se o computador usa Wi-Fi, em qual seção do ipconfig você deve priorizar a leitura?", ["Adaptador de Rede sem Fio/Wi-Fi", "Adaptador Bluetooth desconectado", "Unidade de DVD", "Histórico da área de transferência"], 0, "É importante interpretar o adaptador realmente conectado, porque o ipconfig pode listar vários.", { instrucao: ["Execute ipconfig.", "Observe os nomes dos adaptadores.", "Identifique o que está conectado.", "Compare Wi-Fi e Ethernet, se existirem."], tags: ["pratica"] })
      ]
    },
    {
      id: "m15",
      numero: 15,
      modulo: "mod4",
      titulo: "Investigador de Rede",
      categoria: "rede",
      dificuldade: 3,
      etapas: 5,
      desbloqueio: { xp: 900, completed: ["m14"] },
      banco: [
        q("m15-q01", "pratica", "Loopback", 2, "rede", "diagnostico", "O que o teste ping 127.0.0.1 verifica principalmente?", ["A pilha de rede local do próprio computador", "A impressora padrão", "A versão do Windows", "A extensão de arquivos ocultos"], 0, "127.0.0.1 é o endereço de loopback. Ele testa a comunicação local da pilha TCP/IP.", { instrucao: ["Abra o Prompt.", "Digite ping 127.0.0.1.", "Observe se há respostas.", "Volte ao jogo."], tags: ["comando", "pratica"] }),
        q("m15-q02", "diagnostico", "DNS em suspeita", 3, "rede", "diagnostico", "Evidências: ping 8.8.8.8 responde, mas ping google.com falha por nome. Qual componente deve ser investigado primeiro?", ["DNS", "Lixeira", "Snap Layouts", "Extensão .zip"], 0, "Se o IP responde, mas o nome não resolve, a suspeita principal é resolução de nomes, ou seja, DNS.", { dicas: ["O computador alcança um endereço IP externo.", "O problema aparece quando usa nome de site."] }),
        q("m15-q03", "pratica", "nslookup", 3, "rede", "rede", "Qual ferramenta consulta resolução de nomes DNS no Prompt?", ["nslookup", "winver", "cleanmgr", "mspaint"], 0, "nslookup consulta servidores DNS e mostra como um nome é resolvido para endereços.", { instrucao: ["Abra o Prompt.", "Digite nslookup google.com.", "Observe o servidor e os endereços retornados.", "Não altere configurações."], tags: ["comando", "pratica"] }),
        q("m15-q04", "diagnostico", "Gateway falhando", 3, "rede", "diagnostico", "Evidências: ping 127.0.0.1 responde, mas ping para o gateway falha. Qual hipótese é mais provável?", ["Problema entre o computador e a rede local", "Falha de DNS público apenas", "Arquivo ZIP corrompido", "PDF abrindo no aplicativo errado"], 0, "Se o loopback funciona, mas o gateway não, investigue conexão local, Wi-Fi/cabo, adaptador ou roteador.", { dicas: ["O próprio computador responde.", "A falha começa ao tentar sair para a rede local."] }),
        q("m15-q05", "pratica", "tracert", 3, "rede", "diagnostico", "Para que serve o comando tracert google.com?", ["Mostrar saltos/roteadores percorridos até o destino", "Compactar arquivos", "Selecionar microfone", "Criar área de trabalho virtual"], 0, "tracert mostra o caminho aproximado dos pacotes até o destino, ajudando a identificar onde há interrupção.", { instrucao: ["Abra o Prompt.", "Digite tracert google.com.", "Aguarde alguns saltos aparecerem.", "Observe que o resultado pode variar."], tags: ["comando", "pratica"] }),
        q("m15-q06", "comando", "Tabela ARP", 3, "rede", "rede", "Qual comando mostra a tabela ARP local, relacionando IPs e endereços físicos conhecidos?", ["arp -a", "whoami", "Win + P", "perfmon /rel"], 0, "arp -a exibe a tabela ARP local. É uma consulta de diagnóstico, não uma correção.", { dicas: ["O comando tem três letras e usa -a.", "Ele mostra mapeamentos conhecidos na rede local."], tags: ["comando"] })
      ]
    },
    {
      id: "m16",
      numero: 16,
      modulo: "mod5",
      titulo: "Áudio do Escritório",
      categoria: "perifericos",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 1000 },
      banco: [
        q("m16-q01", "pratica", "Saída de som", 2, "perifericos", "perifericos", "Em Configurações > Sistema > Som, qual item resolve áudio saindo no dispositivo errado?", ["Selecionar o dispositivo de saída correto", "Alterar a extensão do arquivo", "Executar winver", "Esvaziar a Lixeira"], 0, "A saída define por onde o som será reproduzido: caixas, fone, monitor HDMI e outros.", { instrucao: ["Abra Configurações com Win + I.", "Acesse Sistema > Som.", "Localize Saída.", "Observe os dispositivos disponíveis."], tags: ["pratica", "nova"] }),
        q("m16-q02", "situacao", "HDMI com áudio", 2, "perifericos", "diagnostico", "O notebook está ligado por HDMI. A imagem aparece, mas o áudio foi para o monitor. O que verificar?", ["Dispositivo de saída de som", "Itens ocultos do Explorador", "DNS do google.com", "Área de trabalho virtual"], 0, "Conexões HDMI podem levar áudio para o monitor. Escolher a saída correta resolve muitos casos." ),
        q("m16-q03", "pratica", "Mixer de Volume", 2, "perifericos", "perifericos", "O que o Mixer de Volume permite controlar?", ["Volume por aplicativo e dispositivo de saída", "Tipo de sistema x64", "Gateway padrão", "Extensões de arquivo"], 0, "O Mixer ajuda quando apenas um aplicativo está baixo ou mudo, mesmo com o volume geral alto.", { instrucao: ["Abra Configurações > Sistema > Som.", "Procure Mixer de Volume.", "Observe volumes por aplicativo quando houver apps abertos.", "Não altere nada crítico."], tags: ["pratica", "nova"] }),
        q("m16-q04", "diagnostico", "Som mudo em um app", 2, "perifericos", "diagnostico", "O som funciona no sistema, mas um aplicativo específico está mudo. Qual local investigar?", ["Mixer de Volume", "Lixeira", "tracert", "Winver"], 0, "O Mixer permite conferir se um aplicativo está com volume baixo ou saída diferente." ),
        q("m16-q05", "certo_errado", "Volume geral", 1, "perifericos", "perifericos", "Volume geral alto garante que todos os aplicativos estejam audíveis individualmente.", ["Certo", "Errado"], 1, "Um app pode estar mudo ou com volume reduzido no Mixer, mesmo com volume geral alto." ),
        q("m16-q06", "melhor_solucao", "Reunião sem som", 2, "perifericos", "decisao", "Antes de culpar o aplicativo da reunião, qual sequência é sensata para áudio sem saída?", ["Verificar volume, saída correta e Mixer de Volume", "Apagar drivers aleatoriamente", "Formatar o disco", "Desativar serviços essenciais"], 0, "Comece por verificações simples e reversíveis: volume, dispositivo selecionado e volume do app." )
      ]
    },
    {
      id: "m17",
      numero: 17,
      modulo: "mod5",
      titulo: "Microfone e Privacidade",
      categoria: "perifericos",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 1100 },
      banco: [
        q("m17-q01", "pratica", "Entrada de áudio", 2, "perifericos", "perifericos", "Em Sistema > Som > Entrada, o que deve ser conferido quando o microfone não capta voz?", ["Dispositivo de entrada selecionado, volume e teste", "Extensão .pdf dos documentos", "Gateway padrão", "Histórico da Lixeira"], 0, "Entrada reúne microfone selecionado, volume e teste. É o primeiro ponto para diagnóstico local.", { instrucao: ["Abra Configurações > Sistema > Som.", "Localize Entrada.", "Observe o microfone selecionado.", "Veja se há opção de teste."], tags: ["pratica", "nova"] }),
        q("m17-q02", "pratica", "Permissão de microfone", 2, "seguranca", "seguranca", "Se o microfone funciona no Windows, mas não em um aplicativo, o que deve ser verificado?", ["Permissão de acesso ao microfone para aplicativos", "Tamanho do arquivo ZIP", "Win + D", "Nome do computador"], 0, "Privacidade e segurança controla quais aplicativos podem acessar o microfone.", { instrucao: ["Abra Configurações.", "Acesse Privacidade e segurança.", "Entre em Microfone.", "Observe permissões de acesso dos aplicativos."], tags: ["pratica", "nova"] }),
        q("m17-q03", "certo_errado", "Privacidade importa", 2, "seguranca", "seguranca", "Permissões de microfone ajudam a equilibrar funcionamento dos aplicativos e privacidade.", ["Certo", "Errado"], 0, "Permitir acesso somente para aplicativos necessários reduz exposição desnecessária." ),
        q("m17-q04", "diagnostico", "Microfone errado", 2, "perifericos", "diagnostico", "Um headset está conectado, mas o Windows usa o microfone do notebook. Qual hipótese verificar?", ["Dispositivo de entrada selecionado", "Data de modificação do arquivo", "DNS público", "Área de trabalho virtual"], 0, "Vários microfones podem estar disponíveis. Selecionar a entrada correta é fundamental." ),
        q("m17-q05", "melhor_solucao", "Aplicativo bloqueado", 2, "seguranca", "decisao", "Um aplicativo confiável precisa de microfone para aula online, mas está sem acesso. Qual solução é adequada?", ["Permitir acesso ao microfone para esse aplicativo específico", "Liberar tudo sem critério", "Desativar o antivírus", "Excluir pastas do sistema"], 0, "O ideal é conceder permissão ao aplicativo necessário, mantendo controle sobre os demais." ),
        q("m17-q06", "identifique_erro", "Volume de entrada zerado", 2, "perifericos", "diagnostico", "O microfone correto está selecionado, mas o teste não mostra movimento. Qual erro simples pode explicar?", ["Volume de entrada muito baixo ou mudo", "Arquivo oculto ativado", "ZIP não extraído", "Alt + Tab pressionado"], 0, "Além do dispositivo certo, o volume de entrada precisa estar adequado." )
      ]
    },
    {
      id: "m18",
      numero: 18,
      modulo: "mod5",
      titulo: "Projetor e Segunda Tela",
      categoria: "perifericos",
      dificuldade: 2,
      etapas: 5,
      descoberta: true,
      desbloqueio: { xp: 1200 },
      banco: [
        q("m18-q01", "pratica", "Menu Projetar", 2, "perifericos", "perifericos", "Quais opções aparecem ao pressionar Win + P?", ["Somente tela do computador, Duplicar, Estender e Somente segunda tela", "Copiar, recortar, colar e desfazer", "CPU, RAM, disco e rede", "IPv4, DNS, gateway e ARP"], 0, "Win + P abre modos de projeção para telas externas.", { instrucao: ["Pressione Win + P.", "Observe as opções de projeção.", "Não altere se estiver usando uma tela importante.", "Volte ao navegador."], tags: ["atalho", "pratica", "nova"] }),
        q("m18-q02", "situacao", "Mesma imagem", 1, "perifericos", "decisao", "Você quer que notebook e projetor mostrem exatamente a mesma imagem. Qual modo escolher?", ["Duplicar", "Estender", "Somente segunda tela", "Somente tela do computador"], 0, "Duplicar espelha a mesma imagem nas duas telas." ),
        q("m18-q03", "situacao", "Apresentador organizado", 2, "perifericos", "produtividade", "Você quer slides no projetor e outra janela no notebook. Qual modo é mais adequado?", ["Estender", "Duplicar", "Somente tela do computador", "Bloquear"], 0, "Estender cria uma área maior, permitindo conteúdos diferentes em cada tela." ),
        q("m18-q04", "diagnostico", "Projetor sem imagem", 2, "perifericos", "diagnostico", "O cabo está conectado, mas o projetor não mostra imagem. Qual verificação inicial é segura?", ["Pressionar Win + P e conferir o modo de projeção", "Apagar drivers sem identificar", "Executar Shift + Delete", "Formatar o disco"], 0, "Win + P é uma verificação rápida e reversível para modo de exibição." ),
        q("m18-q05", "certo_errado", "Estender não espelha", 1, "perifericos", "perifericos", "No modo Estender, as telas podem mostrar conteúdos diferentes.", ["Certo", "Errado"], 0, "Estender amplia a área de trabalho entre monitores." ),
        q("m18-q06", "identifique_erro", "Janela sumiu", 2, "perifericos", "diagnostico", "Após usar Estender, um aluno diz que a janela sumiu. Qual explicação provável?", ["A janela pode estar na outra tela ou fora da área visível esperada", "O arquivo foi deletado", "O DNS parou", "O microfone foi bloqueado"], 0, "Em modo estendido, janelas podem estar em outro monitor. Alternar ou arrastar de volta resolve." )
      ]
    },
    {
      id: "m19",
      numero: 19,
      modulo: "mod5",
      titulo: "Impressão e PDF",
      categoria: "perifericos",
      dificuldade: 2,
      etapas: 5,
      desbloqueio: { xp: 1300 },
      banco: [
        q("m19-q01", "pratica", "Print to PDF", 2, "perifericos", "produtividade", "Ao selecionar Microsoft Print to PDF, o que esse recurso faz?", ["Gera um arquivo PDF em vez de imprimir em papel", "Apaga a impressora física", "Converte o computador para x64", "Mostra o gateway"], 0, "Microsoft Print to PDF cria um arquivo PDF a partir de uma tela de impressão.", { instrucao: ["Abra um documento simples ou página da web.", "Pressione Ctrl + P.", "Selecione Microsoft Print to PDF.", "Cancele se não quiser salvar um arquivo agora."], tags: ["atalho", "pratica"] }),
        q("m19-q02", "situacao", "Páginas específicas", 2, "perifericos", "decisao", "Um documento tem 30 páginas e você precisa imprimir somente 4, 5, 8 e 10. O que configurar?", ["Intervalo/lista de páginas na impressão", "Win + V", "Extensões de arquivo", "nslookup"], 0, "A caixa de impressão permite informar páginas específicas, dependendo do aplicativo." ),
        q("m19-q03", "diagnostico", "Fila presa", 2, "perifericos", "diagnostico", "A impressora não imprime porque há documentos antigos presos. Onde investigar?", ["Fila de impressão", "Área de trabalho virtual", "Resumo do Sistema", "Histórico da área de transferência"], 0, "A fila mostra trabalhos aguardando, pausados ou com erro." ),
        q("m19-q04", "quiz", "Atalho de impressão", 1, "perifericos", "produtividade", "Qual atalho abre a impressão em muitos aplicativos?", ["Ctrl + P", "Win + P", "Ctrl + Shift + Esc", "Win + R"], 0, "Ctrl + P é o atalho comum de impressão. Win + P é projeção de tela.", { tags: ["atalho"] }),
        q("m19-q05", "melhor_solucao", "Economizar papel", 2, "perifericos", "decisao", "Para revisar um documento antes de gastar papel, qual opção pode ajudar?", ["Gerar PDF ou visualizar impressão", "Apagar a pasta do sistema", "Executar arp -a", "Desativar microfone"], 0, "Visualizar e gerar PDF reduzem impressões erradas." ),
        q("m19-q06", "certo_errado", "Paisagem e retrato", 1, "perifericos", "produtividade", "Orientação retrato e paisagem alteram a direção da página impressa.", ["Certo", "Errado"], 0, "Retrato é vertical; paisagem é horizontal. A escolha depende do conteúdo." )
      ]
    },
    {
      id: "m20",
      numero: 20,
      modulo: "mod6",
      titulo: "Central de Suporte",
      categoria: "decisao",
      dificuldade: 3,
      etapas: 7,
      desbloqueio: { xp: 1600, completed: ["m15", "m16", "m18", "m19"] },
      banco: [
        q("m20-q01", "integradora", "08h05: PDF errado", 3, "decisao", "decisao", "O PDF abre em um aplicativo inadequado. Qual ação é mais coerente para resolver sem afetar outros arquivos?", ["Verificar aplicativo padrão para PDF e ajustar se necessário", "Renomear todos os PDFs para .exe", "Apagar a Lixeira", "Executar ping 8.8.8.8"], 0, "Aplicativos padrão controlam com qual programa cada tipo de arquivo abre.", { dicas: ["O problema é associação de tipo de arquivo.", "Procure aplicativos padrão."] }),
        q("m20-q02", "integradora", "08h10: arquivo não encontrado", 3, "decisao", "arquivos", "Um arquivo não é encontrado, mas o usuário lembra que editou ontem. Qual investigação vem primeiro?", ["Pesquisar no Explorador usando nome parcial e data de modificação", "Formatar o computador", "Desativar DNS", "Trocar dispositivo de áudio"], 0, "Use evidências conhecidas: parte do nome, tipo ou data de modificação." ),
        q("m20-q03", "integradora", "08h15: projetor", 3, "decisao", "perifericos", "O projetor está conectado, mas não mostra a apresentação. Qual sequência inicial é segura?", ["Verificar conexão, pressionar Win + P, escolher Duplicar ou Estender e validar", "Excluir drivers desconhecidos, reiniciar, formatar", "Executar cleanmgr e esvaziar Lixeira", "Abrir Winver e renomear o PDF"], 0, "A sequência prioriza verificações reversíveis e diretamente relacionadas à segunda tela." ),
        q("m20-q04", "integradora", "08h20: som no lugar errado", 3, "decisao", "perifericos", "O som saiu no monitor HDMI, mas deveria sair no fone. Qual decisão resolve melhor?", ["Selecionar o fone como saída em Sistema > Som", "Trocar extensão do arquivo de áudio", "Executar tracert google.com", "Criar área de trabalho virtual"], 0, "Saída de som selecionada define o dispositivo de reprodução." ),
        q("m20-q05", "integradora", "08h25: fila de impressão", 3, "decisao", "diagnostico", "A impressora não responde e há documentos presos. Qual ferramenta/local investigar?", ["Fila de impressão", "Histórico da área de transferência", "Winver", "Itens ocultos"], 0, "A fila permite visualizar e tratar trabalhos pendentes ou com erro." ),
        q("m20-q06", "integradora", "08h30: internet por IP", 3, "rede", "diagnostico", "Internet não abre sites. O ping para 8.8.8.8 funciona, mas google.com falha. Qual prioridade?", ["Investigar DNS", "Trocar o modo de projeção", "Apagar arquivos temporários sem análise", "Finalizar processos aleatórios"], 0, "IP funcionando e nome falhando aponta para resolução DNS." ),
        q("m20-q07", "integradora", "08h35: enviar pasta", 3, "arquivos", "decisao", "É necessário enviar uma pasta com vários documentos por e-mail. Qual ação organiza melhor?", ["Compactar a pasta em ZIP e conferir o conteúdo", "Mandar cada arquivo com nome aleatório", "Apagar extensões", "Executar whoami"], 0, "Compactar agrupa os documentos e reduz risco de esquecer algum item." ),
        q("m20-q08", "integradora", "Prioridade de suporte", 3, "decisao", "decisao", "Vários chamados chegaram ao mesmo tempo. Qual critério é mais profissional?", ["Priorizar impacto, urgência e segurança, registrando evidências", "Escolher sempre o chamado mais fácil", "Ignorar problemas de rede", "Fazer mudanças críticas sem avisar"], 0, "Suporte técnico combina prioridade, comunicação e ações seguras.", { dicas: ["Nem todo problema tem o mesmo impacto.", "Evidências ajudam a decidir e comunicar."] })
      ]
    }
  ];

  const EXPEDITION = {
    id: "expedicao",
    titulo: "Expedição Windows",
    dificuldade: 3,
    etapas: 8,
    banco: [
      q("exp-q01", "pratica", "Etapa 1: winver", 2, "diagnostico", "diagnostico", "Qual informação foi confirmada com winver?", ["Versão e compilação do Windows", "Gateway padrão", "Fila de impressão", "Volume por aplicativo"], 0, "winver confirma versão e compilação do Windows.", { instrucao: ["Pressione Win + R.", "Digite winver.", "Pressione Enter.", "Observe a janela Sobre o Windows."], tags: ["comando", "pratica"] }),
      q("exp-q02", "pratica", "Etapa 2: msinfo32", 2, "diagnostico", "diagnostico", "No msinfo32, qual área resume processador, memória e tipo do sistema?", ["Resumo do Sistema", "Aplicativos padrão", "Mixer de Volume", "Lixeira"], 0, "Resumo do Sistema reúne dados principais do computador.", { instrucao: ["Pressione Win + R.", "Digite msinfo32.", "Pressione Enter.", "Observe o painel inicial."], tags: ["comando", "pratica"] }),
      q("exp-q03", "pratica", "Etapa 3: desempenho", 2, "diagnostico", "diagnostico", "Qual guia do Gerenciador de Tarefas mostra CPU, memória, disco e rede?", ["Desempenho", "Histórico de aplicativos", "Detalhes do arquivo", "Projetar"], 0, "Desempenho mostra uso de recursos do computador.", { instrucao: ["Pressione Ctrl + Shift + Esc.", "Abra a guia Desempenho.", "Observe os gráficos.", "Não finalize processos."], tags: ["atalho", "pratica"] }),
      q("exp-q04", "pratica", "Etapa 4: Win + V", 2, "produtividade", "produtividade", "Win + V ajuda principalmente em qual situação?", ["Reutilizar itens copiados recentemente", "Verificar DNS", "Selecionar projetor", "Apagar arquivos temporários"], 0, "Win + V abre o histórico da área de transferência.", { instrucao: ["Copie um texto simples.", "Pressione Win + V.", "Observe o histórico.", "Ative se for solicitado e permitido pelo professor."], tags: ["atalho", "pratica"] }),
      q("exp-q05", "pratica", "Etapa 5: Win + Z", 2, "produtividade", "produtividade", "O que o Win + Z oferece?", ["Layouts de organização de janelas", "Lista de usuários", "Endereço IPv4", "Backup automático"], 0, "Win + Z abre Snap Layouts em janelas compatíveis.", { instrucao: ["Abra uma janela comum.", "Pressione Win + Z.", "Observe as opções de encaixe.", "Volte ao jogo."], tags: ["atalho", "pratica"] }),
      q("exp-q06", "pratica", "Etapa 6: captura", 2, "seguranca", "seguranca", "Por que Win + Shift + S é útil ao enviar evidência de erro?", ["Permite capturar somente a área necessária", "Mostra a senha do Wi-Fi", "Reinstala drivers", "Cria um ZIP"], 0, "Captura seletiva ajuda a proteger dados desnecessários.", { instrucao: ["Pressione Win + Shift + S.", "Observe a ferramenta de captura.", "Cancele com Esc se desejar.", "Volte ao jogo."], tags: ["atalho", "pratica"] }),
      q("exp-q07", "pratica", "Etapa 7: ipconfig", 2, "rede", "rede", "No ipconfig, qual campo indica o endereço do computador na rede?", ["Endereço IPv4", "BIOS", "Extensão do arquivo", "Orientação paisagem"], 0, "Endereço IPv4 é o item que identifica o computador naquela rede.", { instrucao: ["Abra o Prompt.", "Digite ipconfig.", "Pressione Enter.", "Localize Endereço IPv4."], tags: ["comando", "pratica"] }),
      q("exp-q08", "pratica", "Etapa 8: Win + P", 2, "perifericos", "perifericos", "Qual opção do Win + P espelha a mesma imagem no projetor?", ["Duplicar", "Estender", "Somente segunda tela", "Somente tela do computador"], 0, "Duplicar mostra a mesma imagem nas duas telas.", { instrucao: ["Pressione Win + P.", "Observe as opções.", "Não altere se houver risco de atrapalhar sua tela.", "Volte ao jogo."], tags: ["atalho", "pratica"] })
    ]
  };

  /* CONQUISTAS */
  const ACHIEVEMENTS = [
    { id: "primeiro_comando", nome: "Primeiro Comando", desc: "Acertou uma missão que usa comando real.", test: p => p.commandAnswers >= 1 },
    { id: "atalho_humano", nome: "Atalho Humano", desc: "Acertou 10 questões marcadas como atalho.", test: p => p.shortcutCorrect >= 10 },
    { id: "detetive_digital", nome: "Detetive Digital", desc: "Concluiu Detetive de Arquivos com 100% em alguma tentativa.", test: p => p.completedMissions.m04?.bestAccuracy === 100 },
    { id: "sem_perder_fio", nome: "Sem Perder o Fio", desc: "Chegou a 10 acertos consecutivos.", test: p => p.bestStreak >= 10 },
    { id: "conectado", nome: "Conectado", desc: "Concluiu as duas missões de rede.", test: p => p.completedMissions.m14 && p.completedMissions.m15 },
    { id: "mestre_janelas", nome: "Mestre das Janelas", desc: "Concluiu multitarefa, áreas virtuais e capturas.", test: p => p.completedMissions.m07 && p.completedMissions.m08 && p.completedMissions.m09 },
    { id: "suporte_plantao", nome: "Suporte de Plantão", desc: "Concluiu a Central de Suporte.", test: p => p.completedMissions.m20 },
    { id: "perfeccionista", nome: "Perfeccionista", desc: "Concluiu qualquer missão sem erros.", test: p => Object.values(p.completedMissions).some(m => m.bestAccuracy === 100) },
    { id: "explorador", nome: "Explorador", desc: "Completou 10 missões.", test: p => countCompleted(p) >= 10 },
    { id: "especialista", nome: "Especialista", desc: "Completou as 20 missões principais.", test: p => countCompleted(p) >= 20 },
    { id: "expedicao_real", nome: "Expedição Real", desc: "Concluiu a Expedição Windows.", test: p => Boolean(p.expeditionComplete) },
    { id: "rede_em_foco", nome: "Rede em Foco", desc: "Acertou 5 desafios de rede.", test: p => p.networkCorrect >= 5 },
    { id: "arquivista", nome: "Arquivista", desc: "Concluiu Arquivos e Detetive de Arquivos.", test: p => p.completedMissions.m03 && p.completedMissions.m04 },
    { id: "profissional_seguro", nome: "Profissional Seguro", desc: "Alcançou 80% em Segurança com pelo menos 5 registros.", test: p => competencyPercent(p, "seguranca") >= 80 && p.competencies.seguranca.total >= 5 },
    { id: "nivel_3", nome: "Operador Promovido", desc: "Chegou ao nível 3.", test: p => getLevel(p.xp).nivel >= 3 },
    { id: "central_ferramentas", nome: "Central de Ferramentas", desc: "Acertou pelo menos 5 situações no simulador de ferramentas.", test: p => p.toolSimulatorCorrect >= 5 },
    { id: "chamados_resolvidos", nome: "Chamados Resolvidos", desc: "Resolveu 5 chamados simulados.", test: p => p.ticketsResolved >= 5 }
  ];

  /* VOCÊ SABIA */
  const CONCEPTS = [
    ["Extensão de arquivo", "É a parte final do nome, como .pdf, .docx ou .zip.", "relatorio.pdf indica um arquivo PDF, mas trocar o nome não converte o formato real."],
    ["Área de transferência", "É a memória temporária usada por copiar, recortar e colar.", "Ctrl + C copia um texto para ser colado com Ctrl + V."],
    ["Histórico da área de transferência", "Guarda itens copiados recentemente quando ativado.", "Win + V permite escolher um texto copiado antes."],
    ["Arquivo oculto", "É um item marcado para não aparecer na visualização comum.", "A opção Itens ocultos permite investigar arquivos escondidos."],
    ["ZIP", "Formato que agrupa e compacta arquivos.", "Uma pasta com relatórios pode virar um arquivo .zip para envio."],
    ["PDF", "Formato pensado para preservar aparência de documentos.", "Microsoft Print to PDF cria um PDF a partir da impressão."],
    ["IPv4", "Endereço numérico usado pelo computador na rede.", "ipconfig mostra o Endereço IPv4 do adaptador conectado."],
    ["Gateway", "Dispositivo de saída da rede local para outras redes.", "Em casa ou laboratório, costuma ser o roteador."],
    ["DNS", "Serviço que converte nomes como google.com em endereços IP.", "Se IP responde e nome falha, investigue DNS."],
    ["Ping", "Teste simples de conectividade por pacotes ICMP.", "ping 127.0.0.1 testa a pilha local de rede."],
    ["Processo", "Programa ou componente em execução.", "O Gerenciador de Tarefas mostra processos e consumo de recursos."],
    ["CPU", "Unidade de processamento principal.", "CPU alta por muito tempo pode explicar lentidão."],
    ["RAM", "Memória usada por programas abertos.", "A guia Desempenho mostra uso de memória."],
    ["SSD", "Unidade de armazenamento rápida baseada em memória flash.", "Um SSD costuma abrir programas mais rápido que HDD."],
    ["HDD", "Disco rígido mecânico tradicional.", "Pode ter alta capacidade, mas geralmente é mais lento que SSD."],
    ["Driver", "Software que permite ao Windows conversar com hardware.", "Impressoras, áudio e vídeo dependem de drivers adequados."],
    ["Aplicativo padrão", "Programa escolhido para abrir um tipo de arquivo.", "PDF pode abrir no Edge, Adobe Reader ou outro leitor definido."],
    ["Área de trabalho virtual", "Espaço separado para organizar janelas na mesma sessão.", "Win + Ctrl + D cria uma nova área virtual."],
    ["Snap Layouts", "Recurso para encaixar janelas em posições da tela.", "Win + Z mostra layouts disponíveis."],
    ["Permissões de microfone", "Controle de privacidade para acesso de aplicativos.", "Um app pode precisar de permissão para usar o microfone."],
    ["Duplicar tela", "Mostra a mesma imagem em duas telas.", "É comum para projetar a mesma apresentação no notebook e projetor."],
    ["Estender tela", "Aumenta a área de trabalho entre monitores.", "Slides podem ficar no projetor e anotações no notebook."],
    ["Fila de impressão", "Lista de trabalhos aguardando impressão.", "Documentos presos podem bloquear novas impressões."],
    ["Print to PDF", "Impressora virtual que gera arquivo PDF.", "Use Ctrl + P e escolha Microsoft Print to PDF."],
    ["Backup", "Cópia de segurança guardada em local confiável.", "Compactar em ZIP ajuda organização, mas não substitui backup."]
  ].map((item, index) => ({ id: `concept-${index + 1}`, nome: item[0], explicacao: item[1], exemplo: item[2] }));

  /* SIMULADORES */
  const TOOL_SITUATIONS = [
    { id: "tool-01", texto: "Um programa travou e aparece como Não está respondendo.", correta: "Gerenciador de Tarefas", explicacao: "Ele permite localizar e finalizar o aplicativo travado com critério." },
    { id: "tool-02", texto: "Você não encontra um documento, mas lembra parte do nome.", correta: "Explorador de Arquivos", explicacao: "A pesquisa do Explorador ajuda por nome, tipo e data." },
    { id: "tool-03", texto: "Você quer descobrir o IPv4 do computador.", correta: "Prompt: ipconfig", explicacao: "ipconfig mostra o Endereço IPv4 do adaptador conectado." },
    { id: "tool-04", texto: "Precisa verificar dispositivos instalados.", correta: "Gerenciador de Dispositivos", explicacao: "devmgmt.msc abre a lista de dispositivos e drivers." },
    { id: "tool-05", texto: "Precisa organizar duas janelas lado a lado.", correta: "Snap Layouts", explicacao: "Win + Z e as setas com Win organizam janelas." },
    { id: "tool-06", texto: "Precisa salvar uma página como PDF.", correta: "Microsoft Print to PDF", explicacao: "Ctrl + P e Microsoft Print to PDF geram um arquivo PDF." },
    { id: "tool-07", texto: "O som saiu no monitor, mas deveria sair no fone.", correta: "Configurações de Som", explicacao: "Sistema > Som permite selecionar saída." },
    { id: "tool-08", texto: "Precisa projetar a mesma imagem na segunda tela.", correta: "Win + P", explicacao: "Win + P permite escolher Duplicar." },
    { id: "tool-09", texto: "Quer verificar histórico de estabilidade do Windows.", correta: "Monitor de Confiabilidade", explicacao: "perfmon /rel abre o relatório de confiabilidade." },
    { id: "tool-10", texto: "Quer ver detalhes de CPU, memória, disco e rede.", correta: "Gerenciador de Tarefas", explicacao: "A guia Desempenho reúne gráficos dos recursos." }
  ];

  const TOOL_CARDS = ["Gerenciador de Tarefas", "Explorador de Arquivos", "Prompt: ipconfig", "Gerenciador de Dispositivos", "Snap Layouts", "Microsoft Print to PDF", "Configurações de Som", "Win + P", "Monitor de Confiabilidade", "Área de Transferência"];

  const TICKETS = [
    { id: "014", titulo: "Projetor sem imagem", descricao: "Meu notebook está conectado ao projetor, mas somente meu computador mostra imagem.", passos: ["Verificar cabo e entrada do projetor", "Pressionar Win + P", "Escolher Duplicar ou Estender conforme objetivo", "Validar a imagem na segunda tela"], distratores: ["Esvaziar Lixeira", "Executar whoami"] },
    { id: "021", titulo: "PDF abre errado", descricao: "Todo PDF abre em um aplicativo que não uso na aula.", passos: ["Confirmar que é um arquivo PDF", "Abrir aplicativos padrão", "Selecionar leitor adequado para PDF", "Testar abrindo o arquivo novamente"], distratores: ["Executar ping 8.8.8.8", "Alterar volume do microfone"] },
    { id: "033", titulo: "Documento sumiu", descricao: "Não encontro um relatório editado ontem.", passos: ["Abrir Explorador", "Pesquisar por nome parcial ou tipo", "Filtrar ou ordenar por data de modificação", "Conferir Lixeira se houver suspeita de exclusão"], distratores: ["Desativar DNS", "Usar Win + P"] },
    { id: "047", titulo: "Sem internet por nome", descricao: "O IP 8.8.8.8 responde, mas sites por nome não abrem.", passos: ["Confirmar conectividade por IP", "Testar nome de site", "Investigar DNS com nslookup", "Registrar evidências para suporte"], distratores: ["Compactar a pasta", "Mudar para paisagem"] },
    { id: "058", titulo: "Som no dispositivo errado", descricao: "A reunião começou e o áudio saiu no monitor.", passos: ["Abrir Sistema > Som", "Selecionar saída correta", "Conferir volume geral", "Conferir Mixer de Volume se necessário"], distratores: ["Executar tracert", "Mostrar itens ocultos"] },
    { id: "062", titulo: "Microfone bloqueado", descricao: "O microfone funciona no teste do Windows, mas não no aplicativo da aula.", passos: ["Conferir microfone de entrada", "Abrir Privacidade e segurança > Microfone", "Permitir acesso ao aplicativo confiável", "Testar novamente no aplicativo"], distratores: ["Criar ZIP", "Usar cleanmgr"] },
    { id: "075", titulo: "Impressora parada", descricao: "A impressora não imprime e há documentos aguardando.", passos: ["Abrir fila de impressão", "Identificar trabalhos presos", "Pausar/cancelar item problemático se autorizado", "Enviar teste simples"], distratores: ["Executar winver", "Criar área virtual"] },
    { id: "081", titulo: "Pouco espaço em disco", descricao: "O disco C está quase cheio.", passos: ["Abrir Armazenamento", "Ver categorias de uso", "Analisar temporários por ferramenta do Windows", "Mover ou remover arquivos pessoais com critério"], distratores: ["Apagar System32", "Remover drivers aleatórios"] },
    { id: "096", titulo: "Aplicativo travado", descricao: "Um programa conhecido parou de responder.", passos: ["Aguardar alguns segundos", "Abrir Gerenciador de Tarefas", "Selecionar o aplicativo travado", "Finalizar tarefa se não houver recuperação"], distratores: ["Finalizar processos desconhecidos", "Formatar o disco"] },
    { id: "108", titulo: "Enviar pasta", descricao: "Preciso mandar vários documentos de um projeto por e-mail.", passos: ["Conferir arquivos da pasta", "Compactar para ZIP", "Abrir o ZIP para verificar conteúdo", "Anexar o ZIP correto"], distratores: ["Trocar extensão para .pdf", "Executar arp -a"] }
  ];

  const SUPPLEMENTAL_ROWS = [
    [1, "pratica", "Abrindo o Explorador", 1, "windows", "windows", "O que deve abrir?", "Explorador de Arquivos", ["Configurações do Windows", "Gerenciador de Tarefas", "Central de Segurança"], "Win + E abre o Explorador de Arquivos.", ["Pressione Win + E.", "Observe qual janela abriu."], ["atalho", "pratica"]],
    [2, "pratica", "Configurações", 1, "windows", "windows", "Qual área deve ser aberta?", "Configurações", ["Explorador", "Executar", "Pesquisa"], "Win + I abre Configurações.", ["Pressione Win + I.", "Observe a área aberta."], ["atalho", "pratica"]],
    [3, "pratica", "Janela Executar", 1, "windows", "windows", "Qual recurso apareceu?", "Executar", ["Terminal", "Pesquisa", "Painel rápido"], "Win + R abre a janela Executar.", ["Pressione Win + R.", "Observe a janela sem executar comandos."], ["atalho", "pratica"]],
    [4, "pratica", "Descobrindo a versão", 1, "diagnostico", "diagnostico", "Qual informação é o foco dessa janela?", "Versão do Windows", ["Estado da rede", "Uso da memória", "Espaço em disco"], "winver mostra versão, edição e compilação do Windows.", ["Pressione Win + R.", "Digite winver.", "Pressione Enter."], ["comando", "pratica"]],
    [5, "pratica", "Informações do Sistema", 2, "diagnostico", "diagnostico", "Qual ferramenta foi aberta?", "Informações do Sistema", ["Gerenciador de Disco", "Monitor de Recursos", "Segurança do Windows"], "msinfo32 abre Informações do Sistema.", ["Pressione Win + R.", "Digite msinfo32.", "Localize processador, memória, fabricante, modelo e tipo do sistema."], ["comando", "pratica"]],
    [6, "investigacao", "Tipo do Sistema", 2, "diagnostico", "diagnostico", "O que um valor contendo x64 normalmente indica?", "Arquitetura de 64 bits", ["Memória de 64 GB", "Disco de 64 setores", "Processador de 64 núcleos"], "x64 indica arquitetura de 64 bits.", ["Abra msinfo32.", "Localize Tipo do Sistema."], ["pratica"]],
    [7, "pratica", "Systeminfo", 2, "diagnostico", "diagnostico", "Qual opção melhor descreve o resultado?", "Resumo textual do sistema", ["Lista somente de arquivos", "Painel gráfico da CPU", "Histórico do navegador"], "systeminfo mostra várias informações do sistema em texto.", ["Abra o Prompt.", "Digite systeminfo.", "Aguarde o relatório."], ["comando", "pratica"]],
    [8, "pratica", "Nome do computador", 1, "diagnostico", "windows", "O resultado representa:", "Nome do computador", ["Nome do usuário", "Nome do roteador", "Nome do domínio web"], "hostname informa o nome local da máquina.", ["Abra o Prompt.", "Digite hostname."], ["comando", "pratica"]],
    [9, "pratica", "Usuário atual", 1, "seguranca", "seguranca", "O resultado identifica principalmente:", "Usuário da sessão", ["Fabricante do computador", "Endereço da rede", "Versão do Windows"], "whoami mostra a conta autenticada.", ["Abra o Prompt.", "Digite whoami."], ["comando", "pratica"]],
    [10, "pratica", "Nova pasta", 1, "arquivos", "arquivos", "O que ocorreu?", "Nova pasta foi criada", ["Arquivo foi copiado", "Janela foi minimizada", "Pesquisa foi iniciada"], "Ctrl + Shift + N cria uma nova pasta.", ["Abra uma pasta.", "Pressione Ctrl + Shift + N."], ["atalho", "pratica"]],
    [11, "situacao", "Copiar ou mover", 1, "arquivos", "arquivos", "Um documento precisa permanecer na pasta original e também existir em outra pasta. Qual ação usar?", "Copiar e colar", ["Recortar e colar", "Excluir e restaurar", "Renomear e mover"], "Copiar mantém o original e cria cópia no destino."],
    [12, "situacao", "Recortar", 1, "arquivos", "arquivos", "O arquivo está na pasta errada e deve sair de lá para outra pasta. Qual é a melhor opção?", "Recortar e colar", ["Copiar e manter", "Criar atalho", "Compactar arquivo"], "Recortar e colar move o arquivo."],
    [13, "aconteceria", "Desfazer", 1, "produtividade", "produtividade", "Você acabou de mover um arquivo para a pasta errada. Qual atalho pode desfazer a operação recente?", "Ctrl + Z", ["Ctrl + A", "Ctrl + X", "Ctrl + P"], "Ctrl + Z desfaz muitas ações recentes."],
    [14, "aconteceria", "Selecionar todos", 1, "arquivos", "arquivos", "Em uma pasta, o que acontece ao pressionar Ctrl + A?", "Todos os itens são selecionados", ["Apenas pastas são selecionadas", "A janela atual é fechada", "Os arquivos são arquivados"], "Ctrl + A seleciona todos os itens no contexto ativo."],
    [15, "pratica", "Extensões", 2, "arquivos", "arquivos", "O que muda?", "Extensões passam a aparecer", ["Arquivos ocultos são excluídos", "Pastas são compactadas", "Programas padrão mudam"], "As extensões ajudam a reconhecer o tipo real do arquivo.", ["Explorador > Exibir > Mostrar.", "Ative Extensões de nomes de arquivos."], ["pratica"]],
    [16, "pratica", "Arquivos ocultos", 2, "arquivos", "seguranca", "Qual é o efeito esperado?", "Mostrar itens marcados como ocultos", ["Apagar itens sem extensão", "Exibir somente documentos", "Mostrar apenas arquivos recentes"], "Itens ocultos exibe arquivos com atributo oculto.", ["Explorador > Exibir > Mostrar.", "Ative Itens ocultos."], ["pratica"]],
    [17, "investigacao", "Pesquisa por PDF", 2, "arquivos", "arquivos", "Qual é a finalidade dessa pesquisa?", "Localizar arquivos PDF", ["Converter tudo para PDF", "Excluir documentos PDF", "Compactar os PDFs encontrados"], "*.pdf procura arquivos com extensão PDF.", ["Abra uma pasta.", "Pesquise por *.pdf."], ["pratica"]],
    [18, "situacao", "Data de modificação", 2, "arquivos", "diagnostico", "Há quatro arquivos com nomes parecidos. Você deseja identificar qual foi modificado por último. O que deve observar?", "Data de modificação", ["Cor do ícone", "Posição na pasta", "Tipo de papel"], "Data de modificação indica a última alteração."],
    [19, "pratica", "Restauração", 1, "arquivos", "arquivos", "Para onde ele deve retornar?", "Local original", ["Área de Trabalho", "Pasta Downloads", "Pasta Documentos"], "A Lixeira restaura o item para o local de origem.", ["Crie um arquivo de teste.", "Exclua normalmente.", "Abra a Lixeira e restaure."], ["pratica"]],
    [20, "melhor_solucao", "Shift + Delete", 2, "arquivos", "seguranca", "Qual é o principal cuidado com Shift + Delete?", "Pode ignorar a Lixeira", ["Cria uma cópia do arquivo", "Compacta antes de apagar", "Move para Documentos"], "Shift + Delete pode excluir sem passar pela Lixeira."],
    [21, "pratica", "Win + V", 2, "produtividade", "produtividade", "O que pode ser exibido, se o recurso estiver ativo?", "Histórico da área de transferência", ["Lista de discos instalados", "Histórico de atualizações", "Aplicativos em execução"], "Win + V mostra itens copiados recentemente.", ["Copie três textos diferentes.", "Pressione Win + V."], ["atalho", "pratica", "nova"]],
    [22, "quiz", "Fixar item no Win + V", 2, "produtividade", "produtividade", "Para que serve fixar um item no histórico?", "Mantê-lo disponível no histórico", ["Transformá-lo em arquivo ZIP", "Enviá-lo automaticamente por e-mail", "Criar atalho na Área de Trabalho"], "Fixar ajuda a manter um item importante no histórico."],
    [23, "pratica", "Snap Layouts", 2, "produtividade", "produtividade", "Qual recurso aparece?", "Layouts de organização de janelas", ["Histórico da área de transferência", "Menu de opções de energia", "Lista de redes disponíveis"], "Win + Z abre layouts para organizar janelas.", ["Abra uma janela.", "Pressione Win + Z."], ["atalho", "pratica", "nova"]],
    [24, "situacao", "Duas janelas", 2, "produtividade", "produtividade", "Você precisa ler um PDF enquanto escreve em outro programa. Qual recurso ajuda?", "Organizar janelas lado a lado", ["Ativar modo avião", "Limpar arquivos temporários", "Alterar aplicativo padrão"], "Janelas lado a lado melhoram consulta e escrita simultâneas."],
    [25, "aconteceria", "Alt + Tab", 1, "produtividade", "produtividade", "Qual é a principal função de Alt + Tab?", "Alternar aplicativos abertos", ["Criar uma nova pasta", "Abrir a impressão", "Bloquear a sessão"], "Alt + Tab alterna entre janelas abertas.", null, ["atalho"]],
    [26, "pratica", "Nova área de trabalho", 2, "produtividade", "produtividade", "O que deve ocorrer?", "Nova área de trabalho virtual", ["Novo documento é criado", "Disco é desconectado", "Área de transferência é limpa"], "Win + Ctrl + D cria outra área de trabalho virtual.", ["Pressione Win + Ctrl + D.", "Observe a nova área virtual."], ["atalho", "pratica", "nova"]],
    [27, "aconteceria", "Trocar áreas virtuais", 2, "produtividade", "produtividade", "Qual ação o atalho Win + Ctrl + direita realiza?", "Alterna área de trabalho virtual", ["Move arquivo para outra pasta", "Maximiza a janela atual", "Abre Configurações de Tela"], "Win + Ctrl + setas navega entre áreas virtuais.", null, ["atalho"]],
    [28, "pratica", "Captura parcial", 2, "produtividade", "produtividade", "Qual tarefa esse recurso facilita?", "Capturar parte da tela", ["Compartilhar impressora", "Criar uma pasta", "Verificar endereço IP"], "Win + Shift + S permite capturar uma região da tela.", ["Pressione Win + Shift + S.", "Observe a ferramenta."], ["atalho", "pratica"]],
    [29, "melhor_solucao", "Privacidade na captura", 2, "seguranca", "seguranca", "Você precisa enviar ao suporte somente uma mensagem de erro, mas a tela possui dados de cliente. Qual escolha é melhor?", "Capturar somente a área necessária", ["Capturar a tela inteira", "Fotografar todo o monitor", "Copiar todos os dados da tela"], "Capturar só a área necessária reduz exposição de dados."],
    [30, "pratica", "ZIP", 2, "arquivos", "arquivos", "O arquivo ZIP:", "Agrupa arquivos em um pacote", ["Exclui os arquivos originais", "Converte arquivos em PDF", "Instala os arquivos no Windows"], "ZIP agrupa arquivos em um pacote compactado.", ["Crie uma pasta com três arquivos.", "Compacte em ZIP."], ["pratica"]],
    [31, "melhor_solucao", "Extração", 2, "arquivos", "arquivos", "Qual é a ação adequada antes de editar vários arquivos recebidos em ZIP?", "Extrair para uma pasta", ["Renomear o ZIP para DOCX", "Excluir o arquivo compactado", "Alterar a extensão para PDF"], "Extrair evita editar arquivos ainda dentro do pacote."],
    [32, "investigacao", "Espaço em disco", 1, "diagnostico", "diagnostico", "Onde normalmente é possível visualizar espaço livre?", "Unidade de armazenamento", ["Barra de pesquisa", "Lixeira", "Menu de contexto"], "Em Este Computador, as unidades mostram espaço total e livre.", ["Abra Este Computador no Explorador.", "Observe as unidades."], ["pratica"]],
    [33, "pratica", "Armazenamento", 2, "diagnostico", "diagnostico", "O que essa área ajuda a identificar?", "Categorias que ocupam espaço", ["Senhas salvas no navegador", "Temperatura da CPU", "Mensagens de e-mail antigas"], "Armazenamento separa o uso por categorias.", ["Abra Configurações > Sistema > Armazenamento."], ["pratica"]],
    [34, "pratica", "Cleanmgr", 1, "diagnostico", "diagnostico", "Qual ferramenta é aberta?", "Limpeza de Disco", ["Gerenciamento de Disco", "Monitor de Recursos", "Histórico de Arquivos"], "cleanmgr abre a Limpeza de Disco clássica.", ["Pressione Win + R.", "Digite cleanmgr."], ["comando", "pratica"]],
    [35, "pratica", "Gerenciador de Tarefas", 1, "diagnostico", "diagnostico", "Qual recurso é aberto?", "Gerenciador de Tarefas", ["Central de Segurança", "Explorador de Arquivos", "Gerenciamento de Disco"], "Ctrl + Shift + Esc abre o Gerenciador de Tarefas.", ["Pressione Ctrl + Shift + Esc."], ["atalho", "pratica"]],
    [36, "investigacao", "Ordenando por memória", 2, "diagnostico", "diagnostico", "O que normalmente acontece com a lista?", "É ordenada pelo consumo de memória", ["Todos os programas são encerrados", "A memória é liberada automaticamente", "Os processos são movidos de pasta"], "O cabeçalho Memória ordena processos pelo consumo.", ["Abra o Gerenciador de Tarefas.", "Clique em Memória."], ["pratica"]],
    [37, "diagnostico", "CPU alta", 2, "diagnostico", "diagnostico", "Um programa conhecido está utilizando muita CPU. Qual é a primeira atitude mais adequada?", "Investigar o processo e sua atividade", ["Excluir arquivos do Windows", "Desativar o antivírus", "Formatar imediatamente"], "CPU alta pede investigação antes de ação drástica."],
    [38, "situacao", "Programa travado", 2, "diagnostico", "decisao", "Um aplicativo conhecido está Não respondendo. Depois de aguardar e tentar fechar normalmente, qual recurso pode ajudar?", "Gerenciador de Tarefas", ["Gerenciamento de Disco", "Limpeza de Disco", "Editor de Registro"], "O Gerenciador de Tarefas pode finalizar um aplicativo travado conhecido."],
    [39, "investigacao", "Inicialização", 2, "diagnostico", "produtividade", "O que essa seção mostra?", "Programas iniciados com o Windows", ["Arquivos apagados recentemente", "Redes salvas no computador", "Impressoras desconectadas"], "Aplicativos de Inicialização mostra programas que iniciam com o Windows.", ["Abra Gerenciador de Tarefas.", "Entre em Aplicativos de Inicialização."], ["pratica"]],
    [40, "melhor_solucao", "Não desabilitar tudo", 2, "seguranca", "decisao", "Um programa apresenta Alto impacto na inicialização. Isso significa automaticamente que deve ser desabilitado?", "Não, é necessário avaliar sua função", ["Sim, sempre deve ser removido", "Sim, se possuir ícone colorido", "Não, porque não pode ser alterado"], "Impacto alto exige avaliação, não remoção automática."],
    [41, "pratica", "Ipconfig", 2, "rede", "rede", "Qual informação pode ser encontrada?", "Configuração IP básica", ["Temperatura da CPU", "Espaço do disco", "Lista de impressoras"], "ipconfig mostra informações IP básicas.", ["Abra cmd.", "Execute ipconfig."], ["comando", "pratica"]],
    [42, "comando", "Ipconfig /all", 2, "rede", "rede", "Qual é a principal diferença?", "Mostra detalhes adicionais da rede", ["Reinicia automaticamente o roteador", "Testa velocidade da internet", "Limpa todas as conexões"], "ipconfig /all exibe campos extras como DNS e DHCP.", null, ["comando"]],
    [43, "diagnostico", "Gateway", 2, "rede", "rede", "No contexto de uma rede local, o gateway geralmente representa:", "Saída para outras redes", ["Nome do computador", "Pasta compartilhada", "Aplicativo de segurança"], "O gateway costuma encaminhar tráfego para fora da rede local."],
    [44, "pratica", "Loopback", 2, "rede", "diagnostico", "Esse endereço é normalmente utilizado para testar:", "Comunicação TCP/IP local", ["Servidor DNS externo", "Velocidade contratada", "Impressora de rede"], "127.0.0.1 testa a pilha TCP/IP local.", ["Abra cmd.", "Execute ping 127.0.0.1."], ["comando", "pratica"]],
    [45, "diagnostico", "Ping no gateway", 2, "rede", "diagnostico", "Você deseja verificar comunicação entre computador e roteador. Qual teste é adequado?", "ping no gateway", ["cleanmgr", "winver", "tasklist"], "Ping no gateway testa comunicação com o roteador."],
    [46, "diagnostico", "Internet por IP", 2, "rede", "rede", "Gateway responde. Você quer testar conectividade externa sem depender de nomes. Qual exemplo é apropriado?", "ping 8.8.8.8", ["ping localhost.com", "msinfo32", "diskmgmt.msc"], "Ping em IP externo testa conectividade sem DNS.", null, ["comando"]],
    [47, "diagnostico", "Possível DNS", 3, "rede", "diagnostico", "ping 8.8.8.8 tem sucesso, mas ping google.com falha na resolução. Qual componente merece investigação?", "DNS", ["Monitor", "Impressora", "Memória RAM"], "IP funcionando e nome falhando aponta para DNS.", null, [], ["O IP externo respondeu.", "A falha aparece ao converter nome em endereço."]],
    [48, "pratica", "Nslookup", 3, "rede", "rede", "Qual é a finalidade principal?", "Consultar resolução de nomes", ["Verificar memória disponível", "Limpar arquivos temporários", "Listar processos do Windows"], "nslookup consulta resolução DNS.", ["Abra cmd.", "Execute nslookup google.com."], ["comando", "pratica"]],
    [49, "pratica", "Tracert", 3, "rede", "diagnostico", "Qual informação é apresentada?", "Saltos até o destino", ["Arquivos modificados", "Serviços inicializados", "Impressoras disponíveis"], "tracert mostra o caminho em saltos até o destino.", ["Abra cmd.", "Execute tracert google.com."], ["comando", "pratica"]],
    [50, "situacao", "Áudio", 2, "perifericos", "perifericos", "O monitor HDMI foi selecionado como saída. O usuário deseja ouvir nas caixas do computador. Qual configuração deve revisar?", "Dispositivo de saída", ["Dispositivo de entrada", "Tema do Windows", "Aplicativo padrão"], "A saída de som define onde o áudio será reproduzido."],
    [51, "diagnostico", "Mixer de Volume", 2, "perifericos", "diagnostico", "Qual problema o Mixer de Volume pode ajudar a resolver?", "Um aplicativo está sem som", ["Um arquivo não foi encontrado", "O disco está sem letra", "A rede não recebeu IP"], "O Mixer ajusta volume por aplicativo."],
    [52, "pratica", "Microfone", 2, "perifericos", "perifericos", "Qual dispositivo deve ser verificado?", "Microfone selecionado", ["Impressora padrão", "Monitor principal", "Unidade de backup"], "Entrada mostra o microfone ativo.", ["Abra Configurações > Sistema > Som > Entrada."], ["pratica"]],
    [53, "diagnostico", "Permissão do microfone", 2, "seguranca", "seguranca", "O microfone funciona no teste do Windows, mas determinado aplicativo não consegue usá-lo. Qual área também deve ser conferida?", "Privacidade e segurança", ["Gerenciamento de Disco", "Histórico da Área de Transferência", "Limpeza de Disco"], "Permissões de microfone ficam em Privacidade e segurança."],
    [54, "pratica", "Win + P", 1, "perifericos", "perifericos", "Qual configuração aparece?", "Modos de projeção", ["Configurações de áudio", "Histórico de cópias", "Aplicativos padrão"], "Win + P abre modos de projeção.", ["Pressione Win + P.", "Observe as opções."], ["atalho", "pratica"]],
    [55, "situacao", "Duplicar", 1, "perifericos", "decisao", "Notebook e projetor devem mostrar exatamente a mesma imagem. Qual modo utilizar?", "Duplicar", ["Estender", "Somente segunda tela", "Somente tela do computador"], "Duplicar espelha a mesma imagem nas telas."],
    [56, "situacao", "Estender", 2, "perifericos", "produtividade", "Você quer apresentar slides no projetor e manter outras janelas no notebook. Qual modo é mais adequado?", "Estender", ["Duplicar", "Bloquear", "Minimizar"], "Estender permite conteúdos diferentes entre telas."],
    [57, "aconteceria", "Impressão", 1, "perifericos", "produtividade", "Qual ação normalmente é iniciada ao pressionar Ctrl + P?", "Impressão", ["Pesquisa", "Propriedades", "Compartilhamento"], "Ctrl + P abre impressão em muitos aplicativos.", null, ["atalho"]],
    [58, "pratica", "Print to PDF", 2, "perifericos", "produtividade", "O que ocorre?", "É gerado um arquivo PDF", ["A impressora é instalada", "O Word é convertido em imagem", "O arquivo vai para a Lixeira"], "Microsoft Print to PDF gera arquivo PDF.", ["Abra um documento ou página.", "Pressione Ctrl + P.", "Selecione Microsoft Print to PDF."], ["pratica"]],
    [59, "situacao", "Páginas específicas", 2, "perifericos", "decisao", "Um documento tem 30 páginas. Precisamos imprimir 4, 5, 8 e 10. Qual configuração deve ser utilizada?", "Intervalo personalizado de páginas", ["Número de cópias", "Impressora padrão", "Orientação automática"], "O intervalo personalizado informa páginas específicas."],
    [60, "melhor_solucao", "Retrato ou paisagem", 2, "perifericos", "decisao", "Uma tabela larga está sendo cortada na impressão. Qual alteração pode ajudar?", "Orientação paisagem", ["Alterar usuário", "Limpar o cache DNS", "Ativar itens ocultos"], "Paisagem usa a página na horizontal."],
    [61, "diagnostico", "Arquivo não encontrado", 3, "arquivos", "diagnostico", "O usuário salvou ontem um PDF, mas não lembra o nome completo. Qual sequência é mais adequada?", "Abrir Explorador, pesquisar *.pdf e ordenar por data", ["Abrir Gerenciador de Tarefas e ordenar por memória", "Abrir msinfo32 e pesquisar pelo nome do arquivo", "Abrir Segurança do Windows e iniciar verificação"], "Busca por tipo combinada com data usa as pistas conhecidas.", null, [], ["O tipo é PDF.", "A data é uma evidência importante."]],
    [62, "diagnostico", "Pendrive não aparece", 3, "diagnostico", "diagnostico", "Um pendrive conectado não aparece no Explorador. Depois da conexão física, qual ferramenta pode mostrar se o disco foi detectado?", "Gerenciamento de Disco", ["Limpeza de Disco", "Área de Transferência", "Aplicativos Padrão"], "diskmgmt.msc abre Gerenciamento de Disco.", null, ["comando"]],
    [63, "ferramenta", "Dispositivo com alerta", 2, "diagnostico", "diagnostico", "Qual ferramenta permite verificar dispositivos com problemas?", "Gerenciador de Dispositivos", ["Monitor de Confiabilidade", "Gerenciador de Impressão", "Histórico da Área de Transferência"], "devmgmt.msc abre o Gerenciador de Dispositivos.", null, ["comando"]],
    [64, "ferramenta", "Erro de ontem", 3, "diagnostico", "diagnostico", "Um aplicativo travou ontem, mas hoje funciona. Qual recurso pode ajudar a investigar o histórico?", "Monitor de Confiabilidade", ["Limpeza de Disco", "Snap Layouts", "Aplicativos Padrão"], "perfmon /rel abre o Monitor de Confiabilidade.", null, ["comando"]],
    [65, "tempo", "Reunião em 5 minutos", 2, "perifericos", "decisao", "Projetor conectado, imagem não aparece. Qual deve ser uma das primeiras verificações?", "Pressionar Win + P", ["Executar cleanmgr", "Abrir msinfo32", "Executar nslookup"], "Win + P verifica rapidamente o modo de projeção.", null, ["atalho"]],
    [66, "diagnostico", "Áudio no lugar errado", 2, "perifericos", "diagnostico", "O projetor funciona, mas o áudio passou para HDMI. Qual decisão é mais adequada?", "Conferir dispositivo de saída", ["Reinstalar o Windows", "Excluir o driver de rede", "Alterar a resolução da tela"], "Áudio por HDMI pode ser corrigido selecionando a saída correta."],
    [67, "diagnostico", "Microfone bloqueado", 2, "seguranca", "seguranca", "O Windows reconhece o microfone, mas um aplicativo não tem acesso. Qual hipótese é plausível?", "Permissão de microfone bloqueada", ["Disco rígido fragmentado", "Aplicativo PDF incorreto", "Arquivo ZIP corrompido"], "Permissões por aplicativo podem bloquear microfone."],
    [68, "diagnostico", "Site não abre", 3, "rede", "diagnostico", "Gateway responde, 8.8.8.8 responde, mas nome de site não resolve. Qual próximo teste faz mais sentido?", "nslookup", ["cleanmgr", "winver", "taskmgr"], "nslookup testa resolução de nomes DNS.", null, ["comando"]],
    [69, "diagnostico", "IP 169.254", 3, "rede", "diagnostico", "O computador apresenta endereço 169.254.x.x. Qual hipótese é mais plausível?", "Falha na obtenção de IP por DHCP", ["Falta de espaço no disco", "Problema de impressão", "Microfone sem permissão"], "Endereços 169.254.x.x costumam indicar autoconfiguração quando DHCP falha.", null, [], ["O endereço não veio do roteador.", "DHCP atribui IP automaticamente."]],
    [70, "diagnostico", "Programa abre sozinho", 2, "produtividade", "diagnostico", "Um programa abre toda vez que o Windows inicia. Onde investigar?", "Aplicativos de Inicialização", ["Histórico da Lixeira", "Painel de Impressão", "Informações do Sistema"], "Aplicativos de Inicialização mostra programas que iniciam com o Windows."]
  ];

  function optionsWithSlot(correct, distractors, seed) {
    const options = [...distractors];
    options.splice(seed % (options.length + 1), 0, correct);
    return options;
  }

  function supplementalQuestion(row) {
    const [n, tipo, titulo, dificuldade, categoria, competencia, pergunta, correta, distratores, explicacao, instrucao = [], tags = [], dicas = []] = row;
    return q(`extra-${String(n).padStart(2, "0")}`, tipo, titulo, dificuldade, categoria, competencia, pergunta, optionsWithSlot(correta, distratores, n - 1), correta, explicacao, { instrucao: instrucao || [], tags: tags || [], dicas: dicas || [] });
  }

  function missionFrom(id, numero, titulo, modulo, categoria, dificuldade, etapas, banco, desbloqueio, sequencial = false) {
    return { id, numero, modulo, titulo, categoria, dificuldade, etapas, banco, desbloqueio, descoberta: true, sequencial };
  }

  function buildSupplementalMissions() {
    const byN = Object.fromEntries(SUPPLEMENTAL_ROWS.map(row => [row[0], supplementalQuestion(row)]));
    const pick = ids => ids.map(id => byN[id]);
    const commandQuestions = [
      ["msinfo32", ["winver", "cleanmgr", "resmon"], "abre Informações do Sistema"],
      ["diskmgmt.msc", ["devmgmt.msc", "services.msc", "taskmgr"], "abre Gerenciamento de Disco"],
      ["devmgmt.msc", ["diskmgmt.msc", "perfmon", "cleanmgr"], "abre Gerenciador de Dispositivos"],
      ["resmon", ["winver", "hostname", "control"], "abre Monitor de Recursos"],
      ["tasklist", ["hostname", "tracert", "whoami"], "mostra processos no Prompt"],
      ["whoami", ["hostname", "systeminfo", "ipconfig"], "mostra o usuário atual"]
    ].map((item, index) => q(`cmd-extra-${index + 1}`, "comando", "Qual comando?", 2, "diagnostico", "diagnostico", `Qual comando ${item[2]}?`, optionsWithSlot(item[0], item[1], index + 1), item[0], `${item[0]} ${item[2]}.`, { tags: ["comando"] }));
    const behaviorQuestions = [
      q("what-wind", "aconteceria", "Win + D", 1, "windows", "windows", "Você pressiona Win + D. O que deve ocorrer?", ["Configurações são abertas", "Área de Trabalho é mostrada", "Usuário é desconectado", "Computador é desligado"], "Área de Trabalho é mostrada", "Win + D mostra a área de trabalho e pode restaurar as janelas.", { tags: ["atalho"] }),
      q("what-winl", "aconteceria", "Win + L", 1, "seguranca", "seguranca", "Você pressiona Win + L. O que deve ocorrer?", ["Janelas são organizadas", "Explorador é aberto", "Sessão é bloqueada", "Pesquisa é iniciada"], "Sessão é bloqueada", "Win + L bloqueia a sessão.", { tags: ["atalho"] }),
      q("what-alttab", "aconteceria", "Alt + Tab", 1, "produtividade", "produtividade", "Você pressiona Alt + Tab. O que deve ocorrer?", ["Fecha a janela atual", "Alterna janelas abertas", "Abre nova área virtual", "Bloqueia o Windows"], "Alterna janelas abertas", "Alt + Tab alterna entre janelas abertas.", { tags: ["atalho"] }),
      q("err-system32", "identifique_erro", "System32 não é limpeza", 3, "seguranca", "decisao", "Um técnico encontrou pouco espaço em disco e decidiu apagar C:\\Windows\\System32. Qual é o problema da decisão?", ["A pasta contém apenas arquivos temporários", "Pode comprometer o sistema operacional", "O Windows recria tudo automaticamente", "A exclusão melhora somente a rede"], "Pode comprometer o sistema operacional", "System32 contém componentes essenciais do Windows."),
      q("err-antivirus", "identifique_erro", "Antivírus desligado", 3, "seguranca", "decisao", "Um funcionário quer melhorar desempenho e desativa o antivírus. Qual é a melhor avaliação?", ["Sempre aumenta muito o desempenho", "Reduz segurança sem resolver a causa", "É obrigatório em computadores antigos", "Não produz qualquer alteração no sistema"], "Reduz segurança sem resolver a causa", "Desativar proteção reduz segurança e não trata a causa da lentidão.")
    ];
    const orderNetwork = q("ordem-rede-01", "ordem", "Ordene o diagnóstico de rede", 3, "rede", "diagnostico", "Computador sem internet. Organize uma sequência lógica de investigação.", ["Ordem correta registrada", "Sequência parcial registrada"], "Ordem correta registrada", "Comece pelo IP, depois gateway, conectividade externa e DNS.", { dicas: ["Comece pelo que está mais perto do computador.", "DNS vem depois de confirmar IP externo."], ordem: [{ id: "b", texto: "Verificar IP" }, { id: "a", texto: "Testar gateway" }, { id: "c", texto: "Testar endereço externo" }, { id: "d", texto: "Testar DNS" }] });
    const association = q("assoc-comandos-01", "associacao", "Associe comandos e recursos", 2, "windows", "diagnostico", "Qual conjunto de associações está correto?", ["winver: rede; msinfo32: impressão; ipconfig: áudio; taskmgr: arquivos", "winver: versão do Windows; msinfo32: sistema; ipconfig: rede; taskmgr: processos", "winver: ZIP; msinfo32: navegador; ipconfig: captura; taskmgr: projetor", "winver: microfone; msinfo32: PDF; ipconfig: Lixeira; taskmgr: backup"], "winver: versão do Windows; msinfo32: sistema; ipconfig: rede; taskmgr: processos", "A associação correta liga cada comando à finalidade mais comum.");

    return [
      missionFrom("m21", 21, "Atalhos e Ações Essenciais", "mod1", "windows", 1, 7, pick([1, 2, 3, 10, 13, 14, 21, 23, 25, 26, 27, 28]), { xp: 0 }),
      missionFrom("m22", 22, "Arquivos Sem Pegadinhas", "mod2", "arquivos", 2, 7, pick([11, 12, 15, 16, 17, 18, 19, 20, 30, 31, 61]), { xp: 150 }),
      missionFrom("m23", 23, "Diagnóstico do Sistema", "mod3", "diagnostico", 2, 7, pick([4, 5, 6, 7, 8, 9, 32, 33, 34, 35, 36, 37, 38, 39, 40, 62, 63, 64, 70]).concat(commandQuestions), { xp: 250 }),
      missionFrom("m24", 24, "Rede em Evidências", "mod4", "rede", 3, 7, pick([41, 42, 43, 44, 45, 46, 47, 48, 49, 68, 69]).concat(orderNetwork), { xp: 600 }),
      missionFrom("m25", 25, "Periféricos e Sala de Aula", "mod5", "perifericos", 2, 7, pick([50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 65, 66, 67]), { xp: 500 }),
      missionFrom("m26", 26, "O Que Acontece e Qual é o Erro", "mod1", "windows", 2, 6, behaviorQuestions.concat(association), { xp: 300 }),
      missionFrom("m27", 27, "Preparar Computador para Apresentação", "mod5", "perifericos", 2, 4, pick([54, 50, 23, 28]), { xp: 700 }, true),
      missionFrom("m28", 28, "Investigação de Rede Guiada", "mod4", "rede", 3, 7, pick([41, 43, 45, 46, 47, 48, 68]).concat(orderNetwork), { xp: 900 }, true),
      missionFrom("m29", 29, "Organização de Documentos", "mod2", "arquivos", 2, 7, pick([10, 11, 12, 18, 30, 31, 61]), { xp: 450 }, true),
      missionFrom("m30", 30, "Produtividade em Janelas", "mod2", "produtividade", 2, 8, pick([1, 23, 24, 21, 22, 26, 27, 28]), { xp: 520 }, true),
      missionFrom("m31", 31, "Estação de Escritório", "mod6", "decisao", 3, 7, pick([61, 66, 67, 55, 58, 30, 65]), { xp: 1500 }, true)
    ];
  }

  MISSIONS.push(...buildSupplementalMissions());

  const LAB_ACTIVITIES = [
    {
      id: "lab-drag-files-01",
      type: "drag_files",
      title: "Organize os Arquivos da Empresa",
      subtitle: "Arraste cada arquivo para a pasta mais adequada.",
      xp: 35,
      skill: "executar",
      competency: "arquivos",
      folders: ["ADMINISTRATIVO", "FINANCEIRO", "EVENTOS", "PLANILHAS"],
      items: [
        { id: "contrato", name: "Contrato_Cliente.pdf", target: "ADMINISTRATIVO" },
        { id: "relatorio", name: "Relatorio_Mensal.docx", target: "ADMINISTRATIVO" },
        { id: "foto", name: "Foto_Evento.png", target: "EVENTOS" },
        { id: "nota", name: "Nota_Fiscal.pdf", target: "FINANCEIRO" },
        { id: "cadastro", name: "Cadastro_Aluno.xlsx", target: "PLANILHAS" }
      ]
    },
    {
      id: "lab-content-drag-01",
      type: "content_drag",
      title: "Classifique pelo Conteúdo",
      subtitle: "Os nomes não entregam a resposta. Abra o conteúdo e arraste.",
      xp: 45,
      skill: "interpretar",
      competency: "arquivos",
      folders: ["FINANCEIRO", "CLIENTES", "EVENTOS", "PLANILHAS"],
      items: [
        { id: "arq01", name: "arquivo_01.pdf", content: "Documento referente ao pagamento do fornecedor XPTO.", target: "FINANCEIRO" },
        { id: "doca", name: "documento_A.pdf", content: "Cadastro atualizado de cliente com telefone e e-mail.", target: "CLIENTES" },
        { id: "reg03", name: "registro_03.pdf", content: "Lista de participantes e equipamentos do evento interno.", target: "EVENTOS" },
        { id: "base", name: "base_B.xlsx", content: "Planilha com fórmulas para controle mensal.", target: "PLANILHAS" }
      ]
    },
    {
      id: "lab-order-support-01",
      type: "order_steps",
      title: "Fluxo de Programa Travado",
      subtitle: "Monte um atendimento técnico seguro.",
      xp: 30,
      skill: "decidir",
      competency: "diagnostico",
      items: [
        { id: "reproduzir", text: "Reproduzir ou confirmar o problema" },
        { id: "verificar", text: "Verificar se está realmente travado" },
        { id: "aguardar", text: "Aguardar brevemente" },
        { id: "taskmgr", text: "Abrir o Gerenciador de Tarefas" },
        { id: "localizar", text: "Localizar o aplicativo conhecido" },
        { id: "finalizar", text: "Finalizar somente se necessário" },
        { id: "reabrir", text: "Abrir novamente" },
        { id: "confirmar", text: "Confirmar funcionamento" }
      ]
    },
    {
      id: "lab-assoc-commands-01",
      type: "associate",
      title: "Associe Comandos e Recursos",
      subtitle: "Clique em um item da esquerda e depois no correspondente.",
      xp: 30,
      skill: "reconhecer",
      competency: "windows",
      pairs: [
        ["winver", "Versão do Windows"],
        ["msinfo32", "Informações do sistema"],
        ["ipconfig", "Configuração de rede"],
        ["taskmgr", "Gerenciador de Tarefas"],
        ["devmgmt.msc", "Gerenciador de Dispositivos"],
        ["diskmgmt.msc", "Gerenciamento de Disco"],
        ["Win + V", "Área de transferência"],
        ["Win + P", "Projeção"]
      ]
    },
    {
      id: "lab-assoc-situations-01",
      type: "associate",
      title: "Situação e Ferramenta",
      subtitle: "Associe o problema à ferramenta mais indicada.",
      xp: 35,
      skill: "diagnosticar",
      competency: "decisao",
      pairs: [
        ["Programa travou", "Gerenciador de Tarefas"],
        ["Projetor não mostra imagem", "Win + P"],
        ["Som sai pelo HDMI", "Configurações de Som"],
        ["Descobrir o IPv4", "ipconfig"],
        ["Pendrive não aparece", "Gerenciamento de Disco"],
        ["Dispositivo com alerta", "Gerenciador de Dispositivos"]
      ]
    },
    {
      id: "lab-command-input-01",
      type: "command_input",
      title: "Digite o Comando",
      subtitle: "Sem alternativas. Digite o comando adequado.",
      xp: 30,
      skill: "executar",
      competency: "windows",
      prompts: [
        { prompt: "Mostra a versão do Windows.", answers: ["winver"] },
        { prompt: "Abre Informações do Sistema.", answers: ["msinfo32"] },
        { prompt: "Mostra configuração IP básica.", answers: ["ipconfig"] },
        { prompt: "Mostra detalhes de todos os adaptadores.", answers: ["ipconfig /all"] },
        { prompt: "Consulta resolução de google.com.", answers: ["nslookup google.com"] }
      ]
    },
    {
      id: "lab-terminal-dns-01",
      type: "terminal",
      title: "Terminal Simulado: DNS",
      subtitle: "Digite comandos, leia saídas fictícias e conclua o diagnóstico.",
      xp: 50,
      skill: "diagnosticar",
      competency: "rede",
      conclusion: "dns",
      commands: {
        "ipconfig": "Adaptador Ethernet\nIPv4: 192.168.0.15\nGateway: 192.168.0.1\nDNS: 192.168.0.1",
        "ping 192.168.0.1": "Resposta de 192.168.0.1: tempo<1ms",
        "ping 8.8.8.8": "Resposta de 8.8.8.8: tempo=18ms",
        "ping google.com": "Não foi possível encontrar o host google.com.",
        "nslookup google.com": "Servidor: 192.168.0.1\n*** Falha de consulta DNS"
      }
    },
    {
      id: "lab-terminal-dhcp-01",
      type: "terminal",
      title: "Terminal Simulado: 169.254",
      subtitle: "Investigue um IP automático e registre a conclusão.",
      xp: 45,
      skill: "diagnosticar",
      competency: "rede",
      conclusion: "dhcp",
      commands: {
        "ipconfig": "Adaptador Ethernet\nIPv4: 169.254.23.18\nGateway: (vazio)",
        "ping 8.8.8.8": "Falha geral.",
        "ping 169.254.23.18": "Resposta do próprio computador.",
        "nslookup google.com": "Servidor DNS não configurado."
      }
    },
    {
      id: "lab-terminal-local-01",
      type: "terminal",
      title: "Terminal Simulado: Rede Local",
      subtitle: "Descubra se o problema está no caminho local.",
      xp: 45,
      skill: "diagnosticar",
      competency: "rede",
      conclusion: "rede local",
      commands: {
        "ipconfig": "IPv4: 192.168.1.24\nGateway: 192.168.1.1",
        "ping 192.168.1.1": "Esgotado o tempo limite do pedido.",
        "ping 8.8.8.8": "Esgotado o tempo limite do pedido.",
        "ping google.com": "Esgotado o tempo limite do pedido."
      }
    },
    {
      id: "lab-terminal-external-01",
      type: "terminal",
      title: "Terminal Simulado: Saída Externa",
      subtitle: "Gateway responde, mas o destino externo não.",
      xp: 45,
      skill: "diagnosticar",
      competency: "rede",
      conclusion: "conexão externa",
      commands: {
        "ipconfig": "IPv4: 10.0.0.44\nGateway: 10.0.0.1",
        "ping 10.0.0.1": "Resposta de 10.0.0.1: tempo<1ms",
        "ping 8.8.8.8": "Esgotado o tempo limite do pedido.",
        "tracert google.com": "1 10.0.0.1\n2 * * *"
      }
    },
    {
      id: "lab-terminal-app-01",
      type: "terminal",
      title: "Terminal Simulado: Aplicativo Específico",
      subtitle: "A rede parece funcionar, mas um app não conecta.",
      xp: 45,
      skill: "diagnosticar",
      competency: "rede",
      conclusion: "aplicativo",
      commands: {
        "ipconfig": "IPv4: 192.168.10.31\nGateway: 192.168.10.1",
        "ping 192.168.10.1": "Resposta de 192.168.10.1: tempo<1ms",
        "ping 8.8.8.8": "Resposta de 8.8.8.8: tempo=14ms",
        "ping google.com": "Resposta de 142.250.218.14: tempo=21ms"
      }
    },
    {
      id: "lab-explorer-01",
      type: "explorer",
      title: "Explorador Simulado: Downloads",
      subtitle: "Pesquise, organize e registre ações simuladas.",
      xp: 55,
      skill: "executar",
      competency: "arquivos",
      files: [
        { name: "arquivo_01.pdf", type: "PDF", date: "2026-10-06", size: "240 KB", hidden: false },
        { name: "IMG002.tmp", type: "Temporário", date: "2026-09-30", size: "18 KB", hidden: false },
        { name: "relatoriofinal.docx", type: "Documento", date: "2026-10-05", size: "92 KB", hidden: false },
        { name: "tabela.xlsx", type: "Planilha", date: "2026-10-04", size: "61 KB", hidden: false },
        { name: "cadastro.pdf", type: "PDF", date: "2026-10-03", size: "130 KB", hidden: false },
        { name: "arquivo_oculto.pdf", type: "PDF oculto", date: "2026-10-02", size: "88 KB", hidden: true }
      ]
    },
    {
      id: "lab-settings-sound-01",
      type: "settings",
      title: "Configurações Simuladas: Som",
      subtitle: "O usuário não ouve nas caixas do computador.",
      xp: 35,
      skill: "executar",
      competency: "perifericos",
      scenario: "Selecione a saída correta para ouvir nas caixas do computador.",
      group: "Saída",
      options: ["Monitor HDMI", "Alto-falantes", "Fone USB"],
      correct: "Alto-falantes"
    },
    {
      id: "lab-projection-01",
      type: "settings",
      title: "Simulação de Projeção",
      subtitle: "Slides no projetor, anotações no notebook.",
      xp: 35,
      skill: "decidir",
      competency: "perifericos",
      scenario: "Escolha o modo para conteúdos diferentes em cada tela.",
      group: "Modo de projeção",
      options: ["Somente PC", "Duplicar", "Estender", "Somente segunda tela"],
      correct: "Estender"
    },
    {
      id: "lab-print-01",
      type: "settings",
      title: "Simulação de Impressão",
      subtitle: "Salvar páginas específicas como PDF.",
      xp: 35,
      skill: "executar",
      competency: "produtividade",
      scenario: "Configure a opção adequada para salvar páginas 3, 5 e 8 como PDF.",
      group: "Páginas",
      options: ["Todas", "3,5,8", "1 cópia", "Paisagem"],
      correct: "3,5,8"
    },
    {
      id: "lab-print-queue-01",
      type: "classify",
      title: "Fila de Impressão",
      subtitle: "O usuário clicou quatro vezes no mesmo contrato.",
      xp: 35,
      skill: "decidir",
      competency: "perifericos",
      categories: ["MANTER", "CANCELAR"],
      cards: [
        { id: "rel", text: "Relatorio.pdf — imprimindo", target: "MANTER" },
        { id: "c1", text: "Contrato.pdf — aguardando", target: "MANTER" },
        { id: "c2", text: "Contrato.pdf — aguardando", target: "CANCELAR" },
        { id: "c3", text: "Contrato.pdf — aguardando", target: "CANCELAR" },
        { id: "c4", text: "Contrato.pdf — aguardando", target: "CANCELAR" }
      ]
    },
    {
      id: "lab-error-meeting-01",
      type: "error_hunt",
      title: "Caça ao Erro: Reunião",
      subtitle: "Clique nos elementos que representam problemas.",
      xp: 45,
      skill: "diagnosticar",
      competency: "diagnostico",
      hotspots: [
        { id: "audio", text: "Som: HDMI", problem: true, feedback: "Áudio no HDMI pode sair pelo monitor em vez das caixas." },
        { id: "projector", text: "Projetor: Somente tela do computador", problem: true, feedback: "Para projetar, confira Duplicar ou Estender." },
        { id: "mic", text: "Microfone: bloqueado", problem: true, feedback: "Permissão bloqueada impede uso no app." },
        { id: "pdf", text: "PDF: abre em navegador", problem: true, feedback: "Pode ser aplicativo padrão inadequado." },
        { id: "clock", text: "Relógio: 07:55", problem: false, feedback: "O horário é contexto, não problema técnico." }
      ]
    },
    {
      id: "lab-risk-01",
      type: "error_hunt",
      title: "Identifique o Risco",
      subtitle: "Clique apenas nos riscos de segurança.",
      xp: 45,
      skill: "reconhecer",
      competency: "seguranca",
      hotspots: [
        { id: "senha", text: "Senha anotada em papel", problem: true, feedback: "Senha exposta é risco." },
        { id: "bloqueio", text: "Computador desbloqueado", problem: true, feedback: "Sessão aberta facilita acesso indevido." },
        { id: "pendrive", text: "Pendrive desconhecido", problem: true, feedback: "Mídia desconhecida pode trazer riscos." },
        { id: "backup", text: "Backup identificado", problem: false, feedback: "Backup é medida positiva." },
        { id: "dados", text: "Dados pessoais na tela", problem: true, feedback: "Dados visíveis devem ser protegidos." }
      ]
    },
    {
      id: "lab-classify-actions-01",
      type: "classify",
      title: "Seguro, Avaliar ou Não Fazer",
      subtitle: "Classifique ações comuns de suporte.",
      xp: 40,
      skill: "decidir",
      competency: "seguranca",
      categories: ["SEGURO", "AVALIAR", "NÃO FAZER"],
      cards: [
        { id: "temp", text: "Limpar arquivos temporários por ferramenta do Windows", target: "SEGURO" },
        { id: "system32", text: "Apagar System32 para liberar espaço", target: "NÃO FAZER" },
        { id: "av", text: "Desabilitar antivírus para melhorar desempenho", target: "NÃO FAZER" },
        { id: "downloads", text: "Organizar Downloads", target: "SEGURO" },
        { id: "espaco", text: "Verificar espaço em disco", target: "SEGURO" },
        { id: "formatar", text: "Formatar imediatamente", target: "NÃO FAZER" },
        { id: "backup", text: "Criar backup antes de mudança", target: "SEGURO" }
      ]
    },
    {
      id: "lab-classify-tools-01",
      type: "classify",
      title: "Classificar por Ferramenta",
      subtitle: "Arraste cada cartão para a área correta.",
      xp: 35,
      skill: "reconhecer",
      competency: "windows",
      categories: ["WINDOWS", "REDE", "ARQUIVOS", "PERIFÉRICOS"],
      cards: [
        { id: "ipconfig", text: "ipconfig", target: "REDE" },
        { id: "winp", text: "Win + P", target: "PERIFÉRICOS" },
        { id: "winv", text: "Win + V", target: "WINDOWS" },
        { id: "msinfo", text: "msinfo32", target: "WINDOWS" },
        { id: "nslookup", text: "nslookup", target: "REDE" },
        { id: "devmgmt", text: "Gerenciador de Dispositivos", target: "PERIFÉRICOS" },
        { id: "zip", text: "ZIP", target: "ARQUIVOS" },
        { id: "pdf", text: "Print to PDF", target: "PERIFÉRICOS" }
      ]
    },
    {
      id: "lab-procedure-email-01",
      type: "procedure",
      title: "Montar Procedimento de Envio",
      subtitle: "Enviar uma pasta com 12 documentos por e-mail.",
      xp: 35,
      skill: "decidir",
      competency: "arquivos",
      items: [
        { id: "conferir", text: "Conferir arquivos" },
        { id: "selecionar", text: "Selecionar pasta" },
        { id: "zip", text: "Criar ZIP" },
        { id: "renomear", text: "Renomear ZIP" },
        { id: "anexar", text: "Anexar" },
        { id: "enviar", text: "Enviar" }
      ]
    },
    {
      id: "lab-branch-internet-01",
      type: "branching",
      title: "Chamado Ramificado: Sem Internet",
      subtitle: "Escolha caminhos de investigação.",
      xp: 50,
      skill: "diagnosticar",
      competency: "rede",
      start: "inicio",
      nodes: {
        inicio: { text: "Meu computador está sem internet. Qual caminho inicial?", options: [{ text: "Verificar rede", next: "ip", good: true }, { text: "Formatar computador", next: "bad", good: false }, { text: "Reiniciar impressora", next: "bad", good: false }] },
        ip: { text: "Qual teste vem primeiro?", options: [{ text: "ipconfig", next: "gateway", good: true }, { text: "cleanmgr", next: "bad", good: false }] },
        gateway: { text: "IPv4 válido. Próximo passo?", options: [{ text: "ping gateway", next: "dns", good: true }, { text: "Alterar papel de parede", next: "bad", good: false }] },
        dns: { text: "Gateway e 8.8.8.8 respondem, nome falha.", options: [{ text: "Investigar DNS", next: "ok", good: true }, { text: "Trocar monitor", next: "bad", good: false }] },
        ok: { text: "Diagnóstico provável: DNS.", done: true },
        bad: { text: "Esse caminho não resolve o problema com segurança.", done: true }
      }
    },
    {
      id: "lab-checklist-meeting-01",
      type: "checklist",
      title: "Preparar Estação para Reunião",
      subtitle: "Execute no Windows quando fizer sentido e registre evidência.",
      xp: 45,
      skill: "executar",
      competency: "produtividade",
      items: [
        { id: "audio", text: "Testar áudio", evidence: "Onde você encontrou a saída de áudio?" },
        { id: "mic", text: "Verificar microfone", evidence: "Qual área controla permissões do microfone?" },
        { id: "slides", text: "Abrir apresentação", evidence: "Qual arquivo foi aberto?" },
        { id: "proj", text: "Configurar projeção", evidence: "Qual modo foi escolhido?" },
        { id: "pdf", text: "Testar PDF", evidence: "Com qual aplicativo abriu?" },
        { id: "net", text: "Verificar internet", evidence: "Qual teste simples confirmou conexão?" }
      ]
    },
    {
      id: "lab-clue-dns-01",
      type: "clue",
      title: "Investigação por Pistas: Sites não abrem",
      subtitle: "Use menos pistas para manter mais pontos.",
      xp: 45,
      skill: "diagnosticar",
      competency: "rede",
      answer: "dns",
      clues: ["IPv4 válido.", "Gateway responde.", "8.8.8.8 responde.", "google.com não resolve."]
    },
    {
      id: "lab-fill-shortcuts-01",
      type: "fill_blank",
      title: "Complete Atalhos e Comandos",
      subtitle: "Preencha lacunas curtas.",
      xp: 25,
      skill: "reconhecer",
      competency: "windows",
      blanks: [
        { label: "Para abrir o Explorador: Win + ___", answer: "e" },
        { label: "Para abrir Configurações: Win + ___", answer: "i" },
        { label: "ipconfig /____ mostra detalhes dos adaptadores", answer: "all" },
        { label: "ping ________ testa loopback", answer: "127.0.0.1" }
      ]
    },
    {
      id: "lab-path-mic-01",
      type: "path_build",
      title: "Construa o Caminho",
      subtitle: "Ordene os cartões para chegar à permissão de microfone.",
      xp: 30,
      skill: "executar",
      competency: "seguranca",
      items: [
        { id: "cfg", text: "Configurações" },
        { id: "priv", text: "Privacidade e segurança" },
        { id: "mic", text: "Microfone" },
        { id: "apps", text: "Permitir acesso de aplicativos" }
      ]
    },
    {
      id: "lab-task-manager-01",
      type: "task_manager",
      title: "Gerenciador de Tarefas Simulado",
      subtitle: "Clique no processo que merece investigação.",
      xp: 35,
      skill: "diagnosticar",
      competency: "diagnostico",
      rows: [
        { name: "Word", cpu: "4%", memory: "420 MB", disk: "0%", target: false },
        { name: "Browser", cpu: "8%", memory: "1800 MB", disk: "1%", target: false },
        { name: "Aplicativo X", cpu: "82%", memory: "650 MB", disk: "40%", target: true },
        { name: "Sistema", cpu: "3%", memory: "350 MB", disk: "2%", target: false }
      ]
    },
    {
      id: "lab-multiselect-meeting-01",
      type: "multiselect",
      title: "Antes da Reunião",
      subtitle: "Selecione todas as ações adequadas.",
      xp: 30,
      skill: "decidir",
      competency: "decisao",
      options: [
        { text: "Verificar projeção", correct: true },
        { text: "Testar áudio", correct: true },
        { text: "Abrir apresentação", correct: true },
        { text: "Testar internet", correct: true },
        { text: "Formatar computador", correct: false },
        { text: "Desativar antivírus", correct: false }
      ]
    },
    {
      id: "lab-open-win-v-01",
      type: "open_response",
      title: "Prática Real com Registro",
      subtitle: "Execute fora do navegador, descreva e faça autoavaliação.",
      xp: 30,
      skill: "interpretar",
      competency: "produtividade",
      prompt: "Copie dois textos diferentes, pressione Win + V e descreva em uma frase o que apareceu.",
      reference: "Win + V mostra o histórico da área de transferência, com itens copiados recentemente quando o recurso está ativo."
    },
    {
      id: "lab-office-shift-01",
      type: "office_shift",
      title: "Expediente Digital",
      subtitle: "Administre múltiplos chamados e acompanhe consequências.",
      xp: 70,
      skill: "decidir",
      competency: "decisao",
      tickets: [
        { time: "08:00", text: "Não encontro um PDF.", best: "Pesquisar *.pdf e ordenar por data", metric: "organização" },
        { time: "08:05", text: "Projetor não mostra imagem.", best: "Verificar Win + P", metric: "eficiência" },
        { time: "08:08", text: "Impressora com documentos duplicados.", best: "Abrir fila e cancelar extras", metric: "organização" },
        { time: "08:12", text: "Microfone não funciona.", best: "Conferir entrada e permissão", metric: "diagnóstico" }
      ]
    }
  ];

  /* ESTADO */
  const app = document.getElementById("app");
  const toastRegion = document.getElementById("toast-region");
  let players = load(STORAGE.players, []);
  let prefs = load(STORAGE.prefs, { sound: false, unlockAll: false });
  let currentPlayerId = localStorage.getItem(STORAGE.current);
  let currentView = currentPlayerId && getPlayer(currentPlayerId) ? "dashboard" : "home";
  let currentRun = null;
  let teacherDetailId = null;
  let toolSituation = null;
  let ticketSession = null;
  let audioContext = null;
  let missionFilter = "todas";
  let labRun = null;

  /* PERSISTÊNCIA */
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function savePlayers() {
    localStorage.setItem(STORAGE.players, JSON.stringify(players));
  }

  function savePrefs() {
    localStorage.setItem(STORAGE.prefs, JSON.stringify(prefs));
  }

  function setCurrentPlayer(id) {
    currentPlayerId = id;
    if (id) localStorage.setItem(STORAGE.current, id);
    else localStorage.removeItem(STORAGE.current);
  }

  function touchPlayer(player) {
    player.lastActivity = new Date().toISOString();
    savePlayers();
  }

  /* UTILITÁRIOS */
  function uid() {
    return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function normalizeName(name) {
    return String(name || "").trim().replace(/\s+/g, " ");
  }

  function getPlayer(id = currentPlayerId) {
    return players.find(player => player.id === id) || null;
  }

  function initCompetencies() {
    return COMPETENCIES.reduce((acc, item) => {
      acc[item.id] = { correct: 0, total: 0 };
      return acc;
    }, {});
  }

  function initSkillMetrics() {
    return SKILL_METRICS.reduce((acc, item) => {
      acc[item.id] = { correct: 0, total: 0 };
      return acc;
    }, {});
  }

  function initLabStats() {
    return Object.keys(LAB_TYPE_LABELS).reduce((acc, type) => {
      acc[type] = { correct: 0, total: 0, score: 0 };
      return acc;
    }, {});
  }

  function ensurePlayerShape(player) {
    player.score ??= 0;
    player.xp ??= 0;
    player.correct ??= 0;
    player.wrong ??= 0;
    player.streak ??= 0;
    player.bestStreak ??= 0;
    player.completedMissions ??= {};
    player.missionAttempts ??= [];
    player.awarded ??= {};
    player.bonuses ??= {};
    player.achievements ??= [];
    player.answers ??= {};
    player.history ??= [];
    player.competencies ??= initCompetencies();
    player.skillMetrics ??= initSkillMetrics();
    player.labStats ??= initLabStats();
    player.labAttempts ??= [];
    player.evidence ??= [];
    player.expeditionComplete ??= false;
    player.shortcutCorrect ??= 0;
    player.commandAnswers ??= 0;
    player.networkCorrect ??= 0;
    player.toolSimulatorCorrect ??= 0;
    player.ticketsResolved ??= 0;
    COMPETENCIES.forEach(item => {
      player.competencies[item.id] ??= { correct: 0, total: 0 };
    });
    SKILL_METRICS.forEach(item => {
      player.skillMetrics[item.id] ??= { correct: 0, total: 0 };
    });
    Object.keys(LAB_TYPE_LABELS).forEach(type => {
      player.labStats[type] ??= { correct: 0, total: 0, score: 0 };
    });
    return player;
  }

  players = players.map(ensurePlayerShape);
  savePlayers();

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function sample(array, count) {
    return shuffle(array).slice(0, Math.min(count, array.length));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function percent(part, total) {
    if (!total) return 0;
    return Math.round((part / total) * 100);
  }

  function difficultyLabel(value) {
    return value === 1 ? "Fácil" : value === 2 ? "Médio" : "Difícil";
  }

  function difficultyClass(value) {
    return value === 1 ? "easy" : value === 2 ? "medium" : "hard";
  }

  function formatDate(value) {
    if (!value) return "Ainda não registrado";
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
  }

  function allQuestions() {
    const unique = new Map();
    [...MISSIONS.flatMap(mission => mission.banco), ...EXPEDITION.banco].forEach(question => {
      if (!unique.has(question.id)) unique.set(question.id, question);
    });
    return [...unique.values()];
  }

  function isPractical(question) {
    return ["pratica", "investigacao"].includes(question.tipo) || question.instrucao.length > 0;
  }

  function baseQuestionXp(question) {
    return CONFIG.difficultyXp[question.dificuldade] + (isPractical(question) ? CONFIG.practicalBonus : 0);
  }

  function countCompleted(player) {
    return Object.keys(player.completedMissions || {}).filter(id => id.startsWith("m")).length;
  }

  function getLevel(xp) {
    let level = LEVELS[0];
    for (const item of LEVELS) {
      if (xp >= item.xp) level = item;
    }
    return level;
  }

  function nextLevel(xp) {
    return LEVELS.find(item => item.xp > xp) || LEVELS[LEVELS.length - 1];
  }

  function levelProgress(player) {
    const level = getLevel(player.xp);
    const next = nextLevel(player.xp);
    if (level.nivel === next.nivel) return 100;
    return clamp(Math.round(((player.xp - level.xp) / (next.xp - level.xp)) * 100), 0, 100);
  }

  function competencyPercent(player, id) {
    const item = player.competencies?.[id] || { correct: 0, total: 0 };
    return percent(item.correct, item.total);
  }

  function missionXpPotential(mission) {
    const source = mission.banco || [];
    const average = source.reduce((sum, item) => sum + baseQuestionXp(item), 0) / Math.max(source.length, 1);
    return Math.round(average * (mission.etapas || CONFIG.attemptSize));
  }

  function isUnlocked(mission, player) {
    if (prefs.unlockAll) return true;
    const rule = mission.desbloqueio || {};
    if ((rule.xp || 0) > player.xp) return false;
    if (rule.completed && !rule.completed.every(id => player.completedMissions[id])) return false;
    return true;
  }

  function moduleProgress(moduleId, player) {
    const missions = MISSIONS.filter(mission => mission.modulo === moduleId);
    const completed = missions.filter(mission => player.completedMissions[mission.id]).length;
    const xp = missions.reduce((sum, mission) => sum + (player.completedMissions[mission.id]?.bestXp || 0), 0);
    return { total: missions.length, completed, xp, pct: percent(completed, missions.length) };
  }

  function createPlayer(name) {
    const cleanName = normalizeName(name);
    const existing = players.find(player => player.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) {
      ensurePlayerShape(existing);
      setCurrentPlayer(existing.id);
      touchPlayer(existing);
      toast(`Progresso de ${existing.name} recuperado.`);
      return existing;
    }
    const player = ensurePlayerShape({
      id: uid(),
      name: cleanName,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      xp: 0,
      score: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0,
      completedMissions: {},
      missionAttempts: [],
      awarded: {},
      bonuses: {},
      achievements: [],
      answers: {},
      history: [],
      competencies: initCompetencies()
    });
    players.push(player);
    setCurrentPlayer(player.id);
    savePlayers();
    toast(`Bem-vindo, ${player.name}.`);
    return player;
  }

  function toast(message) {
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    toastRegion.appendChild(node);
    window.setTimeout(() => node.remove(), 4200);
  }

  function playSound(kind) {
    if (!prefs.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const freq = kind === "success" ? 740 : kind === "level" ? 920 : 220;
      oscillator.frequency.setValueAtTime(freq, now);
      oscillator.type = "sine";
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.24);
    } catch {
      prefs.sound = false;
      savePrefs();
    }
  }

  function prepareQuestion(question) {
    const shuffled = shuffle(question.alternativas.map(option => ({ ...option })));
    return {
      ...question,
      shuffled,
      state: {
        hintsShown: 0,
        selected: null,
        answered: false,
        correct: false,
        retryOffered: false,
        retryUsed: false,
        practiceReady: !isPractical(question),
        startedAt: Date.now(),
        earnedXp: 0,
        earnedScore: 0,
        order: question.ordem ? shuffle(question.ordem.map(item => ({ ...item }))) : []
      }
    };
  }

  function startRun(kind, source) {
    const player = getPlayer();
    if (!player) return;
    let questions = [];
    let title = "";
    let mission = null;
    if (kind === "mission") {
      mission = MISSIONS.find(item => item.id === source);
      if (!mission || !isUnlocked(mission, player)) {
        toast("Missão ainda bloqueada.");
        return;
      }
      title = mission.titulo;
      questions = mission.sequencial ? mission.banco : sample(mission.banco, mission.etapas || CONFIG.attemptSize);
    }
    if (kind === "quick") {
      title = "Desafio Rápido";
      const groups = COMPETENCIES.map(comp => allQuestions().filter(question => question.competencia === comp.id)).filter(group => group.length);
      questions = sample(groups, 5).map(group => sample(group, 1)[0]);
    }
    if (kind === "review") {
      title = "Revisar Meus Erros";
      const missed = allQuestions().filter(question => (player.answers[question.id]?.errors || 0) > 0);
      if (!missed.length) {
        toast("Você ainda não possui questões erradas para revisar.");
        return;
      }
      questions = sample(missed, Math.min(7, missed.length));
    }
    if (kind === "expedition") {
      title = EXPEDITION.titulo;
      questions = EXPEDITION.banco;
    }
    currentRun = {
      kind,
      missionId: kind === "mission" ? mission.id : kind,
      title,
      difficulty: mission?.dificuldade || (kind === "expedition" ? 3 : 2),
      questions: questions.map(prepareQuestion),
      index: 0,
      results: [],
      startedAt: Date.now(),
      completed: false,
      summary: null
    };
    currentView = "runner";
    render();
  }

  function currentQuestion() {
    return currentRun?.questions[currentRun.index] || null;
  }

  function revealPractice() {
    const question = currentQuestion();
    if (!question) return;
    question.state.practiceReady = true;
    question.state.startedAt = Date.now();
    render();
  }

  function showHint() {
    const question = currentQuestion();
    if (!question || question.state.answered) return;
    if (question.state.hintsShown < question.dicas.length) {
      question.state.hintsShown += 1;
      toast("Dica liberada. A pontuação desta questão será reduzida.");
      render();
    }
  }

  function chooseOption(index) {
    const question = currentQuestion();
    const player = getPlayer();
    if (!question || !player || question.state.answered || !question.state.practiceReady) return;
    question.state.selected = Number(index);
    const correct = Boolean(question.shuffled[question.state.selected]?.correta);
    if (!correct && isPractical(question) && !question.state.retryUsed) {
      question.state.retryOffered = true;
      playSound("error");
      render();
      return;
    }
    applyAnswer(question, correct);
    render();
  }

  function retryQuestion() {
    const question = currentQuestion();
    if (!question) return;
    question.state.retryUsed = true;
    question.state.retryOffered = false;
    question.state.selected = null;
    question.shuffled = shuffle(question.alternativas.map(option => ({ ...option })));
    toast("Revise o que apareceu no Windows e tente novamente.");
    render();
  }

  function applyAnswer(question, correct) {
    const player = getPlayer();
    const oldLevel = getLevel(player.xp).nivel;
    const elapsed = Math.max(1, Math.round((Date.now() - question.state.startedAt) / 1000));
    const penalty = question.state.hintsShown === 0 ? 1 : question.state.hintsShown === 1 ? 0.75 : 0.5;
    const possibleXp = Math.round(baseQuestionXp(question) * penalty);
    const speedBonus = question.tempoLimite ? Math.max(0, question.tempoLimite - elapsed) : 0;
    const possibleScore = Math.round((baseQuestionXp(question) * 12 + speedBonus * 2 + Math.min(player.streak, 15) * 3) * penalty);
    let earnedXp = 0;
    let earnedScore = 0;

    question.state.answered = true;
    question.state.correct = correct;

    const comp = player.competencies[question.competencia] || { correct: 0, total: 0 };
    comp.total += 1;
    if (correct) comp.correct += 1;
    player.competencies[question.competencia] = comp;

    player.answers[question.id] ??= { attempts: 0, correct: 0, errors: 0, lastCorrect: false };
    player.answers[question.id].attempts += 1;
    player.answers[question.id].lastCorrect = correct;
    player.answers[question.id].lastAt = new Date().toISOString();

    if (correct) {
      player.correct += 1;
      player.streak += 1;
      player.bestStreak = Math.max(player.bestStreak, player.streak);
      player.answers[question.id].correct += 1;
      if (question.tags.includes("atalho")) player.shortcutCorrect += 1;
      if (question.tags.includes("comando") || question.tipo === "comando") player.commandAnswers += 1;
      if (question.competencia === "rede") player.networkCorrect += 1;

      const awarded = player.awarded[question.id] || { xp: 0, score: 0 };
      earnedXp = Math.max(0, possibleXp - awarded.xp);
      earnedScore = Math.max(0, possibleScore - awarded.score);
      awarded.xp = Math.max(awarded.xp, possibleXp);
      awarded.score = Math.max(awarded.score, possibleScore);
      player.awarded[question.id] = awarded;
      player.xp += earnedXp;
      player.score += earnedScore;
      playSound("success");
    } else {
      player.wrong += 1;
      player.streak = 0;
      player.answers[question.id].errors = (player.answers[question.id].errors || 0) + 1;
      playSound("error");
    }

    question.state.earnedXp = earnedXp;
    question.state.earnedScore = earnedScore;
    currentRun.results.push({
      id: question.id,
      missionId: currentRun.missionId,
      title: question.titulo,
      competence: question.competencia,
      correct,
      earnedXp,
      earnedScore,
      elapsed,
      hints: question.state.hintsShown,
      at: new Date().toISOString()
    });

    player.history.unshift(currentRun.results[currentRun.results.length - 1]);
    player.history = player.history.slice(0, CONFIG.maxHistory);

    const newLevel = getLevel(player.xp).nivel;
    if (newLevel > oldLevel) {
      toast(`Evolução de nível: agora você é ${getLevel(player.xp).cargo}.`);
      playSound("level");
      document.body.classList.add("level-flash");
      window.setTimeout(() => document.body.classList.remove("level-flash"), 900);
    }

    const unlocked = checkAchievements(player);
    if (unlocked.length) toast(`Conquista desbloqueada: ${unlocked.map(item => item.nome).join(", ")}.`);
    touchPlayer(player);
  }

  function nextQuestion() {
    if (!currentRun) return;
    if (currentRun.index < currentRun.questions.length - 1) {
      currentRun.index += 1;
      render();
    } else {
      completeRun();
    }
  }

  function completeRun() {
    const player = getPlayer();
    if (!player || !currentRun || currentRun.completed) return;
    const total = currentRun.questions.length;
    const correct = currentRun.results.filter(result => result.correct).length;
    const wrong = total - correct;
    const accuracy = percent(correct, total);
    const xp = currentRun.results.reduce((sum, result) => sum + result.earnedXp, 0);
    const score = currentRun.results.reduce((sum, result) => sum + result.earnedScore, 0);
    let bonusXp = 0;
    let bonusScore = 0;
    const key = `bonus:${currentRun.missionId}:complete`;
    const perfectKey = `bonus:${currentRun.missionId}:perfect`;

    if (currentRun.kind === "mission" || currentRun.kind === "expedition") {
      const diff = currentRun.difficulty || 2;
      bonusXp += awardBonus(player, key, CONFIG.completionBonus[diff], CONFIG.completionBonus[diff] * 8);
      if (accuracy === 100) {
        bonusXp += awardBonus(player, perfectKey, CONFIG.perfectBonus[diff], CONFIG.perfectBonus[diff] * 10);
      }
    }

    const byCompetence = {};
    currentRun.results.forEach(result => {
      byCompetence[result.competence] ??= { correct: 0, total: 0 };
      byCompetence[result.competence].total += 1;
      if (result.correct) byCompetence[result.competence].correct += 1;
    });

    if (currentRun.kind === "mission") {
      const prev = player.completedMissions[currentRun.missionId] || { attempts: 0, bestAccuracy: 0, bestScore: 0, bestXp: 0 };
      player.completedMissions[currentRun.missionId] = {
        attempts: prev.attempts + 1,
        bestAccuracy: Math.max(prev.bestAccuracy || 0, accuracy),
        bestScore: Math.max(prev.bestScore || 0, score + bonusScore),
        bestXp: Math.max(prev.bestXp || 0, xp + bonusXp),
        lastAccuracy: accuracy,
        lastAt: new Date().toISOString()
      };
    }

    if (currentRun.kind === "expedition") {
      player.expeditionComplete = true;
    }

    const summary = {
      title: currentRun.title,
      total,
      correct,
      wrong,
      accuracy,
      xp,
      score,
      bonusXp,
      byCompetence,
      duration: Math.round((Date.now() - currentRun.startedAt) / 1000),
      kind: currentRun.kind
    };

    player.missionAttempts.unshift({
      missionId: currentRun.missionId,
      title: currentRun.title,
      accuracy,
      correct,
      total,
      xp: xp + bonusXp,
      score: score + bonusScore,
      at: new Date().toISOString()
    });
    player.missionAttempts = player.missionAttempts.slice(0, 80);
    currentRun.completed = true;
    currentRun.summary = summary;
    checkAchievements(player);
    touchPlayer(player);
    currentView = "result";
    render();
  }

  function awardBonus(player, key, xpValue, scoreValue) {
    if (player.bonuses[key]) return 0;
    player.bonuses[key] = { xp: xpValue, score: scoreValue, at: new Date().toISOString() };
    player.xp += xpValue;
    player.score += scoreValue;
    return xpValue;
  }

  function checkAchievements(player) {
    const unlocked = [];
    ACHIEVEMENTS.forEach(achievement => {
      if (!player.achievements.includes(achievement.id) && achievement.test(player)) {
        player.achievements.push(achievement.id);
        unlocked.push(achievement);
      }
    });
    return unlocked;
  }

  /* RENDERIZAÇÃO */
  function render() {
    const player = getPlayer();
    if (!player && currentView !== "home") currentView = "home";
    app.innerHTML = currentView === "home" ? renderHome() : renderShell(player);
    if (currentView !== "home") {
      const main = document.getElementById("main");
      if (main) main.focus({ preventScroll: true });
    }
  }

  function renderHome() {
    const current = getPlayer();
    const playerCount = players.length;
    return `
      <main class="hero-screen" id="main" tabindex="-1">
        <section class="hero-content" aria-labelledby="home-title">
          <div>
            <p class="hero-kicker">Central de Operações Digitais</p>
            <h1 class="hero-title" id="home-title">Missão Windows <span>Central de Desafios Digitais</span></h1>
            <p class="hero-subtitle">Seu computador é o laboratório. Enfrente missões, execute comandos reais, investigue o Windows 11 e resolva situações do ambiente de trabalho.</p>
            <div class="hero-motto">Explore. Execute. Descubra. Resolva.</div>
          </div>
          <aside class="hero-panel login-box" aria-label="Entrada do jogador">
            <h2>Identificação do aluno</h2>
            <p>Digite seu nome para iniciar ou recuperar o progresso salvo neste navegador.</p>
            <form class="field-stack" data-form="player">
              <label class="sr-only" for="player-name">Digite seu nome</label>
              <input id="player-name" class="text-input" name="name" maxlength="40" autocomplete="name" placeholder="Digite seu nome" required>
              <button class="btn primary" type="submit">Iniciar missões</button>
            </form>
            <div class="field-stack">
              ${current ? `<button class="btn" data-action="continue-current">Continuar jornada de ${esc(current.name)}</button>` : ""}
              <p class="muted">${playerCount ? `${playerCount} jogador(es) salvo(s) neste navegador.` : "Nenhum jogador salvo ainda."}</p>
            </div>
          </aside>
        </section>
      </main>
    `;
  }

  function renderShell(player) {
    ensurePlayerShape(player);
    const page = {
      dashboard: renderDashboard,
      missions: renderMissions,
      runner: renderRunner,
      result: renderResult,
      quick: renderQuick,
      simulators: renderSimulators,
      lab: renderLab,
      concepts: renderConcepts,
      profile: renderProfile,
      ranking: renderRanking,
      teacher: renderTeacher
    }[currentView]?.(player) || renderDashboard(player);

    return `
      <div class="shell-layout">
        <aside class="sidebar" aria-label="Navegação principal">
          <div class="brand">
            <span class="brand-mark" aria-hidden="true">MW</span>
            <h1>Missão Windows</h1>
            <p>Central de Desafios Digitais</p>
          </div>
          <div class="player-mini">
            <span class="player-name">${esc(player.name)}</span>
            <span class="player-role">Nível ${getLevel(player.xp).nivel} · ${esc(getLevel(player.xp).cargo)}</span>
            <div class="progress thin-progress" aria-label="Progresso de nível"><span style="width:${levelProgress(player)}%"></span></div>
          </div>
          <nav class="nav-list">
            ${navButton("dashboard", "Painel", "▣")}
            ${navButton("missions", "Missões", "◇")}
            ${navButton("quick", "Desafio Rápido", "↯")}
            ${navButton("simulators", "Simuladores", "⌁")}
            ${navButton("lab", "Laboratório", "▦")}
            ${navButton("concepts", "Você Sabia?", "i")}
            ${navButton("profile", "Meu Perfil", "◉")}
            ${navButton("ranking", "Ranking", "▲")}
            ${navButton("teacher", "Professor", "●")}
          </nav>
          <div class="sidebar-actions">
            <button class="btn small" data-action="toggle-sound" aria-pressed="${prefs.sound}">${prefs.sound ? "Som ligado" : "Som desligado"}</button>
            <button class="btn small ghost" data-action="logout">Trocar aluno</button>
          </div>
        </aside>
        <main class="main-area" id="main" tabindex="-1">
          <div class="mobile-notice">As missões práticas são melhor aproveitadas em um computador com Windows 11.</div>
          ${page}
        </main>
      </div>
    `;
  }

  function navButton(view, label, icon) {
    return `<button class="nav-button ${currentView === view ? "active" : ""}" data-action="nav" data-view="${view}"><span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span></button>`;
  }

  function pageHeader(title, subtitle, actions = "") {
    return `
      <header class="topbar">
        <div>
          <h2 class="page-title">${esc(title)}</h2>
          <p class="page-subtitle">${esc(subtitle)}</p>
        </div>
        ${actions ? `<div class="toolbar">${actions}</div>` : ""}
      </header>
    `;
  }

  function renderDashboard(player) {
    const level = getLevel(player.xp);
    const next = nextLevel(player.xp);
    const accuracy = percent(player.correct, player.correct + player.wrong);
    const recent = player.history.slice(0, 5);
    return `
      ${pageHeader("Painel do Aluno", "Acompanhe sua evolução, competências e próximas missões.", `<button class="btn primary" data-action="nav" data-view="missions">Abrir missões</button>`)}
      <section class="grid cols-4">
        ${metric("Nível", level.nivel, level.cargo)}
        ${metric("XP", player.xp, next.nivel === level.nivel ? "Nível máximo" : `${next.xp - player.xp} XP para o próximo nível`)}
        ${metric("Precisão", `${accuracy}%`, `${player.correct} acertos · ${player.wrong} erros`)}
        ${metric("Sequência", player.streak, `Recorde: ${player.bestStreak}`)}
      </section>
      <section class="grid cols-2" style="margin-top:1rem">
        <div class="panel pad">
          <div class="split">
            <h2>Progresso de nível</h2>
            <span class="badge">${levelProgress(player)}%</span>
          </div>
          <div class="progress"><span style="width:${levelProgress(player)}%"></span></div>
          <p class="muted">Cargo atual: ${esc(level.cargo)}. Próximo marco: ${esc(next.cargo)}.</p>
        </div>
        <div class="panel pad">
          <h2>Resumo</h2>
          <div class="grid cols-3">
            ${metric("Missões", countCompleted(player), "concluídas")}
            ${metric("Conquistas", player.achievements.length, `de ${ACHIEVEMENTS.length}`)}
            ${metric("Pontuação", player.score, "pontos")}
          </div>
        </div>
      </section>
      <section class="grid cols-2" style="margin-top:1rem">
        <div class="panel pad">
          <h2>Competências</h2>
          ${renderCompetencies(player)}
        </div>
        <div class="panel pad">
          <h2>Últimas atividades</h2>
          ${recent.length ? `<ul class="compact-list">${recent.map(item => `<li>${item.correct ? `<span class="success-text">Acertou</span>` : `<span class="danger-text">Revisou</span>`} ${esc(item.title)} · ${formatDate(item.at)}</li>`).join("")}</ul>` : `<div class="empty-state">Nenhuma atividade registrada ainda.</div>`}
        </div>
      </section>
      <section class="panel pad" style="margin-top:1rem">
        <div class="split">
          <div>
            <h2>Expedição Windows</h2>
            <p class="muted">Uma sequência de 8 ações reais para navegar pelo Windows, observar e responder.</p>
          </div>
          <button class="btn warning" data-action="start-expedition">Iniciar expedição</button>
        </div>
      </section>
    `;
  }

  function metric(label, value, note) {
    return `
      <div class="metric-card">
        <div class="metric-label">${esc(label)}</div>
        <div class="metric-value">${esc(value)}</div>
        <div class="metric-note">${esc(note)}</div>
      </div>
    `;
  }

  function renderCompetencies(player) {
    return COMPETENCIES.map(item => {
      const value = competencyPercent(player, item.id);
      return `
        <div class="competency-row">
          <div>
            <div class="name">${esc(item.nome)}</div>
            <div class="progress thin-progress"><span style="width:${value}%"></span></div>
          </div>
          <div class="value">${value}%</div>
        </div>
      `;
    }).join("");
  }

  function renderMissions(player) {
    const filters = [
      ["todas", "Todas"],
      ["teoricas", "Teóricas"],
      ["praticas", "Práticas"],
      ["facil", "Fácil"],
      ["medio", "Médio"],
      ["dificil", "Difícil"],
      ["nova", "Nova descoberta"]
    ];
    return `
      ${pageHeader("Central de Missões", "Escolha uma missão, execute as ações reais quando solicitado e avance pelo mapa de aprendizagem.", `<button class="btn" data-action="start-quick">Novo desafio rápido</button><button class="btn warning" data-action="review-errors">Revisar meus erros</button>`)}
      <section class="toolbar" aria-label="Filtros de missão" style="margin-bottom:1rem">
        ${filters.map(([id, label]) => `<button class="btn small ${missionFilter === id ? "primary" : ""}" data-action="set-mission-filter" data-filter="${id}" aria-pressed="${missionFilter === id}">${label}</button>`).join("")}
      </section>
      ${MODULES.map(module => {
        const progress = moduleProgress(module.id, player);
        const missions = MISSIONS.filter(mission => mission.modulo === module.id && missionMatchesFilter(mission, player));
        if (!missions.length) return "";
        return `
          <section class="module-section">
            <div class="module-header">
              <div>
                <h2>${esc(module.nome)} · ${esc(module.subtitulo)}</h2>
                <div class="module-meta">${progress.completed}/${progress.total} missões concluídas · ${progress.pct}% · ${progress.xp} XP registrado</div>
              </div>
              <div class="progress thin-progress" style="width:min(280px,100%)"><span style="width:${progress.pct}%"></span></div>
            </div>
            <div class="mission-grid">
              ${missions.map(mission => renderMissionCard(mission, player)).join("")}
            </div>
          </section>
        `;
      }).join("")}
    `;
  }

  function missionMatchesFilter(mission, player) {
    const done = player.completedMissions[mission.id];
    if (missionFilter === "todas") return true;
    if (missionFilter === "teoricas") return mission.banco.every(question => !isPractical(question));
    if (missionFilter === "praticas") return mission.banco.some(question => isPractical(question));
    if (missionFilter === "facil") return mission.dificuldade === 1;
    if (missionFilter === "medio") return mission.dificuldade === 2;
    if (missionFilter === "dificil") return mission.dificuldade === 3;
    if (missionFilter === "nova") return Boolean(mission.descoberta && !done);
    return true;
  }

  function renderMissionCard(mission, player) {
    const unlocked = isUnlocked(mission, player);
    const done = player.completedMissions[mission.id];
    const status = done ? "Concluída" : unlocked ? "Disponível" : "Bloqueada";
    return `
      <button class="mission-card ${unlocked ? "" : "locked"}" data-action="start-mission" data-id="${mission.id}" ${unlocked ? "" : "disabled"} aria-label="Missão ${mission.numero}: ${esc(mission.titulo)}">
        <span class="mission-number">Missão ${String(mission.numero).padStart(2, "0")}</span>
        <h3>${esc(mission.titulo)}</h3>
        <div class="mission-meta">
          <span class="badge ${difficultyClass(mission.dificuldade)}">${difficultyLabel(mission.dificuldade)}</span>
          <span class="badge">${mission.etapas} etapas</span>
          <span class="badge">${missionXpPotential(mission)} XP base</span>
          ${mission.descoberta && !done ? `<span class="badge new">Nova descoberta</span>` : ""}
        </div>
        <p class="muted">${TYPE_LABELS[mission.banco[0].tipo]} e outros desafios de ${esc(mission.categoria)}.</p>
        <div class="status-line">
          <strong>${status}</strong>
          <span>${done ? `Melhor: ${done.bestAccuracy}%` : unlocked ? "Pronta para iniciar" : unlockText(mission)}</span>
        </div>
      </button>
    `;
  }

  function unlockText(mission) {
    const rule = mission.desbloqueio || {};
    if (rule.completed?.length) return "Requer missões anteriores";
    if (rule.xp) return `Requer ${rule.xp} XP`;
    return "Bloqueada";
  }

  function renderRunner() {
    if (!currentRun) return renderDashboard(getPlayer());
    const question = currentQuestion();
    const progress = percent(currentRun.index, currentRun.questions.length);
    const actions = `<button class="btn ghost" data-action="abort-run">Sair da missão</button>`;
    if (!question) return "";
    return `
      ${pageHeader(currentRun.title, `Etapa ${currentRun.index + 1} de ${currentRun.questions.length}.`, actions)}
      <section class="runner">
        <div class="runner-top">
          <div class="badge">${esc(TYPE_LABELS[question.tipo])}</div>
          <div class="badge ${difficultyClass(question.dificuldade)}">${difficultyLabel(question.dificuldade)} · ${baseQuestionXp(question)} XP</div>
          ${question.tempoLimite ? `<div class="badge">Tempo-alvo: ${question.tempoLimite}s</div>` : ""}
        </div>
        <div class="progress"><span style="width:${progress}%"></span></div>
        <article class="question-card">
          <div class="question-head">
            <p class="eyebrow">${esc(question.categoria)} · ${esc(COMPETENCIES.find(c => c.id === question.competencia)?.nome || question.competencia)}</p>
            <h2 class="question-title">${esc(question.titulo)}</h2>
          </div>
          <div class="question-body">
            ${isPractical(question) ? renderPractice(question) : ""}
            ${question.state.practiceReady ? renderQuestionContent(question) : ""}
          </div>
        </article>
      </section>
    `;
  }

  function renderPractice(question) {
    return `
      <div class="practice-box">
        <div class="practice-head">Agora é no seu computador</div>
        <ol class="practice-steps">
          ${question.instrucao.map(step => `<li>${esc(step)}</li>`).join("")}
        </ol>
        <p class="practice-note">Não feche esta página. Alterne entre o navegador e o Windows com Alt + Tab.</p>
        ${question.state.practiceReady ? "" : `<div style="padding:0 1rem 1rem"><button class="btn primary" data-action="practice-done">Já fiz</button></div>`}
      </div>
    `;
  }

  function renderQuestionContent(question) {
    const selected = question.state.selected;
    const answered = question.state.answered;
    if (question.tipo === "ordem") return renderOrderQuestion(question);
    return `
      <p class="question-text">${esc(question.pergunta)}</p>
      <div class="option-grid" role="list">
        ${question.shuffled.map((option, index) => {
          const stateClass = answered
            ? option.correta ? "correct" : index === selected ? "wrong" : ""
            : index === selected ? "selected" : "";
          return `
            <button class="option-card ${stateClass}" data-action="choose-option" data-index="${index}" ${answered ? "disabled" : ""}>
              <span class="option-letter">${"ABCD"[index] || index + 1}</span>
              <span>${esc(option.texto)}</span>
            </button>
          `;
        }).join("")}
      </div>
      ${renderHints(question)}
      ${question.state.retryOffered ? renderRetryFeedback(question) : ""}
      ${answered ? renderFeedback(question) : ""}
    `;
  }

  function renderOrderQuestion(question) {
    const answered = question.state.answered;
    const expected = question.ordem.map(item => item.id).join("|");
    const current = question.state.order.map(item => item.id).join("|");
    return `
      <p class="question-text">${esc(question.pergunta)}</p>
      <div class="option-grid" role="list" aria-label="Etapas para ordenar">
        ${question.state.order.map((item, index) => {
          const isRightPlace = answered && question.ordem[index]?.id === item.id;
          return `
            <div class="option-card ${answered ? isRightPlace ? "correct" : "wrong" : ""}">
              <span class="option-letter">${index + 1}</span>
              <span>${esc(item.texto)}</span>
              <span class="toolbar" style="justify-content:end">
                <button class="btn small" data-action="move-order" data-dir="up" data-index="${index}" ${answered || index === 0 ? "disabled" : ""}>Subir</button>
                <button class="btn small" data-action="move-order" data-dir="down" data-index="${index}" ${answered || index === question.state.order.length - 1 ? "disabled" : ""}>Descer</button>
              </span>
            </div>
          `;
        }).join("")}
      </div>
      ${renderHints(question)}
      ${answered ? renderFeedback(question) : `<button class="btn primary" data-action="submit-order" data-correct="${expected === current}">Confirmar ordem</button>`}
    `;
  }

  function moveOrderItem(index, direction) {
    const question = currentQuestion();
    if (!question || question.tipo !== "ordem" || question.state.answered) return;
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= question.state.order.length) return;
    [question.state.order[index], question.state.order[nextIndex]] = [question.state.order[nextIndex], question.state.order[index]];
    render();
  }

  function submitOrderQuestion() {
    const question = currentQuestion();
    if (!question || question.tipo !== "ordem" || question.state.answered) return;
    const correct = question.ordem.map(item => item.id).join("|") === question.state.order.map(item => item.id).join("|");
    applyAnswer(question, correct);
    render();
  }

  function renderHints(question) {
    const visible = question.dicas.slice(0, question.state.hintsShown);
    const canShow = question.dicas.length > question.state.hintsShown && !question.state.answered;
    if (!question.dicas.length) return "";
    return `
      <div class="hint-list">
        ${visible.map((hint, index) => `<div class="hint-item"><strong>Dica ${index + 1}:</strong> ${esc(hint)}</div>`).join("")}
      </div>
      ${canShow ? `<button class="btn small warning" data-action="show-hint">Ver dica ${question.state.hintsShown + 1}</button>` : ""}
    `;
  }

  function renderRetryFeedback(question) {
    return `
      <div class="feedback error">
        <h3>Revise o que apareceu na tela</h3>
        <p>Essa missão prática permite uma nova tentativa antes de revelar a resposta. Volte ao Windows, observe novamente e tente responder outra vez.</p>
        <button class="btn warning" data-action="retry-question">Tentar novamente</button>
      </div>
    `;
  }

  function renderFeedback(question) {
    const correct = question.state.correct;
    const correctText = question.shuffled.find(option => option.correta)?.texto || "Resposta registrada";
    return `
      <div class="feedback ${correct ? "success" : "error"}">
        <h3>${correct ? "Boa investigação." : "Revise o caminho."}</h3>
        <p>${correct ? "Sua resposta está correta." : `A resposta correta é: ${esc(correctText)}.`}</p>
        <p>${esc(question.explicacao)}</p>
        <p class="muted">${question.state.earnedXp > 0 ? `XP ganho nesta resposta: ${question.state.earnedXp}.` : "Esta questão não concedeu novo XP porque já foi pontuada antes ou foi respondida sem acerto."}</p>
        <button class="btn primary" data-action="next-question">${currentRun.index === currentRun.questions.length - 1 ? "Ver resultado" : "Próxima etapa"}</button>
      </div>
    `;
  }

  function renderResult() {
    const player = getPlayer();
    if (!currentRun?.summary) return renderDashboard(player);
    const summary = currentRun.summary;
    const compRows = Object.entries(summary.byCompetence).map(([id, data]) => ({
      id,
      nome: COMPETENCIES.find(item => item.id === id)?.nome || id,
      pct: percent(data.correct, data.total)
    })).sort((a, b) => b.pct - a.pct);
    const mastered = compRows.filter(item => item.pct >= 80);
    const review = compRows.filter(item => item.pct < 80);
    return `
      ${pageHeader("Missão Concluída", "Resultado da tentativa e recomendações de revisão.")}
      <section class="result-hero">
        <h2>${esc(summary.title)}</h2>
        <p class="muted">${summary.kind === "expedition" ? "Você concluiu uma expedição real pelo Windows." : "Você concluiu mais uma etapa da central de treinamento."}</p>
      </section>
      <section class="grid cols-4" style="margin-top:1rem">
        ${metric("Pontuação", summary.score, `Bônus XP: ${summary.bonusXp}`)}
        ${metric("XP", summary.xp + summary.bonusXp, `${summary.xp} por questões`)}
        ${metric("Acertos", summary.correct, `${summary.wrong} erros`)}
        ${metric("Precisão", `${summary.accuracy}%`, `${summary.duration}s de atividade`)}
      </section>
      <section class="grid cols-2" style="margin-top:1rem">
        <div class="panel pad">
          <h2>Você dominou</h2>
          ${mastered.length ? `<ul class="compact-list">${mastered.map(item => `<li>${esc(item.nome)} · ${item.pct}%</li>`).join("")}</ul>` : `<p class="muted">Ainda não houve competência acima de 80% nesta tentativa.</p>`}
        </div>
        <div class="panel pad">
          <h2>Vale revisar</h2>
          ${review.length ? `<ul class="compact-list">${review.map(item => `<li>${esc(item.nome)} · ${item.pct}%</li>`).join("")}</ul>` : `<p class="muted">Excelente: nenhuma competência abaixo de 80% nesta tentativa.</p>`}
        </div>
      </section>
      <div class="toolbar" style="margin-top:1rem">
        <button class="btn primary" data-action="nav" data-view="missions">Voltar ao mapa</button>
        <button class="btn" data-action="repeat-last">Repetir missão</button>
        <button class="btn ghost" data-action="nav" data-view="profile">Ver perfil</button>
      </div>
    `;
  }

  function renderQuick() {
    return `
      ${pageHeader("Desafio Rápido", "Cinco perguntas sorteadas de competências diferentes para aquecer a turma.", `<button class="btn primary" data-action="start-quick">Novo desafio</button>`)}
      <section class="panel pad">
        <h2>Rodada curta</h2>
        <p class="muted">O desafio usa o mesmo banco das missões principais. Se uma questão já concedeu XP antes, ela não dará XP infinito, mas pode melhorar sua precisão e pontuação limitada.</p>
        <button class="btn warning" data-action="start-quick">Gerar desafio agora</button>
      </section>
    `;
  }

  function renderSimulators(player) {
    if (!toolSituation) toolSituation = sample(TOOL_SITUATIONS, 1)[0];
    return `
      ${pageHeader("Simuladores", "Pratique escolha de ferramentas e resolução de chamados em ordem lógica.", `<button class="btn" data-action="new-tool-situation">Nova situação</button>`)}
      <section class="grid cols-2">
        <div class="panel pad">
          <h2>Qual ferramenta usar?</h2>
          <p class="question-text">${esc(toolSituation.texto)}</p>
          <div class="tool-grid">
            ${sample(TOOL_CARDS, TOOL_CARDS.length).map(tool => `<button class="tool-card" data-action="choose-tool" data-tool="${esc(tool)}"><strong>${esc(tool)}</strong></button>`).join("")}
          </div>
        </div>
        <div class="panel pad">
          <div class="split">
            <div>
              <h2>Central de Chamados</h2>
              <p class="muted">Escolha um chamado e resolva as ações na ordem.</p>
            </div>
            <button class="btn small" data-action="random-ticket">Sortear</button>
          </div>
          <div class="ticket-grid">
            ${TICKETS.map(ticket => `<button class="ticket-card tool-card" data-action="start-ticket" data-id="${ticket.id}"><strong>Chamado #${ticket.id}</strong><br><span class="muted">${esc(ticket.titulo)}</span></button>`).join("")}
          </div>
        </div>
      </section>
      ${ticketSession ? renderTicketSession() : ""}
    `;
  }

  function renderTicketSession() {
    const ticket = ticketSession.ticket;
    const next = ticket.passos[ticketSession.index];
    const actions = shuffle([...ticket.passos, ...ticket.distratores]);
    return `
      <section class="panel pad" style="margin-top:1rem">
        <div class="split">
          <div>
            <h2>Chamado #${ticket.id} · ${esc(ticket.titulo)}</h2>
            <p class="muted">${esc(ticket.descricao)}</p>
          </div>
          <span class="badge">Etapa ${Math.min(ticketSession.index + 1, ticket.passos.length)} de ${ticket.passos.length}</span>
        </div>
        ${ticketSession.done ? `<div class="feedback success"><h3>Chamado resolvido</h3><p>Você organizou a sequência de atendimento com segurança.</p></div>` : `<p class="question-text">Escolha a próxima ação adequada.</p>`}
        <div class="option-grid">
          ${actions.map(action => `<button class="ticket-action ${ticketSession.completedSteps.includes(action) ? "done" : ""}" data-action="ticket-step" data-step="${esc(action)}" ${ticketSession.done || ticketSession.completedSteps.includes(action) ? "disabled" : ""}>${esc(action)}</button>`).join("")}
        </div>
        ${ticketSession.feedback ? `<div class="feedback ${ticketSession.feedback.ok ? "success" : "error"}"><p>${esc(ticketSession.feedback.text)}</p></div>` : ""}
      </section>
    `;
  }

  function renderConcepts() {
    return `
      ${pageHeader("Você Sabia?", "Conceitos complementares para consultar sem obrigação de pontuar.")}
      <section class="concept-grid">
        ${CONCEPTS.map(concept => `
          <article class="concept-card">
            <h2>${esc(concept.nome)}</h2>
            <p>${esc(concept.explicacao)}</p>
            <p class="muted"><strong>Exemplo:</strong> ${esc(concept.exemplo)}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderProfile(player) {
    const accuracy = percent(player.correct, player.correct + player.wrong);
    const review = COMPETENCIES.map(item => ({ ...item, pct: competencyPercent(player, item.id), total: player.competencies[item.id].total }))
      .filter(item => item.total > 0)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 2);
    return `
      ${pageHeader("Meu Perfil", "Seu histórico individual, conquistas e pontos de revisão.", `<button class="btn warning" data-action="review-errors">Revisar meus erros</button><button class="btn danger" data-action="reset-current">Reiniciar meu progresso</button>`)}
      <section class="grid cols-4">
        ${metric("Nível", getLevel(player.xp).nivel, getLevel(player.xp).cargo)}
        ${metric("XP", player.xp, "acumulado")}
        ${metric("Precisão", `${accuracy}%`, `${player.correct + player.wrong} respostas`)}
        ${metric("Missões", countCompleted(player), "concluídas")}
      </section>
      <section class="grid cols-2" style="margin-top:1rem">
        <div class="panel pad">
          <h2>Competências</h2>
          ${renderCompetencies(player)}
        </div>
        <div class="panel pad">
          <h2>Pontos a revisar</h2>
          ${review.length ? `<ul class="compact-list">${review.map(item => `<li>${esc(item.nome)}: ${item.pct}%</li>`).join("")}</ul>` : `<p class="muted">Responda mais desafios para gerar recomendações.</p>`}
          <h2 style="margin-top:1rem">Recordes</h2>
          <ul class="compact-list">
            <li>Maior sequência: ${player.bestStreak}</li>
            <li>Pontuação: ${player.score}</li>
            <li>Última atividade: ${formatDate(player.lastActivity)}</li>
          </ul>
        </div>
      </section>
      <section class="panel pad" style="margin-top:1rem">
        <h2>Conquistas</h2>
        <div class="achievement-grid">
          ${ACHIEVEMENTS.map(achievement => {
            const unlocked = player.achievements.includes(achievement.id);
            return `<article class="achievement ${unlocked ? "" : "locked"}"><h3>${esc(achievement.nome)}</h3><p>${esc(achievement.desc)}</p><span class="badge">${unlocked ? "Desbloqueada" : "Pendente"}</span></article>`;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderRanking() {
    const ranked = [...players].map(ensurePlayerShape).sort((a, b) => b.xp - a.xp || b.score - a.score || percent(b.correct, b.correct + b.wrong) - percent(a.correct, a.correct + a.wrong));
    return `
      ${pageHeader("Ranking Local", "Classificação salva apenas neste navegador.", `<button class="btn" data-action="nav" data-view="teacher">Modo Professor</button>`)}
      <div class="table-wrap">
        <table>
          <thead><tr><th>Posição</th><th>Nome</th><th>Nível</th><th>XP</th><th>Missões</th><th>Precisão</th><th>Pontuação</th></tr></thead>
          <tbody>
            ${ranked.map((player, index) => `<tr><td>${index + 1}</td><td>${esc(player.name)}</td><td>${getLevel(player.xp).nivel}</td><td>${player.xp}</td><td>${countCompleted(player)}</td><td>${percent(player.correct, player.correct + player.wrong)}%</td><td>${player.score}</td></tr>`).join("") || `<tr><td colspan="7">Nenhum jogador registrado.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderTeacher() {
    const selected = teacherDetailId ? getPlayer(teacherDetailId) : null;
    return `
      ${pageHeader("Modo Professor", "Relatórios locais, exportação CSV e controles para aula.", `
        <button class="btn" data-action="export-csv">Exportar CSV</button>
        <button class="btn warning" data-action="toggle-unlock-all">${prefs.unlockAll ? "Rebloquear mapa" : "Desbloquear todas"}</button>
        <button class="btn danger" data-action="clear-ranking">Zerar ranking</button>
      `)}
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nome</th><th>Nível</th><th>XP</th><th>Acertos</th><th>Erros</th><th>Precisão</th><th>Missões</th><th>Pontuação</th><th>Última atividade</th><th>Ação</th></tr></thead>
          <tbody>
            ${players.map(player => `<tr><td>${esc(player.name)}</td><td>${getLevel(player.xp).nivel}</td><td>${player.xp}</td><td>${player.correct}</td><td>${player.wrong}</td><td>${percent(player.correct, player.correct + player.wrong)}%</td><td>${countCompleted(player)}</td><td>${player.score}</td><td>${formatDate(player.lastActivity)}</td><td><button class="btn small" data-action="teacher-detail" data-id="${player.id}">Ver detalhes</button></td></tr>`).join("") || `<tr><td colspan="10">Nenhum aluno salvo.</td></tr>`}
          </tbody>
        </table>
      </div>
      ${renderQuestionErrorStats()}
      ${selected ? renderTeacherDetail(selected) : ""}
      <section class="panel pad" style="margin-top:1rem">
        <button class="btn danger" data-action="reset-all">Reset geral deste navegador</button>
      </section>
    `;
  }

  function renderLab(player) {
    if (labRun) return renderLabActivity(player);
    const doneCount = Object.values(player.labStats).reduce((sum, stat) => sum + stat.total, 0);
    return `
      ${pageHeader("Laboratório Interativo", "Atividades de operar, investigar, organizar, associar, digitar e decidir.", `<button class="btn" data-action="start-lab-random">Sortear laboratório</button>`)}
      <section class="grid cols-3">
        ${metric("Formatos", Object.keys(LAB_TYPE_LABELS).length, "tipos interativos")}
        ${metric("Atividades", LAB_ACTIVITIES.length, "laboratórios disponíveis")}
        ${metric("Registros", doneCount, "tentativas salvas")}
      </section>
      <section class="grid cols-2" style="margin-top:1rem">
        <div class="panel pad">
          <h2>Desempenho por habilidade</h2>
          ${renderSkillMetrics(player)}
        </div>
        <div class="panel pad">
          <h2>Formatos praticados</h2>
          ${renderLabTypeStats(player)}
        </div>
      </section>
      <section class="concept-grid" style="margin-top:1rem">
        ${LAB_ACTIVITIES.map(activity => `
          <article class="concept-card">
            <span class="badge">${esc(LAB_TYPE_LABELS[activity.type])}</span>
            <h2>${esc(activity.title)}</h2>
            <p>${esc(activity.subtitle)}</p>
            <p class="muted">${activity.xp} XP · ${esc(SKILL_METRICS.find(s => s.id === activity.skill)?.nome || activity.skill)}</p>
            <button class="btn primary" data-action="start-lab" data-id="${activity.id}">Abrir atividade</button>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderSkillMetrics(player) {
    return SKILL_METRICS.map(skill => {
      const data = player.skillMetrics[skill.id] || { correct: 0, total: 0 };
      const value = percent(data.correct, data.total);
      return `
        <div class="competency-row">
          <div>
            <div class="name">${esc(skill.nome)}</div>
            <div class="progress thin-progress"><span style="width:${value}%"></span></div>
          </div>
          <div class="value">${value}%</div>
        </div>
      `;
    }).join("");
  }

  function renderLabTypeStats(player) {
    const rows = Object.entries(LAB_TYPE_LABELS).filter(([type]) => (player.labStats[type]?.total || 0) > 0);
    if (!rows.length) return `<div class="empty-state">Nenhum formato registrado ainda.</div>`;
    return rows.map(([type, label]) => {
      const stat = player.labStats[type];
      const value = percent(stat.correct, stat.total);
      return `
        <div class="competency-row">
          <div>
            <div class="name">${esc(label)}</div>
            <div class="progress thin-progress"><span style="width:${value}%"></span></div>
          </div>
          <div class="value">${value}%</div>
        </div>
      `;
    }).join("");
  }

  function startLab(id) {
    const activity = LAB_ACTIVITIES.find(item => item.id === id);
    if (!activity) return;
    labRun = createLabRun(activity);
    currentView = "lab";
  }

  function createLabRun(activity) {
    const state = {
      placements: {},
      selectedLeft: null,
      pairs: {},
      log: [],
      clicked: [],
      checked: {},
      evidence: {},
      revealed: 0,
      selected: null,
      branchNode: activity.start || "inicio",
      branchGood: 0,
      branchPath: [],
      feedback: null,
      completed: false,
      result: null
    };
    if (["drag_files", "content_drag"].includes(activity.type)) state.items = shuffle(activity.items.map(item => ({ ...item })));
    if (activity.type === "classify") state.items = shuffle(activity.cards.map(item => ({ ...item })));
    if (["order_steps", "procedure", "path_build"].includes(activity.type)) state.order = shuffle(activity.items.map(item => ({ ...item })));
    if (activity.type === "associate") {
      state.left = shuffle(activity.pairs.map((pair, index) => ({ id: `p${index}`, text: pair[0] })));
      state.right = shuffle(activity.pairs.map((pair, index) => ({ id: `p${index}`, text: pair[1] })));
    }
    if (activity.type === "command_input") state.prompts = shuffle(activity.prompts.map(item => ({ ...item })));
    if (activity.type === "explorer") {
      state.files = activity.files.map(item => ({ ...item, deleted: false }));
      state.folders = ["ADMINISTRATIVO", "FINANCEIRO", "CLIENTES", "BACKUP"];
      state.search = "";
      state.showHidden = false;
      state.actions = {};
    }
    if (activity.type === "office_shift") state.office = { eficiencia: 0, seguranca: 0, organização: 0, diagnóstico: 0, resolved: {} };
    return { activity, state, startedAt: Date.now() };
  }

  function renderLabActivity() {
    const activity = labRun.activity;
    const renderers = {
      drag_files: renderLabDrag,
      content_drag: renderLabDrag,
      order_steps: renderLabOrder,
      associate: renderLabAssociation,
      command_input: renderLabCommandInput,
      terminal: renderLabTerminal,
      explorer: renderLabExplorer,
      settings: renderLabSettings,
      error_hunt: renderLabErrorHunt,
      classify: renderLabClassify,
      procedure: renderLabOrder,
      branching: renderLabBranching,
      checklist: renderLabChecklist,
      clue: renderLabClue,
      fill_blank: renderLabFillBlank,
      path_build: renderLabOrder,
      task_manager: renderLabTaskManager,
      multiselect: renderLabMultiselect,
      open_response: renderLabOpenResponse,
      office_shift: renderLabOfficeShift
    };
    return `
      ${pageHeader(activity.title, activity.subtitle, `<button class="btn ghost" data-action="lab-back">Voltar ao laboratório</button><button class="btn" data-action="lab-reset">Tentar novamente</button>`)}
      <section class="panel pad">
        <div class="mission-meta" style="margin-bottom:1rem">
          <span class="badge">${esc(LAB_TYPE_LABELS[activity.type])}</span>
          <span class="badge">${activity.xp} XP</span>
          <span class="badge">${esc(SKILL_METRICS.find(s => s.id === activity.skill)?.nome || activity.skill)}</span>
        </div>
        ${(renderers[activity.type] || renderLabUnsupported)(activity)}
        ${labRun.state.feedback ? `<div class="feedback ${labRun.state.result?.ratio >= 0.75 ? "success" : "error"}"><h3>${labRun.state.result?.ratio >= 0.75 ? "Registro concluído" : "Vale revisar"}</h3><p>${esc(labRun.state.feedback)}</p></div>` : ""}
      </section>
    `;
  }

  function renderLabUnsupported() {
    return `<div class="empty-state">Formato ainda não disponível.</div>`;
  }

  function renderLabDropZone(label) {
    const entries = Object.entries(labRun.state.placements).filter(([, target]) => target === label).map(([id]) => labItemLabel(id));
    return `
      <div class="lab-drop" data-drop-target="${esc(label)}">
        <h3>${esc(label)}</h3>
        ${entries.length ? entries.map(item => `<span class="badge">${esc(item)}</span>`).join("") : `<p class="muted">Arraste itens para cá.</p>`}
      </div>
    `;
  }

  function renderLabDrag(activity) {
    return `
      <div class="grid cols-2">
        <div>
          <h2>Itens</h2>
          <div class="lab-card-list">
            ${labRun.state.items.map(item => `
              <div class="lab-draggable" draggable="true" data-drag-id="${item.id}">
                <strong>${esc(item.name || item.text)}</strong>
                ${item.content ? `<button class="btn small" data-action="lab-show-content" data-id="${item.id}">Abrir conteúdo</button>` : ""}
                <div class="toolbar">${activity.folders.map(folder => `<button class="btn small" data-action="lab-place" data-id="${item.id}" data-target="${esc(folder)}">${esc(folder)}</button>`).join("")}</div>
              </div>
            `).join("")}
          </div>
        </div>
        <div>
          <h2>Pastas</h2>
          <div class="lab-drop-grid">${activity.folders.map(renderLabDropZone).join("")}</div>
        </div>
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir classificação</button>
    `;
  }

  function labItemLabel(id) {
    const items = labRun.state.items || labRun.activity.items || labRun.activity.cards || [];
    return items.find(item => item.id === id)?.name || items.find(item => item.id === id)?.text || id;
  }

  function renderLabClassify(activity) {
    return `
      <div class="grid cols-2">
        <div>
          <h2>Cartões</h2>
          <div class="lab-card-list">
            ${labRun.state.items.map(item => `
              <div class="lab-draggable" draggable="true" data-drag-id="${item.id}">
                <strong>${esc(item.text)}</strong>
                <div class="toolbar">${activity.categories.map(cat => `<button class="btn small" data-action="lab-place" data-id="${item.id}" data-target="${esc(cat)}">${esc(cat)}</button>`).join("")}</div>
              </div>
            `).join("")}
          </div>
        </div>
        <div>
          <h2>Categorias</h2>
          <div class="lab-drop-grid">${activity.categories.map(renderLabDropZone).join("")}</div>
        </div>
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir cartões</button>
    `;
  }

  function renderLabOrder(activity) {
    return `
      <p class="question-text">Organize a sequência usando arrastar e soltar ou os botões.</p>
      <div class="lab-card-list">
        ${labRun.state.order.map((item, index) => `
          <div class="option-card lab-draggable" draggable="true" data-drag-id="${item.id}" data-order-index="${index}">
            <span class="option-letter">${index + 1}</span>
            <span>${esc(item.text)}</span>
            <span class="toolbar">
              <button class="btn small" data-action="lab-order-move" data-index="${index}" data-dir="up" ${index === 0 ? "disabled" : ""}>Subir</button>
              <button class="btn small" data-action="lab-order-move" data-index="${index}" data-dir="down" ${index === labRun.state.order.length - 1 ? "disabled" : ""}>Descer</button>
            </span>
          </div>
        `).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir ordem</button>
    `;
  }

  function renderLabAssociation() {
    const pairedRight = new Set(Object.values(labRun.state.pairs));
    return `
      <div class="grid cols-2">
        <div>
          <h2>Coluna A</h2>
          <div class="lab-card-list">
            ${labRun.state.left.map(item => `<button class="tool-card ${labRun.state.selectedLeft === item.id ? "selected" : ""}" data-action="lab-assoc-left" data-id="${item.id}" ${labRun.state.pairs[item.id] ? "disabled" : ""}>${esc(item.text)}</button>`).join("")}
          </div>
        </div>
        <div>
          <h2>Coluna B</h2>
          <div class="lab-card-list">
            ${labRun.state.right.map(item => `<button class="tool-card ${pairedRight.has(item.id) ? "done" : ""}" data-action="lab-assoc-right" data-id="${item.id}" ${pairedRight.has(item.id) ? "disabled" : ""}>${esc(item.text)}</button>`).join("")}
          </div>
        </div>
      </div>
      <button class="btn primary" data-action="lab-submit">Finalizar associação</button>
    `;
  }

  function renderLabCommandInput(activity) {
    return `
      <div class="stack">
        ${activity.prompts ? labRun.state.prompts.map((item, index) => `
          <label class="panel pad">
            <strong>${esc(item.prompt)}</strong>
            <input class="text-input lab-command-input" data-index="${index}" placeholder="Digite o comando">
          </label>
        `).join("") : ""}
      </div>
      <button class="btn primary" data-action="lab-submit">Validar comandos</button>
    `;
  }

  function renderLabTerminal(activity) {
    return `
      <div class="terminal-box" aria-label="Terminal simulado">
        <p>C:\\Users\\Aluno&gt; <span class="muted">terminal simulado, sem executar comandos reais</span></p>
        ${labRun.state.log.map(line => `<pre>${esc(line)}</pre>`).join("")}
      </div>
      <div class="toolbar" style="margin-top:1rem">
        <input class="text-input" id="lab-terminal-input" placeholder="Digite um comando, ex.: ipconfig">
        <button class="btn" data-action="lab-terminal-run">Executar</button>
      </div>
      <label class="field-stack">
        <span>Diagnóstico final</span>
        <input class="text-input" id="lab-terminal-conclusion" placeholder="Ex.: DNS, DHCP, rede local">
      </label>
      <button class="btn primary" data-action="lab-submit">Registrar diagnóstico</button>
    `;
  }

  function renderLabExplorer() {
    const state = labRun.state;
    const visibleFiles = state.files.filter(file => !file.deleted && (state.showHidden || !file.hidden) && file.name.toLowerCase().includes(state.search.toLowerCase()));
    return `
      <div class="explorer-sim">
        <aside>
          <h3>Pastas</h3>
          <ul class="compact-list"><li>Downloads</li>${state.folders.map(folder => `<li>${esc(folder)}</li>`).join("")}</ul>
          <button class="btn small" data-action="lab-explorer-action" data-step="createFolders">+ Nova pasta</button>
          <button class="btn small" data-action="lab-explorer-action" data-step="backup">Criar backup</button>
          <button class="btn small" data-action="lab-explorer-action" data-step="zip">Compactar</button>
        </aside>
        <div>
          <div class="toolbar">
            <input class="text-input" id="lab-explorer-search" value="${esc(state.search)}" placeholder="Pesquisar: *.pdf, relatorio, 2026">
            <button class="btn" data-action="lab-explorer-search">Pesquisar</button>
            <button class="btn" data-action="lab-explorer-toggle-hidden">${state.showHidden ? "Ocultar ocultos" : "Mostrar ocultos"}</button>
          </div>
          <div class="table-wrap" style="margin-top:1rem">
            <table>
              <thead><tr><th>Nome</th><th>Tipo</th><th>Data</th><th>Tamanho</th><th>Ação</th></tr></thead>
              <tbody>${visibleFiles.map(file => `<tr><td>${esc(file.name)}${file.hidden ? " (oculto)" : ""}</td><td>${esc(file.type)}</td><td>${esc(file.date)}</td><td>${esc(file.size)}</td><td><button class="btn small" data-action="lab-explorer-action" data-step="move">Mover</button><button class="btn small" data-action="lab-explorer-action" data-step="rename">Renomear</button></td></tr>`).join("")}</tbody>
            </table>
          </div>
          <p class="muted">Ações registradas: ${Object.keys(state.actions).join(", ") || "nenhuma"}</p>
        </div>
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir organização</button>
    `;
  }

  function renderLabSettings(activity) {
    return `
      <p class="question-text">${esc(activity.scenario)}</p>
      <div class="settings-sim">
        <h2>${esc(activity.group)}</h2>
        ${activity.options.map(option => `
          <label class="option-card">
            <input type="radio" name="lab-setting" value="${esc(option)}" ${labRun.state.selected === option ? "checked" : ""} data-action="lab-setting-select">
            <span>${esc(option)}</span>
          </label>
        `).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Aplicar configuração</button>
    `;
  }

  function renderLabErrorHunt(activity) {
    return `
      <div class="hotspot-board">
        ${activity.hotspots.map(item => `<button class="hotspot ${labRun.state.clicked.includes(item.id) ? "selected" : ""}" data-action="lab-hotspot" data-id="${item.id}">${esc(item.text)}</button>`).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir identificação</button>
    `;
  }

  function renderLabBranching(activity) {
    const node = activity.nodes[labRun.state.branchNode];
    return `
      <div class="decision-node">
        <h2>${esc(node.text)}</h2>
        ${node.done ? `<button class="btn primary" data-action="lab-submit">Registrar caminho</button>` : `<div class="option-grid">${node.options.map((option, index) => `<button class="option-card" data-action="lab-branch" data-index="${index}"><span class="option-letter">${index + 1}</span><span>${esc(option.text)}</span></button>`).join("")}</div>`}
        <p class="muted">Caminho: ${labRun.state.branchPath.join(" > ") || "início"}</p>
      </div>
    `;
  }

  function renderLabChecklist(activity) {
    return `
      <div class="stack">
        ${activity.items.map(item => `
          <div class="panel pad">
            <label><input type="checkbox" data-action="lab-check-toggle" data-id="${item.id}" ${labRun.state.checked[item.id] ? "checked" : ""}> ${esc(item.text)}</label>
            <input class="text-input lab-evidence" data-id="${item.id}" placeholder="${esc(item.evidence)}" value="${esc(labRun.state.evidence[item.id] || "")}">
          </div>
        `).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Concluir checklist</button>
    `;
  }

  function renderLabClue(activity) {
    return `
      <div class="hint-list">
        ${activity.clues.slice(0, labRun.state.revealed).map((clue, index) => `<div class="hint-item"><strong>Pista ${index + 1}:</strong> ${esc(clue)}</div>`).join("")}
      </div>
      ${labRun.state.revealed < activity.clues.length ? `<button class="btn warning" data-action="lab-reveal-clue">Ver pista (- pontos)</button>` : ""}
      <label class="field-stack"><span>Digite o diagnóstico</span><input class="text-input" id="lab-clue-answer" placeholder="Ex.: DNS"></label>
      <button class="btn primary" data-action="lab-submit">Concluir investigação</button>
    `;
  }

  function renderLabFillBlank(activity) {
    return `
      <div class="stack">
        ${activity.blanks.map((blank, index) => `<label class="panel pad"><strong>${esc(blank.label)}</strong><input class="text-input lab-blank" data-index="${index}" placeholder="Resposta"></label>`).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir lacunas</button>
    `;
  }

  function renderLabTaskManager(activity) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Processo</th><th>CPU</th><th>Memória</th><th>Disco</th><th>Ação</th></tr></thead>
          <tbody>${activity.rows.map((row, index) => `<tr class="${labRun.state.selected === row.name ? "selected-row" : ""}"><td>${esc(row.name)}</td><td>${esc(row.cpu)}</td><td>${esc(row.memory)}</td><td>${esc(row.disk)}</td><td><button class="btn small" data-action="lab-select-process" data-index="${index}">Investigar</button></td></tr>`).join("")}</tbody>
        </table>
      </div>
      <button class="btn primary" data-action="lab-submit">Confirmar processo</button>
    `;
  }

  function renderLabMultiselect(activity) {
    return `
      <div class="option-grid">
        ${activity.options.map((option, index) => `<label class="option-card"><input type="checkbox" class="lab-multi" data-index="${index}"> <span>${esc(option.text)}</span></label>`).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Conferir seleção</button>
    `;
  }

  function renderLabOpenResponse(activity) {
    return `
      <p class="question-text">${esc(activity.prompt)}</p>
      <textarea class="text-input" id="lab-open-text" rows="5" placeholder="Descreva o que observou"></textarea>
      <div class="panel pad" style="margin-top:1rem">
        <h3>Autoavaliação</h3>
        <label><input type="radio" name="lab-self" value="correta"> Minha resposta explicou corretamente.</label><br>
        <label><input type="radio" name="lab-self" value="incompleta"> Minha resposta ficou incompleta.</label><br>
        <label><input type="radio" name="lab-self" value="revisar"> Preciso revisar.</label>
      </div>
      <button class="btn primary" data-action="lab-submit">Salvar evidência</button>
    `;
  }

  function renderLabOfficeShift(activity) {
    const office = labRun.state.office;
    return `
      <div class="grid cols-4">
        ${metric("Eficiência", office.eficiencia, "decisões úteis")}
        ${metric("Segurança", office.seguranca, "sem risco")}
        ${metric("Organização", office.organização, "fluxo")}
        ${metric("Diagnóstico", office.diagnóstico, "evidência")}
      </div>
      <div class="ticket-grid" style="margin-top:1rem">
        ${activity.tickets.map((ticket, index) => `<article class="ticket-card"><strong>${esc(ticket.time)}</strong><p>${esc(ticket.text)}</p><p class="muted">Melhor ação: ${office.resolved[index] ? esc(ticket.best) : "pendente"}</p><button class="btn small" data-action="lab-office-resolve" data-index="${index}" ${office.resolved[index] ? "disabled" : ""}>Resolver com investigação</button><button class="btn small danger" data-action="lab-office-risk" data-index="${index}" ${office.resolved[index] ? "disabled" : ""}>Atalho arriscado</button></article>`).join("")}
      </div>
      <button class="btn primary" data-action="lab-submit">Encerrar expediente</button>
    `;
  }

  function questionErrorStats() {
    const lookup = new Map(allQuestions().map(question => [question.id, question]));
    return [...lookup.values()].map(question => {
      const totals = players.reduce((acc, player) => {
        const answer = player.answers?.[question.id];
        if (!answer) return acc;
        acc.attempts += answer.attempts || 0;
        acc.correct += answer.correct || 0;
        acc.errors += answer.errors || Math.max(0, (answer.attempts || 0) - (answer.correct || 0));
        return acc;
      }, { attempts: 0, correct: 0, errors: 0 });
      return {
        question,
        attempts: totals.attempts,
        correct: totals.correct,
        errors: totals.errors,
        rate: percent(totals.correct, totals.attempts)
      };
    }).filter(item => item.attempts > 0)
      .sort((a, b) => b.errors - a.errors || a.rate - b.rate || b.attempts - a.attempts)
      .slice(0, 12);
  }

  function renderQuestionErrorStats() {
    const rows = questionErrorStats();
    return `
      <section class="panel pad" style="margin-top:1rem">
        <h2>Questões com mais erros</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Questão</th><th>Categoria</th><th>Tentativas</th><th>Acertos</th><th>Erros</th><th>Taxa de acerto</th></tr></thead>
            <tbody>
              ${rows.map(item => `<tr><td>${esc(item.question.titulo)}</td><td>${esc(item.question.categoria)}</td><td>${item.attempts}</td><td>${item.correct}</td><td>${item.errors}</td><td>${item.rate}%</td></tr>`).join("") || `<tr><td colspan="6">Ainda não há respostas suficientes para análise de erros.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderTeacherDetail(player) {
    const lowMissions = Object.entries(player.completedMissions)
      .filter(([, data]) => data.bestAccuracy < 70)
      .map(([id, data]) => `${MISSIONS.find(m => m.id === id)?.titulo || id}: ${data.bestAccuracy}%`);
    return `
      <section class="panel pad" style="margin-top:1rem">
        <div class="split">
          <div>
            <h2>Detalhes de ${esc(player.name)}</h2>
            <p class="muted">Última sessão: ${formatDate(player.lastActivity)}</p>
          </div>
          <div class="toolbar">
            <button class="btn" data-action="export-individual" data-id="${player.id}">Exportar individual</button>
            <button class="btn danger" data-action="reset-player" data-id="${player.id}">Reiniciar aluno</button>
          </div>
        </div>
        <div class="grid cols-2">
          <div>
            <h3>Competências</h3>
            ${renderCompetencies(player)}
          </div>
          <div>
            <h3>Missões com baixo desempenho</h3>
            ${lowMissions.length ? `<ul class="compact-list">${lowMissions.map(item => `<li>${esc(item)}</li>`).join("")}</ul>` : `<p class="muted">Nenhuma missão abaixo de 70% no melhor resultado.</p>`}
            <h3>Tentativas recentes</h3>
            ${player.missionAttempts.length ? `<ul class="compact-list">${player.missionAttempts.slice(0, 6).map(item => `<li>${esc(item.title)} · ${item.accuracy}% · ${formatDate(item.at)}</li>`).join("")}</ul>` : `<p class="muted">Sem tentativas registradas.</p>`}
          </div>
        </div>
      </section>
    `;
  }

  /* EXPORTAÇÃO */
  function playerCsvRow(player) {
    const level = getLevel(player.xp);
    const row = [
      player.name,
      level.nivel,
      player.xp,
      player.correct,
      player.wrong,
      `${percent(player.correct, player.correct + player.wrong)}%`,
      countCompleted(player),
      player.score,
      ...COMPETENCIES.map(item => `${competencyPercent(player, item.id)}%`),
      formatDate(player.lastActivity)
    ];
    return row.map(csvCell).join(";");
  }

  function exportCsv(playersToExport = players, filename = "missao-windows-resultados.csv") {
    const header = ["Nome", "Nível", "XP", "Acertos", "Erros", "Precisão", "Missões", "Pontuação", "Windows %", "Arquivos %", "Produtividade %", "Rede %", "Segurança %", "Periféricos %", "Diagnóstico %", "Decisão %", "Data"];
    const csv = [header.map(csvCell).join(";"), ...playersToExport.map(playerCsvRow)].join("\n");
    download(filename, csv, "text/csv;charset=utf-8");
  }

  function exportIndividual(player) {
    const lines = [
      "Relatório individual - Missão Windows",
      `Nome: ${player.name}`,
      `Nível: ${getLevel(player.xp).nivel} - ${getLevel(player.xp).cargo}`,
      `XP: ${player.xp}`,
      `Pontuação: ${player.score}`,
      `Acertos: ${player.correct}`,
      `Erros: ${player.wrong}`,
      `Precisão: ${percent(player.correct, player.correct + player.wrong)}%`,
      "",
      "Competências:",
      ...COMPETENCIES.map(item => `${item.nome}: ${competencyPercent(player, item.id)}%`),
      "",
      "Tentativas recentes:",
      ...(player.missionAttempts.length ? player.missionAttempts.map(item => `${item.title}; ${item.accuracy}%; ${formatDate(item.at)}`) : ["Sem tentativas registradas."])
    ];
    download(`missao-windows-${player.name.replace(/\s+/g, "-").toLowerCase()}.txt`, lines.join("\n"), "text/plain;charset=utf-8");
  }

  function csvCell(value) {
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  /* CONTROLES E EVENTOS */
  app.addEventListener("submit", event => {
    const form = event.target.closest("[data-form='player']");
    if (!form) return;
    event.preventDefault();
    const name = normalizeName(new FormData(form).get("name"));
    if (name.length < 2) {
      toast("Digite um nome com pelo menos 2 caracteres.");
      return;
    }
    createPlayer(name);
    currentView = "dashboard";
    render();
  });

  app.addEventListener("click", event => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    const player = getPlayer();

    if (action === "continue-current" && player) currentView = "dashboard";
    if (action === "logout") {
      setCurrentPlayer(null);
      currentRun = null;
      currentView = "home";
    }
    if (action === "toggle-sound") {
      prefs.sound = !prefs.sound;
      savePrefs();
      toast(prefs.sound ? "Som ativado." : "Som desativado.");
    }
    if (action === "nav") {
      currentRun = null;
      currentView = target.dataset.view;
    }
    if (action === "set-mission-filter") {
      missionFilter = target.dataset.filter || "todas";
      currentView = "missions";
    }
    if (action === "start-mission") startRun("mission", target.dataset.id);
    if (action === "start-quick") startRun("quick");
    if (action === "review-errors") startRun("review");
    if (action === "start-expedition") startRun("expedition");
    if (action === "practice-done") revealPractice();
    if (action === "show-hint") showHint();
    if (action === "choose-option") chooseOption(target.dataset.index);
    if (action === "move-order") moveOrderItem(Number(target.dataset.index), target.dataset.dir);
    if (action === "submit-order") submitOrderQuestion();
    if (action === "retry-question") retryQuestion();
    if (action === "next-question") nextQuestion();
    if (action === "abort-run") {
      if (confirm("Sair da missão atual? O progresso desta tentativa não concluída será descartado.")) {
        currentRun = null;
        currentView = "missions";
      }
    }
    if (action === "repeat-last" && currentRun) {
      const id = currentRun.missionId;
      const kind = currentRun.kind;
      currentRun = null;
      startRun(kind === "mission" ? "mission" : kind, id);
      return;
    }
    if (action === "new-tool-situation") {
      toolSituation = sample(TOOL_SITUATIONS.filter(item => item.id !== toolSituation?.id), 1)[0] || sample(TOOL_SITUATIONS, 1)[0];
    }
    if (action === "choose-tool") chooseTool(target.dataset.tool);
    if (action === "random-ticket") startTicket(sample(TICKETS, 1)[0].id);
    if (action === "start-ticket") startTicket(target.dataset.id);
    if (action === "ticket-step") chooseTicketStep(target.dataset.step);
    if (action === "teacher-detail") teacherDetailId = target.dataset.id;
    if (action === "export-csv") exportCsv();
    if (action === "export-individual") {
      const selected = getPlayer(target.dataset.id);
      if (selected) exportIndividual(selected);
    }
    if (action === "toggle-unlock-all") {
      prefs.unlockAll = !prefs.unlockAll;
      savePrefs();
      toast(prefs.unlockAll ? "Todas as missões foram liberadas para aula." : "Bloqueios progressivos restaurados.");
    }
    if (action === "clear-ranking") clearRanking();
    if (action === "reset-player") resetPlayer(target.dataset.id);
    if (action === "reset-current") resetPlayer(currentPlayerId);
    if (action === "reset-all") resetAll();

    render();
  });

  document.addEventListener("keydown", event => {
    if (event.altKey && ["1", "2", "3", "4"].includes(event.key)) {
      const map = { "1": "dashboard", "2": "missions", "3": "profile", "4": "ranking" };
      currentView = map[event.key];
      currentRun = null;
      render();
    }
    if ((event.key === "h" || event.key === "H") && currentView === "runner") showHint();
    if ((event.key === "s" || event.key === "S") && !event.ctrlKey && !event.metaKey) {
      prefs.sound = !prefs.sound;
      savePrefs();
      toast(prefs.sound ? "Som ativado." : "Som desativado.");
      render();
    }
    if (event.key === "Escape" && currentView === "runner") {
      currentRun = null;
      currentView = "missions";
      render();
    }
  });

  function chooseTool(tool) {
    const player = getPlayer();
    if (!toolSituation || !player) return;
    const ok = tool === toolSituation.correta;
    if (ok) {
      player.toolSimulatorCorrect += 1;
      player.score += 40;
      toast(`Correto: ${toolSituation.explicacao}`);
      playSound("success");
      checkAchievements(player);
    } else {
      toast(`Revise: a melhor escolha era ${toolSituation.correta}. ${toolSituation.explicacao}`);
      playSound("error");
    }
    touchPlayer(player);
    toolSituation = sample(TOOL_SITUATIONS.filter(item => item.id !== toolSituation.id), 1)[0] || sample(TOOL_SITUATIONS, 1)[0];
  }

  function startTicket(id) {
    const ticket = TICKETS.find(item => item.id === id);
    if (!ticket) return;
    ticketSession = { ticket, index: 0, completedSteps: [], feedback: null, done: false };
  }

  function chooseTicketStep(step) {
    const player = getPlayer();
    if (!ticketSession || !player || ticketSession.done) return;
    const expected = ticketSession.ticket.passos[ticketSession.index];
    if (step === expected) {
      ticketSession.completedSteps.push(step);
      ticketSession.index += 1;
      ticketSession.feedback = { ok: true, text: "Boa decisão. A ação combina com a etapa atual do atendimento." };
      player.score += 30;
      if (ticketSession.index >= ticketSession.ticket.passos.length) {
        ticketSession.done = true;
        player.ticketsResolved += 1;
        player.xp += awardTicketXp(player, ticketSession.ticket.id);
        checkAchievements(player);
      }
      playSound("success");
    } else {
      ticketSession.feedback = { ok: false, text: `Ainda não. A próxima ação mais segura seria: ${expected}.` };
      playSound("error");
    }
    touchPlayer(player);
  }

  function awardTicketXp(player, ticketId) {
    const key = `ticket:${ticketId}`;
    if (player.bonuses[key]) return 0;
    player.bonuses[key] = { xp: 25, score: 80, at: new Date().toISOString() };
    player.score += 80;
    return 25;
  }

  function resetPlayer(id) {
    const player = getPlayer(id);
    if (!player) return;
    if (!confirm(`Reiniciar o progresso de ${player.name}? O nome será mantido, mas XP, respostas e conquistas serão apagados.`)) return;
    const clean = ensurePlayerShape({
      id: player.id,
      name: player.name,
      createdAt: player.createdAt,
      lastActivity: new Date().toISOString(),
      xp: 0,
      score: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0,
      completedMissions: {},
      missionAttempts: [],
      awarded: {},
      bonuses: {},
      achievements: [],
      answers: {},
      history: [],
      competencies: initCompetencies()
    });
    players = players.map(item => item.id === id ? clean : item);
    savePlayers();
    if (id === currentPlayerId) currentView = "dashboard";
    toast("Progresso reiniciado.");
  }

  function clearRanking() {
    if (!confirm("Zerar ranking local? Isso reinicia XP, pontuação e progresso de todos os jogadores, mantendo os nomes.")) return;
    players.forEach(player => {
      const reset = ensurePlayerShape({
        id: player.id,
        name: player.name,
        createdAt: player.createdAt,
        lastActivity: new Date().toISOString(),
        xp: 0,
        score: 0,
        correct: 0,
        wrong: 0,
        streak: 0,
        bestStreak: 0,
        completedMissions: {},
        missionAttempts: [],
        awarded: {},
        bonuses: {},
        achievements: [],
        answers: {},
        history: [],
        competencies: initCompetencies()
      });
      Object.assign(player, reset);
    });
    savePlayers();
    toast("Ranking zerado.");
  }

  function resetAll() {
    if (!confirm("Apagar todos os jogadores e preferências deste navegador?")) return;
    players = [];
    prefs = { sound: false, unlockAll: false };
    currentRun = null;
    teacherDetailId = null;
    toolSituation = null;
    ticketSession = null;
    localStorage.removeItem(STORAGE.players);
    localStorage.removeItem(STORAGE.current);
    localStorage.removeItem(STORAGE.prefs);
    currentPlayerId = null;
    currentView = "home";
    toast("Dados locais apagados.");
  }

  render();
})();
