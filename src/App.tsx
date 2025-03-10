import React from 'react';
import './App.css';
import MovieTable from "./components/MovieTable";
import ThemeProvider from "./components/layouts/MainLayout";

function App() {
  return (
      <div className="App">
          <div>
              <ThemeProvider>
                  <MovieTable/>
              </ThemeProvider>
          </div>
      </div>
  );
}

export default App;
