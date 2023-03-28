import React from 'react';
import styles from './Footer.module.css';
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube, BsTelegram } from "react-icons/bs";
import Logo from '../../img/rollinglogo.png'
const Footer = () => {
    return (
        <div className={`container-fluid ${styles.colorFondo}`}>
            <div className="container">


                <div className={`${styles.responsive} row justify-content-between`} >

                    <div className="col-3  my-4">
                        <img className={`${styles.logo}`} src={Logo} alt="" />
                    </div>
                    <div className={`${styles.columnsFooter} col-3 my-4`}>
                        <p className={`fs-5 fw-bold ${styles.colorIconos}`}>RollingShoes!</p>
                        <p className='m-0'>Contactate con nosotros</p>
                        <p className='m-0'>Trabaja con nosotros</p>
                    </div>
                    <div className="col-3  my-4">
                        <div className={`${styles.columnsFooter}`}>
                            <p className={`fs-5 fw-bold ${styles.colorIconos}`}>Siguenos!</p>
                            <p>Siguenos en nuestras redes sociales para no perderte de ninguna noticia</p>
                        </div>
                        <div className={`${styles.icons}`}>
                            <BsInstagram size={30} className={`me-2 ${styles.colorIconos} `} />
                            <BsFacebook size={30} className={`me-2 ${styles.colorIconos}`} />
                            <BsTwitter size={30} className={`me-2 ${styles.colorIconos}`} />
                            <BsYoutube size={30} className={`me-2 ${styles.colorIconos}`} />
                            <BsTelegram size={30} className={`me-2 ${styles.colorIconos}`} />
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center opacity-50 mb-0'>© RollingShoes! Todos los derechos reservados</p>
        </div>
    )
}

export default Footer