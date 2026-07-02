import { useEffect, useState, useRef} from 'react'

function Objeto(props) {
  let {id, otros, getPosicion, flagStart, tmpInicial, emisividad, calor} = props
  const [tempIndex, setTempIndex] = useState(0);
  const objetoRef = useRef(null)
  const [tmp, setTmp] = useState(tmpInicial)
  const colorFrio = [96, 165, 250]; 
  const colorTemplado = [52, 211, 153];
  const colorCaliente = [251, 191, 36]; 
  const colorMuyCaliente = [239, 68, 68]; 
  const [calorTotal, setCalorTotal] = useState(calor)
  const [posicionActual, setPosicion] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

useEffect(() =>{
  setTmp(tmpInicial);
  setCalorTotal(calor)
}, [tmpInicial, calor])


  function mezclarColor(color1, color2, factor) {
    return color1.map((c, i) => Math.round(c + (color2[i] - c) * factor));
  }

  function rgbToCss(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

 const handleMouseDown = (e) => {
    setDragging(true)
    setOffset({ x: e.clientX - posicionActual.x, y: e.clientY - posicionActual.y })
  }
  useEffect(() => {
    if (objetoRef.current) {
      const posicion = objetoRef.current.getBoundingClientRect()
      setPosicion({ x: posicion.left, y: posicion.top })
    }
  }, [])

  
    useEffect(() => {
    const handleMouseMove = (e) => {
      const tablero = document.getElementById("tablero")
      const { width, height, left, top } = tablero.getBoundingClientRect()
      let newX = e.clientX - offset.x
      let newY = e.clientY - offset.y 
      newX = Math.max(left-333, Math.min(newX, left-333 + width - 98))
      newY = Math.max(top-10, Math.min(newY, top-10 + height - 98))
      for(let i = 0; i<otros.length; i++){
       
        if(otros[i].id !== id){
          const block = otros[i]
          const blockWidth = block.id !== "head" ? 98 : undefined
          const blockHeight = block.id !== "head" ? 98 : undefined

         
          if (newX < block.x + blockWidth &&
            newX + 98 > block.x &&
            newY < block.y + blockHeight &&
            newY + 98 > block.y) {
          const overlapX = Math.min(
            Math.abs(newX + 98 - block.x),
            Math.abs(block.x + blockWidth - newX)
          );

          const overlapY = Math.min(
            Math.abs(newY + 98 - block.y),
            Math.abs(block.y + blockHeight - newY)
          );
          
          
          if (overlapX < overlapY) {
            
            if (newX < block.x) {
              newX = block.x - 98;
            } else {
              newX = block.x + blockWidth;
            }
          } else {
            
            if (newY < block.y) {
              newY = block.y - 98;
            } else {
              newY = block.y + blockHeight;
            }
          
        }
      newX = Math.max(left-333, Math.min(newX, left-333 + width - 98))
      newY = Math.max(top-10, Math.min(newY, top-10 + height - 98))
          
          
        }
        }}
      if ( dragging) {
        setPosicion({x: newX, y: newY})
        getPosicion(id, posicionActual.x, posicionActual.y)
      }
 
    }

    const handleMouseUp = () => setDragging(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging, offset, otros])
const getColor = () => {
  let color;
  
  if (tmp < 273.15 ) {
    color = colorFrio;
  } else if (tmp < 298.15) {
    const factor = (tmp - 273.15) / 25; 
    color = mezclarColor(colorFrio, colorTemplado, factor);
  } else if (tmp < 333.15) {
    const factor = (tmp - 298.15) / (60 - 25); 
    color = mezclarColor(colorTemplado, colorCaliente, factor);
  } else {
    const factor = Math.min((tmp - 333.15) / 40, 1); 
    color = mezclarColor(colorCaliente, colorMuyCaliente, factor);
  }

  return { 
    position: "absolute",
    top: `${posicionActual.y}px`,
    left: `${posicionActual.x}px`,
    width: "6rem",
    height: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    cursor: dragging ? "grabbing" : "grab",
    userSelect: "none",
    backgroundColor: rgbToCss(color),
  willChange: "box-shadow",
  transition: "box-shadow 300ms",
  boxShadow: `0 0 70em ${10 * emisividad}em ${rgbToCss(color)}`,
    zIndex: dragging ? 1000 : 1
  };
};




  return (
    <>
      <div id={id} ref={objetoRef}style={getColor()} onMouseDown={handleMouseDown} className='letras'>T: {Number.isNaN(tmp) ? "?" : tmp.toFixed(2)}<br></br>Q: {Number.isNaN(calorTotal) ? "?" : calorTotal.toFixed(2)}</div>
    </>
  )

}
export default Objeto;
