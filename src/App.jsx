import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  //Aca creamos una funcion y pasamos el card de string a un arreglo
  const initialCart = () => {
    //Se utiliza localStorage.getItem(card) para obtener el valor almacenado en el localStorage. Lo que se pone dentro del getItem no es el arreglo , es la variable del primero aprametro de localStorage.setItem()
    const localStorageCardArr = localStorage.getItem("productos");

    //Aca si localStorageCardArr tiene un valor se pasa de JSON(string) a un array . Y si localStorageCardArr no devuelve nada  la función devuelve un array vacío ([])
    return localStorageCardArr ? JSON.parse(localStorageCardArr) : [];
  };

  const [data] = useState(db);
  /*Este cart es un array vacio y setCart es una funcion */
  //La definicion de arribita esta bien se le pasa un array vacio , pero el ya hacer localStorage que es casi lo ultimo le pasmaos la funcion la cual tiene lo del localStorage
  const [cart, setCart] = useState(initialCart); //Al principio va useState([]) pero ya con localStorage le paso esa funcion

  //Aca creo un maximo para el incremento de la cantidad de los productos
  const MAX_GUIT = 7;

  //Aca creamos un minimo para disminuir la cantidad
  const MIN_GUIT = 1;

  //Aca haremos el localStorage con el useEffect
  useEffect(() => {
    //Lo que hacemos aca es pasar el card arreglo a un string , porque como sabes localStorage tiene que recibir string , recibe dos parametros , el primero es como quieres que se llame y el segundo es cuando pasas el arreglo a string
    localStorage.setItem("productos", JSON.stringify(cart));
  }, [cart]);

  /*Este item es un objeto ,Porque?? porque en el archivo guitar.jsx le pasamos la funcion y como argumento le pasamos guitarra la cual es un objeto*/
  function addToCard(item) {
    const itemExist = cart.findIndex((guitars) => guitars.id === item.id);

    //El id es (Si existe) aumenta la cantidad
    if (itemExist >= 0) {
      //OJO esto lo hacemos cuando presionamos en el boton agregar carrito mas no en los botones de + y - . Si lo de arriba se cumple pasa a esto de abajo y se lee asi :
      //Si la cantidad del producto en el carrito es igual o supera el valor máximo permitido (MAX_GUIT), entonces la función retorna ninguna modificacion. Esto significa que no se incrementará la cantidad del producto porque ya ha alcanzado su límite máximo.
      if (cart[itemExist].cantidad >= MAX_GUIT) return;

      //Para ir aumentando la cantidad del producto , para eso tenemos que crear una constante y pasarle una copia del carrito para no modificar el state original
      const actualizarCarrito = [...cart];

      //Aca ponemos la copia del carrito.[representa el indice del producto , accede al elemento del array en la posición itemExist].Es una propiedad del objeto en esa posición, que parece representar la cantidad del producto.
      actualizarCarrito[itemExist].cantidad++;

      //Luego cada que cambies tu carrito siempre tienes que setearlo
      setCart(actualizarCarrito);
    } else {
      //El else es si (No existe) lo agrega

      //Aca le agregamos una nueva propiedad al objeto la cual es la cantida
      item.cantidad = 1;

      /*Aca lo que estamos haciendo es una copia del arreglo con ...cart y le pasamos los item y ese item recuerda que es un objeto */
      setCart([...cart, item]);
    }
  }

  /*Funcion para eliminar producto(guitarra) , cojera como parametro el id de cada producto*/
  function eliminarGuitarra(id) {
    //Lo que hace el filter es filtrar , osea mira si yo presiono el una guitarra con id 2 , quiero traerme a las que son diferentes a la que yo presione , osea eliminar la del id 2 y mantener las otras
    const deleteGuitar = cart.filter((carts) => carts.id !== id);
    setCart(deleteGuitar);
  }

  //Aca haremos el boton incrementar cantidad
  function incrementarCantidad(id) {
    const incremento = cart.map((items) => {
      if (items.id === id && items.cantidad < MAX_GUIT) {
        //El uso del return dentro del map es para devolver el nuevo objeto (producto) con la cantidad incrementada o el objeto original sin cambios, dependiendo de si las condiciones se cumplen.
        return {
          //Hacemos una copia del arreglo original
          ...items,
          //Y aca a esa copia de incrementamos la cantidad , y le ponemos asi con cantidad : , porque sino JavaScript no sabría a qué propiedad del objeto estás tratando de asignar ese valor. La clave cantidad: es necesaria para indicar qué propiedad del objeto estás actualizando.
          cantidad: items.cantidad + 1,
        };
      }

      //Si las condiciones no son verdaderas, se retorna el producto tal como está (return items), sin ningún cambio.
      return items;
    });

    setCart(incremento);
  }

  //Funcion para el decremento
  function disminuirCantidad(id) {
    const decrementar = cart.map((items) => {
      if (items.id === id && items.cantidad > MIN_GUIT) {
        return {
          ...items,
          cantidad: items.cantidad - 1,
        };
      }

      return items;
    });

    setCart(decrementar);
  }

  function vaciarCarrito() {
    setCart([]);
  }

  return (
    <>
      {/*Aca por ejm como props en este caso el nombre es carts , le pasamos el arreglo cart que esta en el useState y por eso que en el header lo iteramos con map*/}
      <Header
        carts={cart}
        eliminarGuitarra={eliminarGuitarra}
        incrementarCantidad={incrementarCantidad}
        disminuirCantidad={disminuirCantidad}
        vaciarCarrito={vaciarCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitarra={guitar}
              setCarts={setCart}
              addToCard={addToCard}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
