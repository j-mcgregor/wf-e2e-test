interface SkeletonMenuProps {
  items: number;
  className?: string;
}

const SkeletonMenu = ({ items = 5, className = '' }: SkeletonMenuProps) => {
  return (
    <ul className={`flex flex-col space-y-4  ${className}`}>
      {[...Array.from(Array(items)).keys()].map(index => (
        <li key={index} className=" h-8 rounded bg-gray-300 w-full"></li>
      ))}
    </ul>
  );
};

export default SkeletonMenu;
