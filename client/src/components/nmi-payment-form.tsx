import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Shield } from 'lucide-react';

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface PaymentFormProps {
  onPaymentToken: (token: string, formData: PaymentFormData) => void;
  onError: (error: string) => void;
  amount: number;
  description: string;
  loading?: boolean;
  disabled?: boolean;
}

// Extend Window interface for NMI Collect.js
declare global {
  interface Window {
    CollectJS?: {
      configure: (options: any) => void;
      startPaymentRequest: () => void;
      configured?: boolean;
    };
  }
}

export function NMIPaymentForm({
  onPaymentToken,
  onError,
  amount,
  description,
  loading = false,
  disabled = false
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  
  const [isCollectJSLoaded, setIsCollectJSLoaded] = useState(false);
  const [areFieldsReady, setAreFieldsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Load NMI Collect.js script
  useEffect(() => {
    const loadCollectJS = () => {
      // Validate tokenization key is present
      const tokenizationKey = import.meta.env.VITE_NMI_TOKENIZATION_KEY;
      if (!tokenizationKey) {
        onError('Payment system configuration missing. Please contact support.');
        return;
      }
      
      // Check if already loaded
      if (window.CollectJS) {
        setIsCollectJSLoaded(true);
        configureCollectJS();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://secure.nmi.com/token/Collect.js';
      script.setAttribute('data-tokenization-key', tokenizationKey);
      script.setAttribute('data-variant', 'inline');
      
      script.onload = () => {
        setIsCollectJSLoaded(true);
        configureCollectJS();
      };
      
      script.onerror = () => {
        onError('Failed to load payment processing system');
      };
      
      document.head.appendChild(script);
    };
    
    loadCollectJS();
    
    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://secure.nmi.com/token/Collect.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  
  const configureCollectJS = () => {
    if (!window.CollectJS) return;
    
    // Configure only once to prevent HMR issues
    if (window.CollectJS.configured) return;
    
    window.CollectJS.configure({
      variant: 'inline',
      styleSniffer: true,
      fields: {
        ccnumber: {
          selector: '#cc-number',
          title: 'Card Number',
          placeholder: '0000 0000 0000 0000'
        },
        ccexp: {
          selector: '#cc-exp',
          title: 'Card Expiration',
          placeholder: 'MM/YY'
        },
        cvv: {
          selector: '#cc-cvv',
          title: 'CVV',
          placeholder: '123'
        }
      },
      customCss: {
        'color': '#374151',
        'font-size': '16px',
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'padding': '12px 14px',
        'border': '1px solid #d1d5db',
        'border-radius': '6px',
        'background-color': '#ffffff',
        'line-height': '1.5',
        '::placeholder': {
          'color': '#9ca3af'
        },
        ':focus': {
          'border-color': '#3b82f6',
          'outline': 'none',
          'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        '.invalid': {
          'border-color': '#ef4444'
        }
      },
      callback: (response: any) => {
        if (response.payment_token) {
          setIsProcessing(false);
          onPaymentToken(response.payment_token, formData);
        } else {
          setIsProcessing(false);
          const errorMsg = response.error || response.errorMessage || 'Payment processing failed';
          console.error('Payment tokenization failed:', response);
          onError(errorMsg);
        }
      },
      fieldsAvailableCallback: () => {
        console.log('✅ Payment fields are ready');
        setAreFieldsReady(true);
      },
      validationCallback: (field: string, status: boolean, message: string) => {
        if (!status && message) {
          console.warn(`Validation error for ${field}: ${message}`);
        }
      },
      timeoutDuration: 30000,
      timeoutCallback: () => {
        console.error('Payment tokenization timeout');
        setIsProcessing(false);
        onError('Payment processing timed out. Please try again.');
      }
    });
    
    // Mark as configured to prevent duplicate calls
    window.CollectJS.configured = true;
  };
  
  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Valid email is required');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!window.CollectJS) {
      onError('Payment system not ready. Please try again.');
      return;
    }

    if (!areFieldsReady) {
      onError('Payment fields are still loading. Please wait a moment and try again.');
      return;
    }
    
    setIsProcessing(true);
    setValidationErrors([]);
    
    try {
      // Trigger Collect.js tokenization
      console.log('🔐 Starting payment tokenization...');
      window.CollectJS.startPaymentRequest();
    } catch (error) {
      console.error('Error starting payment request:', error);
      setIsProcessing(false);
      onError('Failed to process payment. Please refresh and try again.');
    }
  };
  
  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Secure Payment</span>
          <Shield className="w-4 h-4 text-green-600" />
        </CardTitle>
        <div className="text-sm text-gray-600">
          {description} - <span className="font-semibold">${amount.toFixed(2)}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        {validationErrors.length > 0 && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription>
              <ul className="text-sm text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                data-testid="input-first-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                data-testid="input-last-name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              data-testid="input-email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-testid="input-phone"
            />
          </div>
          
          {/* Payment Fields - NMI Collect.js will inject here */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <div 
                id="cc-number" 
                className="min-h-[48px] border border-gray-300 rounded-md"
                data-testid="input-card-number"
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date *
                </label>
                <div 
                  id="cc-exp" 
                  className="min-h-[48px] border border-gray-300 rounded-md"
                  data-testid="input-card-expiry"
                ></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <div 
                  id="cc-cvv" 
                  className="min-h-[48px] border border-gray-300 rounded-md"
                  data-testid="input-card-cvv"
                ></div>
              </div>
            </div>
          </div>
          
          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="flex items-center space-x-2 text-sm text-green-700">
              <Shield className="w-4 h-4" />
              <span>Your payment information is encrypted and secure. We never store your card details.</span>
            </div>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!isCollectJSLoaded || !areFieldsReady || isProcessing || loading || disabled}
            data-testid="button-submit-payment"
          >
            {isProcessing || loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Complete Payment (${amount.toFixed(2)})
              </>
            )}
          </Button>
          
          {(!isCollectJSLoaded || !areFieldsReady) && (
            <div className="text-center text-sm text-gray-500">
              {!isCollectJSLoaded ? 'Loading secure payment form...' : 'Initializing payment fields...'}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}