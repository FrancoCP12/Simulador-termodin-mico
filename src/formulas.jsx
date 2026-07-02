function factorVision(objeto, destino, obstaculos) {
    let centroObjX = objeto.x + 98 / 2;
    let centroObjY = objeto.y + 98 / 2;
    let centroDesX = destino.x + 98 / 2;
    let centroDesY = destino.y + 98 / 2;
    let pxToM =  1 / 98;
    //let distance2 = Math.pow((centroDesY - centroObjY) * pxToM, 2) + Math.pow((centroDesX - centroObjX) * pxToM, 2)
    for (let obs of obstaculos) {
        if (obs.id === objeto.id || obs.id === destino.id) continue;

        if (centroObjX === centroDesX) {
            if (obs.x <= centroObjX && obs.x + 98 >= centroObjX) {
                if ((obs.y < centroDesY && obs.y + 98 > centroObjY) ||
                    (obs.y < centroObjY && obs.y + 98 > centroDesY)) {
                    return 0;
                }
            }
        }

        else if (centroObjY === centroDesY) {
            if (obs.y <= centroObjY && obs.y + 98 >= centroObjY) {
                if ((obs.x < centroDesX && obs.x + 98 > centroObjX) ||
                    (obs.x < centroObjX && obs.x + 98 > centroDesX)) {
                    return 0;
                }
            }
        }

        else {
            let m = (centroDesY - centroObjY) / (centroDesX - centroObjX);

            let y1 = centroObjY + m * (obs.x - centroObjX);
            let y2 = centroObjY + m * ((obs.x + 98) - centroObjX);

            
            if (((y1 >= obs.y && y1 <= obs.y + 98) ||
                 (y2 >= obs.y && y2 <= obs.y + 98)) &&
                ((obs.x < centroDesX && obs.x + 98 > centroObjX) ||
                 (obs.x < centroObjX && obs.x + 98 > centroDesX))) {
                return 0;
            }
        }
    }

   // return 1/(distance2); 
   return 1 ;
}

export function tmpEquilibrio(objetos){
  let mc= []
  let mct = []
  for(let i = 0; i < objetos.length; i++){
    mc.push(objetos[i].masa * objetos[i].calorEspecifico)
    mct.push(objetos[i].masa * objetos[i].calorEspecifico * objetos[i].tmpInicial)
  }
  return (mct.reduce((x, acc)=> acc+=x)) / (mc.reduce((x, acc)=> acc+=x))
}




function contactless(obj_i, obj_j, error = 1) {
  const leftA   = obj_i.x;
  const rightA  = obj_i.x + 98;
  const topA    = obj_i.y;
  const bottomA = obj_i.y + 98;

  const leftB   = obj_j.x;
  const rightB  = obj_j.x + 98;
  const topB    = obj_j.y;
  const bottomB = obj_j.y + 98;

  let contacto = 0;

  if (Math.abs(rightA - leftB) <= error || Math.abs(rightB - leftA) <= error) {
    const overlapY = Math.min(bottomA, bottomB) - Math.max(topA, topB);
    if (overlapY > 0) contacto = overlapY; 
  }

  if (Math.abs(bottomA - topB) <= error || Math.abs(bottomB - topA) <= error) {
    const overlapX = Math.min(rightA, rightB) - Math.max(leftA, leftB);
    if (overlapX > 0) contacto = overlapX;
  }

  return contacto;
}


export function actualizarTemperaturas(componentes, dt, tiempoInicial) {
    const sigma = 5.67e-8;

    
    let tempsActuales = {}; 
    let tempsNuevas = {};
    let calorNuevo = {};
    let calorActual = {};

    for(let h = 0; h < componentes.length; h++){
      tempsActuales[componentes[h].id] = parseFloat(componentes[h].tmpInicial);
      calorActual[componentes[h].id] = parseFloat(componentes[h].calor)
    }


    console.log("Temps: 1:", tempsActuales[0], "2:", tempsActuales[1], "3:", typeof(tempsActuales[1])) // Ahora será 'number'

    for (let i = 0; i < componentes.length; i++) {
        let dQ = 0;
        const obj_i = componentes[i];
        
        const tmpInicialI = tempsActuales[obj_i.id];
        const calorInicialI = calorActual[obj_i.id];
        
        for (let j = 0; j < componentes.length; j++) {
            if (i === j) continue;
            
            const obj_j = componentes[j];
            const tmpInicialJ = tempsActuales[obj_j.id];

            const aContacto = contactless (obj_i, obj_j) / 98;
            const Fij = factorVision(obj_i, obj_j, componentes);
            
            let emi_i = obj_i.emisividad ?? 0;
            let emi_j = obj_j.emisividad ?? 0;
                
            if (emi_i > 0 && emi_j > 0) {
                let denom = (1/emi_i) + (1/emi_j) - 1;
                let emisividad_equivalente = 1 / denom;
            
                dQ += sigma * emisividad_equivalente * Fij * (Math.pow(tmpInicialJ, 4) - Math.pow(tmpInicialI, 4));
            }
            
            if((aContacto > 0) && obj_i.conductividad > 0 && obj_j.conductividad > 0){
                dQ += ((aContacto * obj_i.conductividad * obj_j.conductividad * (tmpInicialJ - tmpInicialI))/ 10e-5 )
            }
        }
        console.log(dQ);
        const dT = (dQ * dt) / (obj_i.masa * obj_i.calorEspecifico);
        console.log("dT",dT);
        tempsNuevas[obj_i.id] = (tmpInicialI + dT);
        calorNuevo[obj_i.id] = (calorInicialI + dQ);

    }
    console.log(parseFloat(tiempoInicial) + parseFloat(dt))
    return [parseFloat(tiempoInicial) + parseFloat(dt), componentes.map(obj => {
        return {
            ...obj, 
            tmpInicial: tempsNuevas[obj.id],
            calor: calorNuevo[obj.id]
        };
    })];
}