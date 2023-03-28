import { Link } from 'react-router-dom';
import './subNav.css'



function SubNavbar() {
    return (

        <div className="subNav">
            <div className="categorias-suvnab">
               
                    <ul>
                        <li> <Link className='link-cat' to="/womanpage">Woman</Link> </li>
                        <li> <Link className='link-cat' to="/manpage">Men</Link> </li>
                        
                        
                    </ul>
                
            </div>
        </div>
    )
}
export default SubNavbar;