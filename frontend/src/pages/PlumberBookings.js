import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaCalendarAlt, FaArrowLeft, FaClock, FaMapMarkerAlt, FaUser, 
  FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner,
  FaHourglassHalf, FaFilter, FaPoundSign, FaClipboardList, FaEye, FaTimes,
  FaPlay, FaCheck, FaBan
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';

const PlumberBookings = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'all',
    date_from: '',
    date_to: ''
  });

  const statusColors = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: FaHourglassHalf },
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaCheckCircle },
    in_progress: { bg: 'bg-purple-100', text: 'text-purple-700', icon: FaSpinner },
    completed: { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheckCircle },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: FaTimesCircle }
  };

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await plumberAPI.getPlumberBookings(user.id, filters);
      if (response.success) {
        setBookings(response.data.bookings || []);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      // Show empty state instead of error for no bookings table
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await plumberAPI.getBookingStats(user.id);
      if (response.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Default stats if no bookings table exists yet
      setStats({
        pending_count: 0,
        confirmed_count: 0,
        in_progress_count: 0,
        completed_count: 0,
        cancelled_count: 0,
        total_count: 0,
        total_earnings: 0,
        today_count: 0,
        week_count: 0
      });
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
      fetchStats();
    }
  }, [user, fetchBookings, fetchStats]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setUpdatingStatus(bookingId);
    try {
      const response = await plumberAPI.updateBookingStatus(bookingId, newStatus);
      if (response.success) {
        setBookings(prev => prev.map(b => 
          b.id === bookingId ? { ...b, status: newStatus } : b
        ));
        fetchStats();
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D2A752] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
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
                  <FaCalendarAlt className="text-2xl" style={{ color: '#D2A752' }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
                  <p className="text-sm text-gray-600">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                showFilters ? 'bg-[#D2A752] text-white' : 'border-2 border-[#D2A752] text-[#D2A752]'
              }`}
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-yellow-500">{stats?.pending_count || 0}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">{stats?.confirmed_count || 0}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-purple-500">{stats?.in_progress_count || 0}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{stats?.completed_count || 0}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center col-span-2 md:col-span-1">
            <div className="text-3xl font-bold" style={{ color: '#D2A752' }}>
              £{parseFloat(stats?.total_earnings || 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Total Earned</div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D2A752]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={filters.date_from}
                  onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D2A752]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={filters.date_to}
                  onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D2A752]"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ status: 'all', date_from: '', date_to: '' })}
                  className="w-full px-4 py-2 rounded-lg font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaClipboardList className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-4">
              When customers book your services, they'll appear here.
            </p>
            <p className="text-sm text-gray-400">
              Make sure your services are active and your availability is set up to receive bookings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const statusConfig = statusColors[booking.status] || statusColors.pending;
              const StatusIcon = statusConfig.icon;
              
              return (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="text-xs" />
                            {booking.status.replace('_', ' ').charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ')}
                          </span>
                          <span className="text-sm text-gray-500">#{booking.id}</span>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <FaCalendarAlt className="text-[#D2A752]" />
                            <span className="font-medium">{formatDate(booking.booking_date)}</span>
                            {booking.booking_time && (
                              <span className="text-gray-500">at {formatTime(booking.booking_time)}</span>
                            )}
                          </div>
                          
                          {booking.customer_name && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaUser className="text-[#D2A752]" />
                              <span>{booking.customer_name}</span>
                            </div>
                          )}
                          
                          {booking.service_name && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaClipboardList className="text-[#D2A752]" />
                              <span>{booking.service_name}</span>
                            </div>
                          )}
                          
                          {booking.total_amount && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <FaPoundSign className="text-[#D2A752]" />
                              <span className="font-bold">{parseFloat(booking.total_amount).toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                        
                        {booking.customer_address && (
                          <div className="flex items-start gap-2 text-gray-600 mt-2 text-sm">
                            <FaMapMarkerAlt className="text-[#D2A752] mt-0.5" />
                            <span>{booking.customer_address}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="px-4 py-2 rounded-lg font-medium text-[#D2A752] border-2 border-[#D2A752] hover:bg-[#D2A752] hover:text-white transition-all flex items-center gap-2"
                        >
                          <FaEye />
                          View
                        </button>
                        
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              disabled={updatingStatus === booking.id}
                              className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                              <FaCheck />
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              disabled={updatingStatus === booking.id}
                              className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                              <FaBan />
                              Decline
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'in_progress')}
                            disabled={updatingStatus === booking.id}
                            className="px-4 py-2 rounded-lg font-medium bg-purple-500 text-white hover:bg-purple-600 transition-all flex items-center gap-2 disabled:opacity-50"
                          >
                            <FaPlay />
                            Start Job
                          </button>
                        )}
                        
                        {booking.status === 'in_progress' && (
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                            disabled={updatingStatus === booking.id}
                            className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2 disabled:opacity-50"
                          >
                            <FaCheckCircle />
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Status Badge */}
              <div className="mb-6 text-center">
                {(() => {
                  const statusConfig = statusColors[selectedBooking.status] || statusColors.pending;
                  const StatusIcon = statusConfig.icon;
                  return (
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon />
                      {selectedBooking.status.replace('_', ' ').charAt(0).toUpperCase() + selectedBooking.status.slice(1).replace('_', ' ')}
                    </span>
                  );
                })()}
              </div>

              {/* Booking Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Appointment</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-[#D2A752]" />
                      <span>{formatDate(selectedBooking.booking_date)}</span>
                    </div>
                    {selectedBooking.booking_time && (
                      <div className="flex items-center gap-3">
                        <FaClock className="text-[#D2A752]" />
                        <span>{formatTime(selectedBooking.booking_time)}</span>
                      </div>
                    )}
                    {selectedBooking.service_name && (
                      <div className="flex items-center gap-3">
                        <FaClipboardList className="text-[#D2A752]" />
                        <span>{selectedBooking.service_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Customer</h3>
                  <div className="space-y-2">
                    {selectedBooking.customer_name && (
                      <div className="flex items-center gap-3">
                        <FaUser className="text-[#D2A752]" />
                        <span>{selectedBooking.customer_name}</span>
                      </div>
                    )}
                    {selectedBooking.customer_email && (
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#D2A752]" />
                        <span>{selectedBooking.customer_email}</span>
                      </div>
                    )}
                    {selectedBooking.customer_phone && (
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-[#D2A752]" />
                        <span>{selectedBooking.customer_phone}</span>
                      </div>
                    )}
                    {selectedBooking.customer_address && (
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-[#D2A752] mt-1" />
                        <span>{selectedBooking.customer_address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes & Payment */}
                {(selectedBooking.customer_notes || selectedBooking.total_amount) && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Details</h3>
                    {selectedBooking.customer_notes && (
                      <p className="text-gray-600 mb-3">{selectedBooking.customer_notes}</p>
                    )}
                    {selectedBooking.total_amount && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="font-medium text-gray-700">Total Amount</span>
                        <span className="text-xl font-bold" style={{ color: '#D2A752' }}>
                          £{parseFloat(selectedBooking.total_amount).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                {selectedBooking.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedBooking.id, 'confirmed');
                    }}
                    disabled={updatingStatus === selectedBooking.id}
                    className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: '#D2A752' }}
                  >
                    {updatingStatus === selectedBooking.id ? 'Updating...' : 'Confirm Booking'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlumberBookings;
