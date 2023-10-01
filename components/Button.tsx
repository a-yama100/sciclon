// E:\programming\Project\sciclon\components\Button.tsx

interface ButtonProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    onClick?: () => void;
}

function Button({ label, variant = 'primary', onClick }: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
