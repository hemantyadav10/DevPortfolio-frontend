const Rating = ({ rating = 0, max = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, i) => (
        <div
          key={i}
          className={`w-[10px] h-[10px] rounded-full ${
            i < rating ? "bg-[--accent-12]" : "bg-[--gray-a6]"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;