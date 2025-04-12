import { Tooltip } from "@radix-ui/themes";

const Rating = ({ rating = 0, max = 5 }) => {
  return (
    <Tooltip
      delayDuration={0}
      content={`Skill proficiency level: ${rating} out of 5`}
    >
      <div className="flex gap-1">
        {[...Array(max)].map((_, i) => (
          <div
            key={i}
            className={`w-[10px] h-[10px] rounded-full ${i < rating ? "bg-[--accent-12]" : "bg-[--gray-a6]"
              }`}
          />
        ))}
      </div>
    </Tooltip>
  );
};

export default Rating;