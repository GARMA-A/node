import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <div className="flex flex-col items-center">
            <nav className="bg-gray-800 p-4 w-full">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/search" className="text-white hover:text-gray-300">Search</Link>
                    </li>

                    <li>
                        <Link to="/add" className="text-white hover:text-gray-300">Add</Link>
                    </li>

                    <li>
                        <Link to="/delete" className="text-white hover:text-gray-300">Delete</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
