import { Button, Callout, Flex, Spinner, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { CheckCircledIcon, CheckIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import ErrorMessage from './ErrorMessage';

function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { handleRegister, isLoading } = useAuth();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)


  const onSubmit = async (data) => {
    try {
      setError(null);
      await handleRegister(data);
      reset()
      setSuccess(true)
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      {success && (
        <Callout.Root color="green" mb={'5'} variant='surface'>
          <Callout.Icon>
            <CheckCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Registration Successful.
          </Callout.Text>
        </Callout.Root>
      )}
      {error && <ErrorMessage error={error} className='max-w-full mb-5' />}
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name
          </Text>
          <TextField.Root
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be atleast 2 character(s).'
              }
            })}
            size={'3'}
          />
          {errors.name &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.name.message}
            </Text>
          }
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Username
          </Text>
          <TextField.Root
            size={'3'}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Username must be atleast 2 character(s).'
              }
            })}
          />
          {errors.username &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.username.message}
            </Text>
          }
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            size={'3'}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid Email.',
              }
            })}
          />
          {errors.email &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.email.message}
            </Text>
          }
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Root
            size={'3'}
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be atleast 8 character(s).'
              },
            })}
          />
          {errors.password &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.password.message}
            </Text>
          }
        </label>
        <Button
          size={'4'}
          mt={'4'}
          highContrast
          disabled={isLoading}
        >
          <Spinner loading={isLoading} />
          {isLoading ? " Loading..." : "CREATE ACCOUNT"}
        </Button>
      </Flex>
    </form>
  )
}

export default Register
