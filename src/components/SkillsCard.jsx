import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDeleteSkill } from "../api/skills/mutations";
import { useAuth } from "../context/authContext";
import EditSkillDialog from "./EditSkillDialog";
import Rating from "./Rating";

function SkillsCard({
  name,
  proficiencyLevel,
  totalEndorsements,
  verified,
  yearsExperience,
  showEditButton = false,
  category,
  projectUrl,
  description,
  _id
}) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false);
  const data = {
    name,
    category,
    proficiencyLevel,
    yearsExperience,
    projectUrl,
    description,
    _id
  }

  const { mutate: handleDeleteSkill, isPending: isDeleting } = useDeleteSkill({ userId: user?._id });

  const onDelete = (skillId) => {
    handleDeleteSkill(skillId);
  };

  return (
    <div className='flex flex-wrap items-center justify-between col-span-1 p-4 border rounded-xl gap-x-4 gap-y-2'>
      <div>
        <Text as='p' className='text-lg font-medium capitalize'>
          {name}
        </Text>
        <Text as='p' color='gray' size={'2'}>
          {yearsExperience} years of experience
        </Text>
      </div>
      <div className='flex items-center gap-2'>
        <Rating rating={proficiencyLevel} />
        <span className='flex items-center gap-1'>
          <IoMdCheckmarkCircleOutline className='text-green-500 size-5' />
          {totalEndorsements}
        </span>
        {showEditButton && <>
          <IconButton
            variant="soft"
            highContrast
            ml={'1'}
            color="gray"
            className="font-medium"
            onClick={() => setOpen(true)}
          >
            <Pencil1Icon />
          </IconButton>
          <IconButton
            variant="soft"
            highContrast
            color="red"
            className="font-medium"
            onClick={() => onDelete(_id)}
            disabled={isDeleting}
          >
            <TrashIcon />
          </IconButton>
          <EditSkillDialog
            setOpen={setOpen}
            open={open}
            data={data}
          />
        </>}
      </div>
    </div>
  )
}

export default SkillsCard;
