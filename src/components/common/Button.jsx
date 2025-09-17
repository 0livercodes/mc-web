// Tailwind CSS used for styling
// Tailwind CSS used for styling
/**
 * Reusable Button component for ecommerce actions
 * Supports various variants and sizes following design system patterns
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Tailwind classes
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  const fullWidthClass = fullWidth ? 'w-full' : '';
  const loadingClass = loading ? 'opacity-70 pointer-events-none' : '';
  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.medium,
    fullWidthClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-blue-600 rounded-full inline-block" aria-hidden="true"></span>}
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
};

export default Button;