import React, { useState, useEffect } from 'react';

// ============================================
// CertifID Cash to Close — Complete Buyer Flow
// Interactive Prototype
// ============================================

// Design Tokens (CertifID Brand)
const colors = {
  darkBlue: '#102754',
  blue: '#166EBE',
  lightestBlue: '#DEEFF9',
  lighterBlue: '#B7DEFF',
  white: '#FFFFFF',
  darkGrey: '#DDDDDD',
  grey: '#EEEEEE',
  lightestGrey: '#F7F7F7',
  mediumEmphasis: '#555555',
  highEmphasis: '#2B3034',
  lowEmphasis: '#A0A2A4',
  browserBg: 'rgba(249, 249, 249, 0.94)',
  darkBlueMatte: '#162F4D',
  green: '#61D690',
  black: '#000000',
  orange: '#FFA624',
  red: '#DB132C',
  lightGreen: '#E8F8EF',
  darkGreen: '#059669',
  lightRed: '#FEF2F2',
  lightOrange: '#FFFBEB',
  blueIce: '#F4F6FA',
};

const fonts = {
  oxygen: "'Oxygen', sans-serif",
  sfPro: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  nunitoSans: "'Nunito Sans', sans-serif",
};

// Pre-populated data from title company request
const requestData = {
  titleCompany: 'Pinpoint Title',
  office: '6th/Lamar Office',
  officeAddress: '524 N Lamar Blvd, Suite 200, Austin, TX 78703',
  propertyAddress: '1234 Rivers Road, Austin, TX 78732',
  paymentAmount: 47500.00,
  closingDate: 'Tuesday, February 3, 2026',
  closingTime: '2:00 PM',
  buyerName: 'Sarah Johnson',
  buyerPhone: '(512) 555-0147',
  deliveryDate: 'Monday, February 2, 2026',
  deliveryTime: '9:00 AM',
  hasExistingBank: true,
  existingBank: {
    name: 'Chase',
    type: 'Checking',
    last4: '1038',
    balance: 52400,
  },
};

// Mask phone number to show only last 4 digits
const maskPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return `(***) ***-${last4}`;
};

// ============================================
// Shared Components
// ============================================

const StatusBar = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 17px 8px 24px',
    height: '47px',
    boxSizing: 'border-box',
  }}>
    <span style={{ fontFamily: fonts.sfPro, fontWeight: 600, fontSize: '15.66px', letterSpacing: '-0.28px', color: colors.black }}>9:41</span>
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
        <rect x="0" y="6" width="3" height="5" rx="1" fill="black"/>
        <rect x="4.5" y="4" width="3" height="7" rx="1" fill="black"/>
        <rect x="9" y="2" width="3" height="9" rx="1" fill="black"/>
        <rect x="13.5" y="0" width="3" height="11" rx="1" fill="black"/>
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 2.4C10.9 2.4 13.5 3.5 15.4 5.3L16 4.7C13.9 2.7 11.1 1.5 8 1.5C4.9 1.5 2.1 2.7 0 4.7L0.6 5.3C2.5 3.5 5.1 2.4 8 2.4Z" fill="black"/>
        <path d="M8 5.4C10 5.4 11.8 6.2 13.1 7.5L13.7 6.9C12.2 5.4 10.2 4.5 8 4.5C5.8 4.5 3.8 5.4 2.3 6.9L2.9 7.5C4.2 6.2 6 5.4 8 5.4Z" fill="black"/>
        <path d="M8 8.4C9.1 8.4 10.1 8.8 10.9 9.6L11.5 9C10.5 8 9.3 7.5 8 7.5C6.7 7.5 5.5 8 4.5 9L5.1 9.6C5.9 8.8 6.9 8.4 8 8.4Z" fill="black"/>
        <circle cx="8" cy="11" r="1" fill="black"/>
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeOpacity="0.35"/>
        <rect x="2" y="2" width="18" height="8" rx="1.5" fill="black"/>
        <path d="M23 4V8C24.1 8 25 7.1 25 6C25 4.9 24.1 4 23 4Z" fill="black" fillOpacity="0.4"/>
      </svg>
    </div>
  </div>
);

const URLBar = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
    padding: '0 16px 8px', fontSize: '12.66px', letterSpacing: '0.13px', fontFamily: fonts.sfPro, color: colors.black,
  }}>
    <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
      <rect x="2" y="6" width="8" height="7" rx="1.5" stroke="#16a34a" strokeWidth="1.5"/>
      <path d="M4 6V4a2 2 0 014 0v2" stroke="#16a34a" strokeWidth="1.5"/>
    </svg>
    <span>pay.certifid.com</span>
  </div>
);

const ScrollBarHeader = () => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: '66px',
    background: colors.browserBg, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 10,
  }}>
    <StatusBar />
    <URLBar />
  </div>
);

const BottomToolbar = () => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '83px',
    background: colors.browserBg, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5px',
    boxShadow: 'inset 0px 0.33px 0px 0px rgba(0,0,0,0.3)',
  }}>
    <div style={{ height: '44px', width: '100%' }} />
    <div style={{ width: '139px', height: '5px', background: colors.black, borderRadius: '100px', marginBottom: '9px' }} />
  </div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    width: '40px', height: '40px', borderRadius: '100px', background: colors.lightestGrey,
    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px',
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke={colors.highEmphasis} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

const PrimaryButton = ({ children, onClick, disabled, fullWidth = true }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: fullWidth ? '100%' : 'auto', height: '48px', padding: '10px 16px', borderRadius: '6px', boxSizing: 'border-box',
    border: 'none', background: disabled ? colors.lowEmphasis : colors.blue,
    color: colors.white, fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', lineHeight: 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
  }}>{children}</button>
);

const DangerButton = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    width: '326px', height: '48px', padding: '10px 16px', borderRadius: '6px',
    border: 'none', background: colors.red, color: colors.white, fontFamily: fonts.oxygen,
    fontWeight: 700, fontSize: '16px', lineHeight: 1, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>{children}</button>
);

const SecondaryButton = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    width: '326px', height: '48px', padding: '10px 16px', borderRadius: '6px',
    border: `1px solid ${colors.darkGrey}`, background: colors.white,
    color: colors.mediumEmphasis, fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px',
    lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>{children}</button>
);

const TextLink = ({ children, onClick }) => (
  <p onClick={onClick} style={{
    fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', lineHeight: 1.5,
    color: colors.blue, textAlign: 'center', margin: '16px 0', cursor: 'pointer',
  }}>{children}</p>
);

const TextField = ({ label, placeholder, value, onChange, optional, helperText, type = 'text', disabled = false, prefix }) => (
  <div style={{ width: '326px', marginBottom: '16px' }}>
    {label && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '24px', marginBottom: '8px' }}>
        <label style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis }}>{label}</label>
        {optional && <span style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14.4px', lineHeight: 1.5, color: colors.mediumEmphasis }}>Optional</span>}
      </div>
    )}
    <div style={{ position: 'relative' }}>
      {prefix && (
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontFamily: fonts.oxygen, fontSize: '16px', color: colors.mediumEmphasis }}>{prefix}</span>
      )}
      <input type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange && onChange(e.target.value)} disabled={disabled}
        style={{
          width: '100%', height: '40px', padding: prefix ? '8px 12px 8px 28px' : '8px 12px', borderRadius: '6px',
          border: `1px solid ${colors.darkGrey}`, background: disabled ? colors.lightestGrey : colors.white,
          fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5,
          boxSizing: 'border-box', outline: 'none', color: colors.highEmphasis,
        }}
      />
    </div>
    {helperText && <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14.4px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '4.8px 0 0 0' }}>{helperText}</p>}
  </div>
);

const ProgressTracker = ({ title, progress, onBack }) => (
  <div style={{ position: 'absolute', top: '65px', left: 0, right: 0, height: '66px', background: colors.white, zIndex: 5 }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '62px' }}>
      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: colors.lightestGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke={colors.highEmphasis} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.darkBlue, textAlign: 'center', flex: 1, margin: 0 }}>{title}</p>
      <div style={{ width: '38px' }} />
    </div>
    <div style={{ height: '4px', background: colors.grey, width: '100%' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: colors.blue, borderRadius: '0 3px 3px 0', transition: 'width 0.3s ease' }} />
    </div>
  </div>
);

// Co-branded header with title company logo + CertifID badge
// mode: 'logo' = centered logo only (landing pages), 'progress' = back button + logo + progress bar (inner screens)
const CoBrandedHeader = ({ mode = 'logo', progress, onBack, customLogo }) => {
  const CompanyLogo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {customLogo ? (
        <img src={customLogo} alt={requestData.titleCompany} style={{ height: '32px', objectFit: 'contain' }} />
      ) : (
        <>
          <div style={{ width: '30px', height: '30px', background: '#D4763B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="3"/><path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" stroke="white" strokeWidth="2"/></svg>
          </div>
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '18px', letterSpacing: '3px', color: '#3B3B49' }}>PINPOINT</span>
        </>
      )}
    </div>
  );

  if (mode === 'logo') {
    return (
      <div style={{ position: 'absolute', top: '65px', left: 0, right: 0, background: colors.white, zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '56px' }}>
          <CompanyLogo />
        </div>
        <div style={{ height: '1px', background: colors.grey }} />
      </div>
    );
  }

  // mode === 'progress'
  return (
    <div style={{ position: 'absolute', top: '65px', left: 0, right: 0, background: colors.white, zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '56px' }}>
        {onBack ? (
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: colors.lightestGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke={colors.highEmphasis} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ) : <div style={{ width: '38px' }} />}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <CompanyLogo />
        </div>
        <div style={{ width: '38px' }} />
      </div>
      <div style={{ height: '4px', background: colors.grey, width: '100%' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: colors.blue, borderRadius: '0 3px 3px 0', transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
};

const Badge = ({ children, variant = 'blue' }) => {
  const bgColor = variant === 'green' ? colors.lightGreen : variant === 'red' ? colors.lightRed : variant === 'orange' ? colors.lightOrange : variant === 'grey' ? colors.lightestGrey : colors.lightestBlue;
  const textColor = variant === 'green' ? colors.darkGreen : variant === 'red' ? colors.red : variant === 'orange' ? '#92400E' : variant === 'grey' ? colors.lowEmphasis : colors.blue;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '7.8px 13.7px', borderRadius: '16px', background: bgColor }}>
      <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '10.4px', lineHeight: 1.5, color: textColor, textTransform: 'uppercase' }}>{children}</span>
    </div>
  );
};

const Checkbox = ({ checked, onChange, label }) => (
  <div onClick={() => onChange(!checked)} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer', width: '326px' }}>
    <div style={{
      width: '20px', height: '20px', borderRadius: '4px',
      border: checked ? 'none' : `1px solid ${colors.darkGrey}`,
      background: checked ? colors.blue : colors.white,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14.4px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: 0 }}>{label}</p>
  </div>
);

const InfoBox = ({ children, variant = 'blue' }) => {
  const bg = variant === 'green' ? colors.lightGreen : variant === 'orange' ? colors.lightOrange : variant === 'red' ? colors.lightRed : colors.lightestBlue;
  const border = variant === 'green' ? '#bbf7d0' : variant === 'orange' ? '#fde68a' : variant === 'red' ? '#fecaca' : colors.lighterBlue;
  const iconColor = variant === 'green' ? colors.darkGreen : variant === 'orange' ? '#D97706' : variant === 'red' ? colors.red : colors.blue;
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '14px 16px', background: bg, borderRadius: '8px', border: `1px solid ${border}`, marginBottom: '20px', width: '326px', boxSizing: 'border-box' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" stroke={iconColor} strokeWidth="2"/>
        <path d="M12 8V12M12 16H12.01" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <div style={{ fontFamily: fonts.oxygen, fontSize: '14px', lineHeight: 1.5, color: colors.highEmphasis, flex: 1 }}>{children}</div>
    </div>
  );
};

const PhoneContainer = ({ children }) => (
  <div style={{
    width: '390px', height: '844px', background: colors.white, borderRadius: '47px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', position: 'relative', fontFamily: fonts.oxygen,
  }}>
    <style>{`
      .phone-scroll::-webkit-scrollbar { width: 0px; background: transparent; }
      .phone-scroll { scrollbar-width: none; -ms-overflow-style: none; }
    `}</style>
    <ScrollBarHeader />
    {children}
    <BottomToolbar />
  </div>
);

const DeliveryBanner = ({ date, time }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: colors.lightGreen, borderRadius: '8px', marginBottom: '20px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={colors.darkGreen} strokeWidth="2"/>
        <path d="M16 2V6M8 2V6M3 10H21" stroke={colors.darkGreen} strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 16L11 18L15 14" stroke={colors.darkGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.darkGreen, margin: 0 }}>Guaranteed arrival</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.darkGreen, margin: '2px 0 0' }}>{date} by {time}</p>
    </div>
  </div>
);

// House Illustrations
const HouseWithClock = () => (
  <svg width="200" height="165" viewBox="0 0 246 203" fill="none">
    <path d="M42.7953 172.407C43.1433 172.143 43.5681 172 44.005 172H223.06C224.976 172 225.796 174.434 224.27 175.593L203.205 191.593C202.857 191.857 202.432 192 201.995 192H22.9398C21.0239 192 20.2044 189.566 21.73 188.407L42.7953 172.407Z" fill="#DEEFF9"/>
    <rect x="97" y="93" width="86" height="86" fill="#DEEFF9"/>
    <rect x="62" y="93" width="122" height="86" stroke="#102754" strokeWidth="3"/>
    <rect width="14.7163" height="34.6266" rx="1" transform="matrix(1 0 0 -1 88.8359 175.297)" fill="#102754"/>
    <rect x="113" y="176" width="6" height="34" rx="1" transform="rotate(180 113 176)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <path d="M100.955 161.745C100.955 162.298 100.507 162.745 99.9551 162.745H92.4328C91.8805 162.745 91.4328 162.298 91.4328 161.745V144.701C91.4328 144.148 91.8805 143.701 92.4328 143.701H99.9551C100.507 143.701 100.955 144.148 100.955 144.701V161.745Z" fill="#FAFAFA"/>
    <rect x="120" y="174" width="4" height="37" transform="rotate(180 120 174)" fill="#102754"/>
    <rect x="77" y="174" width="4" height="37" transform="rotate(180 77 174)" fill="#102754"/>
    <rect x="86" y="176" width="6" height="34" rx="1" transform="rotate(180 86 176)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <rect x="0.75" y="-0.75" width="24.4699" height="16.679" rx="1.39645" transform="matrix(1 0 0 -1 141.776 117.652)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <rect x="0.75" y="-0.75" width="33.1266" height="22.7386" rx="1.39645" transform="matrix(1 0 0 -1 137.447 164.275)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <rect width="58.8652" height="6.92532" rx="1" transform="matrix(1 0 0 -1 67.1943 180.491)" fill="#102754"/>
    <rect x="52.6123" y="177.883" width="139.977" height="4.11698" rx="2.05849" fill="#102754"/>
    <rect x="0.75" y="-0.75" width="10.6193" height="16.679" rx="1.39645" transform="matrix(1 0 0 -1 77.7168 117.652)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <rect x="0.75" y="-0.75" width="11.485" height="16.679" rx="1.39645" transform="matrix(1 0 0 -1 104.553 117.652)" fill="white" stroke="#102754" strokeWidth="1.5"/>
    <path d="M77.7168 106.167H88.5395M105.707 106.167H116.529M142.249 106.167H166.88" stroke="#102754" strokeWidth="1.5"/>
    <path d="M154.761 106.477V118.596" stroke="#102754" strokeWidth="1.5"/>
    <path d="M154.761 141.969V165.775" stroke="#102754" strokeWidth="1.5"/>
    <path d="M172.074 152.79H138.313" stroke="#102754" strokeWidth="1.5"/>
    <path d="M79.7471 146.872H86M107 146.461H113.508" stroke="#102754" strokeWidth="1.5"/>
    <path d="M163 56.9023C163 55.8517 162.148 55 161.098 55H153.902C152.852 55 152 55.8517 152 56.9023V65H163V56.9023Z" fill="#102754"/>
    <path d="M75.1553 65.6231C75.6947 64.9108 76.5366 64.4923 77.4301 64.4923H167.998C168.911 64.4923 169.769 64.9293 170.306 65.6679L189.76 92.4275C190.081 92.8681 190.253 93.3988 190.253 93.9436C190.253 95.3676 189.099 96.5219 187.675 96.5219H122.298H56.9012C55.4888 96.5219 54.3438 95.3769 54.3438 93.9645C54.3438 93.4071 54.5259 92.8649 54.8624 92.4206L75.1553 65.6231Z" fill="#102754"/>
    <path d="M158.731 87.1152L87.9072 87.1152C85.2922 87.1151 83.7485 84.184 85.2275 82.0273L91.6143 72.7139C92.2203 71.8302 93.2234 71.3018 94.2949 71.3018L152.81 71.3018C153.921 71.3018 154.956 71.8705 155.553 72.8086L161.474 82.1211C162.849 84.2847 161.295 87.1151 158.731 87.1152Z" fill="white" stroke="white" strokeWidth="1.5"/>
    <rect x="150.474" y="81.6128" width="54.3441" height="4.11698" rx="2.05849" transform="rotate(-180 150.474 81.6128)" fill="#102754"/>
    <g clipPath="url(#clip0_house)">
      <path d="M105.533 82.5555L105.533 33.2928C105.533 30.5078 107.791 28.25 110.576 28.2499L136.617 28.2499C139.402 28.2499 141.66 30.5077 141.66 33.2928L141.66 82.5555L105.533 82.5555Z" fill="#156FBE" stroke="white" strokeWidth="1.5"/>
      <path d="M117.201 62.2789L119.357 61.2457C119.807 61.9645 120.376 62.526 121.064 62.9303C121.768 63.3346 122.524 63.5367 123.333 63.5367C124.097 63.5367 124.741 63.3271 125.265 62.9078C125.789 62.4886 126.051 61.8896 126.051 61.111C126.051 60.7067 125.976 60.3623 125.826 60.0778C125.676 59.7783 125.414 59.5087 125.04 59.2692C124.681 59.0296 124.329 58.8349 123.984 58.6852C123.64 58.5205 123.131 58.2959 122.457 58.0114C121.798 57.7268 121.237 57.4723 120.772 57.2477C118.766 56.2744 117.763 54.8219 117.763 52.8903C117.763 51.902 118.107 50.9661 118.796 50.0826C119.5 49.1842 120.533 48.6152 121.895 48.3756V46.4215H124.591V48.4205C125.459 48.5104 126.283 48.8772 127.062 49.5211C127.855 50.15 128.409 50.8239 128.724 51.5426L126.522 52.5983C125.669 51.3255 124.576 50.6891 123.243 50.6891C122.479 50.6891 121.858 50.8987 121.379 51.318C120.915 51.7373 120.683 52.2688 120.683 52.9127C120.683 53.1673 120.713 53.3994 120.772 53.609C120.832 53.8186 120.945 54.0133 121.109 54.193C121.274 54.3577 121.431 54.5074 121.581 54.6422C121.746 54.762 121.993 54.9043 122.322 55.069C122.652 55.2187 122.929 55.346 123.153 55.4508C123.378 55.5406 123.722 55.6829 124.187 55.8776C124.666 56.0722 125.055 56.2295 125.354 56.3492C127.795 57.3824 129.016 58.8873 129.016 60.8639C129.016 62.2115 128.604 63.3271 127.78 64.2106C126.972 65.0791 125.909 65.6331 124.591 65.8727V67.7145H121.895V65.8278C120.982 65.7379 120.076 65.3561 119.178 64.6823C118.279 63.9934 117.62 63.1923 117.201 62.2789Z" fill="#FAFAFA"/>
    </g>
    <path d="M69.151 134.374C67.4057 135.126 67.9434 137.73 69.8441 137.73H123.427C125.302 137.73 125.864 135.182 124.164 134.393L98.3465 122.416C97.8944 122.206 97.3744 122.199 96.9168 122.396L69.151 134.374Z" fill="#102754"/>
    <path d="M38.3695 117.265C38.5184 116.288 39.3585 115.567 40.3466 115.567H41.5051C42.4932 115.567 43.3333 116.288 43.4822 117.265L50.53 163.474C50.7146 164.684 49.7776 165.775 48.5528 165.775H33.2989C32.0741 165.775 31.1371 164.684 31.3217 163.474L38.3695 117.265Z" fill="#102754"/>
    <rect x="43.9561" y="182.223" width="5.19399" height="34.6266" rx="2.59699" transform="rotate(180 43.9561 182.223)" stroke="#102754" strokeWidth="1.5"/>
    <path d="M200.649 125.922C200.798 124.945 201.638 124.223 202.627 124.223H202.985C203.973 124.223 204.814 124.945 204.962 125.922L210.679 163.474C210.864 164.685 209.927 165.775 208.702 165.775H196.91C195.685 165.775 194.748 164.685 194.932 163.474L200.649 125.922Z" fill="#102754"/>
    <rect x="205.836" y="182.223" width="5.19399" height="34.6266" rx="2.59699" transform="rotate(180 205.836 182.223)" stroke="#102754" strokeWidth="1.5"/>
    <defs>
      <clipPath id="clip0_house">
        <rect width="54" height="59" fill="white" transform="translate(96 23)"/>
      </clipPath>
    </defs>
  </svg>
);

const HouseWithCheck = () => (
  <svg width="200" height="161" viewBox="0 0 144 116" fill="none">
    <path d="M17.5214 101.748C17.7577 101.569 18.0463 101.472 18.3431 101.472H139.965C141.267 101.472 141.823 103.125 140.787 103.912L126.479 114.78C126.242 114.959 125.954 115.057 125.657 115.057H4.03455C2.7332 115.057 2.17655 113.403 3.21286 112.616L17.5214 101.748Z" fill="#DEEFF9"/>
    <rect x="54.3438" y="47.8113" width="58.4151" height="58.4151" fill="#DEEFF9"/>
    <rect x="31" y="48" width="23" height="58" fill="white"/>
    <rect x="30.5664" y="47.8113" width="82.8679" height="58.4151" stroke="#102754" strokeWidth="2.03774"/>
    <rect width="9.99598" height="23.52" rx="0.679245" transform="matrix(1 0 0 -1 48.7969 103.711)" fill="#102754"/>
    <rect x="65.2109" y="104.189" width="4.07547" height="23.0943" rx="0.679245" transform="rotate(180 65.2109 104.189)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M57.0273 94.5062C57.0273 94.8813 56.7232 95.1854 56.3481 95.1854H51.2386C50.8635 95.1854 50.5594 94.8813 50.5594 94.5062V82.9287C50.5594 82.5536 50.8635 82.2495 51.2386 82.2495H56.3481C56.7232 82.2495 57.0273 82.5536 57.0273 82.9287V94.5062Z" fill="#FAFAFA"/>
    <rect x="69.9648" y="102.83" width="2.71698" height="25.1321" transform="rotate(180 69.9648 102.83)" fill="#102754"/>
    <rect x="40.7578" y="102.83" width="2.71698" height="25.1321" transform="rotate(180 40.7578 102.83)" fill="#102754"/>
    <rect x="46.8711" y="104.189" width="4.07547" height="23.0943" rx="0.679245" transform="rotate(180 46.8711 104.189)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <rect x="0.509434" y="-0.509434" width="16.6211" height="11.3291" rx="0.948532" transform="matrix(1 0 0 -1 84.7539 64.556)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <rect x="0.509434" y="-0.509434" width="22.5011" height="15.4451" rx="0.948532" transform="matrix(1 0 0 -1 81.8164 96.2245)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <rect width="39.9839" height="4.70399" rx="0.679245" transform="matrix(1 0 0 -1 34.0977 107.239)" fill="#102754"/>
    <rect x="24.1914" y="105.468" width="95.0789" height="2.79644" rx="1.39822" fill="#102754"/>
    <rect x="0.509434" y="-0.509434" width="7.21311" height="11.3291" rx="0.948532" transform="matrix(1 0 0 -1 41.2422 64.556)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <rect x="0.509434" y="-0.509434" width="7.80111" height="11.3291" rx="0.948532" transform="matrix(1 0 0 -1 59.4727 64.556)" fill="white" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M41.2422 56.7548H48.5935M60.2541 56.7548H67.6054M85.0755 56.7548H101.806" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M93.5742 56.9656V65.1976" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M93.5742 81.0735V97.2435" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M105.336 88.4235H82.404" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M42.6211 84.4039H46.8684M61.1325 84.1243H65.553" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M99.1719 23.2922C99.1719 22.5785 98.5934 22 97.8797 22H92.9923C92.2787 22 91.7002 22.5785 91.7002 23.2922V28.7925H99.1719V23.2922Z" fill="#102754"/>
    <path d="M39.5033 29.2157C39.8697 28.7319 40.4416 28.4476 41.0485 28.4476H102.566C103.186 28.4476 103.769 28.7445 104.134 29.2461L117.348 47.4225C117.566 47.7217 117.683 48.0823 117.683 48.4523C117.683 49.4195 116.899 50.2036 115.932 50.2036H71.5251H27.1043C26.1449 50.2036 25.3672 49.4259 25.3672 48.4665C25.3672 48.0879 25.4909 47.7196 25.7195 47.4178L39.5033 29.2157Z" fill="#102754"/>
    <path d="M35.4264 75.9142C34.2409 76.4256 34.6062 78.1943 35.8972 78.1943H72.2934C73.5667 78.1943 73.9487 76.4632 72.7936 75.9274L55.2573 67.7918C54.9503 67.6493 54.597 67.6445 54.2862 67.7786L35.4264 75.9142Z" fill="#102754"/>
    <path d="M14.5178 64.2932C14.619 63.6297 15.1895 63.1395 15.8607 63.1395H16.6476C17.3188 63.1395 17.8894 63.6297 17.9906 64.2932L22.7777 95.6801C22.9032 96.5025 22.2667 97.2435 21.4348 97.2435H11.0736C10.2417 97.2435 9.6052 96.5025 9.73062 95.6801L14.5178 64.2932Z" fill="#102754"/>
    <rect x="18.3125" y="108.415" width="3.52799" height="23.52" rx="1.764" transform="rotate(180 18.3125 108.415)" stroke="#102754" strokeWidth="1.01887"/>
    <path d="M124.746 70.1734C124.847 69.5098 125.418 69.0194 126.089 69.0194H126.333C127.004 69.0194 127.575 69.5098 127.676 70.1734L131.559 95.6804C131.684 96.5027 131.048 97.2434 130.216 97.2434H122.206C121.374 97.2434 120.738 96.5027 120.863 95.6804L124.746 70.1734Z" fill="#102754"/>
    <rect x="128.27" y="108.415" width="3.52799" height="23.52" rx="1.764" transform="rotate(180 128.27 108.415)" stroke="#102754" strokeWidth="1.01887"/>
    <circle cx="71.5" cy="22.5" r="21" fill="white" stroke="#DEEFF9" strokeWidth="3"/>
    <path d="M78.628 17.539V19.9043C78.628 20.7473 77.9124 21.4316 77.0306 21.4316C76.1478 21.4316 75.4332 20.7473 75.4332 19.9043V17.539C75.4332 15.6176 73.7986 14.0546 71.7891 14.0546V11C75.56 11 78.628 13.9335 78.628 17.539Z" fill="#156FBE"/>
    <path d="M64.9326 17.539V19.9043C64.9326 20.7473 65.6482 21.4316 66.53 21.4316C67.4128 21.4316 68.1274 20.7473 68.1274 19.9043V17.539C68.1274 15.6176 69.762 14.0546 71.7716 14.0546L73.0273 12.621L71.7716 11C68.0006 11 64.9326 13.9335 64.9326 17.539Z" fill="#156FBE"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M80.5792 29.9044V21.1579C80.5792 19.6225 79.2736 18.3741 77.6677 18.3741H71.7893V18.3765H65.9115C64.3056 18.3765 63 19.6248 63 21.1603V29.9067C63 31.4422 64.3056 32.6905 65.9115 32.6905H71.7899L71.7908 32.6882H77.6677C79.2736 32.6882 80.5792 31.4398 80.5792 29.9044Z" fill="#156FBE"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M72.0892 23.29C72.8275 23.4244 73.3862 24.0445 73.3862 24.7904V26.2749C73.3862 27.119 72.6706 27.8023 71.7888 27.8023C70.907 27.8023 70.1914 27.119 70.1914 26.2749V24.7904C70.1914 23.9465 70.9067 23.2634 71.7881 23.2631V23.2629C71.891 23.2629 71.9917 23.2722 72.0892 23.29Z" fill="#102754"/>
  </svg>
);

const HouseWithWarning = () => (
  <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
    <ellipse cx="35" cy="130" rx="10" ry="35" fill={colors.darkBlue}/>
    <ellipse cx="165" cy="130" rx="10" ry="35" fill={colors.darkBlue}/>
    <rect x="55" y="65" width="90" height="75" fill={colors.lightestBlue} stroke={colors.darkBlue} strokeWidth="2"/>
    <polygon points="45,65 100,20 155,65" fill={colors.darkBlue}/>
    <rect x="80" y="100" width="40" height="40" fill={colors.darkBlue} rx="2"/>
    <circle cx="100" cy="118" r="3" fill={colors.orange}/>
    <rect x="62" y="75" width="22" height="18" fill="white" stroke={colors.darkBlue} strokeWidth="2" rx="2"/>
    <rect x="116" y="75" width="22" height="18" fill="white" stroke={colors.darkBlue} strokeWidth="2" rx="2"/>
    <circle cx="155" cy="35" r="25" fill={colors.orange}/>
    <path d="M155 25V38M155 43H155.01" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const HouseWithX = () => (
  <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
    <ellipse cx="35" cy="130" rx="10" ry="35" fill={colors.darkBlue}/>
    <ellipse cx="165" cy="130" rx="10" ry="35" fill={colors.darkBlue}/>
    <rect x="55" y="65" width="90" height="75" fill={colors.lightestBlue} stroke={colors.darkBlue} strokeWidth="2"/>
    <polygon points="45,65 100,20 155,65" fill={colors.darkBlue}/>
    <rect x="80" y="100" width="40" height="40" fill={colors.darkBlue} rx="2"/>
    <circle cx="100" cy="118" r="3" fill={colors.orange}/>
    <rect x="62" y="75" width="22" height="18" fill="white" stroke={colors.darkBlue} strokeWidth="2" rx="2"/>
    <rect x="116" y="75" width="22" height="18" fill="white" stroke={colors.darkBlue} strokeWidth="2" rx="2"/>
    <circle cx="155" cy="35" r="25" fill={colors.red}/>
    <path d="M147 27L163 43M163 27L147 43" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Legacy TitleCompanyLogo kept for reference — screens now use CoBrandedHeader instead

const CertifIDBranding = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', paddingBottom: '100px' }}>
    <span style={{ fontFamily: fonts.nunitoSans, fontWeight: 700, fontSize: '8px', color: colors.darkBlue }}>SECURED BY</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.blue}><circle cx="12" cy="12" r="10"/><path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none"/></svg>
      <span style={{ fontFamily: fonts.nunitoSans, fontWeight: 700, fontSize: '14px', color: colors.darkBlue }}>CERTIFID</span>
    </div>
  </div>
);

// Spinner component
const Spinner = ({ size = 100 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    border: `4px solid ${colors.grey}`, borderTopColor: colors.blue,
    animation: 'spin 1s linear infinite',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill={colors.blue}>
      <circle cx="12" cy="12" r="10"/><path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  </div>
);

// ============================================
// SCREEN: Payment Intent (Buyer-Initiated Only)
// ============================================
const PaymentIntentScreen = ({ onNext, onBack }) => {
  const [purpose, setPurpose] = useState(null);
  const [closingDate, setClosingDate] = useState('');
  const [amount, setAmount] = useState('');

  const Option = ({ id, label, desc, selected }) => (
    <div onClick={() => setPurpose(id)} style={{
      padding: '16px', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer',
      border: `2px solid ${selected ? colors.blue : colors.grey}`,
      background: selected ? colors.lightestBlue : colors.white,
      display: 'flex', alignItems: 'center', gap: '12px',
    }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%',
        border: selected ? 'none' : `2px solid ${colors.darkGrey}`,
        background: selected ? colors.blue : colors.white,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>}
      </div>
      <div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: 0 }}>{label}</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <div style={{ padding: '24px 32px 120px' }}>
        <BackButton onClick={onBack} />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.3, color: colors.darkBlue, margin: '16px 0 8px' }}>What are you paying for?</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px' }}>
          Select your payment type and enter your details.
        </p>
        <Option id="emd" label="Earnest Money Deposit" desc="Initial deposit to show good faith" selected={purpose === 'emd'} />
        <Option id="c2c" label="Cash to Close" desc="Final payment due at closing" selected={purpose === 'c2c'} />
        <Option id="other" label="Other" desc="Other payment type" selected={purpose === 'other'} />

        {purpose === 'c2c' && (
          <div style={{ marginTop: '20px' }}>
            <TextField label="Closing date" placeholder="MM/DD/YYYY" value={closingDate} onChange={setClosingDate} type="date" />
            <TextField label="Payment amount" placeholder="0.00" value={amount} onChange={setAmount} prefix="$" />
            <InfoBox>You can find these details in your Closing Disclosure or by contacting your title company.</InfoBox>
          </div>
        )}

        <PrimaryButton onClick={onNext} disabled={!purpose || (purpose === 'c2c' && (!closingDate || !amount))}>
          {purpose === 'c2c' ? 'Check Eligibility' : 'Continue'}
        </PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Landing Page
// ============================================
const PaymentRequestScreen = ({ onNext, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={0} customLogo={customLogo} />
    <div style={{ display: 'flex', justifyContent: 'center', margin: '70px auto 20px' }}><HouseWithClock /></div>
    <div style={{ padding: '0 32px' }}>
      <Badge>Cash to Close</Badge>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '32px', lineHeight: 1.2, color: colors.darkBlue, margin: '12px 0 8px' }}>
        ${requestData.paymentAmount.toLocaleString()}.00
      </p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 20px' }}>
        {requestData.titleCompany} has requested your Cash to Close payment for:
      </p>
      <div style={{ background: colors.lightestGrey, borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke={colors.mediumEmphasis} strokeWidth="2"/><path d="M9 22V12H15V22" stroke={colors.mediumEmphasis} strokeWidth="2"/></svg>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>Property</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '4px 0 0' }}>{requestData.propertyAddress}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><rect x="3" y="4" width="18" height="18" rx="2" stroke={colors.mediumEmphasis} strokeWidth="2"/><path d="M16 2V6M8 2V6M3 10H21" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round"/></svg>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>Closing</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '4px 0 0' }}>{requestData.closingDate}</p>
          </div>
        </div>
      </div>
      <DeliveryBanner date={requestData.deliveryDate} time={requestData.deliveryTime} />
      <PrimaryButton onClick={onNext}>Continue to Payment</PrimaryButton>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '12px', lineHeight: 1.5, color: colors.mediumEmphasis, textAlign: 'center', margin: '24px 0' }}>
        By continuing, you agree to our <span style={{ textDecoration: 'underline' }}>Terms of Use</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
      </p>
      <CertifIDBranding />
    </div>
  </div>
);

// ============================================
// SCREEN: Ineligible Landing Page (closing date too soon for digital)
// ============================================
const IneligibleLandingScreen = ({ onNext, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={0} customLogo={customLogo} />
    <div style={{ display: 'flex', justifyContent: 'center', margin: '70px auto 20px' }}><HouseWithClock /></div>
    <div style={{ padding: '0 32px' }}>
      <Badge>Cash to Close</Badge>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '32px', lineHeight: 1.2, color: colors.darkBlue, margin: '12px 0 8px' }}>
        ${requestData.paymentAmount.toLocaleString()}.00
      </p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 20px' }}>
        {requestData.titleCompany} has requested your Cash to Close payment for:
      </p>
      <div style={{ background: colors.lightestGrey, borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke={colors.mediumEmphasis} strokeWidth="2"/><path d="M9 22V12H15V22" stroke={colors.mediumEmphasis} strokeWidth="2"/></svg>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>Property</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '4px 0 0' }}>{requestData.propertyAddress}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><rect x="3" y="4" width="18" height="18" rx="2" stroke={colors.mediumEmphasis} strokeWidth="2"/><path d="M16 2V6M8 2V6M3 10H21" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round"/></svg>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>Closing</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '4px 0 0' }}>{requestData.closingDate}</p>
          </div>
        </div>
      </div>
      <PrimaryButton onClick={onNext}>Continue to Payment</PrimaryButton>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '12px', lineHeight: 1.5, color: colors.mediumEmphasis, textAlign: 'center', margin: '24px 0' }}>
        By continuing, you agree to our <span style={{ textDecoration: 'underline' }}>Terms of Use</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
      </p>
      <CertifIDBranding />
    </div>
  </div>
);

// ============================================
// SCREEN: Ineligible Payment Method (digital disabled)
// ============================================
const IneligiblePaymentMethodScreen = ({ onNext, onBack, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={20} onBack={onBack} customLogo={customLogo} />
    <div style={{ padding: '75px 32px 120px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 12px' }}>
          Choose payment method
        </p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '15px', lineHeight: 1.6, color: colors.mediumEmphasis, margin: 0 }}>
          Select how you'd like to pay your Cash to Close.
        </p>
      </div>

      {/* Ineligibility explanation */}
      <div style={{
        background: '#FEF3C7', borderRadius: '8px', padding: '14px 16px', marginBottom: '16px',
        display: 'flex', alignItems: 'flex-start', gap: '10px', border: '1px solid #FDE68A',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
          <path d="M12 9V13M12 17H12.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: fonts.oxygen, fontSize: '13px', lineHeight: 1.5, color: '#92400E', margin: 0 }}>
          Digital payments require at least 3 business days to process and arrive before closing. Wire transfer is available as an alternative.
        </p>
      </div>

      {/* Digital Payment — Disabled (simplified) */}
      <div style={{
        borderRadius: '12px', marginBottom: '16px', padding: '16px 20px',
        border: `2px solid ${colors.grey}`, opacity: 0.45, cursor: 'not-allowed',
        background: colors.lightestGrey,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: 0 }}>Pay digitally</p>
              <Badge variant="grey">Unavailable</Badge>
            </div>
            <p style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.lowEmphasis, margin: 0 }}>${DIGITAL_FEE} flat fee</p>
          </div>
        </div>
      </div>

      {/* Wire Transfer — Pre-selected */}
      <div style={{
        padding: '20px', borderRadius: '12px', marginBottom: '24px', position: 'relative',
        border: `2px solid ${colors.blue}`, background: colors.lightestBlue,
      }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '24px', height: '24px', borderRadius: '50%', background: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
        </div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '18px', color: colors.darkBlue, margin: '0 0 4px' }}>Download wire instructions</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '0 0 8px' }}>
          <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '22px', color: colors.mediumEmphasis }}>~${WIRE_FEE}</span>
          <span style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.lowEmphasis }}>typical fee paid through your bank</span>
        </div>
        <p style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.mediumEmphasis, margin: '0 0 12px', lineHeight: 1.5 }}>
          You'll download verified wire instructions. You enter the details at your bank and verify everything manually.
        </p>
        <div style={{ background: colors.lightestGrey, borderRadius: '6px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '12px', color: colors.highEmphasis, margin: 0 }}>+ Optional wire insurance</p>
            <p style={{ fontFamily: fonts.oxygen, fontSize: '11px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>Total with coverage: ~${WIRE_FEE + 48}</p>
          </div>
        </div>
      </div>

      <PrimaryButton onClick={onNext}>Get Wire Instructions</PrimaryButton>
    </div>
  </div>
);

// ============================================
// SCREEN: Phone Verification
// ============================================
const PhoneVerifyScreen = ({ onNext, onBack, phoneNumber }) => (
  <div style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box' }}>
    <div style={{ padding: '24px 32px' }}>
      <BackButton onClick={onBack} />
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.5, color: colors.darkBlue, margin: '16px 0' }}>Verify it's you</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
        We'll send a one-time code to verify your identity.
      </p>
      <div style={{ padding: '16px', background: colors.lightestGrey, borderRadius: '8px', marginBottom: '24px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: 0 }}>Phone number on file</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '18px', color: colors.highEmphasis, margin: '4px 0 0' }}>{maskPhone(phoneNumber)}</p>
      </div>
      <PrimaryButton onClick={onNext}>Send Code</PrimaryButton>
      <TextLink onClick={() => {}}>Use a different phone number</TextLink>
    </div>
  </div>
);

// ============================================
// SCREEN: Code Entry
// ============================================
const CodeEntryScreen = ({ onNext, onBack, phoneNumber }) => {
  const code = ['9', '1', '3', '7', '2', '1'];
  return (
    <div style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 32px' }}>
        <BackButton onClick={onBack} />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.5, color: colors.darkBlue, margin: '16px 0' }}>Enter verification code</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: 0 }}>Enter the code we sent to</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', lineHeight: 1.5, color: colors.highEmphasis, margin: '0 0 24px' }}>{maskPhone(phoneNumber)}</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {code.map((digit, i) => (
            <div key={i} style={{
              width: '46px', height: '60px', borderRadius: '6px', border: `1px solid ${colors.darkGrey}`,
              fontSize: '32px', fontWeight: 400, fontFamily: fonts.oxygen,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.highEmphasis,
            }}>{digit}</div>
          ))}
        </div>
        <TextLink onClick={() => {}}>Resend code</TextLink>
        <SecondaryButton onClick={() => {}}>Receive a Call Instead</SecondaryButton>
        <div style={{ marginTop: '12px' }} />
        <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Payment Method Selection
// ============================================
const DIGITAL_FEE = 48;
const WIRE_FEE = 35;

const ShieldCheck = ({ size = 18, color = colors.darkGreen }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color}/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarCheck = ({ size = 18, color = colors.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 16L11 18L15 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DirectConnectionIcon = ({ size = 18, color = colors.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaymentMethodScreen = ({ onNext, onBack, selectedMethod, setSelectedMethod, customLogo }) => {
  const delta = DIGITAL_FEE - WIRE_FEE;
  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <CoBrandedHeader mode="progress" progress={20} onBack={onBack} customLogo={customLogo} />
      <div style={{ padding: '75px 32px 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 12px' }}>
            Choose payment method
          </p>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '15px', lineHeight: 1.6, color: colors.mediumEmphasis, margin: 0 }}>
            Select how you'd like to pay your Cash to Close.
          </p>
        </div>

        {/* Digital Payment */}
        <div onClick={() => setSelectedMethod('digital')} style={{
          borderRadius: '12px', marginBottom: '16px', cursor: 'pointer', overflow: 'hidden', position: 'relative',
          border: `2px solid ${selectedMethod === 'digital' ? colors.blue : colors.grey}`,
        }}>
          {selectedMethod === 'digital' && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', width: '24px', height: '24px', borderRadius: '50%', background: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
          )}
          {/* Dark header */}
          <div style={{ background: colors.darkBlue, padding: '20px 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Badge variant="green">Recommended</Badge>
            </div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '20px', color: colors.white, margin: '0 0 4px' }}>Pay digitally</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              No numbers to enter. No instructions to verify.
            </p>
          </div>
          {/* Light body */}
          <div style={{ padding: '16px 20px 20px', background: selectedMethod === 'digital' ? colors.lightestBlue : colors.white }}>
            {[
              { icon: <ShieldCheck />, label: 'Fully insured', desc: 'Full amount protected if anything goes wrong' },
              { icon: <CalendarCheck />, label: `Arrives ${requestData.deliveryDate}`, desc: `Guaranteed by ${requestData.deliveryTime}` },
              { icon: <DirectConnectionIcon />, label: 'Direct connection', desc: `Funds go straight to ${requestData.titleCompany}` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: i < 2 ? '12px' : 0 }}>
                <div style={{ marginTop: '2px' }}>{item.icon}</div>
                <div>
                  <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>{item.label}</p>
                  <p style={{ fontFamily: fonts.oxygen, fontSize: '12px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ height: '1px', background: colors.grey, margin: '16px 0 12px' }} />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '22px', color: colors.blue }}>${DIGITAL_FEE}</span>
                <span style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.mediumEmphasis, marginLeft: '6px' }}>flat fee</span>
              </div>
              <span style={{ fontFamily: fonts.oxygen, fontSize: '12px', color: colors.lowEmphasis }}>${delta} more than wire</span>
            </div>
            <p style={{ fontFamily: fonts.oxygen, fontSize: '11px', color: colors.blue, margin: '4px 0 0' }}>Same price no matter the amount</p>
          </div>
        </div>

        {/* Wire Transfer */}
        <div onClick={() => setSelectedMethod('wire')} style={{
          padding: '20px', borderRadius: '12px', marginBottom: '24px', cursor: 'pointer', position: 'relative',
          border: `2px solid ${selectedMethod === 'wire' ? colors.blue : colors.grey}`,
          background: selectedMethod === 'wire' ? colors.lightestBlue : colors.white,
        }}>
          {selectedMethod === 'wire' && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', width: '24px', height: '24px', borderRadius: '50%', background: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
          )}
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '18px', color: colors.darkBlue, margin: '0 0 4px' }}>Download wire instructions</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '0 0 8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '22px', color: colors.mediumEmphasis }}>~${WIRE_FEE}</span>
            <span style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.lowEmphasis }}>typical fee paid through your bank</span>
          </div>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.mediumEmphasis, margin: '0 0 12px', lineHeight: 1.5 }}>
            You'll download verified wire instructions. You enter the details at your bank and verify everything manually.
          </p>
          <div style={{ background: colors.lightestGrey, borderRadius: '6px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '12px', color: colors.highEmphasis, margin: 0 }}>+ Optional wire insurance</p>
              <p style={{ fontFamily: fonts.oxygen, fontSize: '11px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>Total with coverage: ~${WIRE_FEE + 48}</p>
            </div>
          </div>
        </div>

        <PrimaryButton onClick={onNext} disabled={!selectedMethod}>
          {selectedMethod === 'wire' ? 'Get Wire Instructions' : 'Continue with Digital Payment'}
        </PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: KYC - Identity Verification (New Users)
// ============================================
const KYCScreen = ({ onNext, onBack, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={35} onBack={onBack} customLogo={customLogo} />
    <div style={{ padding: '75px 32px 120px' }}>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Verify your identity</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 20px' }}>
        Required by federal law to prevent fraud. Your data is encrypted.
      </p>
      <InfoBox>This information is verified against public records. It is never shared with your title company.</InfoBox>
      <TextField label="Legal first name" placeholder="As it appears on your ID" value="Sarah" onChange={() => {}} />
      <TextField label="Legal last name" placeholder="As it appears on your ID" value="Johnson" onChange={() => {}} />
      <TextField label="Email address" placeholder="your@email.com" value="sarah.johnson@gmail.com" onChange={() => {}} />
      <TextField label="Date of birth" placeholder="MM/DD/YYYY" value="03/15/1988" onChange={() => {}} />
      <TextField label="Last 4 digits of SSN" placeholder="••••" value="4521" onChange={() => {}} />
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.mediumEmphasis, margin: '8px 0 12px' }}>Current home address</p>
      <TextField label="Street address" placeholder="123 Main St" value="456 Oak Lane" onChange={() => {}} />
      <TextField label="City" placeholder="City" value="Austin" onChange={() => {}} />
      <div style={{ display: 'flex', gap: '12px', width: '326px' }}>
        <div style={{ flex: 1 }}><TextField label="State" placeholder="State" value="TX" onChange={() => {}} /></div>
        <div style={{ flex: 1 }}><TextField label="ZIP" placeholder="00000" value="78732" onChange={() => {}} /></div>
      </div>
      <PrimaryButton onClick={onNext}>Verify Identity</PrimaryButton>
    </div>
  </div>
);

// ============================================
// SCREEN: KYC Verifying (Loading)
// ============================================
const KYCVerifyingScreen = ({ onNext }) => {
  useEffect(() => { const t = setTimeout(onNext, 2200); return () => clearTimeout(t); }, [onNext]);
  return (
    <div style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '200px' }}>
        <Spinner />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '20px', color: colors.darkBlue, marginTop: '32px' }}>Verifying your identity...</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, marginTop: '8px' }}>This only takes a moment</p>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ============================================
// SCREEN: KYC Failed
// ============================================
const KYCFailedScreen = ({ onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ marginTop: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}><HouseWithX /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Identity could not be verified</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        We were unable to verify your identity based on the information provided. This can happen if the information doesn't match public records.
      </p>
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <InfoBox variant="orange">Contact {requestData.titleCompany} for assistance, or use wire instructions to complete your payment.</InfoBox>
      </div>
      <SecondaryButton onClick={() => {}}>Contact {requestData.titleCompany}</SecondaryButton>
      <div style={{ marginTop: '12px' }}><PrimaryButton onClick={onWire}>Get Wire Instructions</PrimaryButton></div>
    </div>
  </div>
);

// ============================================
// SCREEN: Bank Connection (Plaid - New Users)
// ============================================
const PlaidBankConnectionScreen = ({ onNext, onBack, customLogo }) => {
  const [connected, setConnected] = useState(false);
  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <CoBrandedHeader mode="progress" progress={50} onBack={onBack} customLogo={customLogo} />
      <div style={{ padding: '75px 32px 120px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Connect your bank</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
          Securely link your checking account to make your payment.
        </p>
        {!connected ? (
          <>
            <div onClick={() => setConnected(true)} style={{
              padding: '20px', borderRadius: '12px', border: `1px solid ${colors.darkGrey}`, cursor: 'pointer', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '48px', height: '48px', background: colors.highEmphasis, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/>
                  <circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
                  <circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: 0 }}>Connect with Plaid</p>
                <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>Secure bank connection</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <InfoBox><strong>Your credentials are never shared.</strong> Plaid uses bank-level encryption. Only checking accounts can be used.</InfoBox>
          </>
        ) : (
          <>
            <div style={{
              padding: '16px', borderRadius: '8px', border: `2px solid ${colors.green}`, background: colors.lightGreen,
              marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>C</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: 0 }}>Chase Checking **1038</p>
                <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '2px 0 0' }}>Balance: $52,400</p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.green}><circle cx="12" cy="12" r="10"/><path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none"/></svg>
            </div>
            <TextLink onClick={() => setConnected(false)}>Use a different account</TextLink>
          </>
        )}
        <PrimaryButton onClick={onNext} disabled={!connected}>Continue</PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Plaid Connection Failed
// ============================================
const PlaidFailedScreen = ({ onRetry, onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ marginTop: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}><HouseWithX /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Bank connection failed</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        We couldn't connect to your bank. This can happen if the bank is temporarily unavailable or if the connection was cancelled.
      </p>
      <PrimaryButton onClick={onRetry}>Try Again</PrimaryButton>
      <div style={{ marginTop: '12px' }}><SecondaryButton onClick={onWire}>Get Wire Instructions Instead</SecondaryButton></div>
    </div>
  </div>
);

// ============================================
// SCREEN: Bank Account Selection (Returning User)
// ============================================
const BankAccountScreen = ({ onNext, onBack, useExisting, setUseExisting, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={50} onBack={onBack} customLogo={customLogo} />
    <div style={{ padding: '75px 32px 120px' }}>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Select bank account</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
        Choose which account to use for your payment.
      </p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.mediumEmphasis, margin: '0 0 12px' }}>Previously used</p>
      <div onClick={() => setUseExisting(true)} style={{
        padding: '16px', borderRadius: '8px', marginBottom: '16px', cursor: 'pointer',
        border: `2px solid ${useExisting ? colors.blue : colors.grey}`,
        background: useExisting ? colors.lightestBlue : colors.white,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>C</span>
          </div>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: 0 }}>{requestData.existingBank.name} {requestData.existingBank.type} **{requestData.existingBank.last4}</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '4px 0 0' }}>Balance: ${requestData.existingBank.balance.toLocaleString()}</p>
          </div>
        </div>
        {useExisting && (
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
          </div>
        )}
      </div>
      <div onClick={() => setUseExisting(false)} style={{
        padding: '16px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer',
        border: `2px solid ${!useExisting ? colors.blue : colors.grey}`,
        background: !useExisting ? colors.lightestBlue : colors.white,
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: colors.lightestGrey, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={colors.mediumEmphasis} strokeWidth="2"/><path d="M12 8V16M8 12H16" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.blue, margin: 0 }}>Connect a different bank account</p>
      </div>
      <InfoBox><strong>Important:</strong> Please use a checking account. Savings accounts may cause payment delays.</InfoBox>
      <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
    </div>
  </div>
);

// ============================================
// SCREEN: Eligibility Check (Loading)
// ============================================
const EligibilityCheckScreen = ({ onNext }) => {
  const [checks, setChecks] = useState([false, false, false]);
  useEffect(() => {
    const t1 = setTimeout(() => setChecks([true, false, false]), 800);
    const t2 = setTimeout(() => setChecks([true, true, false]), 1600);
    const t3 = setTimeout(() => setChecks([true, true, true]), 2400);
    const t4 = setTimeout(onNext, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onNext]);

  const items = ['Closing date allows delivery', 'Amount within transfer limits', 'Account balance verified'];
  return (
    <div style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '180px' }}>
        <Spinner />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '20px', color: colors.darkBlue, marginTop: '32px', textAlign: 'center' }}>Checking eligibility...</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, marginTop: '8px', textAlign: 'center' }}>Verifying your payment can be processed</p>
        <div style={{ marginTop: '40px', padding: '0 40px', width: '100%', boxSizing: 'border-box' }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
              opacity: checks[i] ? 1 : 0.3, transition: 'opacity 0.4s ease',
            }}>
              {checks[i] ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill={colors.green}><circle cx="12" cy="12" r="10"/><path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" fill="none"/></svg>
              ) : (
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${colors.darkGrey}` }} />
              )}
              <span style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.highEmphasis }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ============================================
// ERROR SCREENS: Eligibility Failures
// ============================================
const ClosingTooSoonScreen = ({ onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithWarning /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Closing date too soon</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        Digital payments require at least 2 business days for delivery. Your closing date doesn't allow enough time.
      </p>
      <div style={{ textAlign: 'left' }}>
        <InfoBox variant="orange">Use our secure wire instructions to complete your payment through your bank.</InfoBox>
      </div>
      <PrimaryButton onClick={onWire}>Get Wire Instructions</PrimaryButton>
      <TextLink onClick={() => {}}>Contact Support</TextLink>
    </div>
  </div>
);

const OverTransferLimitScreen = ({ onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithWarning /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Amount exceeds limit</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        Your payment amount exceeds the $500,000 transfer limit. Please contact {requestData.titleCompany} for assistance.
      </p>
      <PrimaryButton onClick={onWire}>Get Wire Instructions</PrimaryButton>
      <TextLink onClick={() => {}}>Contact {requestData.titleCompany}</TextLink>
    </div>
  </div>
);

const InsufficientFundsScreen = ({ onRetry, onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithX /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Insufficient funds</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        Your account balance is lower than the required payment amount.
      </p>
      <div style={{ background: colors.lightestGrey, borderRadius: '8px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.mediumEmphasis }}>Payment required</span>
          <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.highEmphasis }}>$47,548.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.mediumEmphasis }}>Available balance</span>
          <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.red }}>$12,500.00</span>
        </div>
      </div>
      <PrimaryButton onClick={onRetry}>Try Different Account</PrimaryButton>
      <div style={{ marginTop: '12px' }}><SecondaryButton onClick={onWire}>Get Wire Instructions</SecondaryButton></div>
    </div>
  </div>
);

const BalanceUnavailableScreen = ({ onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithWarning /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Unable to verify balance</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        We couldn't verify your account balance. Balance verification is required for digital payments of this size.
      </p>
      <PrimaryButton onClick={onWire}>Get Wire Instructions</PrimaryButton>
      <TextLink onClick={() => {}}>Contact Support</TextLink>
    </div>
  </div>
);

const SavingsAccountScreen = ({ onRetry, onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithWarning /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Checking account required</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        The account you selected is a savings account. Only checking accounts can be used for this payment.
      </p>
      <div style={{ background: colors.lightRed, border: `1px solid #fecaca`, borderRadius: '8px', padding: '14px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.red}><circle cx="12" cy="12" r="10"/><path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.red, margin: 0 }}>Chase Savings **4521</p>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.red, margin: '2px 0 0' }}>Cannot be used</p>
        </div>
      </div>
      <PrimaryButton onClick={onRetry}>Connect Checking Account</PrimaryButton>
      <div style={{ marginTop: '12px' }}><SecondaryButton onClick={onWire}>Get Wire Instructions Instead</SecondaryButton></div>
    </div>
  </div>
);

// ============================================
// SCREEN: 3pm Cutoff — Delivery Date Changed
// ============================================
const CutoffAlertScreen = ({ onAccept, onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithClock /></div>
      <Badge variant="orange">Delivery date changed</Badge>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '12px 0 8px' }}>Your delivery date has been updated</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        Payments submitted after 3:00 PM ET arrive the next business day.
      </p>
      <div style={{ background: colors.lightestGrey, borderRadius: '8px', padding: '16px', marginBottom: '16px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.mediumEmphasis }}>Was</span>
          <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.lowEmphasis, textDecoration: 'line-through' }}>Mon, Feb 2 by 9:00 AM</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.mediumEmphasis }}>Now</span>
          <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.blue }}>Tue, Feb 3 by 9:00 AM</span>
        </div>
      </div>
      <InfoBox>Your closing is on {requestData.closingDate}. The updated delivery still arrives before closing.</InfoBox>
      <PrimaryButton onClick={onAccept}>Accept New Delivery Date</PrimaryButton>
      <div style={{ marginTop: '12px' }}><SecondaryButton onClick={onWire}>Use wire instructions instead</SecondaryButton></div>
    </div>
  </div>
);

// ============================================
// SCREEN: Review Payment
// ============================================
const ReviewPaymentScreen = ({ onNext, onBack, checkboxChecked, setCheckboxChecked, customLogo }) => {
  const totalAmount = requestData.paymentAmount + 48;
  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <CoBrandedHeader mode="progress" progress={75} onBack={onBack} customLogo={customLogo} />
      <div style={{ padding: '75px 24px 120px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1, color: colors.darkBlue, margin: '0 0 24px 8px' }}>Review payment</p>
        <DeliveryBanner date={requestData.deliveryDate} time={requestData.deliveryTime} />
        <div style={{ width: '342px', background: colors.white, borderRadius: '12px', border: `1px solid ${colors.grey}`, padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <Badge>Cash to Close</Badge>
          </div>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '32px', lineHeight: 1.2, color: colors.darkBlue, margin: '0 0 16px' }}>${requestData.paymentAmount.toLocaleString()}.00</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {[
              { icon: 'M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z', text: requestData.propertyAddress },
              { icon: 'M2 5h20v14H2zM2 10h20', text: `${requestData.existingBank.name} - ${requestData.existingBank.type} **${requestData.existingBank.last4}` },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18', text: requestData.office },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><path d={item.icon} stroke={colors.lowEmphasis} strokeWidth="2"/></svg>
                <p style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.highEmphasis, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: colors.grey, margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.mediumEmphasis }}>Payment amount</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.highEmphasis }}>${requestData.paymentAmount.toLocaleString()}.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontSize: '15px', color: colors.mediumEmphasis }}>Transfer fee</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.highEmphasis }}>$48.00</span>
          </div>
          <div style={{ height: '1px', background: colors.grey, margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis }}>Total</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.darkBlue }}>${totalAmount.toLocaleString()}.00</span>
          </div>
        </div>
        <div style={{ marginTop: '24px', marginLeft: '8px' }}>
          <Checkbox checked={checkboxChecked} onChange={setCheckboxChecked}
            label={`I confirm I have at least $${totalAmount.toLocaleString()} available in my account ending in **${requestData.existingBank.last4}`}
          />
        </div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '20px 8px', width: '326px' }}>
          By clicking "Pay Now", you authorize CertifID to debit your account for the total amount. You agree to our{' '}
          <span style={{ color: colors.blue, textDecoration: 'underline' }}>Terms of Service</span> and{' '}
          <span style={{ color: colors.blue, textDecoration: 'underline' }}>Privacy Policy</span>.
        </p>
        <div style={{ marginLeft: '8px' }}>
          <PrimaryButton onClick={onNext} disabled={!checkboxChecked}>Pay ${totalAmount.toLocaleString()} Now</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Processing
// ============================================
const ProcessingScreen = ({ onNext }) => {
  useEffect(() => { const t = setTimeout(onNext, 2500); return () => clearTimeout(t); }, [onNext]);
  return (
    <div style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '200px' }}>
        <Spinner />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '20px', color: colors.darkBlue, marginTop: '32px', textAlign: 'center' }}>Processing your payment...</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, marginTop: '8px', textAlign: 'center' }}>This may take a moment</p>
      </div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ============================================
// SCREEN: Payment Failed
// ============================================
const PaymentFailedScreen = ({ onRetry, onDifferentAccount, onWire, onBack }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <div style={{ padding: '24px 32px 120px', textAlign: 'center' }}>
      <div style={{ textAlign: 'left' }}><BackButton onClick={onBack} /></div>
      <div style={{ margin: '20px 0 24px', display: 'flex', justifyContent: 'center' }}><HouseWithX /></div>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', color: colors.darkBlue, margin: '0 0 8px' }}>Payment could not be processed</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', color: colors.mediumEmphasis, margin: '0 0 24px', lineHeight: 1.5 }}>
        Something went wrong while processing your payment. Your account has not been charged.
      </p>
      <PrimaryButton onClick={onRetry}>Try Again</PrimaryButton>
      <div style={{ marginTop: '12px' }}><SecondaryButton onClick={onDifferentAccount}>Try Different Account</SecondaryButton></div>
      <TextLink onClick={onWire}>Get wire instructions instead</TextLink>
    </div>
  </div>
);

// ============================================
// SCREEN: Success
// ============================================
const SuccessScreen = ({ onShowShare }) => {
  const totalAmount = requestData.paymentAmount + 48;
  const transactionId = '8f2c4a91-7e3d-4b5f-9c1a-2d6e8f0a3b5c';
  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <div style={{ padding: '30px 32px 120px', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><HouseWithCheck /></div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 12px' }}>Payment submitted to {requestData.titleCompany}!</p>
        <DeliveryBanner date={requestData.deliveryDate} time={requestData.deliveryTime} />
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '15px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>You'll receive an email when your payment is complete.</p>
        <div style={{ width: '326px', background: colors.white, borderRadius: '12px', border: `1px solid ${colors.grey}`, padding: '20px', boxSizing: 'border-box', textAlign: 'left', margin: '0 auto' }}>
          <Badge>Cash to Close</Badge>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '28px', lineHeight: 1.2, color: colors.darkBlue, margin: '12px 0 16px' }}>${requestData.paymentAmount.toLocaleString()}.00</p>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.highEmphasis, margin: '0 0 8px' }}>{requestData.propertyAddress}</p>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.highEmphasis, margin: '0 0 8px' }}>{requestData.existingBank.name} - {requestData.existingBank.type} **{requestData.existingBank.last4}</p>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '12px', color: colors.mediumEmphasis, margin: '0 0 8px', wordBreak: 'break-all' }}>ID: {transactionId}</p>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.highEmphasis, margin: 0 }}>{requestData.office}</p>
          <div style={{ height: '1px', background: colors.grey, margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.mediumEmphasis }}>Payment</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis }}>${requestData.paymentAmount.toLocaleString()}.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontSize: '14px', color: colors.mediumEmphasis }}>Transfer fee</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis }}>$48.00</span>
          </div>
          <div style={{ height: '1px', background: colors.grey, margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.highEmphasis }}>Total</span>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.darkBlue }}>${totalAmount.toLocaleString()}.00</span>
          </div>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <SecondaryButton onClick={onShowShare}>Share Confirmation</SecondaryButton>
          <TextLink onClick={() => {}}>Download Receipt (PDF)</TextLink>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Success with Share Modal
// ============================================
const SuccessWithShareScreen = ({ onClose }) => {
  const totalAmount = requestData.paymentAmount + 48;
  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <div style={{ padding: '30px 32px 120px', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><HouseWithCheck /></div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 12px' }}>Payment submitted to {requestData.titleCompany}!</p>
        <DeliveryBanner date={requestData.deliveryDate} time={requestData.deliveryTime} />
      </div>
      {/* Share Modal */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: colors.white, borderRadius: '16px 16px 0 0', padding: '24px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', zIndex: 50,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '20px', color: colors.darkBlue, margin: 0 }}>Share confirmation</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: colors.mediumEmphasis }}>×</button>
        </div>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: colors.mediumEmphasis, margin: '0 0 16px' }}>
          Send a copy of your payment confirmation to your real estate agent or lender.
        </p>
        <TextField label="Email address" placeholder="agent@example.com" value="" onChange={() => {}} />
        <TextLink onClick={() => {}}>+ Add another recipient</TextLink>
        <PrimaryButton onClick={onClose}>Send Email</PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Review Wire Instructions
// ============================================
const ReviewWireScreen = ({ onNext, onBack, customLogo }) => {
  const [protectionOn, setProtectionOn] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
      <CoBrandedHeader mode="progress" progress={30} onBack={onBack} customLogo={customLogo} />
      <div style={{ padding: '75px 32px 120px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Review Wire Instructions</p>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '15px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
          Review and acknowledge the verified wire instructions for sending your funds to the...
        </p>

        {/* Secure Wire Instructions Info */}
        <div style={{
          background: colors.lightestBlue, borderRadius: '10px', padding: '16px', marginBottom: '20px',
          border: `1px solid ${colors.lighterBlue}`, display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={colors.blue} strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke={colors.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.darkBlue, margin: '0 0 4px' }}>Secure Wire Instructions</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: 0 }}>
              Wire instructions will never be shared over email or text. They will only appear in this secure experience.
            </p>
          </div>
        </div>

        {/* Verified Wire Instructions */}
        <div style={{ background: colors.lightestGrey, borderRadius: '10px', padding: '20px', marginBottom: '20px', border: `1px solid ${colors.grey}` }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.darkBlue, margin: '0 0 4px' }}>Verified Wire Instructions</p>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.mediumEmphasis, margin: '0 0 16px' }}>
            Use these instructions to send your funds securely
          </p>
          {[
            { label: 'Bank Name:', value: 'First National Bank' },
            { label: 'Routing Number:', value: '021000821' },
            { label: 'Account Number:', value: '****4589' },
            { label: 'Account Name:', value: 'Pinpoint Title Escrow' },
            { label: 'Reference:', value: 'File #3abacc6f' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: i < 4 ? '8px' : 0 }}>
              <span style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.mediumEmphasis }}>{item.label}</span>
              <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Money Protection Plan */}
        <div style={{
          background: protectionOn ? colors.lightestBlue : colors.lightestGrey,
          borderRadius: '10px', padding: '20px', marginBottom: '24px',
          border: `1px solid ${protectionOn ? colors.lighterBlue : colors.grey}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={colors.darkBlue} strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke={colors.darkBlue} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '15px', color: colors.darkBlue, margin: 0 }}>Money Protection Plan</p>
            </div>
            {/* Toggle */}
            <div onClick={() => setProtectionOn(!protectionOn)} style={{
              width: '48px', height: '28px', borderRadius: '14px', padding: '2px', cursor: 'pointer',
              background: protectionOn ? colors.darkBlue : colors.darkGrey, transition: 'background 0.2s ease',
              display: 'flex', alignItems: 'center',
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: colors.white,
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'transform 0.2s ease',
                transform: protectionOn ? 'translateX(20px)' : 'translateX(0)',
              }} />
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 8px', borderRadius: '4px', background: colors.darkGreen, marginBottom: '8px' }}>
            <span style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '10px', color: colors.white, textTransform: 'uppercase' }}>Optional</span>
          </div>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', lineHeight: 1.6, color: colors.mediumEmphasis, margin: '0 0 12px' }}>
            Protect your wire transfer with fraud recovery coverage, underwritten by Lloyd's of London.
          </p>
          {[
            'Dedicated fraud recovery experts',
            '24/7 crisis hotline',
            'Bank notification to freeze compromised accounts',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M20 6L9 17L4 12" stroke={colors.darkGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.highEmphasis, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '22px', color: colors.darkBlue, margin: '16px 0 2px' }}>$50 <span style={{ fontWeight: 400, fontSize: '13px', color: colors.mediumEmphasis }}>one-time fee</span></p>
          <p onClick={() => {}} style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '13px', color: colors.blue, margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>Learn More</p>
        </div>

        {/* Acknowledgment Checkbox */}
        <div style={{ marginBottom: '24px' }}>
          <Checkbox
            checked={acknowledged}
            onChange={setAcknowledged}
            label="I understand that these wire instructions are only provided through this secure experience and will never be sent via email or text."
          />
        </div>

        {/* CTA */}
        <PrimaryButton
          onClick={() => onNext(protectionOn)}
          disabled={!acknowledged}
        >
          I've reviewed and verified
        </PrimaryButton>
      </div>
    </div>
  );
};

// ============================================
// SCREEN: Wire Protection Payment
// ============================================
const WireProtectionPaymentScreen = ({ onNext, onBack, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={45} onBack={onBack} customLogo={customLogo} />
    <div style={{ padding: '75px 32px 120px' }}>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '24px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Complete payment</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '15px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
        Please enter your card details.
      </p>

      {/* Card Details Form */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '14px', color: colors.highEmphasis, margin: '0 0 12px' }}>Card details</p>
        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX  MM/YY  CVC" readOnly style={{
          width: '326px', height: '40px', padding: '8px 12px', borderRadius: '6px',
          border: `1px solid ${colors.darkGrey}`, background: colors.white,
          fontFamily: fonts.oxygen, fontSize: '14px', color: colors.lowEmphasis,
          boxSizing: 'border-box', marginBottom: '16px', outline: 'none',
        }} />
        <TextField label="Name" placeholder="" value="" onChange={() => {}} />
        <TextField label="Billing address" placeholder="" value="" onChange={() => {}} />
        <TextField label="City" placeholder="" value="" onChange={() => {}} />
        <div style={{ display: 'flex', gap: '12px', width: '326px' }}>
          <div style={{ flex: 1 }}><TextField label="State" placeholder="" value="" onChange={() => {}} /></div>
          <div style={{ flex: 1 }}><TextField label="Zip code" placeholder="" value="" onChange={() => {}} /></div>
        </div>
      </div>

      <PrimaryButton onClick={onNext}>Pay $50</PrimaryButton>
      <div style={{ marginTop: '12px' }}>
        <SecondaryButton onClick={onBack}>Cancel</SecondaryButton>
      </div>
    </div>
  </div>
);

// ============================================
// SCREEN: Wire Instructions
// ============================================
const WireInstructionsScreen = ({ onBack, onGoDigital, customLogo }) => (
  <div className="phone-scroll" style={{ paddingTop: '66px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
    <CoBrandedHeader mode="progress" progress={100} onBack={onBack} customLogo={customLogo} />
    <div style={{ padding: '75px 32px 120px' }}>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '26px', lineHeight: 1.3, color: colors.darkBlue, margin: '0 0 8px' }}>Wire Transfer Instructions</p>
      <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '16px', lineHeight: 1.5, color: colors.mediumEmphasis, margin: '0 0 24px' }}>
        Use these verified instructions to send your wire transfer.
      </p>
      <div style={{
        background: colors.lightOrange, borderRadius: '8px', padding: '16px', marginBottom: '24px',
        display: 'flex', alignItems: 'flex-start', gap: '12px', border: '1px solid #fde68a',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M12 9V13M12 17H12.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '14px', color: '#92400E', margin: 0, flex: 1 }}>
          <strong>Verify before sending!</strong> Only use wire instructions from this secure page or by calling {requestData.titleCompany} directly.
        </p>
      </div>
      <div style={{ background: colors.lightestGrey, borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Bank Name', value: 'First National Bank' },
          { label: 'Routing Number', value: '111000025' },
          { label: 'Account Number', value: '1234567890' },
          { label: 'Account Name', value: 'Pinpoint Title Escrow' },
          { label: 'Reference', value: requestData.propertyAddress },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: i < 4 ? '16px' : 0 }}>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 400, fontSize: '12px', color: colors.mediumEmphasis, margin: 0 }}>{item.label}</p>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '16px', color: colors.highEmphasis, margin: '4px 0 0' }}>{item.value}</p>
          </div>
        ))}
      </div>
      <PrimaryButton onClick={() => {}}>Download Instructions (PDF)</PrimaryButton>
      {onGoDigital && <TextLink onClick={onGoDigital}>Go back and pay digitally instead</TextLink>}
    </div>
  </div>
);

// ============================================
// Main App Component
// ============================================
// Screen ID to URL slug mapping
const screenSlugs = {
  'phone': '/phone-verify',
  'code': '/code-entry',
  'intent': '/payment-intent',
  'landing': '/landing-page',
  'landing-ineligible': '/landing-ineligible',
  'method-ineligible': '/method-ineligible',
  'method': '/payment-methods',
  'kyc': '/kyc',
  'kyc-verifying': '/kyc-verifying',
  'plaid': '/bank-via-plaid',
  'bank-select': '/bank-select',
  'eligibility': '/eligibility-check',
  'cutoff': '/3pm-cutoff-alert',
  'review': '/review-payment',
  'processing': '/processing',
  'success': '/confirmation',
  'success-share': '/share-modal',
  'wire-review': '/review-wire',
  'wire-protection-pay': '/protection-payment',
  'wire': '/wire-instructions',
  'err-plaid': '/plaid-failed',
  'err-savings': '/savings-account',
  'err-closing': '/closing-too-soon',
  'err-funds': '/insufficient-funds',
  'err-balance': '/balance-unavailable',
};

const slugToScreen = Object.fromEntries(Object.entries(screenSlugs).map(([k, v]) => [v, k]));

const getInitialScreen = () => {
  const path = window.location.pathname;
  return slugToScreen[path] || 'phone';
};

const CashToClosePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState(getInitialScreen);
  const [entryPath, setEntryPath] = useState('title'); // 'title' or 'buyer'
  const [userType, setUserType] = useState('returning'); // 'new' or 'returning'
  const [selectedMethod, setSelectedMethod] = useState('digital');
  const [useExistingBank, setUseExistingBank] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [customLogo, setCustomLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomLogo(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Sync URL with current screen
  useEffect(() => {
    const slug = screenSlugs[currentScreen];
    if (slug && window.location.pathname !== slug) {
      window.history.pushState(null, '', slug);
    }
  }, [currentScreen]);

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const screen = slugToScreen[window.location.pathname];
      if (screen) setCurrentScreen(screen);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Screen definitions for navigation
  const screenGroups = {
    'Verification': [
      { id: 'phone', label: 'Phone Verify' },
      { id: 'code', label: 'Code Entry' },
    ],
    'Entry': [
      { id: 'intent', label: 'Payment Intent', note: 'Buyer-initiated only', disabled: true },
      { id: 'landing', label: 'Landing Page' },
      { id: 'landing-ineligible', label: 'Landing (Ineligible)', note: 'Closing too soon' },
      { id: 'method-ineligible', label: 'Method (Ineligible)', note: 'Digital disabled' },
    ],
    'Digital Path': [
      { id: 'method', label: 'Payment Method' },
      { id: 'kyc', label: 'KYC (New)', note: 'New users only' },
      { id: 'kyc-verifying', label: 'KYC Verifying', note: 'New users only' },
      { id: 'plaid', label: 'Bank via Plaid', note: 'New users only' },
      { id: 'bank-select', label: 'Bank Select', note: 'Returning users' },
      { id: 'eligibility', label: 'Eligibility Check' },
      { id: 'cutoff', label: '3pm Cutoff Alert' },
      { id: 'review', label: 'Review Payment' },
      { id: 'processing', label: 'Processing' },
    ],
    'Success': [
      { id: 'success', label: 'Confirmation' },
      { id: 'success-share', label: 'Share Modal' },
    ],
    'Wire': [
      { id: 'wire-review', label: 'Review Wire' },
      { id: 'wire-protection-pay', label: 'Protection Payment' },
      { id: 'wire', label: 'Wire Instructions' },
    ],
    'Errors': [
      { id: 'err-plaid', label: 'Plaid Failed' },
      { id: 'err-savings', label: 'Savings Account' },
      { id: 'err-closing', label: 'Closing Too Soon' },
      { id: 'err-funds', label: 'Insufficient Funds' },
      { id: 'err-balance', label: 'Balance Unavailable' },
    ],
  };

  const renderScreen = () => {
    const cl = customLogo; // shorthand for passing to all screens
    switch (currentScreen) {
      case 'intent': return <PaymentIntentScreen onNext={() => setCurrentScreen('landing')} onBack={() => {}} customLogo={cl} />;
      case 'phone': return <PhoneVerifyScreen onNext={() => setCurrentScreen('code')} onBack={() => {}} phoneNumber={requestData.buyerPhone} customLogo={cl} />;
      case 'code': return <CodeEntryScreen onNext={() => setCurrentScreen('landing')} onBack={() => setCurrentScreen('phone')} phoneNumber={requestData.buyerPhone} customLogo={cl} />;
      case 'landing': return <PaymentRequestScreen onNext={() => setCurrentScreen('method')} customLogo={cl} />;
      case 'landing-ineligible': return <IneligibleLandingScreen onNext={() => setCurrentScreen('method-ineligible')} customLogo={cl} />;
      case 'method-ineligible': return <IneligiblePaymentMethodScreen onNext={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('landing-ineligible')} customLogo={cl} />;
      case 'method': return <PaymentMethodScreen
        onNext={() => {
          if (selectedMethod === 'wire') setCurrentScreen('wire-review');
          else if (userType === 'new') setCurrentScreen('kyc');
          else setCurrentScreen('bank-select');
        }}
        onBack={() => setCurrentScreen('landing')}
        selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} customLogo={cl}
      />;
      case 'kyc': return <KYCScreen onNext={() => setCurrentScreen('kyc-verifying')} onBack={() => setCurrentScreen('method')} customLogo={cl} />;
      case 'kyc-verifying': return <KYCVerifyingScreen onNext={() => setCurrentScreen('plaid')} customLogo={cl} />;
      case 'plaid': return <PlaidBankConnectionScreen onNext={() => setCurrentScreen('eligibility')} onBack={() => setCurrentScreen('kyc')} customLogo={cl} />;
      case 'bank-select': return <BankAccountScreen onNext={() => setCurrentScreen('eligibility')} onBack={() => setCurrentScreen('method')} useExisting={useExistingBank} setUseExisting={setUseExistingBank} customLogo={cl} />;
      case 'eligibility': return <EligibilityCheckScreen onNext={() => setCurrentScreen('review')} customLogo={cl} />;
      case 'cutoff': return <CutoffAlertScreen onAccept={() => setCurrentScreen('review')} onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('review')} customLogo={cl} />;
      case 'review': return <ReviewPaymentScreen onNext={() => setCurrentScreen('processing')} onBack={() => setCurrentScreen(userType === 'new' ? 'plaid' : 'bank-select')} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} customLogo={cl} />;
      case 'processing': return <ProcessingScreen onNext={() => setCurrentScreen('success')} customLogo={cl} />;
      case 'success': return <SuccessScreen onShowShare={() => setCurrentScreen('success-share')} customLogo={cl} />;
      case 'success-share': return <SuccessWithShareScreen onClose={() => setCurrentScreen('success')} customLogo={cl} />;
      case 'wire-review': return <ReviewWireScreen
        onNext={(hasProtection) => {
          if (hasProtection) setCurrentScreen('wire-protection-pay');
          else setCurrentScreen('wire');
        }}
        onBack={() => setCurrentScreen('method')} customLogo={cl}
      />;
      case 'wire-protection-pay': return <WireProtectionPaymentScreen onNext={() => setCurrentScreen('wire')} onBack={() => setCurrentScreen('wire-review')} customLogo={cl} />;
      case 'wire': return <WireInstructionsScreen onBack={() => setCurrentScreen('wire-review')} onGoDigital={() => setCurrentScreen('method')} customLogo={cl} />;
      case 'err-plaid': return <PlaidFailedScreen onRetry={() => setCurrentScreen('plaid')} onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('kyc')} customLogo={cl} />;
      case 'err-savings': return <SavingsAccountScreen onRetry={() => setCurrentScreen('plaid')} onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('plaid')} customLogo={cl} />;
      case 'err-closing': return <ClosingTooSoonScreen onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('method')} customLogo={cl} />;
      case 'err-funds': return <InsufficientFundsScreen onRetry={() => setCurrentScreen('plaid')} onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('bank-select')} customLogo={cl} />;
      case 'err-balance': return <BalanceUnavailableScreen onWire={() => setCurrentScreen('wire-review')} onBack={() => setCurrentScreen('bank-select')} customLogo={cl} />;
      default: return <PhoneVerifyScreen onNext={() => setCurrentScreen('code')} onBack={() => {}} phoneNumber={requestData.buyerPhone} customLogo={cl} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
      display: 'flex', gap: '32px', padding: '32px 20px', fontFamily: fonts.oxygen,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&family=Nunito+Sans:wght@700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Left: Navigation Panel */}
      <div style={{ width: '280px', flexShrink: 0 }}>
        <h1 style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '18px', color: colors.darkBlue, marginBottom: '4px' }}>Cash to Close</h1>
        <p style={{ fontFamily: fonts.oxygen, fontSize: '13px', color: colors.mediumEmphasis, marginBottom: '16px' }}>Complete Buyer Flow Prototype</p>

        {/* Toggles */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '11px', color: colors.lowEmphasis, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Configuration</p>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            {['title', 'buyer'].map(path => (
              <button key={path} onClick={() => { if (path === 'buyer') return; setEntryPath(path); setCurrentScreen('phone'); }}
                disabled={path === 'buyer'}
                style={{
                  flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 600,
                  cursor: path === 'buyer' ? 'not-allowed' : 'pointer', opacity: path === 'buyer' ? 0.4 : 1,
                  background: entryPath === path ? colors.blue : colors.white, color: entryPath === path ? colors.white : colors.mediumEmphasis,
                }}>
                {path === 'title' ? 'Title-Initiated' : 'Buyer-Initiated'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['returning', 'new'].map(type => (
              <button key={type} onClick={() => setUserType(type)}
                style={{
                  flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  background: userType === type ? colors.darkBlue : colors.white, color: userType === type ? colors.white : colors.mediumEmphasis,
                }}>
                {type === 'returning' ? 'Returning User' : 'New User'}
              </button>
            ))}
          </div>
        </div>

        {/* Logo Upload */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '11px', color: colors.lowEmphasis, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Company Logo</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{
              padding: '8px 12px', borderRadius: '6px', border: `1px dashed ${colors.darkGrey}`, background: colors.white,
              fontFamily: fonts.oxygen, fontSize: '12px', fontWeight: 600, color: colors.mediumEmphasis, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', flex: 1,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round"/><path d="M17 8L12 3L7 8" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V15" stroke={colors.mediumEmphasis} strokeWidth="2" strokeLinecap="round"/></svg>
              {customLogo ? 'Change logo' : 'Upload logo'}
              <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
            </label>
            {customLogo && (
              <button onClick={() => setCustomLogo(null)} style={{
                padding: '8px', borderRadius: '6px', border: 'none', background: colors.lightRed, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke={colors.red} strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            )}
          </div>
          {customLogo && (
            <div style={{ marginTop: '8px', padding: '8px', background: colors.lightestGrey, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={customLogo} alt="Company logo" style={{ maxHeight: '32px', maxWidth: '200px', objectFit: 'contain' }} />
            </div>
          )}
        </div>

        {/* Screen Groups */}
        {Object.entries(screenGroups).map(([group, screens]) => (
          <div key={group} style={{ marginBottom: '16px' }}>
            <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '11px', color: colors.lowEmphasis, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>{group}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {screens.map(screen => (
                <button key={screen.id} onClick={() => { if (!screen.disabled) setCurrentScreen(screen.id); }}
                  disabled={screen.disabled}
                  style={{
                    padding: '8px 10px', borderRadius: '6px', border: 'none', textAlign: 'left',
                    cursor: screen.disabled ? 'not-allowed' : 'pointer', opacity: screen.disabled ? 0.4 : 1,
                    background: currentScreen === screen.id ? (group === 'Errors' ? colors.lightRed : colors.lightestBlue) : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                  <span style={{
                    fontFamily: fonts.oxygen, fontSize: '13px', fontWeight: currentScreen === screen.id ? 700 : 400,
                    color: currentScreen === screen.id ? (group === 'Errors' ? colors.red : colors.blue) : colors.highEmphasis,
                  }}>{screen.label}</span>
                  {screen.note && (
                    <span style={{ fontFamily: fonts.oxygen, fontSize: '10px', color: colors.lowEmphasis }}>{screen.note}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Flow Summary */}
        <div style={{ marginTop: '20px', padding: '12px', background: colors.white, borderRadius: '8px', border: `1px solid ${colors.grey}` }}>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 700, fontSize: '11px', color: colors.lowEmphasis, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Fallback Routes</p>
          <p style={{ fontFamily: fonts.oxygen, fontSize: '12px', color: colors.mediumEmphasis, margin: 0, lineHeight: 1.6 }}>
            All error screens route to Wire Instructions as the universal fallback. The wire screen always has a "pay digitally" escape hatch.
          </p>
        </div>
      </div>

      {/* Right: Phone (sticky so it stays centered while sidebar scrolls) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{
          position: 'sticky',
          top: 'max(16px, calc(50vh - 450px))',
          display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'flex-start',
        }}>
          <PhoneContainer>
            {renderScreen()}
          </PhoneContainer>
          <p style={{ fontFamily: fonts.oxygen, fontWeight: 600, fontSize: '14px', color: colors.mediumEmphasis, marginTop: '16px', textAlign: 'center' }}>
            {currentScreen.replace('err-', 'Error: ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default CashToClosePrototype;
