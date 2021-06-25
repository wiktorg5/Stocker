import './css/App.css';
import Chart from './main_components/Chart';
import Logo from './main_components/Logo';
import Footer from './main_components/Footer';
import Navbar from './main_components/Navbar';
import News from './main_components/News';

function App() {
	return (
		<>
			<Navbar />
			<Logo />
			<Chart />
			<News />
			<Footer />
		</>
	);
}

export default App;
