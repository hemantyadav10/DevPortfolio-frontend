import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import NewSkillDialog from './NewSkillDialog'

function AddNewSkillButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        highContrast
        onClick={() => setOpen(true)}
      >
        <PlusIcon height={'20'} width={'20'} /> Add Skill
      </Button>
      <NewSkillDialog setOpen={setOpen} open={open}/>
    </>
  )
}

export default AddNewSkillButton
