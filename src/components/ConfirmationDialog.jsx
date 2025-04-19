import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

function ConfirmationDialog({
  open = false,
  setOpen,
  action,
  loading = false,
  skillName = ''
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Content maxWidth="350px">
        <AlertDialog.Title>Delete Skill</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete the skill {" "} "<span className='font-medium'>{skillName}</span>"? This action cannot be undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" highContrast>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            variant="solid"
            color="red"
            onClick={action}
            disabled={loading}
          >
            Delete
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

  )
}

export default ConfirmationDialog