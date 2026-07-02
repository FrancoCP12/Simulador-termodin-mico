import { useState, useRef, useEffect} from 'react'
import Objeto from './Objeto.jsx'
import Plantilla from './Plantilla.jsx'
import {actualizarTemperaturas, tmpEquilibrio} from '../formulas.jsx'

function Create() {
  const [tmpEqui, setTmpEqui ] =  useState(0)
  const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/
  const [objetos, setObjetos] = useState([])
  const [start, setStart] = useState(false)
  const [tmpInicial, setTmp] = useState("")
  const [emisividad, setEmisividad] = useState("")
  const [masa, setMasa] = useState("")
  const [calorEspecifico, setCalorEspecifico] = useState("")
  const [conductividad, setConductividad] = useState("")
  const [dt,setDt] = useState(0)
  const requestRef = useRef();
  const lastTimeRef = useRef(0);
  const [paso, setPaso] = useState(0.0001)


  const cargarTmp = (a)=>{
    setTmp(a)
  }
  const cargarEmisividad = (a)=>{
    setEmisividad(a)
  }
    const cargarMasa = (a)=>{
    setMasa(a)
  }
    const cargarCalorEspecifico = (a)=>{
    setCalorEspecifico(a)
  }
    const cargarConductividad = (a)=>{
    setConductividad(a)
  }
    const cargarDt = (a)=>{
    setDt(a)
  }
  const escalar = (comp) => {
  let verificacion = comp.every(numero => numero.conductividad === 0);
  if(!verificacion){
    setPaso(0.00000000001)
  }
  else
    setPaso(0.0001);

}
  const handlerPosiciones = (id, x, y)=>{
    setObjetos(prev=>{
      let newList = []
      for(let i = 0; i<prev.length; i++){
        if(prev[i].id === id){
          prev[i].x = x
          prev[i].y = y
          newList.push(prev[i])
        }else{
        newList.push(prev[i])}
      }
      
      return newList
    })
  }

  const handlerCreate = () =>{
    const nuevoObjeto = { id: objetos.length,
      tmpInicial: parseFloat((!regex.test(tmpInicial) || tmpInicial === "") ? "0": tmpInicial),
      emisividad: parseFloat(!(( /^0(\.\d{0,2})?$|^1(\.0{0,2})?$/).test(emisividad)) || emisividad === ""? "0": emisividad),
      masa :parseFloat(!regex.test(masa)|| masa === ""? "1": masa) ,
      calorEspecifico :parseFloat(!regex.test(calorEspecifico)|| calorEspecifico === ""? "1": calorEspecifico),
      conductividad :parseFloat(!regex.test(conductividad)|| conductividad === "" ? "0": conductividad),
      x : 0, y: 0 ,
      calor : 0}

    const nuevosObjetos = [...objetos, nuevoObjeto]

    setObjetos(nuevosObjetos)
    setTmp("")
    setEmisividad("")
    setCalorEspecifico("")
    setConductividad("")
    setMasa("")
    setDt(0)
    setStart(false)
    
  }
  const handlerDelete = () =>{
     setObjetos([]) 
     setDt(0)
     setStart(false)
     setPaso(0.0001)
  }
  const handlerStart = () =>{
      setTmpEqui(tmpEquilibrio(objetos))
      escalar(objetos)
      setStart(true)
  }
  // useEffect(() => {

  //   const gameLoop = timestamp => {

  //     const deltaTime = timestamp - lastTimeRef.current;
  //     lastTimeRef.current = timestamp;
  //     const a = (!regex.test(dt) || dt === "") ? 0.0001 : parseFloat(dt);
  //     setObjetos(prevObjetos => actualizarTemperaturas(prevObjetos, deltaTime * a, tmpEqui));

  //     for(let i = 0; i<objetos.length; i++){
  //       if(Math.round(objetos[i].tmpInicial) === tmpEqui){
  //         setStart(false);
  //       }
  //     }
  //     requestRef.current = requestAnimationFrame(gameLoop);

  //   };

  //   if (start) {
  //     lastTimeRef.current = performance.now();
  //     requestRef.current = requestAnimationFrame(gameLoop);
      
  //   } else {
  //     cancelAnimationFrame(requestRef.current);
  //   }
  //   return () => cancelAnimationFrame(requestRef.current);

  // }, [start, dt]); 

    useEffect(() => {
      let intervalId;
    
      if (start) {

        intervalId = setInterval(() => {

          const primerasenso = objetos[0].tmpInicial;
          const todosIguales = objetos.every(objeto => {
            console.log("ACAAAAAAAAAAAAAAAAAAAAAA", primerasenso, objeto.tmpInicial )
            return Math.round(objeto.tmpInicial,5) === Math.round(primerasenso,5);
          });
          console.log(todosIguales)
          if(todosIguales){
            setStart(false)
            objetos.map(prev => prev.tmpInicial = Math.round( prev.tmpInicial))
          }
          setObjetos(prevObjetos => {
           let resultado = actualizarTemperaturas(prevObjetos,  paso, dt)
           
           
           setDt(resultado[0])
           return resultado[1]
          });
          

        }, 10); 
      }
    
      return () => clearInterval(intervalId);
    }, [start, dt]);

    const buttonStyle = {padding:" 1rem 2rem",
            border: "none",
            borderRadius: "0.75rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
            minWidth: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            }
  return (
    <div style={{display: "grid", gridTemplateColumns: "20% 900px", gridTemplateRows:"625px" , gap: "5%"}}>
        <div style={{
          gridColumn: "1", 
         
          padding: "0 10% 0 10%",
          borderRadius: "8px",
          border: "1px solid transparent",
          display: "flex",
          flexWrap: "wrap", 
          justifyContent: "center",
          alignItems: "center",
          background:"linear-gradient( #3a3a3aff, #242424)"
          
          }
          }>
            <div><Plantilla setTemperatura = {cargarTmp} setEmisividad={cargarEmisividad} temperatura ={tmpInicial} emisividad = {emisividad} masa={masa} calorEspecifico={calorEspecifico}conductividad={conductividad} dt={dt} setCalorEspecifico={cargarCalorEspecifico} setMasa={cargarMasa} setDt={cargarDt} setConductividad={cargarConductividad}/></div>
            <div className = 'boton'style={buttonStyle}>Tiempo: {dt.toFixed(11)} s</div>
            <div onClick={handlerCreate} className='boton' style={buttonStyle}>
              Crear
            </div>
            <div onClick={handlerDelete } className='boton' style={buttonStyle}>
              Borrar
            </div>
            <div onClick={handlerStart } className='boton' style={buttonStyle}>
              Start
            </div>
            <div onClick={() => setStart(false)} className='boton' style={buttonStyle}>
              Stop
            </div>
        </div>
        <div style={{gridColumn: "2", position: "relative", overflow: "hidden", background:"linear-gradient( #3a3a3aff, #242424)",borderRadius: "8px", border: "1px solid transparent",}} id='tablero'>
          {objetos.map((comp) => (
            <div key ={comp.id}><Objeto  id={comp.id} otros={objetos} getPosicion={handlerPosiciones} flagStart= {start} className='logo' tmpInicial = {comp.tmpInicial} emisividad= {comp.emisividad} x = {comp.x} y = {comp.y}  calor={comp.calor}/></div>
          ))}
        </div>
      </div>
        
    
  )

}

export default Create
