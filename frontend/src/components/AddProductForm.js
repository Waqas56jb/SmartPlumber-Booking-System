import React, { useState } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import { productAPI } from '../services/apiService';

const AddProductForm = ({ onClose, onSuccess, sellerId }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_category: '',
    product_brand: '',
    product_model: '',
    sku: '',
    price: '',
    original_price: '',
    stock_quantity: '',
    min_order_quantity: '1',
    max_order_quantity: '',
    weight_kg: '',
    dimensions: '',
    material: '',
    color: '',
    warranty_period_months: '',
    delivery_time_hours: '',
    shipping_charges: '0',
    currency: 'GBP'
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'boiler_installations', label: 'Boiler Installations & Servicing' },
    { value: 'boiler_repairs', label: 'Boiler Repairs & Fault Finding' },
    { value: 'central_heating', label: 'Central Heating' },
    { value: 'general_plumbing', label: 'General Plumbing' },
    { value: 'gas_safety', label: 'Gas Safety Inspections' },
    { value: 'leak_detection', label: 'Leak Detection & Repairs' },
    { value: 'power_flushing', label: 'Power Flushing' },
    { value: 'water_heaters', label: 'Water Heaters' },
    { value: 'pipe_installation', label: 'Pipe Installation & Repairs' },
    { value: 'hot_water_cylinders', label: 'Hot Water Cylinders' },
    { value: 'appliances_installation', label: 'New Appliances Installations' },
    { value: 'any_repairs', label: 'Any Repairs' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        seller_id: sellerId,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        min_order_quantity: parseInt(formData.min_order_quantity) || 1,
        max_order_quantity: formData.max_order_quantity ? parseInt(formData.max_order_quantity) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        warranty_period_months: formData.warranty_period_months ? parseInt(formData.warranty_period_months) : null,
        delivery_time_hours: formData.delivery_time_hours ? parseFloat(formData.delivery_time_hours) : null,
        shipping_charges: parseFloat(formData.shipping_charges) || 0
      };

      const response = await productAPI.createProduct(productData);
      if (response.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Category *
              </label>
              <select
                name="product_category"
                value={formData.product_category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SKU (Optional)
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="product_description"
                value={formData.product_description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Brand & Model */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="product_brand"
                value={formData.product_brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                name="product_model"
                value={formData.product_model}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (GBP) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Price (for discount)
              </label>
              <input
                type="number"
                step="0.01"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Order Quantity
              </label>
              <input
                type="number"
                name="min_order_quantity"
                value={formData.min_order_quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Delivery */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Time (hours)
              </label>
              <input
                type="number"
                step="0.5"
                name="delivery_time_hours"
                value={formData.delivery_time_hours}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shipping Charges (GBP)
              </label>
              <input
                type="number"
                step="0.01"
                name="shipping_charges"
                value={formData.shipping_charges}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.01"
                name="weight_kg"
                value={formData.weight_kg}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dimensions (e.g., 10x5x3 cm)
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D2A752' }}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: '#D2A752' }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Create Product</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{ borderColor: '#D2A752', color: '#D2A752' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
