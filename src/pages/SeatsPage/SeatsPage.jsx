import styled from "styled-components"
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SeatsPage() {

    let [session, setSession] = useState([]);
    let [seats, setSeats] = useState([]);
    let [selectSeat, setSelectedSeat] = useState([]);
    let [name, setName] = useState('')
    let [cpf, setCpf] = useState('')

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)
        request.then(response => {
            console.log(response.data.seats);
            setSeats(response.data.seats);
            setSession(response.data);
        })

    }, [])

    function selectSeats(seat) {
        console.log(selectSeat);
        if (selectSeat.includes(seat.id)) {
            seat.selected = false;
            console.log(seat.selected);
            const arr = selectSeat.filter(seat => seat.selected === true);
            console.log(arr);
            setSelectedSeat(arr);
            return seat.isAvailable = true;
        }
        if (seat.isAvailable === false) {
            return alert("Esse assento não está disponível")
        }
        if (seat.isAvailable) {
            seat.selected = true;
            console.log(seat.selected);
            const arr = [...selectSeat, seat.id];
            setSelectedSeat(arr)
        }
    }

        function confirm(e) {
        e.preventDefault();

        const request = {ids: selectSeat, name: name, cpf: cpf}
        console.log(request)

        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'

        const promise = axios.post(URL, request)

        promise.then( answer => {navigate('/sucesso', { state: {request, session} })})
        promise.catch(error => error.data)
    }



    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((seat, index) => (
                    <SeatItem
                        key={seat.id}
                        onClick={() => selectSeats(seat)}
                        selected={seat.selected}
                        available={seat.isAvailable}
                    >
                        {seats[index].name}
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle selected={true} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle available={true} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle available={false} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={confirm} >
                <label htmlFor="name">Nome do Comprador:</label>
                <input 
                placeholder="Digite seu nome..." 
                type="text" 
                required 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                />


                <label htmlFor="cpf">CPF do Comprador:</label>
                <input 
                placeholder="Digite seu CPF..." 
                type="text" 
                required 
                id="cpf" 
                value={cpf} 
                onChange={(e) => setCpf(e.target.value)}
                />
                <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`

    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: white;;
        border: 0px;
        margin-top: 57px;
    }
    label{
        margin-top: 10px;
        margin-bottom: 5px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        width: 327px;
        height: 51px;
        width: calc(100vw - 60px);
        ::placeholder{
          font-family: 'Roboto';
            font-style: italic;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
        }
    }   
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.selected ? '#0E7D71' : props.available ? '#7B8B99' : '#F7C52B'};         // Essa cor deve mudar
    background-color: ${props => props.selected ? '#1AAE9E' : props.available ? '#C3CFD9' : '#FBE192'};         // Essa cor deve mudar     
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`

    border: 1px solid ${props => props.selected ? '#0E7D71' : props.available ? '#7B8B99' : '#F7C52B'};         // Essa cor deve mudar
    background-color: ${props => props.selected ? '#1AAE9E' : props.available ? '#C3CFD9' : '#FBE192'};         // Essa cor deve mudar
    height: 25px; 
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`