import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <>
      <div className="App">
        <Layout>
          <h1>Hello World!</h1>
          <BurgerBuilder />
        </Layout>
      </div>
    </>
  );
}

export default App;
