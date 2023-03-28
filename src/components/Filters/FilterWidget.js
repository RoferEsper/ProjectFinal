import useProducts from "../../utils/useProducts";
import Form from "react-bootstrap/Form";
function FilterWidget ({}) {

    const {
        productos,
        handleFilter,
     
      } = useProducts();

 return (
    <div>
    <h5>CATEGORIAS</h5>
    <Form>
      {['Todas las categorias', 'Running', 'Trainning', 'Outdoor', 'Footbal', 'Clasicas', 'Ojotas',].map((cat) => (
        <div key={`${cat}`} className="mb-3">
          <Form.Check
            onChange={handleFilter}
            value={`${cat}`}
            id={`${cat}`}
            label={`${cat}`}
          />
        </div>
      ))}
    </Form>
    <h5>MARCAS</h5>
    <Form >
      {['Todas las marcas', 'Adidas', 'Nike', 'Fila', 'Reebok'].map((marca) => (
        <div key={`${marca}`} className="mb-3">
          <Form.Check type="checkbox"
            onChange={handleFilter}
            value={`${marca}`}
            id={`${marca}`}
            label={`${marca}`}
          />
        </div>
      ))}
    </Form>
    <h5>PRECIO</h5>
    <Form>
      <select>
        {['OFERTAS', '$10.000 a $20.000', '$20.000 a $30.000', '$30.000 a $40.000', '$50.000 a $60.000'].map((price) => (
          <option value={`${price}`}>{price}</option>
        ))}
      </select>
    </Form>

    </div>
)
}
export default FilterWidget;
