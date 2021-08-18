import { ReactNode } from 'react';

interface ButtonProps {
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  // backgroundColor: string;
  // hoverColor?: string;
  // focusColor?: string;
  handleClicked?: () => void;
}


// having issue with passing custom colors into classnames as props
// was working initially but have reverted to hardcoded bg-color temporarily
const Button = ({
  // backgroundColor,
  // hoverColor,
  // focusColor,
  buttonType,
  children,
  handleClicked
}: ButtonProps) => {
  return (
    <button
      onClick={handleClicked}
      type={buttonType}
      className="bg-highlight hover:bg-yellow-500 focus:ring-yellow-500 last:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
