import { ButtonHTMLAttributes } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import styled from "styled-components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  tooltip: string;
  active?: boolean;
}

const Button = ({
  icon: Icon,
  tooltip,
  active,
  className,
  ...props
}: ButtonProps) => {
  const buttonClassName = cn(className, { active });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <StyledWrapper>
            <button className={buttonClassName} {...props}>
              <span className="button_top">
                <Icon />{" "}
              </span>
            </button>
          </StyledWrapper>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StyledWrapper = styled.div`
  button {
    /* Variables */
    --button_radius: 0.8em;
    --button_color: #e8e8e8;
    --button_outline_color: #000000;
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: var(--button_radius);
    background: var(--button_outline_color);
  }

  .button_top {
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.5em 1em;
    background: var(--button_color);
    color: var(--button_outline_color);
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  button:hover .button_top {
    /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
  }

  button:active .button_top {
    /* Push the button downwards when pressed */
    transform: translateY(0);
  }

  button.active .button_top {
    background: #3b82f6; /* Tailwind's bg-blue-500 color */
    color: white;
  }
`;

export default Button;
