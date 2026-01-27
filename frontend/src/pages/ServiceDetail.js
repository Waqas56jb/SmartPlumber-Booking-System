import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '../utils/router';
import { FaArrowLeft, FaShoppingCart, FaStar, FaTruck, FaImage } from 'react-icons/fa';
import { productAPI } from '../services/apiService';

// Service categories mapping (moved outside component to avoid dependency warning)
const serviceCategories = {
    'boiler-installations': {
      name: 'Boiler Installations & Servicing',
      category: 'boiler_installations',
      icon: '🔥',
      description: 'Professional boiler installation and regular servicing to keep your heating system running efficiently.'
    },
    'boiler-repairs': {
      name: 'Boiler Repairs & Fault Finding',
      category: 'boiler_repairs',
      icon: '🔧',
      description: 'Expert diagnosis and repair of boiler faults to restore your heating quickly and safely.'
    },
    'central-heating': {
      name: 'Central Heating',
      category: 'central_heating',
      icon: '🏠',
      description: 'Complete central heating system installation, maintenance, and optimization for your home.'
    },
    'general-plumbing': {
      name: 'General Plumbing',
      category: 'general_plumbing',
      icon: '💧',
      description: 'All plumbing services including taps, showers, sinks, toilets, and more.'
    },
    'gas-safety': {
      name: 'Gas Safety Inspections',
      category: 'gas_safety',
      icon: '🛡️',
      description: 'Thorough gas safety checks and certification by Gas Safe registered engineers.'
    },
    'leak-detection': {
      name: 'Leak Detection & Repairs',
      category: 'leak_detection',
      icon: '💦',
      description: 'Fast and accurate leak detection with professional repair services to prevent damage.'
    },
    'power-flushing': {
      name: 'Power Flushing',
      category: 'power_flushing',
      icon: '⚡',
      description: 'System cleaning to improve heating efficiency and extend the life of your boiler.'
    },
    'water-heaters': {
      name: 'Water Heaters',
      category: 'water_heaters',
      icon: '⚙️',
      description: 'Professional installation and maintenance of water heating systems.'
    },
    'pipe-installation': {
      name: 'Pipe Installation & Repairs',
      category: 'pipe_installation',
      icon: '🔨',
      description: 'Professional pipe installation and repair services for all plumbing systems.'
    },
    'hot-water-cylinders': {
      name: 'Hot Water Cylinders',
      category: 'hot_water_cylinders',
      icon: '🔌',
      description: 'Installation, repair, and replacement of hot water cylinder systems.'
    },
    'appliances-installation': {
      name: 'New Appliances Installations',
      category: 'appliances_installation',
      icon: '📜',
      description: 'Expert installation of new heating and plumbing appliances for your home.'
    },
    'any-repairs': {
      name: 'Any Repairs',
      category: 'any_repairs',
      icon: '✅',
      description: 'Comprehensive repair services for all your heating and plumbing needs.'
    }
  };

const ServiceDetail = () => {
  const { currentPath, navigate } = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState(null);

  const fetchProducts = useCallback(async (category) => {
    try {
      setLoading(true);
      const response = await productAPI.getProductsByCategory(category);
      if (response.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Extract service slug from path (handle both /service/... and hash routes)
    let serviceSlug = currentPath;
    if (serviceSlug.includes('/service/')) {
      serviceSlug = serviceSlug.split('/service/')[1];
    } else if (serviceSlug.startsWith('service/')) {
      serviceSlug = serviceSlug.replace('service/', '');
    }
    
    const service = serviceCategories[serviceSlug];
    
    if (service) {
      setServiceInfo(service);
      fetchProducts(service.category);
    } else {
      // Try to get from window location hash
      const hash = window.location.hash.slice(1);
      if (hash.includes('/service/')) {
        const hashSlug = hash.split('/service/')[1];
        const hashService = serviceCategories[hashSlug];
        if (hashService) {
          setServiceInfo(hashService);
          fetchProducts(hashService.category);
          return;
        }
      }
      navigate('/');
    }
  }, [currentPath, fetchProducts, navigate]);

  const handleAddToCart = (product) => {
    // TODO: Implement cart functionality
    console.log(`${product.product_name} added to cart!`);
  };

  if (!serviceInfo) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#D2A752] transition-colors mb-6"
        >
          <FaArrowLeft /> Back to Services
        </button>

        {/* Service Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-6xl">{serviceInfo.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{serviceInfo.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{serviceInfo.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{products.length} Products Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-[#D2A752] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No products available for this service yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-[#F5E6D3] to-[#E8D4B8] flex items-center justify-center relative overflow-hidden">
                  {product.product_images && Array.isArray(product.product_images) && product.product_images.length > 0 ? (
                    <img
                      src={product.product_images[0].image_url || product.product_images[0]}
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaImage className="text-6xl" style={{ color: '#D2A752' }} />
                  )}
                  {product.discount_percentage > 0 && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-bold shadow-lg" style={{ background: '#D2A752' }}>
                      -{product.discount_percentage}% OFF
                    </div>
                  )}
                  {!product.is_in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.product_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                    {product.product_description}
                  </p>
                  
                  {/* Seller Info */}
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-semibold">Seller:</span> {product.seller_shop_name}
                    {product.seller_rating > 0 && (
                      <span className="ml-2">
                        ⭐ {product.seller_rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold" style={{ color: '#D2A752' }}>
                      {product.currency || 'GBP'} {product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {product.currency || 'GBP'} {product.original_price}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                          Save {product.currency || 'GBP'} {product.original_price - product.price}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    {product.product_brand && (
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                        Brand: {product.product_brand}
                      </span>
                    )}
                    {product.delivery_time_hours && (
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 flex items-center gap-1">
                        <FaTruck /> {product.delivery_time_hours}h delivery
                      </span>
                    )}
                    {product.total_reviews_count > 0 && (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 flex items-center gap-1">
                        <FaStar /> {product.calculated_rating?.toFixed(1) || '0.0'} ({product.total_reviews_count})
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    {product.is_in_stock ? (
                      <span className="text-sm text-green-600 font-semibold">
                        ✓ In Stock ({product.stock_quantity} available)
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 font-semibold">
                        ✗ Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.is_in_stock}
                      className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: product.is_in_stock ? '#D2A752' : '#ccc' }}
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      className="px-4 py-3 rounded-lg font-semibold border-2 transition-all"
                      style={{ borderColor: '#D2A752', color: '#D2A752' }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
