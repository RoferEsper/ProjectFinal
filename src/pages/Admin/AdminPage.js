import "./AdminPage.css";
import ModalComponent from "../../components/Modal/Modal";
import useAdmin from '../../utils/useAdmin';
import { Modal, Form, Button } from 'react-bootstrap';

function AdminPage() {
    const { 
        show,
        handleShow,
        handleClose,
        
        onChange,
        PostMethod,
        MapComponent,

        showUpdate,
        handleShowUpdate,
        handleCloseUpdate,
    } = useAdmin();

    return (
        <div>
           hola soy el admin page
        </div>
    )
}

export default AdminPage;