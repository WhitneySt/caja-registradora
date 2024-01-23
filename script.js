const cajaRegistradora = (
  totalAPagar,
  efectivoEntregadoCliente,
  billetesEnCaja
) => {
  let status = "";
  let vueltas = [];
  // 1. Calcular el cambio que se le debe entregar al cliente
  const cambio = efectivoEntregadoCliente - totalAPagar;
  console.log(cambio);

  //2. Calcular el total de dinero presente en caja
  const totalEnCaja = billetesEnCaja.reduce(
    (totalDinero, item) => totalDinero + item.denominacion * item.cantidad,
    0
  );

  if (cambio < 0) {
    status = "El cliente no ha pagado completo el total de la compra";
  } else if (cambio === 0) {
    status = "Ajustado, el cliente ha pagado completo";
  } else if (cambio === totalEnCaja) {
    status = "Caja registradora cerrada";
    vueltas = billetesEnCaja;
  } else if (cambio > totalEnCaja) {
    status = "Caja Registradoras sin fondos";
  } else if (cambio < totalEnCaja) {
    //En este bloque suceden los dos últimos casos a considerar.
    let vuelto = cambio;

    billetesEnCaja.forEach((billete) => {
      const billetesNecesario = Math.floor(vuelto / billete.denominacion);
      if (billetesNecesario > 0) {

        const dinero = {
          denominacion: billete.denominacion,
          cantidad: 0
        };

        if (billetesNecesario <= billete.cantidad) {
          dinero.cantidad = billetesNecesario
          // const dinero = {
          //   denominacion: billete.denominacion,
          //   cantidad: billetesNecesario
          // }
          // vueltas.push(dinero);
          // // billete.cantidad =  billete.cantidad - billetesNecesario
          // billete.cantidad -= billetesNecesario;
          // vuelto -= billetesNecesario * billete.denominacion;
          
        } else {
          dinero.cantidad = billete.cantidad;
          // const dinero = {
          //   denominacion: billete.denominacion,
          //   cantidad: billete.cantidad
          // }

          // vueltas.push(dinero);
          // // billete.cantidad =  billete.cantidad - billetesNecesario
          // billete.cantidad -= billete.cantidad;
          // vuelto -= billete.cantidad * billete.denominacion;
        }
        vueltas.push(dinero);
        billete.cantidad -= dinero.cantidad;
        vuelto -=billete.denominacion*dinero.cantidad
      }
    });

    if (vuelto > 0) {
      status = "La caja registradora no tiene suficiente sencillo para completar el cambio"; 
      console.log("No se le pudo entregar", vuelto);
    } else {
      status = "El cambio se entregó completo"
    }
  }

  return {
    status,
    vueltas,
  };
};

const billetesPresentesEnCaja = [
  {
    denominacion: 100000,
    cantidad: 2,
  },
  {
    denominacion: 50000,
    cantidad: 3,
  },
  {
    denominacion: 20000,
    cantidad: 10,
  },
  {
    denominacion: 10000,
    cantidad: 10,
  },
  {
    denominacion: 5000,
    cantidad: 15,
  },
  {
    denominacion: 2000,
    cantidad: 0,
  },
  {
    denominacion: 1000,
    cantidad: 0,
  },
  {
    denominacion: 500,
    cantidad: 0,
  },
  {
    denominacion: 200,
    cantidad: 0,
  },
  {
    denominacion: 100,
    cantidad: 0,
  },
  {
    denominacion: 50,
    cantidad: 0,
  },
];

const respuestaCaja = cajaRegistradora(386000, 400000, billetesPresentesEnCaja);

console.log(respuestaCaja);
