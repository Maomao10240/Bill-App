import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout/Dashboard";
import Year from "./pages/Layout/Year";
import Month from "./pages/Layout/Month";
import New from "./pages/New/new";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path = "/" element ={<Layout/>}>
                <Route path = "month" element ={<Month/>}/>
                <Route path = "year" element ={<Year/>}/>
                  </Route>
              <Route path ="/new" element={<New />} />

          </Routes>
      </BrowserRouter>



  );
}

export default App;
