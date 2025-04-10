import { Button, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'

function Register() {
  return (
    <div className=''>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name
          </Text>
          <TextField.Root
            size={'3'}
            defaultValue="Freja Johnsen"
            placeholder="Enter your full name"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            size={'3'}
            defaultValue="freja@example.com"
            placeholder="Enter your email"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            size={'3'}
            defaultValue="freja@example.com"
            placeholder="Enter your email"
          />
        </label>
        <Button
          size={'4'}
          mt={'4'}
          highContrast
        >
          SIGN IN
        </Button>
      </Flex>
    </div>
  )
}

export default Register
