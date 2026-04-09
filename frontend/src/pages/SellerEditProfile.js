import React, { useState, useEffect, useCallback } from 'react';
import { FaStore, FaArrowLeft, FaSave, FaCamera, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck, FaCreditCard, FaMoneyBillWave, FaPaypal, FaUniversity } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { sellerAPI } from '../services/apiService';
// i update seller shop fields and optional base64 banner through profile api
const SellerEditProfile = () => {
  const {
    user
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');
  const [formData, setFormData] = useState({
    seller_shop_name: '',
    seller_bio: '',
    shop_category: '',
    phone_number: '',
    email: '',
    whatsapp_number: '',
    shop_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'UK',
    delivery_available: true,
    delivery_time_hours: '',
    delivery_radius_km: '',
    delivery_charges: '',
    free_delivery_above: '',
    accepts_online_payment: true,
    accepts_cash_on_delivery: true,
    bank_name: '',
    account_holder_name: '',
    account_number: '',
    sort_code: '',
    paypal_email: ''
  });
  const shopCategories = ['Plumbing Supplies', 'Heating Equipment', 'Boiler Parts', 'Bathroom Fixtures', 'Kitchen Fixtures', 'Pipes & Fittings', 'Tools & Equipment', 'General Sanitary'];
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sellerAPI.getSellerProfile(user.id);
      if (response.success && response.data.seller) {
        const seller = response.data.seller;
        setFormData(prev => ({
          ...prev,
          seller_shop_name: seller.seller_shop_name || '',
          seller_bio: seller.seller_bio || '',
          shop_category: seller.shop_category || '',
          phone_number: seller.phone_number || '',
          email: seller.seller_email || seller.email || '',
          whatsapp_number: seller.whatsapp_number || '',
          shop_address: seller.shop_address || '',
          city: seller.city || '',
          state: seller.state || '',
          zip_code: seller.zip_code || '',
          country: seller.country || 'UK',
          delivery_available: seller.delivery_available ?? true,
          delivery_time_hours: seller.delivery_time_hours || '',
          delivery_radius_km: seller.delivery_radius_km || '',
          delivery_charges: seller.delivery_charges || '',
          free_delivery_above: seller.free_delivery_above || '',
          accepts_online_payment: seller.accepts_online_payment ?? true,
          accepts_cash_on_delivery: seller.accepts_cash_on_delivery ?? true,
          bank_name: seller.bank_name || '',
          account_holder_name: seller.account_holder_name || '',
          account_number: seller.account_number || '',
          sort_code: seller.sort_code || '',
          paypal_email: seller.paypal_email || ''
        }));
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user, fetchProfile]);
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/home');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSaving(false);
    }
  };
  const tabs = [{
    id: 'shop',
    label: 'Shop Info',
    icon: FaStore
  }, {
    id: 'contact',
    label: 'Contact',
    icon: FaPhone
  }, {
    id: 'delivery',
    label: 'Delivery',
    icon: FaTruck
  }, {
    id: 'payment',
    label: 'Payment',
    icon: FaCreditCard
  }];
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
    }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen" style={{
    background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
  }}>
      {}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                  <h1 className="text-xl font-bold text-gray-900">Edit Shop Profile</h1>
                  <p className="text-sm text-gray-500">Update your shop details</p>
                </div>
              </div>
            </div>
            <button onClick={handleSubmit} disabled={saving} className="px-6 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 hover:shadow-lg disabled:opacity-50" style={{
            background: '#D2A752'
          }}>
              {saving ? <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </> : <>
                  <FaSave /> Save Changes
                </>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'text-[#D2A752] border-b-2 border-[#D2A752] bg-[#F5E6D3]/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>;
          })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {}
          {activeTab === 'shop' && <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaStore className="text-[#D2A752]" /> Shop Information
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name *</label>
                <input type="text" name="seller_shop_name" value={formData.seller_shop_name} onChange={handleChange} placeholder="Enter your shop name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Category</label>
                <select name="shop_category" value={formData.shop_category} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                  <option value="">Select category</option>
                  {shopCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Description</label>
                <textarea name="seller_bio" value={formData.seller_bio} onChange={handleChange} placeholder="Tell customers about your shop..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all resize-none" />
              </div>

              {}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaCamera className="text-[#D2A752]" /> Shop Photos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(idx => <div key={idx} className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all">
                      <FaCamera className="text-3xl text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                    </div>)}
                </div>
                <p className="text-xs text-gray-500 mt-2">Upload up to 4 photos of your shop (coming soon)</p>
              </div>
            </div>}

          {}
          {activeTab === 'contact' && <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaPhone className="text-[#D2A752]" /> Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+44 7700 900000" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder="+44 7700 900000" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="shop@example.com" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#D2A752]" /> Shop Address
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                    <input type="text" name="shop_address" value={formData.shop_address} onChange={handleChange} placeholder="123 Main Street" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="London" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State/County</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Greater London" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                      <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="SW1A 1AA" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {}
          {activeTab === 'delivery' && <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaTruck className="text-[#D2A752]" /> Delivery Settings
              </h2>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Delivery Available</h3>
                  <p className="text-sm text-gray-500">Enable delivery service for your products</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="delivery_available" checked={formData.delivery_available} onChange={handleChange} className="sr-only peer" />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#D2A752]"></div>
                </label>
              </div>

              {formData.delivery_available && <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time (hours)</label>
                      <input type="number" name="delivery_time_hours" value={formData.delivery_time_hours} onChange={handleChange} placeholder="24" min="1" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Radius (km)</label>
                      <input type="number" name="delivery_radius_km" value={formData.delivery_radius_km} onChange={handleChange} placeholder="10" min="1" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Charges (£)</label>
                      <input type="number" step="0.01" name="delivery_charges" value={formData.delivery_charges} onChange={handleChange} placeholder="5.00" min="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Free Delivery Above (£)</label>
                      <input type="number" step="0.01" name="free_delivery_above" value={formData.free_delivery_above} onChange={handleChange} placeholder="50.00" min="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                  </div>
                </>}
            </div>}

          {}
          {activeTab === 'payment' && <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FaCreditCard className="text-[#D2A752]" /> Payment Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-[#D2A752] text-xl" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Online Payment</h3>
                      <p className="text-sm text-gray-500">Accept card payments</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="accepts_online_payment" checked={formData.accepts_online_payment} onChange={handleChange} className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#D2A752]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className="text-[#D2A752] text-xl" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">Accept cash when delivering</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="accepts_cash_on_delivery" checked={formData.accepts_cash_on_delivery} onChange={handleChange} className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#D2A752]"></div>
                  </label>
                </div>
              </div>

              {}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaUniversity className="text-[#D2A752]" /> Bank Account Details
                </h3>
                <p className="text-sm text-gray-500 mb-4">For receiving payments from customers</p>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                      <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} placeholder="Barclays, HSBC, etc." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name</label>
                      <input type="text" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} placeholder="Full name as on account" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                      <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} placeholder="12345678" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Code</label>
                      <input type="text" name="sort_code" value={formData.sort_code} onChange={handleChange} placeholder="12-34-56" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaPaypal className="text-[#D2A752]" /> PayPal Account
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PayPal Email</label>
                  <div className="relative">
                    <FaPaypal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" name="paypal_email" value={formData.paypal_email} onChange={handleChange} placeholder="your.paypal@email.com" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
                  </div>
                </div>
              </div>
            </div>}

          {}
          <div className="mt-6 md:hidden">
            <button type="submit" disabled={saving} className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50" style={{
            background: '#D2A752'
          }}>
              {saving ? <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </> : <>
                  <FaSave /> Save Changes
                </>}
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default SellerEditProfile;
