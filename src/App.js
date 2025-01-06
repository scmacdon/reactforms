import React, { useState, useEffect } from 'react';
import './TwoColumnLayout.css';
import ScrollList from './ScrollList';

const TwoColumnLayout = () => {
  const [jsonData, setJsonData] = useState(null); // State to hold the JSON data

  // UseEffect to log jsonData and set default values if necessary
  useEffect(() => {
    console.log("TwoColumnLayout JSON Data Updated:", jsonData);
    if (!jsonData) {
      setJsonData({ message: "No data available" });
    }
  }, [jsonData]);

  return (
    <div className="two-column-layout">
      <div className="left-column">
        <ScrollList setJsonData={setJsonData} />
      </div>
      <div className="right-column">
        <h2>Right Column</h2>
        <p>This is where you see Form JSON.</p>
        <textarea
          readOnly
          rows="10"
          cols="50"
          value={jsonData ? JSON.stringify(jsonData, null, 2) : ''}
        />
      </div>
    </div>
  );
};

export default TwoColumnLayout;

