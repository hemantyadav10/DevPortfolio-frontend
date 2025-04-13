import { Button, Dialog, Flex, Separator } from '@radix-ui/themes'
import React from 'react'
import { useAuth } from '../context/authContext'

function SessionExpiredModal() {
  const { showSessionExpiredModal, setShowSessionExpiredModal } = useAuth()
  return (
    <Dialog.Root open={showSessionExpiredModal} onOpenChange={setShowSessionExpiredModal}>
      <Dialog.Content maxWidth="340px">
        <Dialog.Title align={'center'}>
          Session Expired
        </Dialog.Title>
        <Dialog.Description mb="4" size={'2'} align={'center'}>
          Please log in again.
        </Dialog.Description>
        <Separator size={'4'} />
        <Flex gap="3" mt="4" justify="center">
          <Dialog.Close>
            <Button variant="ghost" size={'3'} className='font-medium'>
              OK
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SessionExpiredModal
