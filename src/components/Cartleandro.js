<div class="cart__container">
    <div>
        <h1>Mi carrito </h1>
        <span><link>Ir al carrito</link></span>
    </div>
    {cart.map((item)=>{
        return (
            <div key={item.id} class="cart__product">
                <div>
                    <h2>{item.producto} </h2>
                <span><i className="add__fav" onClick={favIn} ><FaHeart /></i></span>
                </div>
                <div>
                    <img src={item.imgUrl} alt='' />
                    <h4>{item.precio}</h4>

                    <button></button>
                </div>
            </div>
        )
    })}
    </div>