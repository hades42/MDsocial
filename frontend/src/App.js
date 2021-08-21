import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import SinglePoem from "./screens/SinglePoem";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Route path="/poem/:id" component={SinglePoem}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
