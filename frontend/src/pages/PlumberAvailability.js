import React, { useState, useEffect, useCallback } from 'react';
import { FaClock, FaArrowLeft, FaSave, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';

const PlumberAvailability = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [schedule, setSchedule] = useState({
    monday: { enabled: false, start: '09:00', end: '17:00' },
    tuesday: { enabled: false, start: '09:00', end: '17:00' },
    wednesday: { enabled: false, start: '09:00', end: '17:00' },
    thursday: { enabled: false, start: '09:00', end: '17:00' },
    friday: { enabled: false, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' },
    sunday: { enabled: false, start: '09:00', end: '17:00' }
  });

  // Fetch current availability
  const fetchAvailability = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const response = await plumberAPI.getPlumberProfile(user.id);
      if (response.success && response.data?.plumber) {
        const plumber = response.data.plumber;
        setIsAvailable(plumber.is_available !== false);
        
        if (plumber.availability_schedule && typeof plumber.availability_schedule === 'object') {
          setSchedule(prev => ({
            ...prev,
            ...plumber.availability_schedule
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load availability:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Save availability
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await plumberAPI.updatePlumberProfile(user.id, {
        is_available: isAvailable,
        availability_schedule: schedule
      });
      
      if (response.success) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Failed to save availability:', error);
    } finally {
      setSaving(false);
    }
  };

  // Toggle day
  const toggleDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  // Update time
  const updateTime = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  // Quick presets
  const applyPreset = (preset) => {
    switch (preset) {
      case 'standard':
        setSchedule({
          monday: { enabled: true, start: '09:00', end: '17:00' },
          tuesday: { enabled: true, start: '09:00', end: '17:00' },
          wednesday: { enabled: true, start: '09:00', end: '17:00' },
          thursday: { enabled: true, start: '09:00', end: '17:00' },
          friday: { enabled: true, start: '09:00', end: '17:00' },
          saturday: { enabled: false, start: '09:00', end: '17:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        });
        break;
      case 'extended':
        setSchedule({
          monday: { enabled: true, start: '08:00', end: '18:00' },
          tuesday: { enabled: true, start: '08:00', end: '18:00' },
          wednesday: { enabled: true, start: '08:00', end: '18:00' },
          thursday: { enabled: true, start: '08:00', end: '18:00' },
          friday: { enabled: true, start: '08:00', end: '18:00' },
          saturday: { enabled: true, start: '08:00', end: '18:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        });
        break;
      case 'emergency':
        setSchedule({
          monday: { enabled: true, start: '00:00', end: '23:59' },
          tuesday: { enabled: true, start: '00:00', end: '23:59' },
          wednesday: { enabled: true, start: '00:00', end: '23:59' },
          thursday: { enabled: true, start: '00:00', end: '23:59' },
          friday: { enabled: true, start: '00:00', end: '23:59' },
          saturday: { enabled: true, start: '00:00', end: '23:59' },
          sunday: { enabled: true, start: '00:00', end: '23:59' }
        });
        break;
      case 'clear':
        setSchedule({
          monday: { enabled: false, start: '09:00', end: '17:00' },
          tuesday: { enabled: false, start: '09:00', end: '17:00' },
          wednesday: { enabled: false, start: '09:00', end: '17:00' },
          thursday: { enabled: false, start: '09:00', end: '17:00' },
          friday: { enabled: false, start: '09:00', end: '17:00' },
          saturday: { enabled: false, start: '09:00', end: '17:00' },
          sunday: { enabled: false, start: '09:00', end: '17:00' }
        });
        break;
      default:
        break;
    }
  };

  // Format time for display
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading availability...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/home')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                  <FaCalendarAlt className="text-2xl" style={{ color: '#D2A752' }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Update Availability</h1>
                  <p className="text-sm text-gray-500">Set your working schedule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Availability Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Currently Available</h2>
              <p className="text-sm text-gray-500">
                {isAvailable 
                  ? 'You are visible to customers looking for plumbers.'
                  : 'You are hidden from search results.'}
              </p>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-16 h-8 rounded-full transition-all relative ${
                isAvailable ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div 
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all shadow-md ${
                  isAvailable ? 'left-9' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-xl" style={{ color: '#D2A752' }} />
            <h2 className="text-lg font-bold text-gray-900">Weekly Schedule</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Set your working hours for each day of the week. Customers will see when you're available.
          </p>

          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const dayKey = day.toLowerCase();
              const daySchedule = schedule[dayKey];
              
              return (
                <div 
                  key={day} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl transition-all ${
                    daySchedule.enabled 
                      ? 'bg-gradient-to-r from-[#F5E6D3] to-[#FDF8F3] border-2 border-[#D2A752]/30' 
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {/* Day Toggle */}
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <button
                      type="button"
                      onClick={() => toggleDay(dayKey)}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        daySchedule.enabled ? 'bg-[#D2A752]' : 'bg-gray-300'
                      }`}
                    >
                      <div 
                        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-md ${
                          daySchedule.enabled ? 'left-6' : 'left-0.5'
                        }`}
                      />
                    </button>
                    <span className={`font-semibold ${daySchedule.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                      {day}
                    </span>
                  </div>

                  {/* Time Inputs */}
                  {daySchedule.enabled ? (
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium">From</span>
                        <input
                          type="time"
                          value={daySchedule.start}
                          onChange={(e) => updateTime(dayKey, 'start', e.target.value)}
                          className="px-3 py-2 border-2 border-[#D2A752]/30 rounded-lg focus:outline-none focus:border-[#D2A752] bg-white text-gray-900 font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium">To</span>
                        <input
                          type="time"
                          value={daySchedule.end}
                          onChange={(e) => updateTime(dayKey, 'end', e.target.value)}
                          className="px-3 py-2 border-2 border-[#D2A752]/30 rounded-lg focus:outline-none focus:border-[#D2A752] bg-white text-gray-900 font-medium"
                        />
                      </div>
                      <span className="text-sm text-[#D2A752] font-semibold hidden sm:inline">
                        ✓ Working
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <span className="text-gray-400 italic text-sm">Day off - Not available</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Quick Actions:</p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => applyPreset('standard')}
                className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-[#D2A752] text-[#D2A752] hover:bg-[#D2A752] hover:text-white transition-all"
              >
                Standard 9-5 (Mon-Fri)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('extended')}
                className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-[#D2A752] text-[#D2A752] hover:bg-[#D2A752] hover:text-white transition-all"
              >
                Extended Hours (Mon-Sat)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('emergency')}
                className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all"
              >
                24/7 Emergency
              </button>
              <button
                type="button"
                onClick={() => applyPreset('clear')}
                className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Schedule Summary */}
          {Object.keys(schedule).some(day => schedule[day]?.enabled) && (
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#D2A752]/10 to-[#D2A752]/5 border border-[#D2A752]/20">
              <p className="text-sm font-semibold text-gray-700 mb-2">📅 Your Weekly Summary:</p>
              <div className="flex flex-wrap gap-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                  const daySchedule = schedule[day];
                  if (daySchedule?.enabled) {
                    return (
                      <span 
                        key={day} 
                        className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-[#D2A752]/30 shadow-sm"
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}: {formatTime(daySchedule.start)} - {formatTime(daySchedule.end)}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-6 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            style={{ background: '#D2A752' }}
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Save Changes</span>
              </>
            )}
          </button>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-4 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlumberAvailability;
