import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react";


export default function SuccessPage() {
    const info = useLocation().state;

    const [seats, setSeats] = useState(info.session.seats.filter(seat => (
        seat.selected === true
    )));
    console.log(seats);
    console.log(info);
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{info.session.movie.title}</p>
                <p>{info.session.day.date} - {info.session.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {seats.map((seat) => (
                    <p key={seat.id}>Assento {seat.name}</p>
                ))}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {info.request.name}</p>
                <p>CPF: {info.request.cpf}</p>
            </TextContainer>
            <Link to='/'>
                <button>Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        font-family: 'Roboto';  
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: white;
        margin-top: 50px;
        background: #E8833A;
        border-radius: 3px;
        width: 225px;
        height: 42px;
        border: 0px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`