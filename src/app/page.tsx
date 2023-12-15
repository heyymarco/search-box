'use client'

import { useState } from 'react'

import styles from './page.module.css'
import { SearchBox } from '@/components/SearchBox'



export default function Home() {
    return (
        <main className={styles.main}>
            <SearchBox theme='primary' />
        </main>
    )
}
