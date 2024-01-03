import React, { useState } from 'react'
import { TextReplacement } from '../utils/storage'
import { Grid, IconButton, Switch, TextField } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    replacement: TextReplacement;
    idx: number;
    updateCallback : (newReplacementData: TextReplacement, idx: number) => void;
    deleteCallback : (idx : number) => void;
}

function Replacement({replacement, idx, updateCallback, deleteCallback} : Props) {
    const [replacementLine, setReplacementLine] = useState(replacement)

    const updateData = (newData : TextReplacement) => {
        setReplacementLine(newData)
        updateCallback(newData, idx)
    }

    const updateEnabled = () => {
        updateData({
            ...replacement,
            active: !replacement.active
        })
    }
    const updateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({
            ...replacement,
            from: e.target.value
        })
    }
    const updateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({
            ...replacement,
            to: e.target.value
        })
    }

  return (
    <div className='m-3'>
        <Grid container alignItems="center">
            <Grid item xs={2}>
                <Switch checked={replacementLine.active} onClick={updateEnabled} />
            </Grid>
            <Grid item xs={4}>
                <TextField size='small' placeholder='From' value={replacementLine.from} onChange={updateFrom} />
            </Grid>
            <Grid item xs={1}>
                <ArrowRightAltIcon />
            </Grid>
            <Grid item xs={4}>
                <TextField size='small' placeholder='To' value={replacementLine.to} onChange={updateTo} />
            </Grid>
            <Grid item xs={1}>
            <IconButton aria-label="delete" color='error' onClick={() => {deleteCallback(idx)}}>
                <DeleteIcon />
            </IconButton>
            </Grid>
        </Grid>
    </div>
  )
}

export default Replacement