export const ORIGINAL_AUTHOR_HANDLE = 'baumannzone';
export const ORIGINAL_AUTHOR_NAME = 'Jorge Baumann';

export function parseArgs(args) {
  const defaultHandle = args[0];
  let customName = null;
  const overrides = [];

  // Parse remaining args
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.includes('=')) {
      overrides.push(arg);
    } else {
      customName = arg;
    }
  }

  const handleOverrides = overrides.reduce((acc, override) => {
    const [services, handle] = override.split('=');
    services.split(',').forEach(service => {
      acc[service.toLowerCase()] = handle;
    });
    return acc;
  }, {});

  const getHandle = (service) => {
    if (!service) return defaultHandle || ORIGINAL_AUTHOR_HANDLE;
    const serviceKey = service.toLowerCase();
    
    // If service is threads and no override exists, use instagram's handle
    if (serviceKey === 'threads' && !handleOverrides[serviceKey]) {
      return handleOverrides['instagram'] || defaultHandle || ORIGINAL_AUTHOR_HANDLE;
    }
    
    return handleOverrides[serviceKey] || defaultHandle || ORIGINAL_AUTHOR_HANDLE;
  };

  const getDisplayName = () => {
    if (customName && customName.startsWith('"') && customName.endsWith('"')) {
      return customName.slice(1, -1); // Remove quotes
    }
    return customName || `@${defaultHandle || ORIGINAL_AUTHOR_HANDLE}`;
  };

  const getWebUrl = (getHandle) => {
    const webOverride = getHandle('web');
    
    // Domain override case (starts with dot)
    if (webOverride.startsWith('.')) {
      return `${getHandle()}${webOverride}`;
    }
    
    // If it contains a dot, it's a full URL
    if (webOverride.includes('.')) {
      return webOverride;
    }
    
    return `${webOverride}.dev`;	
  };

  return {
    defaultHandle,
    customName,
    handleOverrides,
    getHandle,
    getDisplayName,
    getWebUrl
  };
} 