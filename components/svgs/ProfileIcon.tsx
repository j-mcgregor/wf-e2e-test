interface ProfileIconProps {
  className: string;
}

const ProfileIcon = ({ className }: ProfileIconProps) => {
  return (
    <div
      className={`${className} bg-[#E58A2E] bg-opacity-50 rounded-full h-12 w-12 flex items-center justify-center`}
    >
      <svg
        fill="none"
        height="22"
        viewBox="0 0 18 22"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#111827"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.45378"
        >
          <path d="m13.2862 5.48097c0 2.40871-1.9527 4.36135-4.36137 4.36135-2.4087 0-4.36134-1.95264-4.36134-4.36135 0-2.4087 1.95264-4.36134 4.36134-4.36134 2.40867 0 4.36137 1.95264 4.36137 4.36134z" />
          <path d="m8.92483 13.1133c-4.21523 0-7.63235 3.4171-7.63235 7.6324h15.26472c0-4.2153-3.4171-7.6324-7.63237-7.6324z" />
        </g>
      </svg>
    </div>
  );
};

export default ProfileIcon;
