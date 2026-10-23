/**
 * PORTFÓLIO - DAVI FIGUEIREDO FONSECA
 * Script principal em JavaScript Vanilla.
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
  const botaoTema = document.getElementById('botao-tema');
  
  function alternarTema() {
    document.body.classList.toggle('tema-claro');
    const estaNoTemaClaro = document.body.classList.contains('tema-claro');
    localStorage.setItem('temaPreferido', estaNoTemaClaro ? 'claro' : 'escuro');
  }

  const temaSalvo = localStorage.getItem('temaPreferido');
  if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
  }

  botaoTema.addEventListener('click', alternarTema);

  // 2. MENU HAMBÚRGUER MOBILE
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const navegacaoPrincipal = document.getElementById('navegacao-principal');
  const linksNavegacao = document.querySelectorAll('.link-navegacao');

  function alternarMenuMobile() {
    navegacaoPrincipal.classList.toggle('ativo');
    const estaAberto = navegacaoPrincipal.classList.contains('ativo');
    botaoMenuMobile.innerHTML = estaAberto 
      ? '<i class="bi bi-x-lg"></i>' 
      : '<i class="bi bi-list"></i>';
  }

  botaoMenuMobile.addEventListener('click', alternarMenuMobile);

  linksNavegacao.forEach(function (link) {
    link.addEventListener('click', function () {
      navegacaoPrincipal.classList.remove('ativo');
      botaoMenuMobile.innerHTML = '<i class="bi bi-list"></i>';
    });
  });

  // 3. EFEITO MÁQUINA DE ESCREVER
  const elementoTextoMaquina = document.getElementById('texto-maquina');
  const titulosParaDigitar = [
    'Estudante de Desenvolvimento Full Stack',
    'Especialista em Front-end',
    'Desenvolvedor Web'
  ];
  
  let indiceTexto = 0;
  let indiceCaractere = 0;
  let estaApagando = false;

  function animarEscrita() {
    const textoAtual = titulosParaDigitar[indiceTexto];

    if (estaApagando) {
      elementoTextoMaquina.textContent = textoAtual.substring(0, indiceCaractere - 1);
      indiceCaractere--;
    } else {
      elementoTextoMaquina.textContent = textoAtual.substring(0, indiceCaractere + 1);
      indiceCaractere++;
    }

    let velocidade = estaApagando ? 50 : 100;

    if (!estaApagando && indiceCaractere === textoAtual.length) {
      velocidade = 2000;
      estaApagando = true;
    } else if (estaApagando && indiceCaractere === 0) {
      estaApagando = false;
      indiceTexto = (indiceTexto + 1) % titulosParaDigitar.length;
      velocidade = 500;
    }

    setTimeout(animarEscrita, velocidade);
  }

  animarEscrita();

  // 4. BOTÃO VOLTAR AO TOPO & ANO ATUAL DINÂMICO
  const botaoTopo = document.getElementById('botao-topo');
  const elementoAnoAtual = document.getElementById('ano-atual');

  elementoAnoAtual.textContent = new Date().getFullYear();

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      botaoTopo.classList.add('visivel');
    } else {
      botaoTopo.classList.remove('visivel');
    }
  });

  botaoTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 5. OBSER VADOR DE REVELAÇÃO DAS SEÇÕES
  const secoesParaRevelar = document.querySelectorAll('.secao-revelar');

  const observadorSecoes = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
      }
    });
  }, { threshold: 0.15 });

  secoesParaRevelar.forEach(function (secao) {
    observadorSecoes.observe(secao);
  });

  // 6. FUNDO DE PARTÍCULAS EM CANVAS
  const canvas = document.getElementById('particulas-fundo');
  const ctx = canvas.getContext('2d');

  function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  redimensionarCanvas();
  window.addEventListener('resize', redimensionarCanvas);

  const arrayParticulas = [];
  const quantidadeParticulas = 40;

  class Particula {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.tamanho = Math.random() * 2 + 1;
      this.velocidadeX = (Math.random() - 0.5) * 0.5;
      this.velocidadeY = (Math.random() - 0.5) * 0.5;
    }

    desenhar() {
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--cor-primaria').trim() || '#00f0ff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
      ctx.fill();
    }

    atualizar() {
      this.x += this.velocidadeX;
      this.y += this.velocidadeY;

      if (this.x < 0 || this.x > canvas.width) this.velocidadeX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocidadeY *= -1;
    }
  }

  for (let i = 0; i < quantidadeParticulas; i++) {
    arrayParticulas.push(new Particula());
  }

  function animarParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arrayParticulas.length; i++) {
      arrayParticulas[i].atualizar();
      arrayParticulas[i].desenhar();
    }
    requestAnimationFrame(animarParticulas);
  }

  animarParticulas();
});