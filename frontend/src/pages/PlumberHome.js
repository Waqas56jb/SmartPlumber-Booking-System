import React, { useState, useEffect, useCallback } from 'react';
import { FaWrench, FaMapMarkerAlt, FaPoundSign, FaStar, FaPhone, FaEnvelope, FaEdit, FaSignOutAlt, FaTools, FaCalendarCheck, FaToggleOn } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';
const PLUMBER_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
const PlumberHome = () => {
  const {
    user,
    logout
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    logout();
    navigate('/plumber-login');
  };
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await plumberAPI.getPlumberProfile(user.id);
      if (response.success) {
        setProfile(response.data.plumber);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
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
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
              background: '#F5E6D3'
            }}>
                <FaWrench className="text-2xl" style={{
                color: '#D2A752'
              }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Plumber Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile?.full_name || user?.plumber_username || 'Plumber'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/plumber-edit-profile')} className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{
              background: '#D2A752'
            }}>
                <FaEdit className="inline mr-2" />
                Edit Profile
              </button>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg font-semibold text-red-600 border-2 border-red-600 transition-all hover:bg-red-600 hover:text-white" title="Logout">
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {}
            <div className="flex-shrink-0">
              <img src={PLUMBER_AVATAR} alt={profile?.full_name || 'Plumber'} className="w-32 h-32 rounded-full object-cover border-4 bg-gray-100" style={{
              borderColor: '#D2A752'
            }} />
            </div>

            {}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {profile?.full_name || user?.plumber_username || 'Plumber Name'}
                  </h2>
                  <p className="text-gray-600 mb-2">{profile?.plumber_bio || 'No bio available'}</p>
                  
                  {}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className={i < Math.floor(Number(profile?.plumber_rating) || 0) ? 'text-yellow-400' : 'text-gray-300'} />)}
                    </div>
                    <span className="text-gray-700 font-semibold">
                      {profile?.plumber_rating ? Number(profile.plumber_rating).toFixed(1) : '0.0'}
                    </span>
                    <span className="text-gray-500">
                      ({profile?.total_reviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 rounded-lg" style={{
                background: '#F5E6D3'
              }}>
                  <div className="text-2xl font-bold" style={{
                  color: '#D2A752'
                }}>
                    {profile?.plumber_total_jobs || 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Jobs</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{
                background: '#F5E6D3'
              }}>
                  <div className="text-2xl font-bold" style={{
                  color: '#D2A752'
                }}>
                    {profile?.plumber_completed_jobs || 0}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{
                background: '#F5E6D3'
              }}>
                  <div className="text-2xl font-bold" style={{
                  color: '#D2A752'
                }}>
                    {profile?.experience_years || 0}
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{
                background: '#F5E6D3'
              }}>
                  <div className="text-2xl font-bold" style={{
                  color: '#D2A752'
                }}>
                    {profile?.is_available ? 'Available' : 'Busy'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          {}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {profile?.phone_number && <div className="flex items-center gap-3">
                  <FaPhone className="text-[#D2A752]" />
                  <span className="text-gray-700">{profile.phone_number}</span>
                </div>}
              {profile?.email && <div className="flex items-center gap-3">
                  <FaEnvelope className="text-[#D2A752]" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>}
              {profile?.location_address && <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#D2A752] mt-1" />
                  <div>
                    <div className="text-gray-700">{profile.location_address}</div>
                    {profile.city && <div className="text-gray-500 text-sm">{profile.city}, {profile.state || ''}</div>}
                  </div>
                </div>}
            </div>
          </div>

          {}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing & Services</h3>
            <div className="space-y-3">
              {profile?.per_hour_charges && <div className="flex items-center gap-3">
                  <FaPoundSign className="text-[#D2A752]" />
                  <div>
                    <div className="text-gray-700 font-semibold">
                      {profile.currency || 'GBP'} {profile.per_hour_charges}/hour
                    </div>
                    {profile.minimum_charge && <div className="text-gray-500 text-sm">
                        Minimum: {profile.currency || 'GBP'} {profile.minimum_charge}
                      </div>}
                  </div>
                </div>}
              {profile?.specializations && profile.specializations.length > 0 && <div>
                  <div className="text-sm text-gray-600 mb-2">Specializations:</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.specializations.map((spec, idx) => <span key={idx} className="px-3 py-1 rounded-full text-sm font-medium text-white" style={{
                  background: '#D2A752'
                }}>
                        {spec}
                      </span>)}
                  </div>
                </div>}
            </div>
          </div>
        </div>

        {}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button onClick={() => navigate('/plumber-services')} className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all flex items-center justify-center gap-2">
              <FaTools />
              Manage Services
            </button>
            <button onClick={() => navigate('/plumber-bookings')} className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all flex items-center justify-center gap-2">
              <FaCalendarCheck />
              View Bookings
            </button>
            <button onClick={() => navigate('/plumber-availability')} className="p-4 rounded-lg border-2 border-[#D2A752] text-[#D2A752] font-semibold hover:bg-[#D2A752] hover:text-white transition-all flex items-center justify-center gap-2">
              <FaToggleOn />
              Update Availability
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default PlumberHome;
