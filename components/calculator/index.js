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

  const [proteinOz, setProteinOz] = useState(0);
  const [carbOz, setCarbOz] = useState(0);
  const [fatOz, setFatOz] = useState(0);

  const [proteinChoice, setProteinChoice] = useState(proteinOptions[0]);
  const [carbChoice, setCarbChoice] = useState(carbOptions[0]);
  const [fatChoice, setFatChoice] = useState(fatOptions[0]);

  const getFoodDescriptor = (choice, ounces) => {
    return <div>
    Stats (per oz):<br/>
      Calories: {choice['cal']}cal x {ounces}oz = {Math.round(choice['cal'] * ounces)} cal<br/>
      Fat: {choice['fat']}g x {ounces}oz = {Math.round(choice['fat'] * ounces)} g<br/>
      Carbs: {choice['carb']}g x {ounces}oz = {Math.round(choice['carb'] * ounces)} g<br/>
      Protein: {choice['pro']}g x {ounces}oz = {Math.round(choice['pro'] * ounces)} g<br/>
    </div>
  }

  const getTotalDescriptor = () => {
    const totalCals = (carbs[carbChoice]['cal'] * carbOz) +
      (proteins[proteinChoice]['cal'] * proteinOz) +
      (fats[fatChoice]['cal'] * fatOz);
    const totalFat = (carbs[carbChoice]['fat'] * carbOz) +
      (proteins[proteinChoice]['fat'] * proteinOz) +
      (fats[fatChoice]['fat'] * fatOz);
    const totalCarbs = (carbs[carbChoice]['carb'] * carbOz) +
      (proteins[proteinChoice]['carb'] * proteinOz) +
      (fats[fatChoice]['carb'] * fatOz);
    const totalProteins = (carbs[carbChoice]['pro'] * carbOz) +
      (proteins[proteinChoice]['pro'] * proteinOz) +
      (fats[fatChoice]['pro'] * fatOz);

    const getDeltaFromGoal = (total, goal) => {
      const delta = total - goal;
      let direction = '+';
      if(delta === 0) return 'Hit your goal!';
      if(delta > 0) return `+${Math.abs(delta)} grams above goal`;
      if(delta < 0) return `-${Math.abs(delta)} grams below goal`;
      return "WOMP";
    }

    return <div>
      <h4>Totals</h4>
      Calories: {totalCals}cal<br/>
      Fat: {totalFat}g ({getDeltaFromGoal(totalFat, fatGoal)})<br/>
      Carbs: {totalCarbs}g ({getDeltaFromGoal(totalCarbs, carbGoal)})<br/>
      Protein: {totalProteins}g ({getDeltaFromGoal(totalProteins, proteinGoal)})<br/>
    </div>
  }

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
      <div className={styles.goalInputContainer} >
        {getTotalDescriptor()}
      </div>

      <div className={styles.selectorContainer}>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Carbs 🍚</h3>
          <Dropdown options={carbOptions} onChange={(e) => setCarbChoice(e.value)} value={carbChoice} placeholder="Select an option" />
          <div className={styles.goalInput} >
            <input className={styles.numberInput} type="number" id="carbOz" name="carbOz" min="0" max="1000" value={carbOz} onChange={(event) => setCarbOz(event.target.value)} />
            <label>&nbsp;Oz</label>
          </div>
          {getFoodDescriptor(carbs[carbChoice], carbOz)}
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Protein 🍖</h3>
          <Dropdown options={proteinOptions} onChange={(e) => setProteinChoice(e.value)} value={proteinChoice} placeholder="Select an option" />
          <div className={styles.goalInput} >
            <input className={styles.numberInput} type="number" id="proteinOz" name="proteinOz" min="0" max="1000" value={proteinOz} onChange={(event) => setProteinOz(event.target.value)} />
            <label>&nbsp;Oz</label>
          </div>
          {getFoodDescriptor(proteins[proteinChoice], proteinOz)}
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Fats 🥑</h3>
          <Dropdown options={fatOptions} onChange={(e) => setFatChoice(e.value)} value={fatChoice} placeholder="Select an option" />
          <div className={styles.goalInput} >
            <input className={styles.numberInput} type="number" id="fatOz" name="fatOz" min="0" max="1000" value={fatOz} onChange={(event) => setFatOz(event.target.value)} />
            <label>&nbsp;Oz</label>
          </div>
          {getFoodDescriptor(fats[fatChoice], fatOz)}
        </div>
      </div>
    </div>
  );
}
