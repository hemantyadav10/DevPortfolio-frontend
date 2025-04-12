import { EyeNoneIcon, EyeOpenIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Spinner, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/authContext';
import ErrorMessage from './ErrorMessage';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    try {
      setError(null);
      await handleLogin(data);
      navigate(-1);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      {error && <ErrorMessage error={error} className='max-w-full mb-5' />}
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Username or Email
          </Text>
          <TextField.Root
            size={'3'}
            {...register('identifier', {
              required: 'Username or Email is required'
            })}
            placeholder="Enter your username or email"
          />
          {errors.identifier &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.identifier.message}
            </Text>
          }
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Root
            type={showPassword ? 'text' : 'password'}
            size={'3'}
            {...register('password', {
              required: 'Password is required'
            })}
            placeholder="Enter your password"
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
          </TextField.Root>
          {errors.password &&
            <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
              <InfoCircledIcon height={"16"} width={"16"} />{errors.password.message}
            </Text>
          }
        </label>
        <Button
          disabled={isLoading}
          type='submit'
          size={'4'}
          mt={'4'}
          highContrast

        >
          <Spinner loading={isLoading} />
          {isLoading ? " Loading..." : "SIGN IN"}
        </Button>
      </Flex>
    </form>
  )
}

export default Login;
