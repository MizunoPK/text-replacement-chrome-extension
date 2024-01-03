import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { Box, IconButton } from '@mui/material'
import { LocalStorageOptions, TextReplacement, getStoredOptions, getStoredReplacements, setStoredReplacements } from '../utils/storage'
import AddIcon from '@mui/icons-material/Add';
import Replacement from './replacement.component'

const App: React.FC<{}> = () => {
  const [replacements, setReplacements] = useState<TextReplacement[]>([])
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredReplacements().then((replacements) => setReplacements(replacements))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  // Set the replacement data with new info
  const setReplacementData = (newData : TextReplacement[]) => {
    setStoredReplacements(newData).then(() => {
      setReplacements(newData)
    })
  }

  // Add button pressed:
  // Make a new row
  const newRow = () => {
    const newRow : TextReplacement = {
      from: '',
      to: '',
      active: true
    }
    setReplacementData([
      ...replacements,
      newRow
    ])
  }

  // Callback:
  // When an input is changed, update the storage
  const updateData = (replacement: TextReplacement, idx: number) => {
    const newData = [...replacements]
    newData[idx] = replacement
    setReplacementData(newData)
  }

  // Callback:
  // Delete a row
  const deleteRow = (idx : number) => {
    const newData = [...replacements]
    newData.splice(idx, 1)
    setReplacementData(newData)
  }


  return (
    <div className='w-96 h-96 overflow-scroll'>
      {/* Controls */}
      <div className='text-right'>
        <IconButton aria-label="add" onClick={newRow}>
          <AddIcon />
        </IconButton>
      </div>

      {/* Replacement List */}
      <div>
        {replacements.map((replacement, idx) => (
          <div key={idx}>
            <Replacement replacement={replacement}
              idx={idx}
              updateCallback={updateData}
              deleteCallback={deleteRow}
            />
          </div>
        ))}

      </div>
      

    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
