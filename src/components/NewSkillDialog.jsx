import { Button, Dialog, Flex, Select, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { proficiencyLevels, validCategories } from '../utils/categories';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useAddSkill } from '../api/skills/mutations';
import ErrorMessage from './ErrorMessage';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

function NewSkillDialog({
  open = false,
  setOpen,
}) {
  const { resolvedTheme } = useTheme()

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
  const { mutate, isPending } = useAddSkill();
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    setError(null);
    mutate(data, {
      onSuccess: () => {
        toast.success("Skill created successfully");
        setOpen(false)
        reset()
      },
      onError: (error) => {
        setError(error || "Failed to create skill")
        console.error(error)
      }
    })
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          reset();
          setError(null);
        }
        setOpen(o)
      }}
    >
      <Dialog.Content maxWidth="500px">
        <Dialog.Title size={'6'}>Skill Details</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Provide information about your technical skill
        </Dialog.Description>
        {error && <ErrorMessage error={error} className='max-w-full mb-5' />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Skill Name
              </Text>
              <TextField.Root
                placeholder="React, Python, AWS, etc."
                {...register('name', { required: 'Skill name is required' })}
              />
              {errors.name &&
                <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                  <InfoCircledIcon height={"16"} width={"16"} />{errors.name.message}
                </Text>
              }
            </label>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Category
              </Text>
              <Controller
                control={control}
                name="category"
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger className='w-full' placeholder="Select a category" />
                    <Select.Content position="popper" variant='soft'>
                      {validCategories
                        .filter((category) => category !== 'all')
                        .map((category) => (
                          <Select.Item key={category} value={category} className='capitalize'>
                            {category.replace(/-/g, ' ')}
                          </Select.Item>
                        ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />
              {errors.category &&
                <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                  <InfoCircledIcon height={"16"} width={"16"} />{errors.category.message}
                </Text>
              }
            </label>
            <Flex direction={'row'} gap={'3'} wrap={'wrap'}>
              <label className='flex-1' >
                <Text as="div" size="2" mb="1" weight="bold" className='text-nowrap'>
                  Proficiency Level
                </Text>
                <Controller
                  control={control}
                  name="proficiencyLevel"
                  rules={{ required: 'Proficiency level is required' }}
                  render={({ field }) => (
                    <Select.Root
                      value={field.value != null ? String(field.value) : ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <Select.Trigger className='w-full' placeholder="Select level" />
                      <Select.Content position="popper" variant='soft'>
                        {proficiencyLevels.map(({ name, value }) => (
                          <Select.Item key={value} value={String(value)} className='capitalize'>
                            {name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  )}
                />
                {errors.proficiencyLevel &&
                  <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                    <InfoCircledIcon height={"16"} width={"16"} />{errors.proficiencyLevel.message}
                  </Text>
                }
              </label>
              <label className='flex-1'>
                <Text as="div" size="2" mb="1" weight="bold" className='text-nowrap'>
                  Years of Experience
                </Text>
                <TextField.Root
                  type='number'
                  min={0}
                  {...register('yearsExperience', {
                    required: 'Years of experience is required',
                    min: { value: 0, message: 'Must be a non-negative number' },
                  })}
                  placeholder='e.g., 2'
                />
                {errors.yearsExperience &&
                  <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                    <InfoCircledIcon height={"16"} width={"16"} />{errors.yearsExperience.message}
                  </Text>
                }
              </label>
            </Flex>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                resize={'vertical'}
                className='max-h-48'
                {...register('description', {
                  maxLength: {
                    value: 500,
                    message: 'Description should not exceed 500 characters',
                  },
                })}
                placeholder='Describe how you have used this skill professionally'
              />
              {errors.description &&
                <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                  <InfoCircledIcon height={"16"} width={"16"} />{errors.description.message}
                </Text>
              }
            </label>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Project URL (Optional)
              </Text>
              <TextField.Root
                {...register('projectUrl', {
                  pattern: {
                    value: /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: 'Enter a valid URL',
                  },
                })}
                placeholder='https://github.com/username/project'
              />
              {errors.projectUrl &&
                <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                  <InfoCircledIcon height={"16"} width={"16"} />{errors.projectUrl.message}
                </Text>
              }
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              type="submit"
              highContrast
              disabled={isPending}
              variant={resolvedTheme === 'light' ? "solid" : "soft"}
            >
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewSkillDialog
