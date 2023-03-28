import { React, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./CarouselHome.css"


function CarouselHome() {


    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    return (
        <div className="carousel__container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className="carrousel__item">
                    <img
                        className="d-block w-100 cover"
                        src="https://www.moov.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Moov-Library/default/dw77dfe74d/08feb/full1adidassportswear.jpg?sw=1440&sfrm=jpg"
                        alt=""
                    />

                </Carousel.Item>
            
                <Carousel.Item className="carrousel__item">
                    <img
                        className="d-block w-100 cover"
                        src="https://filaar.vtexassets.com/assets/vtex.file-manager-graphql/images/c20d3a87-5cb3-4627-aebc-46358c37c745___ae04d4d6ef1cd9ae45f970c252908416.jpg"
                        alt=""
                    />

                </Carousel.Item>
                <Carousel.Item className="carrousel__item">
                    <img
                        className="d-block w-100 cover"
                        src="https://www.dexter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-Dexter-Library/default/dwc8ea965b/08feb/full2adidas4dpulse.jpg?sw=1440&sfrm=jpg"
                        alt=""
                    />

                </Carousel.Item>
                <Carousel.Item className="carrousel__item">
                    <img
                        className="d-block w-100 cover"
                        src="https://media.solodeportes.com.ar/media/slider/slide/adidas_bts_2023_sd_1920x540.webp"
                        alt=""
                    />
                </Carousel.Item>
                <Carousel.Item className="carrousel__item">
                    <img
                        className="d-block w-100 cover"
                        src="https://www.stockcenter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-StockCenter-Library/default/dwce020829/08feb/full2verano.jpg?sw=1440&sfrm=png"
                        alt=""
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselHome;