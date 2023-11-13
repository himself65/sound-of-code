import React, { useState, useEffect } from "react";

export default function ToggleNightMode() {
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    if (nightMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [nightMode]);

  return (
    <div>
      <button onClick={() => setNightMode(!nightMode)}>
        {nightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
      </button>
    </div>
  );
}
