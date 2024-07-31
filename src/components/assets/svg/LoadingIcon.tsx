import { SVGProps } from "react";
const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <g clip-path="url(#clip0_2296_134219)">
      <path
        d="M10 1.66667V5M10 15V18.3333M5 10H1.66666M18.3333 10H15M15.8987 15.8987L13.5417 13.5417M15.8987 4.16662L13.5417 6.52364M4.10131 15.8987L6.45833 13.5417M4.10131 4.16662L6.45833 6.52364"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2296_134219">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default LoadingIcon;
