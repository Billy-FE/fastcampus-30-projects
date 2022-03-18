import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AllResult from "./components/results/AllResult";
import ImageResult from "./components/results/ImageResult";
import NewsResult from "./components/results/NewsResult";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-wrap justify-center relative">
        <SearchInput />
        <NavigationBar />
      </div>
      <Routes>
        <Route exact path="/" element={<Navigate to="/all" />} />
        <Route exact path="/all" element={<AllResult />} />
        <Route exact path="/news" element={<NewsResult />} />
        <Route exact path="/image" element={<ImageResult />} />
      </Routes>
    </div>
  );
}

export default App;
