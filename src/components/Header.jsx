//El state useMemo es mas que todo para el performance y aca le pasaremos a las dos funciones , la de vacio y la de el cartTotal , y recibe dos parametros , la condicion que quieres que se ejecute y la dependencia , en este caso la dependencia sera el carts osea el arreglo
import { useMemo } from "react";

function Header({
  carts,
  eliminarGuitarra,
  incrementarCantidad,
  disminuirCantidad,
  vaciarCarrito,
}) {
  //Utilizaremos el state derivado para que salga o no el mensaje de "el carrito esta vacion" , el state derivado tal solo es crear una funcion con la condicion y eso retorna true o false , luego haces un ternario donde quieres que se aplique eso
  const vacio = useMemo(() => carts.length === 0, [carts]);
  {
    /*Ponemos item porque recuerda que item es el objeto dentro del arreglo carts*/
  }
  const cartTotal = useMemo(
    () => carts.reduce((total, item) => total + item.cantidad * item.price, 0),
    [carts]
  );

  /*Porque no le pongo el fragment <></> ?? . Porque return siempre tiene que retornar un solo elemento o etiqueta entonces como el header envuelve todo y es un solo padre , pues por eso se puede obviar el Fragment */
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {/*Esto quiere decir si el carrito esta vacio agregar ese mensaje y si no agrega la tabla  , se llama la funcion     vacio() porque esa ya tiene la condicion */}
                {vacio ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => disminuirCantidad(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.cantidad}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => incrementarCantidad(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => eliminarGuitarra(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar:{" "}
                      <span className="fw-bold">$ {cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
