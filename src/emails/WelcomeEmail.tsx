import * as React from 'react';

interface WelcomeEmailProps {
  userEmail: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userEmail }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#09090b', padding: '40px 20px', color: '#ffffff' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid #27272a' }}>
      
      {/* Header / Logo Area */}
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px', color: '#ffffff' }}>
        AURA<span style={{ color: '#10b981' }}>FORCE</span>
      </h1>
      
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#a1a1aa' }}>
        Welcome to the team!
      </p>

      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#d4d4d8', marginBottom: '30px' }}>
        You have successfully joined <strong>10,000+ athletes</strong> receiving our weekly insights. We're thrilled to help you crush your fitness goals.
      </p>

      {/* Hero Section */}
      <div style={{ backgroundColor: '#10b981', color: '#000000', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>Your First Perk Unlocked 🔓</h2>
        <p style={{ margin: '10px 0 0', fontSize: '14px' }}>
          Use code <strong>NEWFORCE20</strong> for 20% off your first gear order.
        </p>
      </div>

      <p style={{ fontSize: '14px', color: '#71717a', borderTop: '1px solid #27272a', paddingTop: '20px' }}>
        You received this email because you subscribed to the AuraForce newsletter with {userEmail}.
      </p>
      
    </div>
  </div>
);

export default WelcomeEmail;