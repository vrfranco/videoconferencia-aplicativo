import React, { Component } from 'react';

class Monitoramento extends Component
{
    render()
    {
        return (
            <div className="Monitoramento">
                <div className="Monitoramento-Relatorios">
                    <div className="Monitoramento-Sinalizacoes">                        
                        <div className="Monitoramento-Cabecalho">Servidor de Sinalização</div>
                        <table className="Monitoramento-Acoes">
                            <tbody>
                                <tr className="Monitoramento-Item">
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'red'}}>Rosa</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Acao">Conectado</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'black'}}>Conectado</div>
                                    </td>
                                </tr>

                                <tr className="Monitoramento-Item">
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'pink'}}>Carol</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Acao">Conectado</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'black'}}>Conectado</div>
                                    </td>
                                </tr>

                                <tr className="Monitoramento-Item">
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'black'}}>Servidor</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Acao">Criação</div>
                                    </td>
                                    <td>
                                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'red'}}>Rosa</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Monitoramento-Detalhes">
                        <div className="Monitoramento-Conteudo">
                            <div className="Monitoramento-Item"><b>10</b> Conectados</div>
                            <div className="Monitoramento-Item"><b>Vinicius</b> Selecionado</div>
                        </div>
                    </div>
                </div>
                <div className="Monitoramento-Conectados">
                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'pink'}}>Carol</div>
                    </div>

                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'red'}}>Rosa</div>
                    </div>

                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'green'}}>Lisa</div>
                    </div>

                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'gray'}}>Alan</div>
                    </div>

                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'orange'}}>Renata</div>
                    </div>

                    <div className="Monitoramento-Item">
                        <div className="Monitoramento-Video">
                            <img src='https://picsum.photos/800/800'/>
                        </div>
                        <div className="Monitoramento-Conectado" style={{backgroundColor: 'blue'}}>Vinicius</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Monitoramento;