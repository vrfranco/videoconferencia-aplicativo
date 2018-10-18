import React, { Component } from 'react';

class Cadastro extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            nome: '',
            cor: '#000000',
        };

        this.video = React.createRef();
    }
    componentDidMount()
    {
        navigator.mediaDevices.getUserMedia({video: true})
            .then((stream) => {
                if (this.video)
                {
                    this.video.current.srcObject = stream;
                    this.video.current.play();
                }
            });
    }
    render()
    {
        return (
            <div className="Cadastro">
                <form className="Form" onSubmit={this.onSubmit.bind(this)}>
                    <div className="Fields">
                        
                        <div className="Field">
                            <label className="Legend">Digite o o seu Nome</label>
                            <input type="text" className="Text" onChange={this.onChangeNome.bind(this)} value={this.state.nome}/>
                        </div>

                        <div className="Field">
                            <label className="Legend">Selecione a sua cor</label>
                            <input type="color" className="Color" onChange={this.onChangeCor.bind(this)} value={this.state.cor}/>
                        </div>

                        <div className="Field">
                        <input type="submit" className="Submit" value="Continuar"/>
                        </div>

                    </div>
                </form>

                <video className="Video" ref={this.video} autoPlay></video>
            </div>
        )
    }
    onSubmit(event)
    {
        event.preventDefault();

        this.props.history.push({
            pathname: '/conferencia',
            state: {
                nome: this.state.nome,
                cor: this.state.cor,
            },
        });
    }
    onChangeNome(event)
    {
        this.setState({
            nome: event.target.value
        })
    }
    onChangeCor(event)
    {
        this.setState({
            cor: event.target.value
        })
    }
}

export default Cadastro;