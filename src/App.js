import React, { useState } from 'react';

const App = () => {
  const [page, setPage] = useState('home');
  const [coordinates, setCoordinates] = useState('');
  const [species, setSpecies] = useState('');
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  
  const handleCoordinateSubmit = (e) => {
    e.preventDefault();
    setResults({
      quality: 78,
      bestSite: "North-facing slope",
      stats: {
        ph: 6.8,
        nitrogen: "Medium",
        phosphorus: "High",
        potassium: "Medium"
      },
      possibleTrees: ["Oak", "Maple", "Pine", "Birch"]
    });
    setPage('soilDashboard');
  };
  
  const handleExistingSiteSubmit = (e) => {
    e.preventDefault();
    setResults({
      treeCount: 14,
      carbonDisplacement: 2.3,
      totalCarbonDisplacement: 32.2
    });
    setPage('existingSiteDashboard');
  };
  
  const renderHome = () => (
    <div className="flex flex-col items-center p-8 gap-8">
      <h1 className="text-3xl font-bold text-green-700">TreeSoil Analysis Tool</h1>
      
      <div className="w-full max-w-md bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-4">New Site Analysis</h2>
        <form onSubmit={handleCoordinateSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-green-700 mb-1">Enter Coordinates:</label>
            <input 
              type="text" 
              value={coordinates} 
              onChange={(e) => setCoordinates(e.target.value)} 
              placeholder="Latitude, Longitude" 
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Analyze Soil
          </button>
        </form>
      </div>
      
      <div className="w-full max-w-md bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Existing Site Analysis</h2>
        <form onSubmit={handleExistingSiteSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-green-700 mb-1">Upload Image:</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 mb-1">Tree Species:</label>
            <input 
              type="text" 
              value={species} 
              onChange={(e) => setSpecies(e.target.value)} 
              placeholder="e.g., Oak, Maple" 
              className="w-full p-2 border border-green-300 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Analyze Site
          </button>
        </form>
      </div>
      
      <footer className="mt-8 text-sm text-green-600">
        Created by Baltasar Berretta | April 2025
      </footer>
    </div>
  );
  
  const renderSoilDashboard = () => (
    <div className="flex flex-col items-center p-8 gap-6">
      <h1 className="text-3xl font-bold text-green-700">Soil Dashboard</h1>
      
      <div className="w-full max-w-md bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Results for: {coordinates}</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Soil Quality Index</h3>
          <div className="text-3xl font-bold">{results.quality}/100</div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Best Site Type</h3>
          <div>{results.bestSite}</div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Soil Stats (from GEE)</h3>
          <ul className="list-disc pl-5">
            <li>pH: {results.stats.ph}</li>
            <li>Nitrogen: {results.stats.nitrogen}</li>
            <li>Phosphorus: {results.stats.phosphorus}</li>
            <li>Potassium: {results.stats.potassium}</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Recommended Trees</h3>
          <ul className="list-disc pl-5">
            {results.possibleTrees.map((tree, index) => (
              <li key={index}>{tree}</li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={() => setPage('home')} 
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
  
  const renderExistingSiteDashboard = () => (
    <div className="flex flex-col items-center p-8 gap-6">
      <h1 className="text-3xl font-bold text-green-700">Existing Site Dashboard</h1>
      
      <div className="w-full max-w-md bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Results for: {species}</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Tree Count</h3>
          <div className="text-3xl font-bold">{results.treeCount}</div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Carbon Displacement per Square Foot</h3>
          <div>{results.carbonDisplacement} tons</div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-green-700">Total Carbon Displacement</h3>
          <div>{results.totalCarbonDisplacement} tons</div>
        </div>
        
        <button 
          onClick={() => setPage('home')} 
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-green-100">
      {page === 'home' && renderHome()}
      {page === 'soilDashboard' && renderSoilDashboard()}
      {page === 'existingSiteDashboard' && renderExistingSiteDashboard()}
    </div>
  );
};

export default App;