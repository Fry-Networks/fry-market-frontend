import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    className?: string;
    showText?: boolean;
    text?: string;
    onClick?: () => void;
    variant?: 'default' | 'minimal' | 'rounded';
}

const BackButton: React.FC<BackButtonProps> = ({
    className = '',
    showText = true,
    text = 'Back',
    onClick,
    variant = 'default'
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'minimal':
                return 'text-gray-600 hover:text-primary transition-colors duration-200';
            case 'rounded':
                return 'bg-white text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md px-4 py-2';
            default:
                return 'bg-white text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 px-4 py-2';
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 font-Roboto font-medium ${getVariantClasses()} ${className}`}
        >
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            {showText && <span>{text}</span>}
        </button>
    );
};

export default BackButton;
