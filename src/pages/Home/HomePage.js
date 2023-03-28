import { ContactMailTwoTone } from "@mui/icons-material";
import "./HomePage.css";
import { Container, Row, Col} from "react-bootstrap";
import CarouselHome from "../../components/Carrousel/CarrouselHome";
function HomePage() {
  const year = new Date().getFullYear();
  

  return (
    <>
    <section className="carousel">
      <CarouselHome />
    </section>
    
    <section className="genero__container">

        <div className="generos">
        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/ccb9b6fc-4eaf-4c90-b4ab-1c0cf1325b74/nuevas-hotties-megan-thee-stallion.jpg" alt=""/>
          <a href="/womanpage">
            MUJER
          </a>
        </div>
        <div className="generos">
          <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_945,c_limit/4237f16e-2087-4d2b-a1cb-5be7e54c9c35/alan-landeros-jugador-de-f%C3%BAtbol-de-la-ciudad-de-m%C3%A9xico-perfecciona-sus-habilidades.jpg" alt=""/>
          <a href="/manpage">
  
            HOMBRE
          </a>
        </div>
      
    </section>

    <section className="marcas">
      <h6 className="marcas_texto">Las mejores marcas encontralas aqui</h6>
      <div className="marcas__container">
        <img src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dw1c8a2052/marcas/logonikefutura.png" alt='Nike'/>
        <img src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dw9e1b407e/marcas/logoreebok.png" alt='Reebok'/>
        <img src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dw97ffc365/marcas/logoadidasoriginals2.png" alt='Adidas'/>
        <img src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dwf88da519/marcas/logofila.png" alt='Fila'/>
        <img src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dwbb78d5e6/marcas/logochampion.png" alt='Champion'/>
        
      </div>
    </section>

    
    </>
  );
}

export default HomePage;