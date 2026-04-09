import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '../utils/router';
import { productAPI, plumberAPI } from '../services/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// i map url slugs to backend category keys and brand colors for the hero tile
const serviceCategories = {
  'boiler-installations': {
    name: 'Boiler Installations & Servicing',
    category: 'boiler_installations',
    description: 'Professional boiler installation and regular servicing to keep your heating system running efficiently.',
    color: '#E53E3E'
  },
  'boiler-repairs': {
    name: 'Boiler Repairs & Fault Finding',
    category: 'boiler_repairs',
    description: 'Expert diagnosis and repair of boiler faults to restore your heating quickly and safely.',
    color: '#DD6B20'
  },
  'central-heating': {
    name: 'Central Heating',
    category: 'central_heating',
    description: 'Complete central heating system installation, maintenance, and optimization for your home.',
    color: '#38A169'
  },
  'general-plumbing': {
    name: 'General Plumbing',
    category: 'general_plumbing',
    description: 'All plumbing services including taps, showers, sinks, toilets, and more.',
    color: '#3182CE'
  },
  'gas-safety': {
    name: 'Gas Safety Inspections',
    category: 'gas_safety',
    description: 'Thorough gas safety checks and certification by Gas Safe registered engineers.',
    color: '#805AD5'
  },
  'leak-detection': {
    name: 'Leak Detection & Repairs',
    category: 'leak_detection',
    description: 'Fast and accurate leak detection with professional repair services to prevent damage.',
    color: '#00B5D8'
  },
  'power-flushing': {
    name: 'Power Flushing',
    category: 'power_flushing',
    description: 'System cleaning to improve heating efficiency and extend the life of your boiler.',
    color: '#F6AD55'
  },
  'water-heaters': {
    name: 'Water Heaters',
    category: 'water_heaters',
    description: 'Professional installation and maintenance of water heating systems.',
    color: '#718096'
  },
  'pipe-installation': {
    name: 'Pipe Installation & Repairs',
    category: 'pipe_installation',
    description: 'Professional pipe installation and repair services for all plumbing systems.',
    color: '#C53030'
  },
  'hot-water-cylinders': {
    name: 'Hot Water Cylinders',
    category: 'hot_water_cylinders',
    description: 'Installation, repair, and replacement of hot water cylinder systems.',
    color: '#2B6CB0'
  },
  'appliances-installation': {
    name: 'New Appliances Installations',
    category: 'appliances_installation',
    description: 'Expert installation of new heating and plumbing appliances for your home.',
    color: '#319795'
  },
  'any-repairs': {
    name: 'Any Repairs',
    category: 'any_repairs',
    description: 'Comprehensive repair services for all your heating and plumbing needs.',
    color: '#D2A752'
  }
};
// i use inline svg so plumber cards never break when external cdn is down
const PLUMBER_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23D2A752'/%3E%3Ccircle cx='50' cy='35' r='18' fill='%23fff'/%3E%3Cellipse cx='50' cy='75' rx='28' ry='22' fill='%23fff'/%3E%3C/svg%3E";
// i show products for one service category plus optional plumber finder modal
const ServiceDetail = () => {
  const {
    currentPath,
    navigate
  } = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [showPlumbers, setShowPlumbers] = useState(false);
  const [plumbers, setPlumbers] = useState([]);
  const [loadingPlumbers, setLoadingPlumbers] = useState(false);
  const [plumberSearchTerm, setPlumberSearchTerm] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const fetchProducts = useCallback(async category => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getProductsByCategory(category);
      if (response.success) {
        setProducts(response.data.products || []);
      } else {
        setProducts([]);
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('products load', err);
      setProducts([]);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);
  // i lazy load plumbers only when the modal opens to save bandwidth
  const fetchPlumbers = useCallback(async () => {
    try {
      setLoadingPlumbers(true);
      const response = await plumberAPI.getAllPlumbers({});
      if (response.success) {
        setPlumbers(response.data.plumbers || []);
      } else {
        console.error('plumbers load', response.message);
        setPlumbers([]);
      }
    } catch (err) {
      console.error('plumbers load', err);
      setPlumbers([]);
    } finally {
      setLoadingPlumbers(false);
    }
  }, []);
  // i parse the hash once to know which service object and category to fetch
  useEffect(() => {
    if (initialized) return;
    const hash = window.location.hash.slice(1);
    let serviceSlug = '';
    if (hash.includes('/service/')) {
      serviceSlug = hash.split('/service/')[1];
    } else if (currentPath.includes('/service/')) {
      serviceSlug = currentPath.split('/service/')[1];
    }
    serviceSlug = serviceSlug.split('?')[0].split('/')[0];
    const service = serviceCategories[serviceSlug];
    if (service) {
      setServiceInfo(service);
      setInitialized(true);
      fetchProducts(service.category);
    } else if (serviceSlug) {
      setLoading(false);
      setInitialized(true);
    }
  }, [currentPath, fetchProducts, initialized]);
  useEffect(() => {
    if (showPlumbers) {
      fetchPlumbers();
    }
  }, [showPlumbers, fetchPlumbers]);
  const handleAddToCart = _product => undefined;
  const handleContactPlumber = _plumber => undefined;
  // i chain search sort and price filters client side so the api stays simple
  const filteredProducts = products.filter(p => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return p.product_name.toLowerCase().includes(search) || (p.product_description && p.product_description.toLowerCase().includes(search));
    }
    return true;
  }).filter(p => {
    const price = parseFloat(p.price) || 0;
    if (priceRange === 'under50') return price < 50;
    if (priceRange === '50to200') return price >= 50 && price <= 200;
    if (priceRange === '200to500') return price >= 200 && price <= 500;
    if (priceRange === 'over500') return price > 500;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
    if (sortBy === 'price_high') return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
    if (sortBy === 'rating') return (parseFloat(b.seller_rating) || 0) - (parseFloat(a.seller_rating) || 0);
    return 0;
  });
  // i filter plumbers in memory for modal search and availability toggle
  const filteredPlumbers = plumbers.filter(p => {
    if (availableOnly && !p.is_available) {
      return false;
    }
    if (plumberSearchTerm) {
      const search = plumberSearchTerm.toLowerCase();
      const fieldMatches = val => Boolean(val) && String(val).toLowerCase().includes(search);
      return fieldMatches(p.full_name) || fieldMatches(p.plumber_username) || fieldMatches(p.city);
    }
    return true;
  });
  if (!initialized || (loading && !serviceInfo)) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>;
  }
  if (!serviceInfo) {
    return <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-dashed border-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
            <p className="text-gray-500 mb-6">The service you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{
            background: '#D2A752'
          }}>
              Back to home
            </button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors mb-6">
            Back to services
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shrink-0" style={{
            backgroundColor: serviceInfo.color
          }}>
              {serviceInfo.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{serviceInfo.name}</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-3xl">{serviceInfo.description}</p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                <span>{products.length} products</span>
                <span>multiple sellers</span>
                <span>fast delivery</span>
              </div>
            </div>
            
            {}
            <button type="button" onClick={() => setShowPlumbers(true)} className="mt-4 md:mt-0 px-6 py-4 rounded-xl font-bold text-[#1a1a2e] bg-[#D2A752] hover:bg-[#c49a47] transition-all shadow-lg hover:shadow-xl self-start">
              Find a plumber
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input type="text" placeholder="Search products" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
            </div>
            
            <div className="sm:w-48">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                <option value="featured">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
            
            <div className="sm:w-48">
              <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                <option value="all">All Prices</option>
                <option value="under50">Under £50</option>
                <option value="50to200">£50 - £200</option>
                <option value="200to500">£200 - £500</option>
                <option value="over500">Over £500</option>
              </select>
            </div>
            
            {}
            <button type="button" onClick={() => setShowPlumbers(true)} className="lg:hidden px-4 py-3 rounded-xl font-semibold text-white bg-[#D2A752] hover:bg-[#c49a47] transition-all">
              Find plumber
            </button>
          </div>
        </div>

        {}
        {loading ? <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div> : error ? <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-red-200 bg-red-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button onClick={() => fetchProducts(serviceInfo.category)} className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{
          background: '#D2A752'
        }}>
              Try Again
            </button>
          </div> : filteredProducts.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-dashed border-gray-300" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {products.length === 0 ? 'No Products Available Yet' : 'No Products Match Your Search'}
            </h3>
            <p className="text-gray-500 mb-6">
              {products.length === 0 ? `Sellers haven't added any ${serviceInfo.name.toLowerCase()} products yet. Check back soon!` : 'Try adjusting your search or filters to find what you need.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:shadow-lg" style={{
            borderColor: '#D2A752',
            color: '#D2A752'
          }}>
                Browse Other Services
              </button>
              <button type="button" onClick={() => setShowPlumbers(true)} className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{
            background: '#D2A752'
          }}>
                Find a plumber
              </button>
            </div>
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
          const price = parseFloat(product.price) || 0;
          const originalPrice = parseFloat(product.original_price) || 0;
          const discount = originalPrice > price ? Math.round((originalPrice - price) / originalPrice * 100) : 0;
          return <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="h-52 bg-gradient-to-br from-[#F5E6D3] to-[#E8D4B8] flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 rounded-xl bg-[#D2A752]/20 group-hover:scale-105 transition-transform duration-300" />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {discount > 0 && <span className="px-3 py-1 rounded-full text-white text-xs font-bold bg-red-500 shadow-lg">
                          -{discount}% OFF
                        </span>}
                      {product.is_in_stock === false && <span className="px-3 py-1 rounded-full text-white text-xs font-bold bg-gray-500">
                          Out of Stock
                        </span>}
                    </div>
                    
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      <button type="button" className="px-2 py-1 bg-white rounded shadow hover:bg-[#D2A752] hover:text-white transition-all">Save</button>
                      <button type="button" className="px-2 py-1 bg-white rounded shadow hover:bg-[#D2A752] hover:text-white transition-all">View</button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium">{product.seller_shop_name || 'Unknown seller'}</span>
                      </div>
                      {product.seller_rating > 0 && <div className="flex items-center gap-1 text-xs">
                          <span className="font-semibold">rating {(parseFloat(product.seller_rating) || 0).toFixed(1)}</span>
                        </div>}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-[#D2A752] transition-colors">
                      {product.product_name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.product_description || 'No description available'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.product_brand && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                          {product.product_brand}
                        </span>}
                      {product.warranty_period_months && <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                          {product.warranty_period_months}mo warranty
                        </span>}
                    </div>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold" style={{
                  color: '#D2A752'
                }}>
                        £{price.toFixed(2)}
                      </span>
                      {discount > 0 && <span className="text-sm text-gray-400 line-through">
                          £{originalPrice.toFixed(2)}
                        </span>}
                    </div>
                    
                    <div className="mb-4">
                      {product.is_in_stock !== false && (product.stock_quantity || 0) > 0 ? <span className="text-xs text-green-600 font-medium">
                          In stock ({product.stock_quantity})
                        </span> : <span className="text-xs text-red-600 font-medium">
                          Out of stock
                        </span>}
                    </div>

                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleAddToCart(product)} disabled={product.is_in_stock === false || (product.stock_quantity || 0) <= 0} className="flex-1 px-4 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg" style={{
                  background: '#D2A752'
                }}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>;
        })}
          </div>}
      </div>
      
      {}
      {showPlumbers && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {}
            <div className="bg-gradient-to-r from-[#D2A752] to-[#B8943F] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Find a plumber
                </h2>
                <p className="text-white/80 text-sm">Browse and contact verified plumbers in your area</p>
              </div>
              <button type="button" onClick={() => setShowPlumbers(false)} className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all text-white text-sm">
                Close
              </button>
            </div>
            
            {}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input type="text" placeholder="Search name or city" value={plumberSearchTerm} onChange={e => setPlumberSearchTerm(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <label className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#D2A752] transition-all">
                  <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="w-4 h-4 text-[#D2A752] rounded focus:ring-[#D2A752]" />
                  <span className="text-sm font-medium text-gray-700">Available Now</span>
                </label>
              </div>
            </div>
            
            {}
            <div className="p-6 overflow-y-auto flex-1 bg-white" style={{
          maxHeight: 'calc(90vh - 200px)'
        }}>
              {loadingPlumbers ? <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Finding plumbers...</p>
                </div> : filteredPlumbers.length === 0 ? <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg border-2 border-dashed border-gray-300" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Plumbers Found</h3>
                  <p className="text-gray-500">
                    {plumbers.length === 0 ? 'No plumbers have registered yet. Check back soon!' : 'Try adjusting your search criteria.'}
                  </p>
                </div> : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlumbers.map(plumber => <div key={plumber.id} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#D2A752] hover:shadow-xl transition-all duration-300 group">
                      {}
                      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8D4B8] p-6 text-center relative">
                        {}
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${plumber.is_available ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                          {plumber.is_available ? 'Available' : 'Busy'}
                        </div>
                        
                        {}
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img src={PLUMBER_AVATAR} alt={plumber.full_name || plumber.plumber_username} className="w-full h-full object-cover" />
                        </div>
                        
                        {}
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {plumber.full_name || plumber.plumber_username}
                        </h3>
                        
                        {}
                        {plumber.city && <p className="text-sm text-gray-600 text-center">
                            {plumber.city}{plumber.state ? `, ${plumber.state}` : ''}
                          </p>}
                        
                        {}
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <span className="text-sm text-gray-600">
                            rating {(parseFloat(plumber.plumber_rating) || 0).toFixed(1)} / 5
                          </span>
                        </div>
                      </div>
                      
                      {}
                      <div className="p-5">
                        {}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-[#D2A752]">{plumber.experience_years || 0}</div>
                            <div className="text-xs text-gray-500">Years Exp</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-[#D2A752]">{plumber.plumber_completed_jobs || 0}</div>
                            <div className="text-xs text-gray-500">Jobs Done</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-[#D2A752]">{plumber.total_reviews || 0}</div>
                            <div className="text-xs text-gray-500">Reviews</div>
                          </div>
                        </div>
                        
                        {}
                        {plumber.per_hour_charges && <div className="flex items-center justify-between mb-4 p-3 bg-[#F5E6D3] rounded-xl">
                            <span className="text-sm text-gray-600">
                              Per hour
                            </span>
                            <span className="text-xl font-bold text-[#D2A752]">
                              £{parseFloat(plumber.per_hour_charges).toFixed(0)}
                            </span>
                          </div>}

                        {}
                        {(plumber.phone_number || plumber.email || plumber.location_address) && <div className="mb-4 space-y-2">
                            {plumber.phone_number && <div className="text-sm text-gray-700">
                                <span className="text-gray-500">Phone </span>
                                <span>{plumber.phone_number}</span>
                              </div>}
                            {plumber.email && <div className="text-sm text-gray-700">
                                <span className="text-gray-500">Email </span>
                                <span className="truncate">{plumber.email}</span>
                              </div>}
                            {plumber.location_address && <div className="text-sm text-gray-700">
                                <span className="text-gray-500">Address </span>
                                <div>
                                  <div>{plumber.location_address}</div>
                                  {(plumber.city || plumber.state || plumber.country) && <div className="text-xs text-gray-500">
                                      {[plumber.city, plumber.state, plumber.country].filter(Boolean).join(', ')}
                                    </div>}
                                </div>
                              </div>}
                          </div>}
                        
                        {}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {plumber.is_verified && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                              Verified
                            </span>}
                          {plumber.license_number && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                              Licensed
                            </span>}
                        </div>
                        
                        {}
                        {plumber.plumber_bio && <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                            {plumber.plumber_bio}
                          </p>}
                        
                        {}
                        <button type="button" onClick={() => handleContactPlumber(plumber)} className="w-full px-4 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{
                  background: '#D2A752'
                }}>
                          Contact plumber
                        </button>
                      </div>
                    </div>)}
                </div>}
            </div>
          </div>
        </div>}
      
      <Footer />
    </div>;
};
export default ServiceDetail;
