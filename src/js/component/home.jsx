import React , {useEffect, useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
	const[tarea,setTarea] = useState("")
	const [listaTareas, setListaTareas] = useState(["Aprender React", "Cocinar", "Estudiar"])
	const agregarTarea = async(evento)=>{
		if(evento.key === "Enter"){
			// setListaTareas([...listaTareas, tarea])
			try {
				const response= await fetch("https://playground.4geeks.com/todo/todos/luana", {
					method: "POST", 
					headers: {"Content-Type":"application/json"} , 
					body: JSON.stringify({
						"label": tarea,
						"is_done": false
					})
				})
				if(response.status == 201) {
					await obtenerTareas()
					setTarea("")
					return true
				}
			} catch (error) {
				console.log(error)
				return false
			}
			setTarea("")
		}
	}
	const borrarTarea = async (evento, index) => {
		evento.preventDefault()
		// let listaFiltrada= listaTareas.filter((item, id ) => {
		// 	return(id != index)
		// })
		// setListaTareas(listaFiltrada)
		try {
			const response= await fetch("https://playground.4geeks.com/todo/todos/" + index, {
				method: "DELETE", 
				headers: {"Content-Type":"application/json"} , 
				
			})
			console.log(response.status)
			if(response.status == 204) {
				obtenerTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const crearUsuario = async()=>{
		try {
			const response= await fetch("https://playground.4geeks.com/todo/users/luana", {
				method: "POST", 
				headers: {"Content-Type":"application/json"}
			})
			if(response.ok){
				obtenerTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const obtenerTareas = async()=>{
		try {
			const response= await fetch("https://playground.4geeks.com/todo/users/luana")
			if(response.status == 404){
				crearUsuario ()
				return
			}
			const data = await response.json() 
			setListaTareas (data.todos)
		} catch (error) {
			console.log(error)
			return false
		}
	}
	
	useEffect(()=> {
		obtenerTareas()
	}, [])

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">To Do List!</h1>
			<input type="text" className="form-control" 
			value = {tarea}
			onChange={(evento)=> setTarea(evento.target.value)}
			onKeyDown ={agregarTarea}
			/>
			<ul className="list-group mt-3">
				{listaTareas.map((item)=>(
					<li className="list-group-item" key={item.id}> 
					{item.label} 
					<i className="fa fa-trash float-end fs-4 text-danger icono-oculto" onClick = {(evento) => borrarTarea(evento,item.id)}></i>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;