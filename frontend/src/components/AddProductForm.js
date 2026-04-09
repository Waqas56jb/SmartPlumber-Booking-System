import React, { useState } from 'react';
import { FaTimes, FaSave, FaBox, FaPoundSign, FaTruck, FaPercent, FaTag } from 'react-icons/fa';
import { productAPI } from '../services/apiService';
// i reuse one form for create and edit seller products with big field set
const AddProductForm = ({
  onClose,
  onSuccess,
  sellerId,
  editProduct = null
}) => {
  const [formData, setFormData] = useState({
    product_name: editProduct?.product_name || '',
    product_description: editProduct?.product_description || '',
    product_category: editProduct?.product_category || '',
    product_brand: editProduct?.product_brand || '',
    product_model: editProduct?.product_model || '',
    sku: editProduct?.sku || '',
    price: editProduct?.price || '',
    original_price: editProduct?.original_price || '',
    stock_quantity: editProduct?.stock_quantity || '',
    min_order_quantity: editProduct?.min_order_quantity || '1',
    max_order_quantity: editProduct?.max_order_quantity || '',
    weight_kg: editProduct?.weight_kg || '',
    dimensions: editProduct?.dimensions || '',
    material: editProduct?.material || '',
    color: editProduct?.color || '',
    warranty_period_months: editProduct?.warranty_period_months || '',
    delivery_time_hours: editProduct?.delivery_time_hours || '',
    shipping_charges: editProduct?.shipping_charges || '0',
    currency: editProduct?.currency || 'GBP'
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const categories = [{
    value: 'boiler_installations',
    label: 'Boiler Installations & Servicing'
  }, {
    value: 'boiler_repairs',
    label: 'Boiler Repairs & Fault Finding'
  }, {
    value: 'central_heating',
    label: 'Central Heating'
  }, {
    value: 'general_plumbing',
    label: 'General Plumbing'
  }, {
    value: 'gas_safety',
    label: 'Gas Safety Inspections'
  }, {
    value: 'leak_detection',
    label: 'Leak Detection & Repairs'
  }, {
    value: 'power_flushing',
    label: 'Power Flushing'
  }, {
    value: 'water_heaters',
    label: 'Water Heaters'
  }, {
    value: 'pipe_installation',
    label: 'Pipe Installation & Repairs'
  }, {
    value: 'hot_water_cylinders',
    label: 'Hot Water Cylinders'
  }, {
    value: 'appliances_installation',
    label: 'New Appliances Installations'
  }, {
    value: 'any_repairs',
    label: 'Any Repairs'
  }];
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const calculateDiscount = () => {
    if (formData.original_price && formData.price) {
      const original = parseFloat(formData.original_price);
      const current = parseFloat(formData.price);
      if (original > current) {
        return Math.round((original - current) / original * 100);
      }
    }
    return 0;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.product_name || !formData.price || !formData.product_category) {
      return;
    }
    setLoading(true);
    try {
      const productData = {
        ...formData,
        seller_id: sellerId,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        min_order_quantity: parseInt(formData.min_order_quantity) || 1,
        max_order_quantity: formData.max_order_quantity ? parseInt(formData.max_order_quantity) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        warranty_period_months: formData.warranty_period_months ? parseInt(formData.warranty_period_months) : null,
        delivery_time_hours: formData.delivery_time_hours ? parseFloat(formData.delivery_time_hours) : null,
        shipping_charges: parseFloat(formData.shipping_charges) || 0,
        discount_percentage: calculateDiscount()
      };
      let response;
      if (editProduct) {
        response = await productAPI.updateProduct(editProduct.id, productData);
      } else {
        response = await productAPI.createProduct(productData);
      }
      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setLoading(false);
    }
  };
  const tabs = [{
    id: 'basic',
    label: 'Basic Info',
    icon: FaBox
  }, {
    id: 'pricing',
    label: 'Pricing',
    icon: FaPoundSign
  }, {
    id: 'details',
    label: 'Details',
    icon: FaTag
  }, {
    id: 'shipping',
    label: 'Shipping',
    icon: FaTruck
  }];
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        {}
        <div className="bg-gradient-to-r from-[#D2A752] to-[#B8943F] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-white/80 text-sm">Fill in the product details</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all text-white">
            <FaTimes size={20} />
          </button>
        </div>

        {}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map(tab => {
          const Icon = tab.icon;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'text-[#D2A752] border-b-2 border-[#D2A752] bg-white' : 'text-gray-500 hover:text-gray-700'}`}>
                <Icon size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>;
        })}
        </div>

        {}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          {}
          {activeTab === 'basic' && <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} placeholder="Enter product name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select name="product_category" value={formData.product_category} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" required>
                  <option value="">Select a category</option>
                  {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea name="product_description" value={formData.product_description} onChange={handleChange} placeholder="Describe your product in detail..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input type="text" name="product_brand" value={formData.product_brand} onChange={handleChange} placeholder="e.g., Bosch" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Model
                  </label>
                  <input type="text" name="product_model" value={formData.product_model} onChange={handleChange} placeholder="e.g., XR-2000" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SKU (Stock Keeping Unit)
                </label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g., PRD-001" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
              </div>
            </div>}

          {}
          {activeTab === 'pricing' && <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#F5E6D3] to-[#FDF8F3] rounded-xl p-4 border border-[#D2A752]/30">
                <div className="flex items-center gap-2 mb-3">
                  <FaPercent className="text-[#D2A752]" />
                  <span className="font-semibold text-gray-700">Discount Preview</span>
                </div>
                {calculateDiscount() > 0 ? <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-[#D2A752]">{calculateDiscount()}% OFF</span>
                    <span className="text-gray-500">
                      Save {formData.currency} {(parseFloat(formData.original_price) - parseFloat(formData.price)).toFixed(2)}
                    </span>
                  </div> : <span className="text-gray-500">Set original price higher than selling price for discount</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Currency
                  </label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                    <option value="GBP">GBP (£)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {formData.currency === 'GBP' ? '£' : formData.currency === 'USD' ? '$' : '€'}
                    </span>
                    <input type="number" step="0.01" name="original_price" value={formData.original_price} onChange={handleChange} placeholder="0.00" className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selling Price * <span className="text-gray-400 font-normal">(What customer pays)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {formData.currency === 'GBP' ? '£' : formData.currency === 'USD' ? '$' : '€'}
                  </span>
                  <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all text-xl font-bold" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="0" min="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Min Order
                  </label>
                  <input type="number" name="min_order_quantity" value={formData.min_order_quantity} onChange={handleChange} placeholder="1" min="1" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Order
                  </label>
                  <input type="number" name="max_order_quantity" value={formData.max_order_quantity} onChange={handleChange} placeholder="No limit" min="1" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
              </div>
            </div>}

          {}
          {activeTab === 'details' && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input type="number" step="0.01" name="weight_kg" value={formData.weight_kg} onChange={handleChange} placeholder="e.g., 2.5" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dimensions (LxWxH)
                  </label>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g., 30x20x10 cm" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material
                  </label>
                  <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="e.g., Stainless Steel" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Color
                  </label>
                  <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Chrome, White" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Warranty (months)
                </label>
                <input type="number" name="warranty_period_months" value={formData.warranty_period_months} onChange={handleChange} placeholder="e.g., 12" min="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
              </div>
            </div>}

          {}
          {activeTab === 'shipping' && <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estimated Delivery Time (hours)
                </label>
                <input type="number" name="delivery_time_hours" value={formData.delivery_time_hours} onChange={handleChange} placeholder="e.g., 48" min="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                <p className="text-xs text-gray-500 mt-1">Leave empty for standard shipping times</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shipping Charges ({formData.currency})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {formData.currency === 'GBP' ? '£' : formData.currency === 'USD' ? '$' : '€'}
                  </span>
                  <input type="number" step="0.01" name="shipping_charges" value={formData.shipping_charges} onChange={handleChange} placeholder="0.00" min="0" className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Set to 0 for free shipping</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-700">
                  Tip free shipping often helps sales
                </p>
              </div>
            </div>}
        </form>

        {}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-100 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading || !formData.product_name || !formData.price || !formData.product_category} className="px-8 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg" style={{
          background: '#D2A752'
        }}>
            {loading ? <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </> : <>
                <FaSave />
                <span>{editProduct ? 'Update Product' : 'Add Product'}</span>
              </>}
          </button>
        </div>
      </div>
    </div>;
};
export default AddProductForm;
