import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const Tarjeta = ({color,borrarColor,editarColor }) => {
    const [modalShow, setModalShow] = useState(false); 
    const [editedTask, setEditedTask] = useState('');
    const [taskId, setTaskId] = useState('');  
    const estiloColor = {
        backgroundColor: `#${color.hexadecimal}`,
    }
    const handleEditClick = (color) => {
        console.log("🚀 ~ handleEditClick ~ itemTarea:", color)
        setTaskId(color._id);
        setEditedTask(color.hexadecimal);
        setModalShow(true);
    };
    const handleSave = () => {
        if(editedTask){
            editarColor(taskId, editedTask);
        }
        else{
            alert('No se puede guardar Valores en blanco')
        }
        setModalShow(false);
    };

  return (
    <Card className='cardContenedor '>
        {color.nombre === color.hexadecimal ? 
            <Card.Header><b>{"#"+color.nombre}</b></Card.Header>
            :<Card.Header><b>{color.nombre}</b></Card.Header>
        }
        <span className='d-flex justify-content-center bg-primary-subtle'>
            <Card.Img style={estiloColor} className='tarjetaImg m-2'/>
        </span>
        <Card.Body >
            <Card.Text>
                <b>RGB: </b> {`(${color.rgb.r},${color.rgb.g},${color.rgb.b})`}
            </Card.Text>
            <Card.Text>
                <b>Hexadecimal: </b>{'#'+color.hexadecimal}
            </Card.Text>
            <div className='text-end'>
                <Button variant="warning" onClick={() => handleEditClick(color)} className="me-3 text-white">Editar <i className="bi bi-pencil-square mx-1"></i></Button>
                <Button variant='danger' onClick={()=>{borrarColor(color._id)}} className='shadow rounded'>Borrar</Button>
                
            </div>
        </Card.Body>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Color</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        required
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        minLength={6}
                        maxLength={6}
                        pattern="^[0-9a-fA-F]{6}$"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
    </Card>
  );
};

export default Tarjeta;