
import { Route, Routes } from "react-router";
import Homepage from "./routes/homepage";
import Rootlayout from "./layouts/RootLayout";
import AllMovies from "./routes/all-movies/AllMovies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/all" element={<AllMovies />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
