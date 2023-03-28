import Accordion from 'react-bootstrap/Accordion';
import "./QuestionsAccordion.css"

function Acorrdion() {
    return (
        <div>
            <div className='containerAcorrdion '>
                <Accordion d-flex justify-content-center defaultActiveKey={['0']} alwaysOpen>

                    <Accordion.Item className='bodyAcorrdion w-50' eventKey="0">

                        <Accordion.Header >Cuanto tardara en llegar mi pedido?</Accordion.Header>
                        <Accordion.Body >
                            ENTREGAS:
                            Una vez que nuestro almacén termine la preparación de tu pedido recibirás un correo electrónico de confirmación con tu guía de seguimiento.
                            rollingshoes realizará la entrega en la dirección registrada en la orden de 4(cuatro) a 7 (siete) en San Miguel de Tucuman y hasta 10 días hábiles en resto del país.

                            Si utilizaste nuestro Servicio Express, valida  los parámetros  y tiempos establecidos aquí.

                            Recordá que pódes realizar el seguimiento de tu pedido en:

                            Seguimiento de Pedidos: Con tu número de pedido / orden podés seguir tu pedido ingesando aquí.

                            Socio logístico: Ingresa al sitio de nuestro socio logístico OCA y Correo Argentino con la guía de despacho asignada.

                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className='bodyAcorrdion w-50' eventKey="1">

                        <Accordion.Header >Accordion Item #2</Accordion.Header>
                        <Accordion.Body >
                            Lorem

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='bodyAcorrdion w-50' eventKey="3">

                        <Accordion.Header >Accordion Item #3</Accordion.Header>
                        <Accordion.Body >
                            Lorem

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='bodyAcorrdion w-50' eventKey="4">

                        <Accordion.Header >Accordion Item #4</Accordion.Header>
                        <Accordion.Body >
                            Lorem

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='bodyAcorrdion w-50' eventKey="5">

                        <Accordion.Header >Accordion Item #5</Accordion.Header>
                        <Accordion.Body>
                            Lorem

                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </div>
        </div>
    )
}

export default Acorrdion;