import React, { useState } from 'react';
import styles from './index.module.scss'

export const Calculator = () => {
  // Declare a new state variable, which we'll call "count"
  const [proteinGoal, setProteinGoal] = useState(0);
  const [carbGoal, setCarbGoal] = useState(0);
  const [fatGoal, setFatGoal] = useState(0);

  return (
    <div>
      <div className={styles.goalInputContainer} >
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="proteinGoal" name="proteinGoal" min="0" max="1000" value={proteinGoal} onChange={(event) => setProteinGoal(event.target.value)} />
          <label>&nbsp;Protein (Grams/Day)</label>
        </div>
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="carbGoal" name="carbGoal" min="0" max="1000" value={carbGoal} onChange={(event) => setCarbGoal(event.target.value)} />
          <label>&nbsp;Carbs (Grams/Day)</label>
        </div>
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="fatGoal" name="fatGoal" min="0" max="1000" value={fatGoal} onChange={(event) => setFatGoal(event.target.value)} />
          <label>&nbsp;Fat (Grams/Day)</label>
        </div>
      </div>

      <div className={styles.grid}>

        <div className={styles.card}>
          <h3>Protein 🍖</h3>
          <p>CHOOSE YOUR MEAT.</p>
        </div>
        <div className={styles.card}>
          <h3>Carbs 🍚</h3>
          <p>CHOOSE YOUR CARBS.</p>
        </div>
        <div className={styles.card}>
          <h3>Fats 🥑</h3>
          <p>CHOOSE YOUR FATS.</p>
        </div>

      </div>
    </div>
  );
}
