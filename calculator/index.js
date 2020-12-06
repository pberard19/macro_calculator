import React, { useState } from 'react';
import styles from './index.module.scss'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const {food} = require('./food')

export const Calculator = () => {
  const proteins = food['proteins']
  const carbs = food['carbohydrates']
  const fats = food['fats']

  const proteinOptions = Object.keys(proteins);
  const carbOptions = Object.keys(carbs);
  const fatOptions = Object.keys(fats);

  const [proteinGoal, setProteinGoal] = useState(0);
  const [carbGoal, setCarbGoal] = useState(0);
  const [fatGoal, setFatGoal] = useState(0);

  const [proteinChoice, setProteinChoice] = useState(proteinOptions[0]);
  const [carbChoice, setCarbChoice] = useState(carbOptions[0]);
  const [fatChoice, setFatChoice] = useState(fatOptions[0]);

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

      <div className={styles.selectorContainer}>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Protein 🍖</h3>
          <Dropdown options={proteinOptions} onChange={(e) => setProteinChoice(e.value)} value={proteinChoice} placeholder="Select an option" />
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Carbs 🍚</h3>
          <Dropdown options={carbOptions} onChange={(e) => setCarbChoice(e.value)} value={carbChoice} placeholder="Select an option" />
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Fats 🥑</h3>
          <Dropdown options={fatOptions} onChange={(e) => setFatChoice(e.value)} value={fatChoice} placeholder="Select an option" />
        </div>

      </div>
    </div>
  );
}
