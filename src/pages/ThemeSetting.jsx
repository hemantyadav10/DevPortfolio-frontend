import { Flex, RadioCards, Separator, Text } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import React from 'react'
import lightTheme from '../assets/lightTheme.svg'
import darkTheme from '../assets/darkTheme.svg'
import systemTheme from '../assets/systemTheme.svg'

function ThemeSetting() {
  const { setTheme, theme } = useTheme()
  return (
    <div>
      <Text as='p' className='text-2xl font-medium' mb={'4'}>
        Theme
      </Text>
      <Separator size={"4"} mb={'4'} />
      <Text as='p' color='gray' size={'2'} mb={'4'}>
        Choose how DevPortfolio looks for you. Select your preferred theme to match your environment or personal style.
      </Text>
      <div className='w-full'>
        <RadioCards.Root value={theme} onValueChange={setTheme} columns={{
          initial: "1", xs: "3"
        }}>
          <RadioCards.Item value="light" onsel>
            <Flex direction="column" width={'100%'} align={'center'} >
              <img src={lightTheme} alt="" className='object-cover object-center w-full h-full m-4 rounded-md max-w-24 aspect-square' />
              {/* <Separator size={'4'}/> */}
              <Text as='span' weight="medium">
                Light
              </Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="dark">
            <Flex direction="column" width={'100%'} align={'center'} >
              <img src={darkTheme} alt="" className='object-cover object-center w-full h-full m-4 rounded-md max-w-24 aspect-square' />
              {/* <Separator size={'4'}/> */}
              <Text as='span' weight="medium">
                Dark
              </Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="system">
            <Flex direction="column" width={'100%'} align={'center'} >
              <img src={systemTheme} alt="" className='object-cover object-center w-full h-full m-4 rounded-md max-w-24 aspect-square' />
              {/* <Separator size={'4'}/> */}
              <Text as='span' weight="medium">
                System
              </Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </div>
      <Text as='p' color='gray' size={'2'} mt={'4'}>
        Your selected theme will be applied immediately.
      </Text>
    </div>
  )
}

export default ThemeSetting