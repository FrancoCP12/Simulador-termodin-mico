
function Plantilla({setTemperatura, setEmisividad , temperatura, emisividad, masa, setMasa, calorEspecifico, setCalorEspecifico, conductividad, setConductividad, dt, setDt }) {

  const handlerTemperatura = (event)=>{
    const value = event.target.value;
    const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setTemperatura(value);
    }
  };
  
  const handlerEmisiviadad = (event)=>{
    const value = event.target.value;
    const regex =  /^0(\.\d{0,2})?$|^1(\.0{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setEmisividad(value);
  }
  };
    const handlerMasa = (event)=>{
    const value = event.target.value;
    const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setMasa(value);
  }
  };
    const handlercalorEspecifico = (event)=>{
    const value = event.target.value;
    const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setCalorEspecifico(value);
  }
  };
    const handlerconductividad = (event)=>{
    const value = event.target.value;
    const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setConductividad(value);
  }
  };
    const handlerdt = (event)=>{
    const value = event.target.value;
    const regex = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (value === "" || regex.test(value)) {
      setDt(value);
  }
  };
  return(
  <div className='letras' style={{ 
  width: "15rem",
  height: "14rem",
  display: "grid",
  gridTemplateRows: "16% 16% 16% 16% 16%",
  gridTemplateColumns:"70% 30%",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.58)",
  background: "radial-gradient(rgba(204, 167, 245, 0.58), rgba(119, 0, 255, 0.8))",
  willChange: "filter",
  transition: "filter 300ms",
  cursor: "default",
  filter: `drop-shadow(0 0 2rem rgba(119, 0, 255, 0.8))`,
  paddingTop: "20px"
}}>
  <input type="text" value={temperatura} onChange={handlerTemperatura} style={{ 
    textAlign:"center",
    gridRow: "1", 
    gridColumn: "1",
    height: "70%", 
    width: "70%",
    cursor: "pointer", 
    borderRadius: "0.75rem", 
    padding: "0.25rem", 
    boxSizing: "border-box", 
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "#3a3a3a7e"
  }} />
  <div style={{ gridRow: "1", gridColumn: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "70%" }}>
    <p style={{ margin: 0 , color: "#3a3a3aff"}}>K</p>
  </div>

  <input type="text" value={emisividad} onChange={handlerEmisiviadad} style={{ 
    textAlign:"center",
    gridRow: "2", 
    gridColumn: "1",
    height: "70%", 
    width: "70%",
    cursor: "pointer",
    borderRadius: "0.75rem", 
    padding: "0.25rem", 
    boxSizing: "border-box",
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "#3a3a3a7e"
  }} />
  <div style={{ gridRow: "2", gridColumn: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "70%" }}>
    <p style={{ margin: 0 , color: "#3a3a3aff"}}>e</p>
  </div>

  <input type="text" value={masa} onChange={handlerMasa} style={{ 
    textAlign:"center",
    gridRow: "3", 
    gridColumn: "1",
    height: "70%", 
    width: "70%",
    cursor: "pointer",
    borderRadius: "0.75rem", 
    padding: "0.25rem", 
    boxSizing: "border-box",
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "#3a3a3a7e"
  }} />
  <div style={{ gridRow: "3", gridColumn: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "70%" }}>
    <p style={{ margin: 0, color: "#3a3a3aff" }}>Kg</p>
  </div>

  <input type="text" value={calorEspecifico} onChange={handlercalorEspecifico} style={{ 
    textAlign:"center",
    gridRow: "4", 
    gridColumn: "1",
    height: "70%", 
    width: "70%",
    cursor: "pointer",
    borderRadius: "0.75rem", 
    padding: "0.25rem", 
    boxSizing: "border-box",
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "#3a3a3a7e"
  }} />
  <div style={{ gridRow: "4", gridColumn: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "70%" }}>
    <p style={{ margin: 0, color: "#3a3a3aff" }}>J/Kg*K</p>
  </div>

  <input type="text" value={conductividad} onChange={handlerconductividad} style={{ 
    textAlign:"center",
    gridRow: "5", 
    gridColumn: "1",
    height: "70%", 
    width: "70%",
    cursor: "pointer",
    borderRadius: "0.75rem", 
    padding: "0.25rem", 
    boxSizing: "border-box",
    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "#3a3a3a7e"
  }} />
  <div style={{ gridRow: "5", gridColumn: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", height: "70%" }}>
    <p style={{ margin: 0 , color: "#3a3a3aff"}}>W/m*K</p>
  </div>
</div>
)
}

export default Plantilla;