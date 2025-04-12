import { Button, Dialog, Flex, Select, Text, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useUpdateSkill } from '../api/skills/mutations'
import { proficiencyLevels, validCategories } from '../utils/categories'

function EditSkillDialog({
  open = false,
  setOpen,
  data
}) {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    defaultValues: {
      name: data?.name || "",
      category: data?.category || "",
      proficiencyLevel: data?.proficiencyLevel || 1,
      yearsExperience: data?.yearsExperience || 0,
      description: data?.description || "",
      projectUrl: data?.projectUrl || ""
    }
  })

  const { mutate: updateSkill, isPending } = useUpdateSkill();

  const onSubmit = (formData) => {
    updateSkill(
      {
        skillId: data._id,
        data: formData
      },
      {
        onSuccess: () => {
          toast.success("Skill updated");
          setOpen(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Update failed");
        }
      }
    );
  };



  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          reset()
        }
        setOpen(o)
      }}
    >
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Skill Name
              </Text>
              <TextField.Root
                {...register("name")}
              />
            </label>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Category
              </Text>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger className='w-full' />
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
            </label>
            <Flex direction={'row'} gap={'3'} wrap={'wrap'}>
              <label className='flex-1'>
                <Text as="div" size="2" mb="1" weight="bold">
                  Proficiency Level
                </Text>
                <Controller
                  control={control}
                  name="proficiencyLevel"
                  render={({ field }) => (
                    <Select.Root
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <Select.Trigger className='w-full' />
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

              </label>
              <label className='flex-1'>
                <Text as="div" size="2" mb="1" weight="bold" className='text-nowrap'>
                  Years of Experience
                </Text>
                <TextField.Root
                  type='number'
                  min={0}
                  {...register("yearsExperience")}
                />
              </label>
            </Flex>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                resize={'vertical'}
                className='max-h-48'
                {...register("description")}
              />
            </label>
            <label className='flex-1'>
              <Text as="div" size="2" mb="1" weight="bold">
                Project URL
              </Text>
              <TextField.Root
                {...register("projectUrl")}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" highContrast disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EditSkillDialog
