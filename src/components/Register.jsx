import { Button, Callout, Flex, IconButton, Spinner, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { CheckCircledIcon, CheckIcon, EnvelopeClosedIcon, EyeNoneIcon, EyeOpenIcon, InfoCircledIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import ErrorMessage from './ErrorMessage';
import { HiAtSymbol } from "react-icons/hi2"; import { useTheme } from 'next-themes';
;

function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { handleRegister, isLoading } = useAuth();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const { resolvedTheme } = useTheme()

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
            placeholder="Enter your full name"
            size={'3'}
          >
            <TextField.Slot side='left'>
              < PersonIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
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
            placeholder="Choose a username"
          >
            <TextField.Slot>
              <HiAtSymbol size={'18'} />
            </TextField.Slot>
          </TextField.Root>
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
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid Email.',
              }
            })}
          >
            <TextField.Slot side='left'>
              < EnvelopeClosedIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            size={'3'}
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be atleast 6 character(s).'
              },
            })}
          >
            <TextField.Slot side='right'>
              <IconButton
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                variant='ghost'
                color='gray'
                radius='full'
              >
                {showPassword
                  ? < EyeNoneIcon height="16" width="16" />
                  : < EyeOpenIcon height="16" width="16" />
                }
              </IconButton>
            </TextField.Slot>
            <TextField.Slot side='left'>
              <LockClosedIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          {errors.password &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.password.message}
            </Text>
          }
        </label>
        <Button
          size={'3'}
          mt={'3'}
          highContrast
          disabled={isLoading}
          variant={resolvedTheme === 'light' ? "solid" : "soft"}
        >
          <Spinner loading={isLoading} />
          {isLoading ? " Loading..." : "Create Account"}
        </Button>
      </Flex>
    </form>
  )
}

export default Register
