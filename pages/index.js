import Head from 'next/head'
import styles from '../styles/Home.module.css'
const {Calculator} = require("components/calculator")

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Macro Meal calculatoror</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🏋️‍♀️ Macro Meal Calculator 🏋️‍♂️
        </h1>
        <p className={styles.description}>
          Make your meals meet your macros
        </p>
        <Calculator />
      </main>

      <footer className={styles.footer}>
        © Pat Berard 2020
      </footer>
    </div>
  )
}
