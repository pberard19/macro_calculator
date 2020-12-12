import React, { useState, useEffect } from 'react';
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

  const [proteinGoal, setProteinGoal] = useState(10);
  const [carbGoal, setCarbGoal] = useState(10);
  const [fatGoal, setFatGoal] = useState(10);

  const [proteinOz, setProteinOz] = useState(0);
  const [carbOz, setCarbOz] = useState(0);
  const [fatOz, setFatOz] = useState(0);

  const [proteinChoice, setProteinChoice] = useState(proteinOptions[0]);
  const [carbChoice, setCarbChoice] = useState(carbOptions[0]);
  const [fatChoice, setFatChoice] = useState(fatOptions[0]);

  const makeBestEffortAllocations = (
    proteinGoal,
    carbGoal,
    fatGoal,
    proteinChoice,
    carbChoice,
    fatChoice,
    setProteinOz,
    setCarbOz,
    setFatOz,
  ) => {
    let totalPro, totalCarb, totalFat = 0;

    let carbInfo = carbs[carbChoice]
    let cOz = (carbGoal / carbInfo['carb']).toFixed(2);

    let proInfo = proteins[proteinChoice]
    let pOz = (proteinGoal / proInfo['pro']).toFixed(2);

    let fatInfo = fats[fatChoice]
    let fOz = (fatGoal / fatInfo['fat']).toFixed(2);

    setProteinOz(pOz)
    setCarbOz(cOz)
    setFatOz(fOz)
  };

  useEffect(() => {
    makeBestEffortAllocations(
      proteinGoal,
      carbGoal,
      fatGoal,
      proteinChoice,
      carbChoice,
      fatChoice,
      setProteinOz,
      setCarbOz,
      setFatOz,
    );
  }, [proteinChoice, carbChoice, fatChoice, proteinGoal, carbGoal, fatGoal]);

  const getFoodDescriptor = (choice, ounces) => {
    return <div><br/>
    Stats (per oz):<br/>
      Calories: {choice['cal']}cal x {ounces}oz = {Math.round(choice['cal'] * ounces).toFixed(2)} cal<br/>
      Fat: {choice['fat']}g x {ounces}oz = {Math.round(choice['fat'] * ounces).toFixed(2)} g<br/>
      Carbs: {choice['carb']}g x {ounces}oz = {Math.round(choice['carb'] * ounces).toFixed(2)} g<br/>
      Protein: {choice['pro']}g x {ounces}oz = {Math.round(choice['pro'] * ounces).toFixed(2)} g<br/>
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
      if(delta > 0) return `+${Math.abs(delta).toFixed(2)} grams above goal`;
      if(delta < 0) return `-${Math.abs(delta).toFixed(2)} grams below goal`;
      return "WOMP";
    }

    return <div>
      <h4>Totals</h4>
      Calories: {totalCals.toFixed(2)} cal<br/>

      Carbs: {totalCarbs.toFixed(2)} g ({getDeltaFromGoal(totalCarbs, carbGoal)})<br/>
      Protein: {totalProteins.toFixed(2)} g ({getDeltaFromGoal(totalProteins, proteinGoal)})<br/>
      Fat: {totalFat.toFixed(2)} g ({getDeltaFromGoal(totalFat, fatGoal)})<br/>
    </div>
  }

  return (
    <div>
      <div className={styles.goalInputContainer} >
        <h4>Target Macros For Meal</h4>
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="proteinGoal" name="proteinGoal" min="0" max="1000" value={proteinGoal} onChange={(event) => setProteinGoal(event.target.value)} />
          <label>&nbsp;Protein (Grams)</label>
        </div>
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="carbGoal" name="carbGoal" min="0" max="1000" value={carbGoal} onChange={(event) => setCarbGoal(event.target.value)} />
          <label>&nbsp;Carbs (Grams)</label>
        </div>
        <div className={styles.goalInput} >
          <input className={styles.numberInput} type="number" id="fatGoal" name="fatGoal" min="0" max="1000" value={fatGoal} onChange={(event) => setFatGoal(event.target.value)} />
          <label>&nbsp;Fat (Grams)</label>
        </div>
      </div>
      <div className={styles.goalInputContainer} >
        {getTotalDescriptor()}
      </div>

      <div className={styles.selectorContainer}>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Carbs 🍚</h3>
          {proteinOz} oz
          <Dropdown options={carbOptions} onChange={(e) => setCarbChoice(e.value)} value={carbChoice} placeholder="Select an option" />
          {getFoodDescriptor(carbs[carbChoice], carbOz)}
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Protein 🍖</h3>
          {carbOz} oz
          <Dropdown options={proteinOptions} onChange={(e) => setProteinChoice(e.value)} value={proteinChoice} placeholder="Select an option" />
          {getFoodDescriptor(proteins[proteinChoice], proteinOz)}
        </div>
        <div className={styles.card}>
          <h3 className={styles.selectorLabel}>Fats 🥑</h3>
          {fatOz} oz
          <Dropdown options={fatOptions} onChange={(e) => setFatChoice(e.value)} value={fatChoice} placeholder="Select an option" />
          {getFoodDescriptor(fats[fatChoice], fatOz)}
        </div>
      </div>
    </div>
  );
}
