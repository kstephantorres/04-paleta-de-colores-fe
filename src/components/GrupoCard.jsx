import { Col, Row, Container } from 'react-bootstrap';
import Tarjeta from './Tarjeta';

const GrupoCard = ({ listaColor, borrarColor, editarColor }) => {
  
  
  return (
    <Container className="">
    <Row xs={1} md={2} lg={4} className="g-4">
      {listaColor
      ? listaColor.map((color, index)=>{
        return <Col key={color._id} className='d-flex justify-content-around'>
                  <Tarjeta
                  key={index}
                  color={color}
                  borrarColor={borrarColor}
                  editarColor={editarColor}
                  />
              </Col>
      })
      :<p>No hay colores para mostrar</p>
      }
    </Row>
    </Container>
  );
};

export default GrupoCard;