import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Text } from "@radix-ui/themes";
import { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDeleteSkill } from "../api/skills/mutations";
import { useAuth } from "../context/authContext";
import EditSkillDialog from "./EditSkillDialog";
import Rating from "./Rating";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast } from "sonner";

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
  const [openConfirmation, setOpenConfirmation] = useState(false)
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
    handleDeleteSkill(skillId, {
      onSuccess: () => {
        toast.success("Skill deleted");
      },
      onError: (error) => {
        const message = error?.response?.data?.message || "Deletion failed";
        toast.error(message);
      },
    });
  };

  return (
    <div className='flex flex-wrap items-center justify-between col-span-1 px-4 py-2 border rounded-md gap-x-4 gap-y-2 border-[--gray-a6]'>
      <div>
        <Text as='p' size={'2'} className='font-medium capitalize '>
          {name}
        </Text>
        <Text as='p' color='gray' size={'1'}>
          {yearsExperience} years of experience
        </Text>
      </div>
      <div className='flex items-center gap-2'>
        <Rating rating={proficiencyLevel} />
        <span className='flex items-center gap-1 text-sm'>
          <IoMdCheckmarkCircleOutline className='text-green-500 size-4' />
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
            size={'1'}
          >
            <Pencil1Icon />
          </IconButton>
          <IconButton
            variant="soft"
            highContrast
            color="red"
            className="font-medium"
            onClick={() => setOpenConfirmation(true)}
            disabled={isDeleting}
            size={'1'}
          >
            <TrashIcon />
          </IconButton>
          <ConfirmationDialog
            open={openConfirmation}
            setOpen={setOpenConfirmation}
            skillName={name}
            loading={isDeleting}
            action={() => onDelete(_id)}
          />
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
