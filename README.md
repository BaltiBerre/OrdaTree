# TreeSoil Analysis Tool - Overview

**Created by:** Baltasar Berretta (you)  
**Created in:** April 2025 (started April 14th)  
**Development time:** 2–3 days

## Key Functionality

### Home Screen

Two main sections:

- New Site Analysis (coordinates input)  
- Existing Site Analysis (image upload + species input)

Simple green-themed interface

### Soil Dashboard (after coordinate input)

- Shows soil quality index (out of 100)  
- Displays best site type for planting  
- Shows soil stats from GEE (pH, nitrogen, phosphorus, potassium)  
- Lists recommended tree species based on soil analysis

### Existing Site Dashboard (after image + species upload)

- Shows number of trees detected  
- Displays carbon displacement per square foot  
- Shows total carbon displacement

## Technical Details

- Built with React  
- Uses Tailwind CSS for styling  
- Simple state management with React hooks  
- The app works by collecting user input and connecting to two models:
  - Model 1: Assesses soil quality from coordinates  
  - Model 2: Recommends trees based on soil analysis  
- The image analysis tool counts trees and calculates carbon impact
