export function validateInterface(object, DTO) {
  const metodosInterface = Object.getOwnPropertyNames(DTO);
  for (let metodo of metodosInterface) {
    if (!object[metodo]) {
      throw new Error(
        `La clase no implementa el método ${metodo} de la interface.`
      );
    }
  }
}

//CON PROXY
// export function creaInterfaceValidada(objetoBase, interfaz) {
//     const handler = {
//         construct(target, args) {
//             const obj = new target(...args);

//             for (let key of Object.getOwnPropertyNames(interfaz.prototype)) {
//                 if (typeof obj[key] !== 'function') {
//                     throw new Error(`La clase no implementa el método ${key} de la interface.`);
//                 }
//             }

//             return obj;
//         }
//     };

//     return new Proxy(objetoBase, handler);
// }
