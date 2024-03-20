import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css'
import FormularioColores from './components/FormularioColores'

function App() {
  

  return (
    <Container className="mt-5 p-0">
      <FormularioColores></FormularioColores>
    </Container>
  )
}

export default App
