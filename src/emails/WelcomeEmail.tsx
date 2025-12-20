import * as React from 'react';

interface WelcomeEmailProps {
  userEmail: string;
}

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'https://auraforce.vercel.app'; // Fallback to your Vercel URL

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userEmail }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#09090b', padding: '40px 20px', color: '#ffffff' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#18181b', padding: '40px', borderRadius: '16px', border: '1px solid #27272a' }}>
      
      {/* --- LOGO SECTION --- */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <img 
          src={`${baseUrl}/for favicon.png`} 
          alt="AuraForce Logo" 
          width="60" 
          height="60"
          style={{ display: 'inline-block', objectFit: 'contain' }}
        />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
          AURA<span style={{ color: '#10b981' }}>FORCE</span>
        </h1>
      </div>
      
      {/* Intro Text */}
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#d4d4d8', textAlign: 'center', marginBottom: '30px' }}>
        Welcome to the team! You have successfully joined <strong>10,000+ athletes</strong> receiving our weekly insights. We aren't just a gym—we are a movement.
      </p>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#27272a', marginBottom: '30px' }}></div>

      {/* --- INFO SECTION (The 3 Pillars) --- */}
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '20px' }}>
        What to expect from us:
      </h2>

      {/* Item 1: Training */}
      <div style={{ marginBottom: '20px', paddingLeft: '15px', borderLeft: '3px solid #10b981' }}>
        <h3 style={{ margin: '0', fontSize: '16px', color: '#10b981', fontWeight: 'bold' }}>⚡ Precision Training</h3>
        <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#a1a1aa', lineHeight: '1.5' }}>
          Weekly breakdowns of advanced lifting techniques, HIIT protocols, and recovery strategies used by pros.
        </p>
      </div>

      {/* Item 2: Nutrition */}
      <div style={{ marginBottom: '20px', paddingLeft: '15px', borderLeft: '3px solid #10b981' }}>
        <h3 style={{ margin: '0', fontSize: '16px', color: '#10b981', fontWeight: 'bold' }}>🍎 Fueling Strategy</h3>
        <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#a1a1aa', lineHeight: '1.5' }}>
          Real food recipes and macro-tracking tips. We don't believe in starving; we believe in fueling for performance.
        </p>
      </div>

      {/* Item 3: Community */}
      <div style={{ marginBottom: '30px', paddingLeft: '15px', borderLeft: '3px solid #10b981' }}>
        <h3 style={{ margin: '0', fontSize: '16px', color: '#10b981', fontWeight: 'bold' }}>🔥 Inner Circle Access</h3>
        <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#a1a1aa', lineHeight: '1.5' }}>
          First access to new class schedules, trainer Q&As, and community challenges.
        </p>
      </div>

      {/* Call to Action Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a 
          href={baseUrl}
          style={{ 
            backgroundColor: '#10b981', 
            color: '#000000', 
            padding: '12px 30px', 
            borderRadius: '50px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '15px',
            display: 'inline-block'
          }}
        >
          Explore Classes & Trainers
        </a>
      </div>

      {/* Footer */}
      <p style={{ fontSize: '13px', color: '#52525b', borderTop: '1px solid #27272a', paddingTop: '20px', textAlign: 'center' }}>
        You received this email because you subscribed to the AuraForce newsletter with <span style={{ color: '#d4d4d8' }}>{userEmail}</span>.
        <br />
        <br />
        © {new Date().getFullYear()} AuraForce Inc. All rights reserved.
      </p>
      
    </div>
  </div>
);

export default WelcomeEmail;