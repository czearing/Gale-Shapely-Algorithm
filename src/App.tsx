import * as React from "react";
import { ThemeProvider } from "@fluentui/react";
import "./styles.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1 className="header">Gale-Shapely Algorithm</h1>
        <div className="content">
          <h4> Scenario: (Stable Mariage Problem)</h4>
          <p>Given:</p>
          <p>
            1. A series of two dimensional matrices containing a husband and a
            wife.
          </p>
          <p>2. A list of indivduals and their ranked potential matches.</p>
          <p>Find the best potential matches to fill the matrix.</p>
          <h4> Explanation:</h4>
          <p>1. </p>
          <p>2.</p>
          <p>3.</p>
          <p>4.</p>
          <h4>Time Complexity: O( )</h4>
          <h4>Auxiliary Space: O( )</h4>
        </div>
      </div>
    </ThemeProvider>
  );
}
