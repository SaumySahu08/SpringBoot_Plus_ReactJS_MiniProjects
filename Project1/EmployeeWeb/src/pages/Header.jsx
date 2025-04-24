import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Employee Management
        </Link>
        <nav className="space-x-6">
          <Link to="/employees" className="hover:text-yellow-300 font-medium">
            Employees
          </Link>
          <Link to="/employee" className="hover:text-yellow-300 font-medium">
            Post Employee
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
