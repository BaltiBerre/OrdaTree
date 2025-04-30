import { useState } from 'react';
import { Map, Upload, ChevronRight, PanelTop, BarChart3, Leaf, TreePine } from 'lucide-react';

// Main App Component
export default function TreeRecommendationApp() {
  const [activeTab, setActiveTab] = useState('newSite');
  const [currentStep, setCurrentStep] = useState('input');
  const [coordinates, setCoordinates] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  
  // Mock data for soil quality results
  const soilResults = {
    qualityIndex: 78,
    bestSite: "North-facing slope",
    geeStats: {
      moisture: "Medium",
      pH: 6.8,
      nutrients: "High",
      texture: "Loamy"
    },
    recommendedTrees: ["Oak", "Maple", "Pine", "Birch", "Cherry"]
  };
  
  // Mock data for existing site analysis
  const existingSiteResults = {
    treeCount: 12,
    carbonDisplacement: 2.4,
    totalCarbonDisplacement: 28.8
  };
  
  const handleSubmitCoordinates = () => {
    if (coordinates.trim()) {
      setCurrentStep('results');
    }
  };
  
  const handleUploadSubmit = () => {
    if (uploadedImage && selectedSpecies) {
      setCurrentStep('results');
    }
  };
  
  const resetForm = () => {
    setCurrentStep('input');
    setCoordinates('');
    setUploadedImage(null);
    setSelectedSpecies('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TreePine size={28} />
            <h1 className="text-xl font-bold">EcoTree Solutions</h1>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1">
            <button 
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'newSite' ? 'bg-green-600' : 'bg-green-800'}`}
              onClick={() => {
                setActiveTab('newSite');
                resetForm();
              }}
            >
              <div className="flex items-center space-x-2">
                <Map size={16} />
                <span>New Site</span>
              </div>
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'existingSite' ? 'bg-green-600' : 'bg-green-800'}`}
              onClick={() => {
                setActiveTab('existingSite');
                resetForm();
              }}
            >
              <div className="flex items-center space-x-2">
                <Upload size={16} />
                <span>Existing Site</span>
              </div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {activeTab === 'newSite' ? (
          /* New Site Flow */
          currentStep === 'input' ? (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
              <div className="text-center mb-6">
                <TreePine size={64} className="mx-auto text-green-600 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Find Optimal Trees</h2>
                <p className="text-gray-600">Enter coordinates to analyze soil quality</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mb-1">
                    Coordinates (Latitude, Longitude)
                  </label>
                  <input
                    type="text"
                    id="coordinates"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g. 37.7749, -122.4194"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                  />
                </div>
                
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center space-x-2"
                  onClick={handleSubmitCoordinates}
                >
                  <span>Analyze Soil</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
              <div className="text-center mb-6">
                <PanelTop size={48} className="mx-auto text-green-600 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Soil Quality Dashboard</h2>
                <p className="text-gray-600">Results for coordinates: {coordinates}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg text-green-800 mb-2">Soil Quality</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                      {soilResults.qualityIndex}
                    </div>
                    <div>
                      <p className="text-gray-700">Quality Index</p>
                      <p className="font-semibold">Best Site: {soilResults.bestSite}</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-green-800 mb-2">GEE Stats:</h4>
                  <ul className="space-y-1">
                    {Object.entries(soilResults.geeStats).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    <div className="flex items-center">
                      <Leaf size={20} className="mr-2" />
                      <span>Recommended Trees</span>
                    </div>
                  </h3>
                  
                  <ul className="space-y-2">
                    {soilResults.recommendedTrees.map((tree, index) => (
                      <li key={index} className="flex items-center p-2 bg-white rounded border border-green-100">
                        <TreePine size={18} className="text-green-700 mr-2" />
                        <span>{tree}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
                  onClick={resetForm}
                >
                  Analyze Another Site
                </button>
              </div>
            </div>
          )
        ) : (
          /* Existing Site Flow */
          currentStep === 'input' ? (
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
              <div className="text-center mb-6">
                <Upload size={64} className="mx-auto text-green-600 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Analyze Existing Site</h2>
                <p className="text-gray-600">Upload an image and specify species</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Site Image
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-green-500"
                    onClick={() => setUploadedImage("example-image.jpg")}
                  >
                    {uploadedImage ? (
                      <div className="text-green-600 font-medium">Image uploaded</div>
                    ) : (
                      <div className="text-gray-500">
                        <Upload size={24} className="mx-auto mb-2" />
                        <p>Click to upload or drag and drop</p>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
                    Tree Species
                  </label>
                  <select
                    id="species"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={selectedSpecies}
                    onChange={(e) => setSelectedSpecies(e.target.value)}
                  >
                    <option value="">Select a species</option>
                    <option value="oak">Oak</option>
                    <option value="pine">Pine</option>
                    <option value="maple">Maple</option>
                    <option value="birch">Birch</option>
                    <option value="cherry">Cherry</option>
                  </select>
                </div>
                
                <button
                  className={`w-full font-medium py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
                    uploadedImage && selectedSpecies 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleUploadSubmit}
                  disabled={!uploadedImage || !selectedSpecies}
                >
                  <span>Analyze Site</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
              <div className="text-center mb-6">
                <BarChart3 size={48} className="mx-auto text-green-600 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Carbon Impact Analysis</h2>
                <p className="text-gray-600">Results for {selectedSpecies.charAt(0).toUpperCase() + selectedSpecies.slice(1)} trees</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                  <h3 className="font-bold text-lg text-green-800 mb-1">Tree Count</h3>
                  <p className="text-3xl font-bold text-green-700">{existingSiteResults.treeCount}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                  <h3 className="font-bold text-lg text-green-800 mb-1">Carbon/Sq.Ft</h3>
                  <p className="text-3xl font-bold text-green-700">{existingSiteResults.carbonDisplacement}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                  <h3 className="font-bold text-lg text-green-800 mb-1">Total Carbon</h3>
                  <p className="text-3xl font-bold text-green-700">{existingSiteResults.totalCarbonDisplacement}</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                <h3 className="font-bold text-lg text-green-800 mb-2">Analysis</h3>
                <p className="text-gray-700">
                  Based on the uploaded image, we've identified {existingSiteResults.treeCount} trees of the {selectedSpecies} species. 
                  These trees contribute significantly to carbon sequestration in your area.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
                  onClick={resetForm}
                >
                  Analyze Another Site
                </button>
              </div>
            </div>
          )
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-green-800 text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 EcoTree Solutions - Sustainable Tree Planning & Analysis</p>
        </div>
      </footer>
    </div>
  );
}