import React, { useState, useEffect, useCallback } from 'react';
import { FaStore, FaMapMarkerAlt, FaTruck, FaCreditCard, FaMoneyBillWave, FaStar, FaPhone, FaEnvelope, FaEdit, FaBox } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { sellerAPI } from '../services/apiService';
import { toast } from 'react-toastify';

const SellerHome = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sellerAPI.getSellerProfile(user.id);
      if (response.success) {
        setProfile(response.data.seller);
      }
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                <FaStore className="text-2xl" style={{ color: '#D2A752' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Seller Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile?.seller_shop_name || user?.seller_username || 'Seller'}</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg font-semibold text-white transition-all" style={{ background: '#D2A752' }}>
              <FaEdit className="inline mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Shop Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {profile?.seller_shop_name || user?.seller_username || 'Shop Name'}
              </h2>
              <p className="text-gray-600 mb-2">{profile?.seller_bio || 'No bio available'}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(Number(profile?.seller_rating) || 0) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">
                  {profile?.seller_rating ? Number(profile.seller_rating).toFixed(1) : '0.0'}
                </span>
                <span className="text-gray-500">
                  ({profile?.total_reviews || 0} reviews)
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 rounded-lg" style={{ background: '#F5E6D3' }}>
                  <div className="text-2xl font-bold" style={{ color: '#D2A752' }}>
                    {profile?.seller_total_orders || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ background: '#F5E6D3' }}>
                  <div className="text-2xl font-bold" style={{ color: '#D2A752' }}>
                    {profile?.seller_completed_orders || 0}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ background: '#F5E6D3' }}>
                  <div className="text-2xl font-bold" style={{ color: '#D2A752' }}>
                    {profile?.seller_total_sales || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ background: '#F5E6D3' }}>
                  <div className="text-2xl font-bold" style={{ color: '#D2A752' }}>
                    {profile?.experience_years || 0}
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {profile?.phone_number && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-[#D2A752]" />
                  <span className="text-gray-700">{profile.phone_number}</span>
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-[#D2A752]" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
              )}
              {profile?.shop_address && (
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#D2A752] mt-1" />
                  <div>
                    <div className="text-gray-700">{profile.shop_address}</div>
                    {profile.city && <div className="text-gray-500 text-sm">{profile.city}, {profile.state || ''}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery & Payment</h3>
            <div className="space-y-3">
              {profile?.delivery_available && (
                <div className="flex items-center gap-3">
                  <FaTruck className="text-[#D2A752]" />
                  <div>
                    <div className="text-gray-700 font-semibold">Delivery Available</div>
                    {profile.delivery_time_hours && (
                      <div className="text-gray-500 text-sm">
                        Delivery Time: {profile.delivery_time_hours} hours
                      </div>
                    )}
                    {profile.delivery_radius_km && (
                      <div className="text-gray-500 text-sm">
                        Radius: {profile.delivery_radius_km} km
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {profile?.accepts_online_payment ? (
                  <FaCreditCard className="text-green-500" />
                ) : (
                  <FaCreditCard className="text-gray-300" />
                )}
                <span className="text-gray-700">
                  Online Payment: {profile?.accepts_online_payment ? 'Accepted' : 'Not Accepted'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {profile?.accepts_cash_on_delivery ? (
                  <FaMoneyBillWave className="text-green-500" />
                ) : (
                  <FaMoneyBillWave className="text-gray-300" />
                )}
                <span className="text-gray-700">
                  Cash on Delivery: {profile?.accepts_cash_on_delivery ? 'Accepted' : 'Not Accepted'}
                </span>
              </div>
              {profile?.delivery_charges !== undefined && (
                <div className="text-gray-700">
                  <span className="font-semibold">Delivery Charges:</span> GBP {profile.delivery_charges}
                  {profile.free_delivery_above && (
                    <span className="text-gray-500 text-sm ml-2">
                      (Free above GBP {profile.free_delivery_above})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/seller-products')}
              className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <FaBox />
              Manage Products
            </button>
            <button className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all">
              View Orders
            </button>
            <button className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all">
              Upload Shop Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
