export const LandingImageBackground: React.FC = () => (
  <svg
    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
    width={640}
    height={784}
    fill="none"
    viewBox="0 0 640 784"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
        x={118}
        y={0}
        width={20}
        height={20}
        patternUnits="userSpaceOnUse"
      >
        <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
      </pattern>
    </defs>
    <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
    <rect x={118} width={404} height={784} fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
  </svg>
);
