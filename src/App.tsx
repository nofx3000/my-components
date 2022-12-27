import React, { useState } from "react";
import { Alert } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: React.FC = () => {
  return (
    <div className="App">
      123123
      <header className="App-header"></header>
      <Alert message="Success Text" type="success"></Alert>
    </div>
  );
};

export default App;
