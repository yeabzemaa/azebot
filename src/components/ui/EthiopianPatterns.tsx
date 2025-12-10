// Ethiopian Traditional Pattern Components

export function TibebPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <pattern id="tibeb" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="20" height="20" fill="#ce1126" />
        <rect x="20" y="0" width="20" height="20" fill="#f4c430" />
        <rect x="40" y="0" width="20" height="20" fill="#078930" />
      </pattern>
      <rect width="200" height="20" fill="url(#tibeb)" />
    </svg>
  );
}

export function EthiopianCross({ className = '', color = '#d4af37' }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13 7H11L12 2Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M12 22L13 17H11L12 22Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M2 12L7 13V11L2 12Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M22 12L17 13V11L22 12Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <circle cx="12" cy="12" r="3" fill={color} stroke={color} strokeWidth="0.5" />
      <circle cx="12" cy="7" r="1.5" fill={color} />
      <circle cx="12" cy="17" r="1.5" fill={color} />
      <circle cx="7" cy="12" r="1.5" fill={color} />
      <circle cx="17" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

export function CoffeeBean({ className = '', color = '#5d4e37' }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="12" rx="5" ry="7" fill={color} />
      <path
        d="M12 7C12 7 10 10 10 12C10 14 12 17 12 17"
        stroke="#fff"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function GeometricPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern id="geometric" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M0 25L25 0L50 25L25 50L0 25Z" fill="#d4af37" opacity="0.1" />
        <path d="M25 0L50 25L25 50L0 25L25 0Z" stroke="#d4af37" strokeWidth="0.5" opacity="0.2" />
      </pattern>
      <rect width="100" height="100" fill="url(#geometric)" />
    </svg>
  );
}

export function DiamondPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern id="diamonds" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <polygon points="15,0 30,15 15,30 0,15" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.15" />
        <polygon points="15,5 25,15 15,25 5,15" fill="#d4af37" opacity="0.05" />
      </pattern>
      <rect width="60" height="60" fill="url(#diamonds)" />
    </svg>
  );
}

export function SectionDivider({ icon }: { icon?: React.ReactNode }) {
  return (
    <div className="section-divider">
      <div className="section-divider-icon">
        {icon || <EthiopianCross className="w-6 h-6 inline-block" />}
      </div>
    </div>
  );
}
