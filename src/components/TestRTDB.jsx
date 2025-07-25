// src/components/TestRTDB.jsx
import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database'; // Imports corrects
import { rtdb } from '../config/firebase';

const TestRTDB = () => {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const testRef = ref(rtdb, 'test');
    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Realtime Database Test Data:", data);
      setStatus(data?.message || 'No data yet');
    }, (error) => {
      console.error("Error reading data:", error.message);
      setStatus(`Error reading: ${error.message}`);
    });

    const testDataRef = ref(rtdb, 'test/message');
    set(testDataRef, 'Connexion réussie !') // Correction : set comme fonction
      .then(() => console.log("Data written successfully"))
      .catch((error) => {
        console.error("Error writing data:", error.message);
        setStatus(`Error writing: ${error.message}`);
      });
  }, []);

  return <div>{status}</div>;
};

export default TestRTDB;