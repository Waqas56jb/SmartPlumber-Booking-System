import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaWrench, FaUser, FaCamera, FaSave, FaTimes, FaMapMarkerAlt, 
  FaPoundSign, FaPhone, FaEnvelope, FaIdCard, FaGraduationCap, 
  FaBriefcase, FaClock, FaToggleOn, FaToggleOff, FaCheck
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';
import { toast } from 'react-toastify';

const PlumberEditProfile = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: '',
    plumber_bio: '',
    phone_number: '',
    email: '',
    cnic: '',
    
    // Location Information
    location_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'UK',
    latitude: '',
    longitude: '',
    
    // Pricing Information
    per_hour_charges: '',
    currency: 'GBP',
    minimum_charge: '',
    
    // Professional Information
    experience_years: '',
    license_number: '',
    certifications: [],
    specializations: [],
    
    // Availability
    is_available: true,
    availability_schedule: {}
  });

  const [newCertification, setNewCertification] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [newSpecialization, setNewSpecialization] = useState(''); // Reserved for custom specialization input

  // Common specializations for plumbers
  const commonSpecializations = [
    'Emergency Plumbing', 'Boiler Installation', 'Heating Systems', 
    'Drainage', 'Bathroom Fitting', 'Kitchen Plumbing', 
    'Radiator Installation', 'Leak Detection', 'Pipe Repair',
    'Water Heater', 'Gas Fitting', 'Blocked Drains'
  ];

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await plumberAPI.getPlumberProfile(user.id);
      if (response.success) {
        const profile = response.data.plumber;
        setFormData({
          full_name: profile.full_name || '',
          plumber_bio: profile.plumber_bio || '',
          phone_number: profile.phone_number || '',
          email: profile.email || '',
          cnic: profile.cnic || '',
          location_address: profile.location_address || '',
          city: profile.city || '',
          state: profile.state || '',
          zip_code: profile.zip_code || '',
          country: profile.country || 'UK',
          latitude: profile.latitude || '',
          longitude: profile.longitude || '',
          per_hour_charges: profile.per_hour_charges || '',
          currency: profile.currency || 'GBP',
          minimum_charge: profile.minimum_charge || '',
          experience_years: profile.experience_years || '',
          license_number: profile.license_number || '',
          certifications: profile.certifications || [],
          specializations: profile.specializations || [],
          is_available: profile.is_available !== undefined ? profile.is_available : true,
          availability_schedule: profile.availability_schedule || {}
        });
        if (profile.plumber_thumbnail_photo) {
          setProfileImagePreview(profile.plumber_thumbnail_photo);
        }
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Compress image to reduce size for upload (very small for database storage)
  const compressImage = (file, maxSize = 150, quality = 0.5) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions - fit within maxSize x maxSize
          const ratio = Math.min(maxSize / width, maxSize / height);
          if (ratio < 1) {
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          // Use better image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to JPEG with low quality for small size
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Log the size for debugging
          const sizeKB = Math.round(compressedDataUrl.length * 0.75 / 1024);
          console.log(`Image compressed: ${width}x${height}, ~${sizeKB}KB`);
          
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      try {
        // Compress image before preview/upload (150x150, 50% quality = ~5-15KB)
        toast.info('Compressing image...', { autoClose: 1000 });
        const compressedImage = await compressImage(file, 150, 0.5);
        setProfileImagePreview(compressedImage);
        toast.success('Image ready!', { autoClose: 1500 });
      } catch (error) {
        console.error('Image compression error:', error);
        toast.error('Failed to process image');
      }
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleAddSpecialization = (spec) => {
    if (!formData.specializations.includes(spec)) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, spec]
      }));
    }
  };

  const handleRemoveSpecialization = (spec) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== spec)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Prepare data for submission
      const submitData = { ...formData };

      // Convert numeric fields - handle empty strings as null
      const numericFields = ['per_hour_charges', 'minimum_charge', 'experience_years', 'latitude', 'longitude'];
      numericFields.forEach(field => {
        if (submitData[field] === '' || submitData[field] === null || submitData[field] === undefined) {
          submitData[field] = null;
        } else {
          const parsed = field === 'experience_years' 
            ? parseInt(submitData[field]) 
            : parseFloat(submitData[field]);
          submitData[field] = isNaN(parsed) ? null : parsed;
        }
      });

      // Handle image upload - store base64 data URL directly in database
      // Vercel-compatible: No external cloud storage needed
      if (profileImagePreview && profileImagePreview.startsWith('data:image')) {
        // Store compressed base64 data URL directly
        submitData.plumber_thumbnail_photo = profileImagePreview;
      } else if (profileImagePreview && profileImagePreview.startsWith('http')) {
        // If it's a URL (from existing profile), keep it
        submitData.plumber_thumbnail_photo = profileImagePreview;
      } else {
        // No image, remove from submission
        delete submitData.plumber_thumbnail_photo;
      }

      const response = await plumberAPI.updatePlumberProfile(user.id, submitData);

      if (response.success) {
        toast.success('Profile updated successfully!');
        navigate('/home');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

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
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                <FaWrench className="text-2xl" style={{ color: '#D2A752' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-sm text-gray-600">Update your plumber profile information</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-all"
            >
              <FaTimes className="inline mr-2" />
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Photo Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaCamera className="text-[#D2A752]" />
              Profile Photo
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4"
                    style={{ borderColor: '#D2A752' }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                    <FaUser className="text-6xl" style={{ color: '#D2A752' }} />
                  </div>
                )}
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                  style={{ background: '#D2A752' }}
                >
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  Upload a professional photo of yourself. Recommended size: 400x400px. Max 5MB.
                </p>
                <label
                  htmlFor="profile-image"
                  className="inline-block px-4 py-2 rounded-lg font-semibold text-white cursor-pointer transition-all hover:opacity-90"
                  style={{ background: '#D2A752' }}
                >
                  Choose Photo
                </label>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-[#D2A752]" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaPhone className="inline mr-2 text-[#D2A752]" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2 text-[#D2A752]" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaIdCard className="inline mr-2 text-[#D2A752]" />
                  CNIC / ID Number
                </label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio / About Me
                </label>
                <textarea
                  name="plumber_bio"
                  value={formData.plumber_bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell customers about yourself, your experience, and what makes you special..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#D2A752]" />
              Location Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="location_address"
                  value={formData.location_address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State / County
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP / Postcode
                </label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                >
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Latitude (Optional - for live tracking)
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="e.g., 51.5074"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Longitude (Optional - for live tracking)
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="e.g., -0.1278"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaPoundSign className="text-[#D2A752]" />
              Pricing Information
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                >
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Per Hour Charges *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="per_hour_charges"
                  value={formData.per_hour_charges}
                  onChange={handleChange}
                  placeholder="e.g., 25.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Charge
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="minimum_charge"
                  value={formData.minimum_charge}
                  onChange={handleChange}
                  placeholder="e.g., 50.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaBriefcase className="text-[#D2A752]" />
              Professional Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleChange}
                  placeholder="Professional license number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaGraduationCap className="text-[#D2A752]" />
                Certifications
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                  placeholder="Add certification (e.g., Gas Safe Registered)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A752]"
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: '#D2A752' }}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-2"
                    style={{ background: '#D2A752' }}
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="hover:text-red-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specializations
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonSpecializations.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => {
                      if (formData.specializations.includes(spec)) {
                        handleRemoveSpecialization(spec);
                      } else {
                        handleAddSpecialization(spec);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      formData.specializations.includes(spec)
                        ? 'text-white'
                        : 'text-gray-700 border-2 border-gray-300 hover:border-[#D2A752]'
                    }`}
                    style={formData.specializations.includes(spec) ? { background: '#D2A752' } : {}}
                  >
                    {formData.specializations.includes(spec) && (
                      <FaCheck className="inline mr-1" />
                    )}
                    {spec}
                  </button>
                ))}
              </div>
              {formData.specializations.length > 0 && (
                <p className="text-sm text-gray-600">
                  Selected: {formData.specializations.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaClock className="text-[#D2A752]" />
              Availability
            </h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#D2A752] focus:ring-[#D2A752]"
                />
                <span className="text-gray-700 font-semibold">Currently Available</span>
                {formData.is_available ? (
                  <FaToggleOn className="text-3xl text-green-500" />
                ) : (
                  <FaToggleOff className="text-3xl text-gray-400" />
                )}
              </label>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {formData.is_available 
                ? 'You are currently available for new bookings.'
                : 'You are currently not available for new bookings.'}
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              type="button"
              onClick={() => navigate('/home')}
              className="px-6 py-3 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlumberEditProfile;
