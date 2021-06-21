import './css/App.css';
import Chart from './main_components/Chart';
import Logo from './main_components/Logo';
import Footer from './main_components/Footer';
import Navbar from './main_components/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<Logo />
			<Chart />
			<Footer />
		</>
	);
}

export default App;
