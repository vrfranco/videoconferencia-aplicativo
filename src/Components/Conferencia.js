import React, { Component } from 'react';

class Video extends Component 
{
    constructor(props)
    {
        super(props);

        this.elemento = React.createRef();
    }
    componentWillReceiveProps()
    {
        if (this.props.inscricao.remoto)
        {
            this.props.inscricao.remoto.ontrack = (event) => 
            {
                this.elemento.current.srcObject = event.streams[0];
                this.elemento.current.play();
            }
        }
    }
    render()
    {
        return (
            <video ref={this.elemento}></video>
        )
    }
}

class Conferencia extends Component 
{
    constructor(props)
    {
        super(props);

        this.video = React.createRef();

        this.state = {inscricoes: []};
    
        this.state = Object.assign(this.state, this.props.location.state);

        if(this.state.nome === '' || typeof this.state.nome === 'undefined')
        {
            this.props.history.push('cadastro');

            return;
        }

        if(this.state.cor === '' || typeof this.state.cor === 'undefined')
        {
            this.props.history.push('cadastro');

            return;
        }

        this.onSignaling();
    }
    componentDidMount()
    {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            if (this.video)
            {
                this.video.current.srcObject = stream;
                this.video.current.play();
            }
        })
    }
    render()
    {
        let conectados = [];

        this.state.inscricoes.forEach((item, indice) => {

            conectados.push(
                <div className="Item" key={indice}>
                            
                    <div className="Item-Video">
                        <Video inscricao={item} />
                    </div>

                    <div className="Item-Descricao" style={{backgroundColor: '#' + item.cor}}>
                        <div className="Item-Nome">{item.nome}</div>
                    </div>

                </div>
            );

        });

        return (
            <div className="Conferencia">
                
                <div className="Video">
                    <img src='https://picsum.photos/800/800'/>
                </div>

                <div className="Convidados">
                    <div className="Fixado">

                        <div className="Item">
                            
                            <div className="Item-Destaque-Portrait" style={{borderColor: 'transparent '+this.state.cor+' transparent transparent'}}></div>

                            <div className="Item-Destaque-Landscape" style={{borderColor: 'transparent transparent transparent '+ this.state.cor }}></div>

                            <div className="Item-Video">
                                <video ref={this.video}/>
                            </div>

                            <div className="Item-Descricao" style={{backgroundColor: this.state.cor}}>
                                <div className="Item-Nome">{this.state.nome}</div>
                            </div>

                        </div>

                    </div>

                    <div className="Dinamicos">
                        {conectados}
                    </div>
                </div>

            </div>
        );
    }
    onSignaling()
    {
        let nome = this.state.nome;

        let cor = this.state.cor.substring(1, this.state.cor.length);

        let protocol = 'ws';

        let host = window.location.hostname || 'localhost';

        let port = 8443;

        let parametros = 'nome=' + nome + '&cor=' + cor;

        let url = protocol + '://' + host + ':' + port + '?' + parametros;

        this.signaling = new WebSocket(encodeURI(url));

        this.signaling.onopen = () =>
        {
            console.log('aberto')
        }

        this.signaling.onmessage = (response) =>
        {
            console.log('recebido');

            let inscricoes;

            let inscricao;

            let indice;

            let local;

            let remoto;

            let parametros = JSON.parse(response.data);

            switch (parametros.evento)
            {
                case 'criacao':

                    inscricao = {
                        id: parametros.id,
                        nome: parametros.nome,
                        cor: parametros.cor,
                    };

                    local = new RTCPeerConnection();

                    local.onnegotiationneeded = () =>
                    {
                        local.createOffer({offerToReceiveVideo: true}).then((oferta) =>
                        {
                            local.setLocalDescription(oferta).then(() =>
                            {
                                this.signaling.send(
                                    JSON.stringify({
                                        evento: 'oferta',
                                        oferta: oferta,
                                        id: inscricao.id
                                    })
                                )

                            });

                        });

                    };

                    local.onicecandidate = (event) => 
                    {
                        if (event.candidate)
                        {
                            this.signaling.send(
                                JSON.stringify({
                                    evento: 'candidato',
                                    id: inscricao.id,
                                    candidato: event.candidate,
                                })
                            );
                        }
                    }

                    navigator.mediaDevices.getUserMedia({video: true}).then((stream) =>
                    {
                        local.addStream(stream);

                    });

                    inscricao.local = local;

                    inscricoes = this.state.inscricoes;

                    inscricoes.push(inscricao);

                    this.setState({inscricoes});
                
                    break;

                case 'oferta':

                    inscricao = this.state.inscricoes.find((item) =>
                    {
                        return item.id === parametros.id
                    });

                    remoto = new RTCPeerConnection();

                    remoto.setRemoteDescription(parametros.oferta).then(() =>
                    {
                        remoto.createAnswer().then((resposta) =>
                        {
                            remoto.setLocalDescription(resposta).then(() =>
                            {
                                this.signaling.send(
                                    JSON.stringify({
                                        evento: 'resposta',
                                        resposta: resposta,
                                        id: inscricao.id,
                                    })
                                );
                            });
                        });
                    });

                    inscricao.remoto = remoto;

                    inscricoes = this.state.inscricoes;

                    inscricoes[indice] = inscricao;

                    this.setState({inscricoes});

                    break;

                case 'resposta':

                    inscricao = this.state.inscricoes.find((item) =>
                    {
                        return item.id === parametros.id
                    });

                    inscricao.local.setRemoteDescription(parametros.resposta);

                    inscricoes = this.state.inscricoes;

                    inscricoes[indice] = inscricao;

                    this.setState({inscricoes});

                    break;

                case 'candidato':

                    inscricao = this.state.inscricoes.find((item) =>
                    {
                        return item.id === parametros.id
                    });

                    inscricao.remoto.addIceCandidate(parametros.candidato);

                    inscricoes = this.state.inscricoes;

                    inscricoes[indice] = inscricao;

                    this.setState({inscricoes});

                    break;
                
                case 'selecionado':

                    break;
            }
        }

        this.signaling.onclose = () =>
        {
            console.log('fechado')
        }
    }
}

export default Conferencia;