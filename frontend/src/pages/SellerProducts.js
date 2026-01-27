import React, { useState, useEffect } from 'react';
import { FaStore, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaImage } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { productAPI } from '../services/apiService';
import { toast } from 'react-toastify';
import AddProductForm from '../components/AddProductForm';

const SellerProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'boiler_installations',
    'boiler_repairs',
    'central_heating',
    'general_plumbing',
    'gas_safety',
    'leak_detection',
    'power_flushing',
    'water_heaters',
    'pipe_installation',
    'hot_water_cylinders',
    'appliances_installation',
    'any_repairs'
  ];

  const categoryNames = {
    'boiler_installations': 'Boiler Installations & Servicing',
    'boiler_repairs': 'Boiler Repairs & Fault Finding',
    'central_heating': 'Central Heating',
    'general_plumbing': 'General Plumbing',
    'gas_safety': 'Gas Safety Inspections',
    'leak_detection': 'Leak Detection & Repairs',
    'power_flushing': 'Power Flushing',
    'water_heaters': 'Water Heaters',
    'pipe_installation': 'Pipe Installation & Repairs',
    'hot_water_cylinders': 'Hot Water Cylinders',
    'appliances_installation': 'New Appliances Installations',
    'any_repairs': 'Any Repairs'
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const filters = { seller_id: user.id };
      if (selectedCategory) filters.category = selectedCategory;
      if (searchTerm) filters.search = searchTerm;
      
      const response = await productAPI.getAllProducts(filters);
      if (response.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedCategory]);

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await productAPI.deleteProduct(productId);
      if (response.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Products</h1>
            <p className="text-gray-600">Add and manage your sanitary goods inventory</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2"
            style={{ background: '#D2A752' }}
          >
            <FaPlus /> Add New Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{categoryNames[cat]}</option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchProducts}
              className="px-6 py-2 rounded-lg font-semibold text-white"
              style={{ background: '#D2A752' }}
            >
              <FaFilter className="inline mr-2" />
              Filter
            </button>
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
            <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No products found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ background: '#D2A752' }}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                    <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-bold" style={{ background: '#D2A752' }}>
                      -{product.discount_percentage}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs px-2 py-1 rounded-full text-white text-xs font-medium" style={{ background: '#D2A752' }}>
                      {categoryNames[product.product_category] || product.product_category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.product_name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.product_description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold" style={{ color: '#D2A752' }}>
                      {product.currency || 'GBP'} {product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.currency || 'GBP'} {product.original_price}
                      </span>
                    )}
                  </div>

                  {/* Stock & Rating */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Stock: {product.stock_quantity || 0}</span>
                    <span>⭐ {product.product_rating?.toFixed(1) || '0.0'}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold border-2 transition-all"
                      style={{ borderColor: '#D2A752', color: '#D2A752' }}
                    >
                      <FaEdit className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 border-2 border-red-600 transition-all hover:bg-red-600 hover:text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Product Form Modal */}
        {showAddForm && (
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onSuccess={fetchProducts}
            sellerId={user?.id}
          />
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
