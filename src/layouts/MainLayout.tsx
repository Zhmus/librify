import { Outlet, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const MainLayout = () => {
    return (
        <div className="container">
            <div className="d-flex align-items-center py-3 bg-light">
                <h2 className="mb-0 display-6 logo-librify text-secondary">Librify</h2>
                <Nav variant="pills" className="p-3 bg-light">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/books" end>
                            Books
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/readers">
                            Readers
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/loans">
                            Loans
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/stats">
                            Stats
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="py-3">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
