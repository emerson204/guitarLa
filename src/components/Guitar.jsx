function Guitar({ guitarra, addToCard }) {
  const { id, name, image, description, price } = guitarra;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        {/*Ahora veremos que al dar click en el boton se agarra el producto , vamos a darle un evento*/}
        <button
          type="button"
          className="btn btn-dark w-100"
          //*Antes de llamar la funcion y pasarles parametros y todo , tienes que poner un arrow function .OJO le pasamos como parametro todo el objeto para chapar todo el producto con datos y como argumento le podemos poner cualqiuee nombre en este caso le puse guitar
          onClick={() => addToCard(guitarra)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default Guitar;
