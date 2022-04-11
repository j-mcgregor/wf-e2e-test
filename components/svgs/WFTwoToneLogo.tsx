import React from 'react';

export const WFTwoToneLogo: React.FC<{ onClick: () => void }> = ({
  onClick
}) => {
  return (
    <svg
      onClick={onClick}
      className="h-full"
      width="63"
      viewBox="0 0 63 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63 62.3896V0.389648L0 64.3896H61C62.1046 64.3896 63 63.4942 63 62.3896Z"
        className="fill-[#E58A2E] hover:fill-[#c67627] cursor-pointer duration-100"
      />
      <mask
        id="mask0_6995_16003"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="10"
        width="41"
        height="42"
      >
        <path
          d="M48.4359 31.0852C48.3648 42.4212 39.2722 51.5557 28.1277 51.4858C16.9822 51.4159 8.00619 42.168 8.07729 30.8321C8.14841 19.4936 17.2397 10.3604 28.3852 10.4303C39.5297 10.5002 48.507 19.7468 48.4359 31.0852Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_6995_16003)">
        <mask
          id="mask1_6995_16003"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="8"
          y="10"
          width="41"
          height="42"
        >
          <path
            d="M48.4359 31.0852C48.3648 42.4212 39.2722 51.5557 28.1277 51.4858C16.9822 51.4159 8.00619 42.168 8.07729 30.8321C8.14841 19.4936 17.2397 10.3604 28.3852 10.4303C39.5297 10.5002 48.507 19.7468 48.4359 31.0852Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_6995_16003)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.4573 22.6926C27.5306 22.3311 27.6028 22.1511 27.6384 22.1514C27.6384 22.1514 27.5304 22.3676 27.4573 22.6926ZM26.2527 27.8507C26.3261 27.4186 26.4356 27.0216 26.5454 26.5164C26.5451 26.5526 26.5094 26.5882 26.5091 26.6253C26.4009 26.8767 26.293 27.1285 26.3286 27.0209C26.2201 27.3815 26.2542 27.598 26.2527 27.8507ZM40.7534 15.0071C40.4684 15.2219 40.1469 15.473 39.9326 15.6885C39.6107 16.0116 39.7529 16.0125 39.5374 16.373C39.0352 17.2011 38.2845 17.9541 37.6755 18.7095C36.9954 19.5726 36.4575 20.4357 35.8482 21.2999C35.3104 22.0904 34.5599 22.8449 34.1639 23.7099C33.8752 24.394 33.5514 25.0793 33.1206 25.7619C32.1884 27.2026 31.3621 28.7143 30.4999 30.2265C29.8535 31.3429 29.4909 32.5328 28.8447 33.7206C27.8386 35.5566 26.9382 37.5017 26.0383 39.412C25.7864 39.9528 25.5345 40.4561 25.4247 40.9619C25.2789 41.5391 25.1352 41.8275 24.4598 41.8952C23.2158 41.9959 22.0508 40.9407 21.9164 39.7109C21.7129 38.1563 21.9015 36.4236 21.947 34.833C21.9874 34.003 22.0649 33.0279 22.3542 32.1982C22.463 31.8383 22.5703 31.695 22.6086 31.2975C22.6448 31.1886 22.6478 30.7189 22.6825 30.7918C22.6846 30.467 22.6163 30.0679 22.7256 29.5996C22.8358 29.0221 23.0168 28.4457 23.0912 27.8674C23.0926 27.6504 23.3959 24.6172 23.8572 24.6928C23.9283 24.6932 23.8203 24.9095 23.8914 24.9099C23.9283 24.6932 23.9654 24.4403 24.0378 24.2235C24.0023 24.2233 24.0021 24.2604 23.9665 24.2602C24.0021 24.2604 24.441 22.2753 24.5132 22.0946L23.1519 23.8564C22.5789 24.6492 21.8287 25.3667 21.3262 26.1944C20.2493 27.9942 19.0667 29.6851 17.9187 31.4485C16.808 33.0669 15.8028 34.7587 14.8329 36.4509C14.2945 37.3869 13.5781 38.3222 13.252 39.368C13.2153 39.5472 13.1783 39.7287 13.1068 39.9084C12.6379 40.9902 10.9674 41.196 10.0471 40.6479C9.16293 40.1013 9.38153 39.1991 9.67107 38.3693C9.96028 37.5408 10.1418 36.8905 10.3602 36.0616C10.7977 34.2572 11.5896 32.5645 12.0628 30.7968C12.535 29.066 13.0079 27.3351 13.445 25.6033C14.1728 22.789 14.7597 19.7941 14.9559 16.8332C14.763 19.2524 14.1081 21.7773 13.632 24.1228C13.0097 27.0452 12.138 30.0748 11.1967 32.9233C11.5612 31.4803 11.7834 30 12.1831 28.5582C12.3643 27.9447 12.6165 27.404 12.7981 26.7914C12.8338 26.7552 13.0188 25.6006 13.0546 25.5644C13.0543 25.6009 13.0541 25.6361 13.0891 25.6731C13.0896 25.6011 13.1253 25.5648 13.1258 25.4929C13.0181 25.7098 13.0589 24.8784 13.0943 24.8422C13.1319 24.517 13.2053 24.1927 13.2778 23.8671C13.4604 23.1458 13.6066 22.4966 13.6467 21.7744C13.6492 21.3763 13.9885 18.2362 14.3083 18.2382C14.3791 18.2386 14.3067 18.4903 14.342 18.528C14.4148 18.2024 14.4524 17.8779 14.4902 17.5169C14.4542 17.5883 14.4538 17.6603 14.3825 17.697C14.4187 17.5881 14.5362 15.8543 14.5373 15.6736C12.8964 16.7838 13.3744 14.1852 13.7701 13.4297C14.0579 12.781 14.6668 12.0256 15.4483 11.994C15.626 11.9951 15.6604 12.1396 15.8381 12.1407C16.0155 12.1777 16.0518 12.0701 16.1934 12.1071C16.7966 12.2194 17.1477 12.8004 17.3931 13.3433C17.7087 14.0306 17.8104 14.7553 17.8412 15.5138C17.8383 15.9835 17.6593 16.2358 17.6572 16.5605C17.6575 16.5241 17.6932 16.4891 17.729 16.4525C17.8711 16.4182 17.7905 17.9346 17.6128 17.9335C17.5773 17.9694 17.6169 17.2824 17.6166 17.3195C17.3903 19.4497 16.9506 21.614 16.5468 23.7072C16.6556 23.3114 17.3901 19.4852 17.4257 19.4854C17.4257 19.4854 16.2125 26.0539 16.102 26.6672C15.6251 29.0853 15.2193 31.5033 14.565 33.8838L16.4646 31.1498C17.2169 30.1067 17.6854 29.0259 18.5087 27.9832C19.3317 27.0129 20.0489 25.9343 20.8369 24.9272C21.2672 24.315 21.484 23.7023 21.9138 23.1268C23.2398 21.2209 24.8852 19.3517 26.246 17.6264C26.3887 17.4465 26.3551 17.2294 26.7464 17.124C27.1733 17.0182 27.704 17.3457 27.9862 17.6373C28.3751 17.9652 28.6207 18.4364 28.653 18.9422C28.6849 19.484 28.4006 19.5187 28.2567 19.8426L28.3993 19.735C28.5057 19.7725 28.1078 20.9257 28.0012 20.925C27.9304 20.9246 27.9313 20.7799 27.9674 20.6359C27.389 22.2938 27.0229 23.9898 26.6927 25.6864C26.7647 25.5419 27.057 24.1711 27.3119 23.1972C26.9087 25.1461 26.2449 29.0796 26.1717 29.4769C26.0571 30.7403 25.9426 32.0044 25.7214 33.2672C25.5741 34.134 25.2837 35.1074 25.2079 35.9013C25.2082 35.8655 25.2439 35.8296 25.3151 35.7577C25.4222 35.6864 25.3407 37.3478 25.3403 37.4197C25.9892 35.9062 26.6384 34.3566 27.3934 32.8812C27.9329 31.8006 28.6139 30.7928 29.1185 29.6765C30.3066 27.0459 31.743 24.5976 33.2857 22.1497C34.8284 19.7037 36.3714 17.2202 38.1611 14.9553C38.8415 14.0921 39.6634 13.338 40.3787 12.4764C40.558 12.26 40.417 12.0786 40.8436 12.0087C41.4123 11.9041 42.0117 12.6309 42.1864 13.1011C42.1864 13.1011 42.1511 13.065 42.1862 13.1376C42.4646 14.0787 41.325 14.5409 40.7534 15.0071Z"
            fill="#E58A2E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M37.4068 29.197C37.0683 30.2069 36.7309 31.1752 36.4339 32.1857L37.4063 29.2809L37.4068 29.197L37.4066 29.238L37.4068 29.197ZM33.9161 30.3137C34.2549 29.2182 34.6344 28.2092 35.0555 27.1998C36.359 24.3388 37.5489 19.7064 40.8715 18.8834C39.5429 19.1708 38.5427 19.9238 37.6643 21.1414C36.5771 22.6112 35.8203 24.2092 35.2291 25.9352C34.7638 27.4082 34.2988 28.8395 33.9161 30.3137ZM28.2602 52.7204C28.2193 52.7202 28.219 52.7618 28.219 52.7618L28.2602 52.7204ZM30.5609 46.8541C30.8669 46.735 29.749 46.7809 29.8758 46.445C29.8755 46.4866 29.9231 45.4742 30.1318 45.3497C30.1727 45.3499 29.9599 46.2344 29.9599 46.2344C30.0867 45.8978 30.1304 45.5601 30.2566 45.1813C30.2151 45.224 30.1735 45.2237 30.1328 45.1805C29.9284 44.6314 30.6015 43.1168 30.7293 42.5691C30.9418 41.7695 31.1951 41.0109 31.3661 40.2104C31.7482 38.7792 31.9642 37.4305 32.1395 35.9557C32.3148 34.3527 32.781 32.7951 33.2052 31.2796C33.2897 31.0703 34.0114 28.3745 34.2186 28.3758C34.2602 28.376 34.0905 28.9651 34.1318 29.0076C34.3859 28.1654 34.5984 27.3232 34.8525 26.5235C34.8107 26.5659 34.5164 27.1964 34.5169 27.1128C34.437 26.6468 34.8977 25.8914 35.0666 25.4276L35.6584 23.6597C36.0803 22.4822 36.5437 21.3039 37.2553 20.2108C38.1764 18.8665 39.4685 17.7783 41.128 17.7035C42.2893 17.6269 43.489 18.057 44.4395 18.6108C46.1752 19.5914 46.8305 20.9039 46.9429 22.7178C47.0536 24.955 45.541 28.1094 43.7911 29.4469C43.1241 29.9505 42.2094 30.3657 41.3808 30.2769C40.8416 30.2306 40.1805 29.932 40.5161 29.3004C40.5161 29.3004 40.5992 29.258 40.6413 29.1743L40.5997 29.1741C40.6 29.1331 42.0704 26.0623 42.2361 26.1056C42.2777 26.1059 41.7301 27.4518 41.7296 27.5367C42.3601 26.2333 42.9073 24.8444 43.3308 23.4551C43.5428 22.7394 44.1756 21.0128 43.6825 20.2511C43.1487 19.4465 41.9405 20.3677 41.44 20.8278C40.2715 22.0007 39.5562 23.6842 38.924 25.1991C39.6398 23.5585 40.7347 20.8656 42.5635 20.2018C44.2674 19.5794 43.5476 21.9802 43.3782 22.5696C43.5052 22.1062 43.848 20.3796 43.1854 20.1634C42.3995 19.948 41.48 21.0808 41.1037 21.5849C39.3897 23.8094 38.4167 26.757 37.5296 29.4076C35.7121 34.8805 36.6649 32.6884 34.5579 38.032C34.7903 37.9622 31.592 46.6336 31.826 46.5644L30.5609 46.8541Z"
            fill="#E58A2E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.8921 58.3022C26.8582 58.3019 26.858 58.3368 26.858 58.3368L26.8921 58.3022ZM35.2354 36.9882C34.1895 40.6195 31.7614 49.2415 30.378 52.7487C30.5682 52.6911 29.6105 53.3352 29.8016 53.2803L28.7687 53.5166C29.0191 53.4184 28.1065 53.4569 28.2101 53.1825C28.2099 53.2167 28.2487 52.3909 28.4188 52.2886C28.4521 52.2888 28.2788 53.0109 28.2788 53.0109C28.3817 52.7361 28.4177 52.4607 28.5209 52.1505C28.487 52.1857 28.4528 52.1855 28.4197 52.1498C28.253 51.703 28.8022 50.4658 28.9062 50.02C29.0801 49.3661 29.2867 48.7489 29.4263 48.0957C29.738 46.9275 29.9908 44.9657 30.3656 43.5538C30.7026 42.285 31.5202 38.773 31.8662 37.5369L35.2354 36.9882Z"
            fill="#E58A2E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.1555 34.0673C40.027 34.7942 38.2743 34.35 36.1583 35.1541C37.0898 34.8736 37.4049 35.0886 38.3557 34.9251C39.5029 34.7677 41.0059 34.5053 42.1555 34.0673ZM43.5396 35.1449C42.8396 35.3451 42.5867 35.5889 41.8931 35.8286C40.3568 36.2925 38.7533 36.6489 37.2775 37.1829C36.0735 37.5895 34.6565 37.5945 33.4529 38.0021C32.4736 38.291 31.4123 38.6734 30.3279 38.6204C29.0405 38.5229 28.155 37.3174 28.2248 36.2674C28.2986 35.5348 28.9083 35.6697 29.6144 35.5082C32.3178 35.0018 34.9283 34.2331 37.7173 33.9514C39.2042 33.7751 40.7039 33.6767 42.1756 33.7023C42.6157 33.7064 45.1653 33.7463 45.2646 34.0491C45.4568 34.6145 44.0094 35.0242 43.5396 35.1449Z"
            fill="#E58A2E"
          />
        </g>
      </g>
      <mask
        id="mask2_6995_16003"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="63"
        height="65"
      >
        <path
          d="M62.5986 64.3932L63 0.389783L0.454996 64.0034L62.5986 64.3932Z"
          fill="#C4C4C4"
        />
      </mask>
      <g mask="url(#mask2_6995_16003)">
        <mask
          id="mask3_6995_16003"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="8"
          y="10"
          width="41"
          height="42"
        >
          <path
            d="M48.4359 31.0852C48.3648 42.4212 39.2722 51.5557 28.1277 51.4858C16.9822 51.4159 8.00619 42.168 8.07729 30.8321C8.14841 19.4936 17.2397 10.3604 28.3852 10.4303C39.5297 10.5002 48.507 19.7468 48.4359 31.0852Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask3_6995_16003)">
          <mask
            id="mask4_6995_16003"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="8"
            y="10"
            width="41"
            height="42"
          >
            <path
              d="M48.4359 31.0852C48.3648 42.4212 39.2722 51.5557 28.1277 51.4858C16.9822 51.4159 8.00619 42.168 8.07729 30.8321C8.14841 19.4936 17.2397 10.3604 28.3852 10.4303C39.5297 10.5002 48.507 19.7468 48.4359 31.0852Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask4_6995_16003)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.4573 22.6926C27.5306 22.3311 27.6028 22.1511 27.6384 22.1514C27.6384 22.1514 27.5304 22.3676 27.4573 22.6926ZM26.2527 27.8507C26.3261 27.4186 26.4356 27.0216 26.5454 26.5164C26.5451 26.5526 26.5094 26.5882 26.5091 26.6253C26.4009 26.8767 26.293 27.1285 26.3286 27.0209C26.2201 27.3815 26.2542 27.598 26.2527 27.8507ZM40.7534 15.0071C40.4684 15.2219 40.1469 15.473 39.9326 15.6885C39.6107 16.0116 39.7529 16.0125 39.5374 16.373C39.0352 17.2011 38.2845 17.9541 37.6755 18.7095C36.9954 19.5726 36.4575 20.4357 35.8482 21.2999C35.3104 22.0904 34.5599 22.8449 34.1639 23.7099C33.8752 24.394 33.5514 25.0793 33.1206 25.7619C32.1884 27.2026 31.3621 28.7143 30.4999 30.2265C29.8535 31.3429 29.4909 32.5328 28.8447 33.7206C27.8386 35.5566 26.9382 37.5017 26.0383 39.412C25.7864 39.9528 25.5345 40.4561 25.4247 40.9619C25.2789 41.5391 25.1352 41.8275 24.4598 41.8952C23.2158 41.9959 22.0508 40.9407 21.9164 39.7109C21.7129 38.1563 21.9015 36.4236 21.947 34.833C21.9874 34.003 22.0649 33.0279 22.3542 32.1982C22.463 31.8383 22.5703 31.695 22.6086 31.2975C22.6448 31.1886 22.6478 30.7189 22.6825 30.7918C22.6846 30.467 22.6163 30.0679 22.7256 29.5996C22.8358 29.0221 23.0168 28.4457 23.0912 27.8674C23.0926 27.6504 23.3959 24.6172 23.8572 24.6928C23.9283 24.6932 23.8203 24.9095 23.8914 24.9099C23.9283 24.6932 23.9654 24.4403 24.0378 24.2235C24.0023 24.2233 24.0021 24.2604 23.9665 24.2602C24.0021 24.2604 24.441 22.2753 24.5132 22.0946L23.1519 23.8564C22.5789 24.6492 21.8287 25.3667 21.3262 26.1944C20.2493 27.9942 19.0667 29.6851 17.9187 31.4485C16.808 33.0669 15.8028 34.7587 14.8329 36.4509C14.2945 37.3869 13.5781 38.3222 13.252 39.368C13.2153 39.5472 13.1783 39.7287 13.1068 39.9084C12.6379 40.9902 10.9674 41.196 10.0471 40.6479C9.16293 40.1013 9.38153 39.1991 9.67107 38.3693C9.96028 37.5408 10.1418 36.8905 10.3602 36.0616C10.7977 34.2572 11.5896 32.5645 12.0628 30.7968C12.535 29.066 13.0079 27.3351 13.445 25.6033C14.1728 22.789 14.7597 19.7941 14.9559 16.8332C14.763 19.2524 14.1081 21.7773 13.632 24.1228C13.0097 27.0452 12.138 30.0748 11.1967 32.9233C11.5612 31.4803 11.7834 30 12.1831 28.5582C12.3643 27.9447 12.6165 27.404 12.7981 26.7914C12.8338 26.7552 13.0188 25.6006 13.0546 25.5644C13.0543 25.6009 13.0541 25.6361 13.0891 25.6731C13.0896 25.6011 13.1253 25.5648 13.1258 25.4929C13.0181 25.7098 13.0589 24.8784 13.0943 24.8422C13.1319 24.517 13.2053 24.1927 13.2778 23.8671C13.4604 23.1458 13.6066 22.4966 13.6467 21.7744C13.6492 21.3763 13.9885 18.2362 14.3083 18.2382C14.3791 18.2386 14.3067 18.4903 14.342 18.528C14.4148 18.2024 14.4524 17.8779 14.4902 17.5169C14.4542 17.5883 14.4538 17.6603 14.3825 17.697C14.4187 17.5881 14.5362 15.8543 14.5373 15.6736C12.8964 16.7838 13.3744 14.1852 13.7701 13.4297C14.0579 12.781 14.6668 12.0256 15.4483 11.994C15.626 11.9951 15.6604 12.1396 15.8381 12.1407C16.0155 12.1777 16.0518 12.0701 16.1934 12.1071C16.7966 12.2194 17.1477 12.8004 17.3931 13.3433C17.7087 14.0306 17.8104 14.7553 17.8412 15.5138C17.8383 15.9835 17.6593 16.2358 17.6572 16.5605C17.6575 16.5241 17.6932 16.4891 17.729 16.4525C17.8711 16.4182 17.7905 17.9346 17.6128 17.9335C17.5773 17.9694 17.6169 17.2824 17.6166 17.3195C17.3903 19.4497 16.9506 21.614 16.5468 23.7072C16.6556 23.3114 17.3901 19.4852 17.4257 19.4854C17.4257 19.4854 16.2125 26.0539 16.102 26.6672C15.6251 29.0853 15.2193 31.5033 14.565 33.8838L16.4646 31.1498C17.2169 30.1067 17.6854 29.0259 18.5087 27.9832C19.3317 27.0129 20.0489 25.9343 20.8369 24.9272C21.2672 24.315 21.484 23.7023 21.9138 23.1268C23.2398 21.2209 24.8852 19.3517 26.246 17.6264C26.3887 17.4465 26.3551 17.2294 26.7464 17.124C27.1733 17.0182 27.704 17.3457 27.9862 17.6373C28.3751 17.9652 28.6207 18.4364 28.653 18.9422C28.6849 19.484 28.4006 19.5187 28.2567 19.8426L28.3993 19.735C28.5057 19.7725 28.1078 20.9257 28.0012 20.925C27.9304 20.9246 27.9313 20.7799 27.9674 20.6359C27.389 22.2938 27.0229 23.9898 26.6927 25.6864C26.7647 25.5419 27.057 24.1711 27.3119 23.1972C26.9087 25.1461 26.2449 29.0796 26.1717 29.4769C26.0571 30.7403 25.9426 32.0044 25.7214 33.2672C25.5741 34.134 25.2837 35.1074 25.2079 35.9013C25.2082 35.8655 25.2439 35.8296 25.3151 35.7577C25.4222 35.6864 25.3407 37.3478 25.3403 37.4197C25.9892 35.9062 26.6384 34.3566 27.3934 32.8812C27.9329 31.8006 28.6139 30.7928 29.1185 29.6765C30.3066 27.0459 31.743 24.5976 33.2857 22.1497C34.8284 19.7037 36.3714 17.2202 38.1611 14.9553C38.8415 14.0921 39.6634 13.338 40.3787 12.4764C40.558 12.26 40.417 12.0786 40.8436 12.0087C41.4123 11.9041 42.0117 12.6309 42.1864 13.1011C42.1864 13.1011 42.1511 13.065 42.1862 13.1376C42.4646 14.0787 41.325 14.5409 40.7534 15.0071Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.4068 29.197C37.0683 30.2069 36.7309 31.1752 36.4339 32.1857L37.4063 29.2809L37.4068 29.197L37.4066 29.238L37.4068 29.197ZM33.9161 30.3137C34.2549 29.2182 34.6344 28.2092 35.0555 27.1998C36.359 24.3388 37.5489 19.7064 40.8715 18.8834C39.5429 19.1708 38.5427 19.9238 37.6643 21.1414C36.5771 22.6112 35.8203 24.2092 35.2291 25.9352C34.7638 27.4082 34.2988 28.8395 33.9161 30.3137ZM28.2602 52.7204C28.2193 52.7202 28.219 52.7618 28.219 52.7618L28.2602 52.7204ZM30.5609 46.8541C30.8669 46.735 29.749 46.7809 29.8758 46.445C29.8755 46.4866 29.9231 45.4742 30.1318 45.3497C30.1727 45.3499 29.9599 46.2344 29.9599 46.2344C30.0867 45.8978 30.1304 45.5601 30.2566 45.1813C30.2151 45.224 30.1735 45.2237 30.1328 45.1805C29.9284 44.6314 30.6015 43.1168 30.7293 42.5691C30.9418 41.7695 31.1951 41.0109 31.3661 40.2104C31.7482 38.7792 31.9642 37.4305 32.1395 35.9557C32.3148 34.3527 32.781 32.7951 33.2052 31.2796C33.2897 31.0703 34.0114 28.3745 34.2186 28.3758C34.2602 28.376 34.0905 28.9651 34.1318 29.0076C34.3859 28.1654 34.5984 27.3232 34.8525 26.5235C34.8107 26.5659 34.5164 27.1964 34.5169 27.1128C34.437 26.6468 34.8977 25.8914 35.0666 25.4276L35.6584 23.6597C36.0803 22.4822 36.5437 21.3039 37.2553 20.2108C38.1764 18.8665 39.4685 17.7783 41.128 17.7035C42.2893 17.6269 43.489 18.057 44.4395 18.6108C46.1752 19.5914 46.8305 20.9039 46.9429 22.7178C47.0536 24.955 45.541 28.1094 43.7911 29.4469C43.1241 29.9505 42.2094 30.3657 41.3808 30.2769C40.8416 30.2306 40.1805 29.932 40.5161 29.3004C40.5161 29.3004 40.5992 29.258 40.6413 29.1743L40.5997 29.1741C40.6 29.1331 42.0704 26.0623 42.2361 26.1056C42.2777 26.1059 41.7301 27.4518 41.7296 27.5367C42.3601 26.2333 42.9073 24.8444 43.3308 23.4551C43.5428 22.7394 44.1756 21.0128 43.6825 20.2511C43.1487 19.4465 41.9405 20.3677 41.44 20.8278C40.2715 22.0007 39.5562 23.6842 38.924 25.1991C39.6398 23.5585 40.7347 20.8656 42.5635 20.2018C44.2674 19.5794 43.5476 21.9802 43.3782 22.5696C43.5052 22.1062 43.848 20.3796 43.1854 20.1634C42.3995 19.948 41.48 21.0808 41.1037 21.5849C39.3897 23.8094 38.4167 26.757 37.5296 29.4076C35.7121 34.8805 36.6649 32.6884 34.5579 38.032C34.7903 37.9622 31.592 46.6336 31.826 46.5644L30.5609 46.8541Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.8921 58.3022C26.8582 58.3019 26.858 58.3368 26.858 58.3368L26.8921 58.3022ZM35.2354 36.9882C34.1895 40.6195 31.7614 49.2415 30.378 52.7487C30.5682 52.6911 29.6105 53.3352 29.8016 53.2803L28.7687 53.5166C29.0191 53.4184 28.1065 53.4569 28.2101 53.1825C28.2099 53.2167 28.2487 52.3909 28.4188 52.2886C28.4521 52.2888 28.2788 53.0109 28.2788 53.0109C28.3817 52.7361 28.4177 52.4607 28.5209 52.1505C28.487 52.1857 28.4528 52.1855 28.4197 52.1498C28.253 51.703 28.8022 50.4658 28.9062 50.02C29.0801 49.3661 29.2867 48.7489 29.4263 48.0957C29.738 46.9275 29.9908 44.9657 30.3656 43.5538C30.7026 42.285 31.5202 38.773 31.8662 37.5369L35.2354 36.9882Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42.1555 34.0673C40.027 34.7942 38.2743 34.35 36.1583 35.1541C37.0898 34.8736 37.4049 35.0886 38.3557 34.9251C39.5029 34.7677 41.0059 34.5053 42.1555 34.0673ZM43.5396 35.1449C42.8396 35.3451 42.5867 35.5889 41.8931 35.8286C40.3568 36.2925 38.7533 36.6489 37.2775 37.1829C36.0735 37.5895 34.6565 37.5945 33.4529 38.0021C32.4736 38.291 31.4123 38.6734 30.3279 38.6204C29.0405 38.5229 28.155 37.3174 28.2248 36.2674C28.2986 35.5348 28.9083 35.6697 29.6144 35.5082C32.3178 35.0018 34.9283 34.2331 37.7173 33.9514C39.2042 33.7751 40.7039 33.6767 42.1756 33.7023C42.6157 33.7064 45.1653 33.7463 45.2646 34.0491C45.4568 34.6145 44.0094 35.0242 43.5396 35.1449Z"
              fill="white"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
