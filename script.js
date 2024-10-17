
const botaoIniciar = document.querySelector('.app__card-primary-button')
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const pausa = new Audio('./sons/pause.mp3');
const audioPlay = new Audio('./sons/play.mp3');
const audioZero = new Audio('./sons/beep.mp3');

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

musica.loop = true;


const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;


musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener ('click', () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto('foco','foco.png');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click',() =>{
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto','descanso-curto.png');
    curtoBt.classList.add('active')
});

longoBt.addEventListener ('click', () =>{
    tempoDecorridoSegundos = 900;
   alterarContexto('descanso-longo', 'descanso-longo.png');
   longoBt.classList.add('active')
});

function alterarContexto(contexto,imagem){
    mostrarTempo()
    botoes.forEach(function(botao){
        botao.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${imagem}`)
    switch (contexto){
        case "foco" :
            titulo.innerHTML = ` 
              Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
               Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;

        case "descanso-longo":
            titulo.innerHTML = `
              Hora de voltar á superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            break; 

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoSegundos <= 0){
        audioZero.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoSegundos-=1;
    mostrarTempo()
}

botaoIniciar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        pausa.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`)

}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()