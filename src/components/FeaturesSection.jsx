import { BarChartIcon, DesktopIcon, StarFilledIcon } from '@radix-ui/react-icons';
import React from 'react';
import FeaturesCard from './FeaturesCard';


const features = [
  {
    title: "Skill Showcase",
    description: "Add your technical skills with self-assessed proficiency levels, experience, and project examples.",
    Icon: DesktopIcon 
  },
  {
    title: "Peer Endorsements",
    description: "Get your skills verified by other developers in the community, building credibility and trust.",
    Icon: StarFilledIcon 
  },
  {
    title: "Skill Analytics",
    description: "Visualize your skill distribution and see how your endorsements compare to platform averages.",
    Icon: BarChartIcon 
  }
];

function FeaturesSection() {
  return (
    <div className='relative flex justify-center w-full px-6 md:px-12 mb-14'>
      <div className='absolute h-1/2 bg-[--primary] left-0 right-0 -z-10 ' />
      <div className='z-0 flex flex-col gap-4 md:flex-row'>
        {features.map(({ title, description, Icon }, idx) => (
          <FeaturesCard
            key={idx}
            title={title}
            description={description}
            Icon={Icon}
          />
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
