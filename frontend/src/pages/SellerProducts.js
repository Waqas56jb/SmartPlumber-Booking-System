import React, { useState, useEffect, useCallback } from 'react';
import { FaStore, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBox, FaArrowLeft, FaStar, FaTruck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { productAPI } from '../services/apiService';
import AddProductForm from '../components/AddProductForm';
// i let sellers browse filter and edit their own sku rows from one screen
const SellerProducts = () => {
  const {
    user
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
    totalValue: 0
  });
  const categories = [{
    value: 'boiler_installations',
    label: 'Boiler Installations'
  }, {
    value: 'boiler_repairs',
    label: 'Boiler Repairs'
  }, {
    value: 'central_heating',
    label: 'Central Heating'
  }, {
    value: 'general_plumbing',
    label: 'General Plumbing'
  }, {
    value: 'gas_safety',
    label: 'Gas Safety'
  }, {
    value: 'leak_detection',
    label: 'Leak Detection'
  }, {
    value: 'power_flushing',
    label: 'Power Flushing'
  }, {
    value: 'water_heaters',
    label: 'Water Heaters'
  }, {
    value: 'pipe_installation',
    label: 'Pipe Installation'
  }, {
    value: 'hot_water_cylinders',
    label: 'Hot Water Cylinders'
  }, {
    value: 'appliances_installation',
    label: 'Appliances Installation'
  }, {
    value: 'any_repairs',
    label: 'Any Repairs'
  }];
  // i map enum values to friendly labels for filters and table chips
  const getCategoryLabel = value => {
    const cat = categories.find(c => c.value === value);
    return cat ? cat.label : value;
  };
  // i refetch whenever seller category or search changes via stable callback
  const fetchProducts = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const filters = {
        seller_id: user.id
      };
      if (selectedCategory) filters.category = selectedCategory;
      if (searchTerm) filters.search = searchTerm;
      const response = await productAPI.getAllProducts(filters);
      if (response.success) {
        const productList = response.data.products || [];
        setProducts(productList);
        const activeProducts = productList.filter(p => p.is_active);
        const outOfStock = productList.filter(p => p.stock_quantity <= 0);
        const totalValue = productList.reduce((sum, p) => sum + parseFloat(p.price) * (p.stock_quantity || 0), 0);
        setStats({
          total: productList.length,
          active: activeProducts.length,
          outOfStock: outOfStock.length,
          totalValue: totalValue.toFixed(2)
        });
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedCategory, searchTerm]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const handleDelete = async productId => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    try {
      const response = await productAPI.deleteProduct(productId);
      if (response.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  const handleEdit = product => {
    setEditingProduct(product);
    setShowAddForm(true);
  };
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };
  const getCurrencySymbol = currency => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return '£';
    }
  };
  return <div className="min-h-screen" style={{
    background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
  }}>
      {}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/home')} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: '#F5E6D3'
              }}>
                  <FaStore className="text-2xl" style={{
                  color: '#D2A752'
                }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manage Products</h1>
                  <p className="text-sm text-gray-500">{stats.total} products listed</p>
                </div>
              </div>
            </div>
            <button onClick={() => setShowAddForm(true)} className="px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 hover:shadow-lg" style={{
            background: '#D2A752'
          }}>
              <FaPlus /> Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#D2A752]">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-500">
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            <div className="text-sm text-gray-500">Out of Stock</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">£{stats.totalValue}</div>
            <div className="text-sm text-gray-500">Inventory Value</div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => e.key === 'Enter' && fetchProducts()} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
            </div>
            <div className="md:w-64">
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
              </select>
            </div>
            <button onClick={fetchProducts} className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2" style={{
            background: '#D2A752'
          }}>
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

        {}
        {loading ? <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div> : products.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <FaBox className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Start adding products to your inventory</p>
            <button onClick={() => setShowAddForm(true)} className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{
          background: '#D2A752'
        }}>
              <FaPlus className="inline mr-2" />
              Add Your First Product
            </button>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => {
          const discount = product.original_price && product.original_price > product.price ? Math.round((product.original_price - product.price) / product.original_price * 100) : 0;
          const currencySymbol = getCurrencySymbol(product.currency);
          return <div key={product.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-2 ${product.stock_quantity <= 0 ? 'border-red-200' : 'border-transparent'}`}>
                  {}
                  <div className="h-48 bg-gradient-to-br from-[#F5E6D3] to-[#E8D4B8] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaBox className="text-6xl text-[#D2A752]/50" />
                    </div>
                    
                    {}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {discount > 0 && <span className="px-3 py-1 rounded-full text-white text-sm font-bold bg-red-500">
                          -{discount}%
                        </span>}
                      {product.stock_quantity <= 0 && <span className="px-3 py-1 rounded-full text-white text-sm font-bold bg-gray-500">
                          Out of Stock
                        </span>}
                    </div>

                    {}
                    <div className="absolute top-3 right-3">
                      {product.is_active ? <span className="px-3 py-1 rounded-full text-green-700 text-xs font-semibold bg-green-100 flex items-center gap-1">
                          <FaEye size={10} /> Active
                        </span> : <span className="px-3 py-1 rounded-full text-gray-700 text-xs font-semibold bg-gray-100 flex items-center gap-1">
                          <FaEyeSlash size={10} /> Hidden
                        </span>}
                    </div>
                  </div>

                  {}
                  <div className="p-5">
                    {}
                    <div className="mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{
                  background: '#D2A752'
                }}>
                        {getCategoryLabel(product.product_category)}
                      </span>
                    </div>

                    {}
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {product.product_name}
                    </h3>

                    {}
                    {product.product_description && <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {product.product_description}
                      </p>}

                    {}
                    {(product.product_brand || product.product_model) && <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        {product.product_brand && <span>{product.product_brand}</span>}
                        {product.product_brand && product.product_model && <span className="text-gray-400"> - </span>}
                        {product.product_model && <span>{product.product_model}</span>}
                      </div>}

                    {}
                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold" style={{
                        color: '#D2A752'
                      }}>
                              {currencySymbol}{parseFloat(product.price).toFixed(2)}
                            </span>
                            {discount > 0 && <span className="text-sm text-gray-400 line-through">
                                {currencySymbol}{parseFloat(product.original_price).toFixed(2)}
                              </span>}
                          </div>
                          {discount > 0 && <span className="text-xs text-green-600 font-medium">
                              You save {currencySymbol}{(product.original_price - product.price).toFixed(2)}
                            </span>}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{product.stock_quantity || 0}</div>
                          <div className="text-xs text-gray-500">in stock</div>
                        </div>
                      </div>
                    </div>

                    {}
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      {product.warranty_period_months && <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">
                          {product.warranty_period_months}mo warranty
                        </span>}
                      {product.shipping_charges === 0 || !product.shipping_charges ? <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg flex items-center gap-1">
                          <FaTruck size={10} /> Free shipping
                        </span> : <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg flex items-center gap-1">
                          <FaTruck size={10} /> {currencySymbol}{product.shipping_charges} shipping
                        </span>}
                      {product.total_sales > 0 && <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">
                          {product.total_sales} sold
                        </span>}
                    </div>

                    {}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => <FaStar key={i} size={14} className={i < Math.floor(parseFloat(product.product_rating) || 0) ? 'text-yellow-400' : 'text-gray-200'} />)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {(parseFloat(product.product_rating) || 0).toFixed(1)} ({product.total_reviews || 0} reviews)
                      </span>
                    </div>

                    {}
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all flex items-center justify-center gap-2 hover:shadow-md" style={{
                  borderColor: '#D2A752',
                  color: '#D2A752'
                }} onMouseEnter={e => {
                  e.target.style.background = '#D2A752';
                  e.target.style.color = 'white';
                }} onMouseLeave={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#D2A752';
                }}>
                        <FaEdit />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 border-2 border-red-200 transition-all hover:bg-red-600 hover:text-white hover:border-red-600">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>;
        })}
          </div>}
      </div>

      {}
      {showAddForm && <AddProductForm onClose={handleCloseForm} onSuccess={fetchProducts} sellerId={user?.id} editProduct={editingProduct} />}
    </div>;
};
export default SellerProducts;
