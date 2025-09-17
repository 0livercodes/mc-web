
// Tailwind CSS used for styling
/**
 * Badge component for status indicators (Sale, New, Out of Stock, etc.)
 */
// Tailwind CSS used for styling
/**
 * Badge component for status indicators (Sale, New, Out of Stock, etc.)
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-block rounded px-2 py-0.5 font-semibold text-xs align-middle';
  const variantClasses = {
    default: 'bg-gray-200 text-gray-700',
    sale: 'bg-red-500 text-white',
    new: 'bg-green-500 text-white',
    bestseller: 'bg-yellow-400 text-gray-900',
    'out-of-stock': 'bg-gray-400 text-white',
    limited: 'bg-purple-500 text-white',
    featured: 'bg-blue-500 text-white',
  };
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2',
  };
  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.medium,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;

