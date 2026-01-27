import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaWrench, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, 
  FaArrowLeft, FaPoundSign, FaClock, FaTimes, FaSave, FaTools,
  FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';

const PlumberServices = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    service_name: '',
    service_description: '',
    price: '',
    price_type: 'hourly',
    duration_hours: '',
    is_active: true
  });

  // Predefined service suggestions
  const serviceSuggestions = [
    'Boiler Installation', 'Boiler Repair', 'Boiler Servicing',
    'Central Heating Installation', 'Radiator Installation', 'Radiator Repair',
    'Leak Detection', 'Leak Repair', 'Pipe Installation',
    'Pipe Repair', 'Drain Unblocking', 'Drain Cleaning',
    'Bathroom Plumbing', 'Kitchen Plumbing', 'Toilet Repair',
    'Tap Installation', 'Tap Repair', 'Shower Installation',
    'Water Heater Installation', 'Water Heater Repair', 'Gas Safety Check',
    'Emergency Plumbing', 'Power Flushing', 'Water Tank Installation'
  ];

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await plumberAPI.getPlumberServices(user.id);
      if (response.success) {
        setServices(response.data.services || []);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
      setActionMessage({ type: 'error', text: 'Failed to load services' });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchServices();
    }
  }, [user, fetchServices]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.service_name.trim()) {
      setActionMessage({ type: 'error', text: 'Service name is required' });
      return;
    }

    setSaving(true);
    try {
      const serviceData = {
        ...formData,
        plumber_id: user.id,
        price: formData.price ? parseFloat(formData.price) : null,
        duration_hours: formData.duration_hours ? parseFloat(formData.duration_hours) : null
      };

      if (editingService) {
        const response = await plumberAPI.updatePlumberService(editingService.id, serviceData);
        if (response.success) {
          setActionMessage({ type: 'success', text: 'Service updated successfully' });
          setServices(prev => prev.map(s => s.id === editingService.id ? response.data.service : s));
        }
      } else {
        const response = await plumberAPI.createPlumberService(serviceData);
        if (response.success) {
          setActionMessage({ type: 'success', text: 'Service created successfully' });
          setServices(prev => [response.data.service, ...prev]);
        }
      }
      
      handleCloseModal();
    } catch (error) {
      setActionMessage({ type: 'error', text: error.message || 'Failed to save service' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      service_name: service.service_name || '',
      service_description: service.service_description || '',
      price: service.price || '',
      price_type: service.price_type || 'hourly',
      duration_hours: service.duration_hours || '',
      is_active: service.is_active !== false
    });
    setShowModal(true);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await plumberAPI.deletePlumberService(serviceId);
      if (response.success) {
        setActionMessage({ type: 'success', text: 'Service deleted successfully' });
        setServices(prev => prev.filter(s => s.id !== serviceId));
      }
    } catch (error) {
      setActionMessage({ type: 'error', text: 'Failed to delete service' });
    }
  };

  const handleToggleStatus = async (serviceId) => {
    try {
      const response = await plumberAPI.togglePlumberServiceStatus(serviceId);
      if (response.success) {
        setActionMessage({ type: 'success', text: response.message || 'Service status updated' });
        setServices(prev => prev.map(s => 
          s.id === serviceId ? { ...s, is_active: !s.is_active } : s
        ));
      }
    } catch (error) {
      setActionMessage({ type: 'error', text: 'Failed to update service status' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({
      service_name: '',
      service_description: '',
      price: '',
      price_type: 'hourly',
      duration_hours: '',
      is_active: true
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, service_name: suggestion }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/home')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                  <FaTools className="text-2xl" style={{ color: '#D2A752' }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manage Services</h1>
                  <p className="text-sm text-gray-600">{services.length} service{services.length !== 1 ? 's' : ''} listed</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2" 
              style={{ background: '#D2A752' }}
            >
              <FaPlus />
              Add Service
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Message */}
        {actionMessage.text && (
          <div className={`flex items-center justify-between gap-2 p-4 rounded-xl mb-6 ${
            actionMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {actionMessage.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
              <span className="font-medium">{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage({ type: '', text: '' })} className="text-current hover:opacity-70">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold" style={{ color: '#D2A752' }}>{services.length}</div>
            <div className="text-sm text-gray-600">Total Services</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{services.filter(s => s.is_active).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-gray-400">{services.filter(s => !s.is_active).length}</div>
            <div className="text-sm text-gray-600">Inactive</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">
              {services.filter(s => s.price).length > 0 
                ? `£${Math.round(services.filter(s => s.price).reduce((a, b) => a + parseFloat(b.price), 0) / services.filter(s => s.price).length)}`
                : '£0'}
            </div>
            <div className="text-sm text-gray-600">Avg. Price</div>
          </div>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaWrench className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Services Yet</h3>
            <p className="text-gray-500 mb-6">Start by adding the services you offer to attract more customers.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 inline-flex items-center gap-2" 
              style={{ background: '#D2A752' }}
            >
              <FaPlus />
              Add Your First Service
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  !service.is_active ? 'opacity-60' : ''
                }`}
              >
                {/* Service Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{service.service_name}</h3>
                      <div className="flex items-center gap-2">
                        {service.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <FaCheckCircle className="text-[10px]" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            <FaExclamationCircle className="text-[10px]" /> Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                      <FaWrench style={{ color: '#D2A752' }} />
                    </div>
                  </div>
                  
                  {service.service_description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{service.service_description}</p>
                  )}
                </div>

                {/* Service Details */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    {service.price ? (
                      <div className="flex items-center gap-1 text-gray-700">
                        <FaPoundSign className="text-[#D2A752]" />
                        <span className="font-bold text-lg">{parseFloat(service.price).toFixed(2)}</span>
                        <span className="text-sm text-gray-500">
                          /{service.price_type === 'hourly' ? 'hr' : service.price_type === 'fixed' ? 'fixed' : 'job'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Price not set</span>
                    )}
                    
                    {service.duration_hours && (
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <FaClock className="text-[#D2A752]" />
                        <span>{service.duration_hours}h</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleToggleStatus(service.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        service.is_active 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {service.is_active ? <FaToggleOff /> : <FaToggleOn />}
                      {service.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Service Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  placeholder="e.g., Boiler Installation"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all"
                  required
                />
                {/* Quick Suggestions */}
                {!editingService && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-1">
                      {serviceSuggestions.slice(0, 8).map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-[#D2A752] hover:text-white transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="service_description"
                  value={formData.service_description}
                  onChange={handleChange}
                  placeholder="Describe what this service includes..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all resize-none"
                />
              </div>

              {/* Price & Type */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaPoundSign className="inline mr-1 text-[#D2A752]" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Type
                  </label>
                  <select
                    name="price_type"
                    value={formData.price_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all bg-white"
                  >
                    <option value="hourly">Per Hour</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="per_job">Per Job</option>
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaClock className="inline mr-1 text-[#D2A752]" />
                  Estimated Duration (hours)
                </label>
                <input
                  type="number"
                  name="duration_hours"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  step="0.5"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all"
                />
              </div>

              {/* Active Status */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#D2A752] focus:ring-[#D2A752]"
                  />
                  <span className="text-gray-700 font-medium">Service is Active</span>
                  {formData.is_active ? (
                    <FaToggleOn className="text-2xl text-green-500" />
                  ) : (
                    <FaToggleOff className="text-2xl text-gray-400" />
                  )}
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-8">
                  Active services are visible to customers
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: '#D2A752' }}
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingService ? 'Update Service' : 'Create Service'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlumberServices;
