import React from 'react'
import {ApolloProvider} from '@apollo/client'
import Page from './Page'
import client from './apollo'
import styles from 'App.scss'

const App = () =>
  <div className={styles.main}>
    <nav className={styles.header}>
      VESTBERRY TEST ASSIGNMENT
    </nav>
    <div className={styles.content}>
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </div>
  </div>

export default App
