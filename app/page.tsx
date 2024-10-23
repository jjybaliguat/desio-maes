"use client"
import React, { useEffect, useState } from 'react';
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { useAuth } from './context/AuthContext';
import { database, onValue, ref } from './utils/firebase';
import { update } from 'firebase/database';

const Dashboard: React.FC = () => {
  // State to track the active tab and light colors
  const [activeTab, setActiveTab] = useState<'livingRoom' | 'bedroom'>('livingRoom');
  const [livingRoomColor, setLivingRoomColor] = useState<string | null>(null);
  const [bedroomColor, setBedroomColor] = useState<string | null>(null);
  const {logout} = useAuth()

  // Function to handle tab changes
  const handleTabChange = (tab: 'livingRoom' | 'bedroom') => {
    setActiveTab(tab);
  };
  
  const livingRef = ref(database, 'smartColor/living');
  const bedroomRef = ref(database, 'smartColor/bedroom');

  useEffect(()=>{
    onValue(livingRef, (snapshot) => {
      const data = snapshot.val();
      if(!data.isOn){
        setLivingRoomColor(null)
      }else{
        setLivingRoomColor(data.color)
      }
    });
    onValue(bedroomRef, (snapshot) => {
      const data = snapshot.val();
      if(!data.isOn){
        setBedroomColor(null)
      }else{
        setBedroomColor(data.color)
      }
    });
  }, [])

  function changeColor(color: string) {
    if(activeTab === 'livingRoom'){
      update(livingRef, {
        color,
        isOn: true
      })
    }else{
      update(bedroomRef, {
        color,
        isOn: true
      })
    }
  }

  // Function to handle light status (turn off)
  const turnOffLight = () => {
    if(activeTab === 'livingRoom'){
      update(livingRef, {
        isOn: false
      })
    }else{
      update(bedroomRef, {
        isOn: false
      })
    }
  };

  const selectedColor = activeTab === 'livingRoom' ? livingRoomColor : bedroomColor;
  const isLightOn = selectedColor !== null; // Light is on if a color is selected

  const getColorClass = (color: string | null) => {
    switch (color) {
      case 'red':
        return 'text-red-500';
      case 'green':
        return 'text-green-500';
      case 'blue':
        return 'text-blue-500';
      case 'white':
        return 'text-gray-300';
      default:
        return 'text-gray-500'; // Default to gray for unselected colors
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">SmartColor</h1>

      {/* Tab Switch */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'livingRoom' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('livingRoom')}
        >
          Living Room
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'bedroom' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('bedroom')}
        >
          Bedroom
        </button>
      </div>

      {/* Light Controls */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          {activeTab === 'livingRoom' ? 'Living Room Light' : 'Bedroom Light'}
        </h2>

        {/* Color Selection */}
        <div className="flex space-x-4 mb-4">
          {['white', 'red', 'green', 'blue'].map((color) => (
            <button
              key={color}
              className="hover:opacity-75 flex flex-col gap-2 items-center"
              onClick={() => changeColor(color)}
              title={color.charAt(0).toUpperCase() + color.slice(1)} // Tooltip for color
            >
              <LightBulbIcon
                className={`w-12 h-12 ${getColorClass(selectedColor === color ? color : null)}`}
              />
              <span className={`${selectedColor === color ? ` text-${color}-500` : 'text-white'}`}>{color.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Light Status */}
        <div className="mt-4 flex items-center">
          <span className="text-lg mr-2">Status: </span>
          <span className="inline-block w-10 h-10">
            {isLightOn ? (
              <LightBulbIcon
                className={`w-10 h-10 ${
                  selectedColor === 'white'
                    ? 'text-gray-300'
                    : `text-${selectedColor}-500`
                }`}
              />
            ) : (
              <LightBulbIcon className="w-10 h-10 text-gray-600" />
            )}
          </span>
        </div>

        {/* Turn Off Button */}
        {isLightOn && (
          <button
            className="mt-4 px-4 py-2 rounded bg-gray-600"
            onClick={turnOffLight}
          >
            Turn Off
          </button>
        )}
        <button
          className="mt-4 px-4 py-2 rounded bg-red-500"
          onClick={()=>logout()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;