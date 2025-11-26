const Badge = ({ children, variant = 'primary' }) => {
    const variants = {
        primary: { bg: 'rgba(0, 255, 200, 0.15)', color: '#00ffc8', border: 'rgba(0, 255, 200, 0.3)' },
        secondary: { bg: 'rgba(255, 20, 147, 0.15)', color: '#ff1493', border: 'rgba(255, 20, 147, 0.3)' },
        accent: { bg: 'rgba(255, 165, 0, 0.15)', color: '#ffa500', border: 'rgba(255, 165, 0, 0.3)' }
    };
    
    const v = variants[variant];
    return (
        <span style={{
        background: v.bg,
        color: v.color,
        padding: '0.35rem 0.8rem',
        borderRadius: 18,
        fontSize: '0.875rem',
        border: `1px solid ${v.border}`,
        display: 'inline-block'
        }}>{children}</span>
    );
};

export default Badge;