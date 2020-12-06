import Head from 'next/head'
import styles from '../styles/Home.module.css'
const {Calculator} = require("components/calculator")

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Macro Meal Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🏋️‍♀️ Macro Meal Calculator 🏋️‍♂️
        </h1>
        <p className={styles.description}>
          Make your meals meet your macros
        </p>
        <aside>
          Don't know your macros? Try something like <a className={styles.link} target="_blank" rel="noopener" href="https://www.calculator.net/macro-calculator.html">this</a>
        </aside>

        <Calculator />
      </main>

      <footer className={styles.footer}>
        © Pat Berard 2020
      </footer>
    </div>
  )
}
