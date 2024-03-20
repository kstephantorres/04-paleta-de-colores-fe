import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GrupoCard from './GrupoCard';
import { leerColoresAPI, crearColorAPI, borrarColorAPI, editarColorAPI } from '../helpers/queries'
import Swal from 'sweetalert2';

const FormularioColores = () => {
    const [color,setColor] = useState('')
    const [listaColor, setListaColor]= useState([])
    const inputRef = useRef(null)

    const consultarAPI = async()=>{
        try {
            const response = await leerColoresAPI()
            setListaColor(response)
        } catch (error) {
            console.log("🚀 ~ consultarAPI ~ error:", error)
        }       
    }


    useEffect(()=>{
        consultarAPI()
        
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault()
            const response = await crearColorAPI(color)
            if(response.status === 201)
            {
                console.log("Colo creado")
                consultarAPI()
            }
            else{
                console.log("No se pudo crear el color")
            }
    }

    // const handleColorChange = (event) => {
    //     setColor(event.target.value);
    //   };

    // const borrarTarjeta=(nombre)=>{
    //     const coloresFiltrados = listaColor.filter((color)=> color !== nombre)
    //     setListaColor(coloresFiltrados)
    // }

    const borrarColor=(idColor)=>{
        Swal.fire({
            title: "¿Estas seguro de eliminar este color?",
            text: "No se puede revertir este proceso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const response = await borrarColorAPI(idColor)
              if(response.status === 200){
                Swal.fire({
                    title: "¡Color eliminado!",
                    text: `El color fue eliminado correctamente`,
                    icon: "success"
                  });
                consultarAPI()
              }else{
                Swal.fire({
                    title: "¡Ocurrio un error!",
                    text: `El color no fue eliminado. Intentelo nuevamente más tarde.`,
                    icon: "error"
                  });
              }
            }
          });
        
    }
    const editarColor = async (idColor, color) => {
        try {
            const response = await editarColorAPI(idColor, color);
            if (response.status === 200) {
                console.log("Color editada");
                consultarAPI();
            } else {
                console.log("No se pudo editar el color");
            }
        } catch (error) {
            console.log("Error al editar el color:", error);
        }
    };

    return (
        <section>
            <Form onSubmit={handleSubmit} className='border rounded mb-4'>
                <h1 className="text-start fs-5 my-3 ms-3">Administrar colores:</h1>
                <Form.Group className="mb-3 d-flex justify-content-around align-items-baseline bg-primary-subtle p-4" id="formGroup" controlId="formBasic">
                    <div id="colorImg" className="align-self-center border border-secondary" style={{ backgroundColor: "#"+color }}>
                        
                    </div>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingrese un color (hexadecimal). Ej: 0F0F0F" 
                        className='ms-3 w-75 mt-4' 
                        value={color}
                        pattern="^[0-9a-fA-F]{6}$"
                        onChange={(e)=>{
                            setColor( e.target.value.toUpperCase())
                            // handleColorChange(e)
                            }}
                        ref={inputRef}
                        required
                        minLength={6}
                        maxLength={6}
                    />
                </Form.Group>
                <div className='text-end pe-3'>
                    <Button variant="primary" type="submit" className="mb-3 shadow rounded">
                        Guardar
                    </Button>
                </div>
            </Form>
            <GrupoCard listaColor={listaColor} borrarColor={borrarColor} editarColor={editarColor}></GrupoCard>
        </section>
        
    );
};

export default FormularioColores;