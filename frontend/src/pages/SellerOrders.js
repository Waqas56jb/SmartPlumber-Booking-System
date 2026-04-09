import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaArrowLeft, FaSearch, FaEye, FaCheck, FaTimes, FaTruck, FaBox, FaClock, FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard, FaPoundSign } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
// i keep rich demo orders so payment ui can render before live orders api ships
const mockOrders = [{
  id: 1,
  order_number: 'ORD-2026-001',
  customer_name: 'John Smith',
  customer_phone: '+44 7700 900123',
  customer_address: '123 Main Street, London, UK',
  items: [{
    name: 'Bosch Combi Boiler',
    quantity: 1,
    price: 899.99
  }, {
    name: 'Copper Pipes 15mm (10m)',
    quantity: 2,
    price: 24.99
  }],
  subtotal: 949.97,
  shipping: 0,
  tax: 0,
  total: 949.97,
  status: 'pending',
  payment_method: 'Visa **** 4242',
  payment: {
    status: 'paid',
    transaction_id: 'txn_sp_8f2a9c1e4b7d',
    gateway_ref: 'pi_3QxY9UK2e4v9mN0a',
    paid_at: '2026-01-27T10:31:05Z',
    last4: '4242'
  },
  created_at: '2026-01-27T10:30:00Z'
}, {
  id: 2,
  order_number: 'ORD-2026-002',
  customer_name: 'Sarah Johnson',
  customer_phone: '+44 7700 900456',
  customer_address: '456 Oak Road, Manchester, UK',
  items: [{
    name: 'Thermostatic Radiator Valve',
    quantity: 5,
    price: 15.99
  }],
  subtotal: 79.95,
  shipping: 4.99,
  tax: 0,
  total: 84.94,
  status: 'processing',
  payment_method: 'Cash on Delivery',
  payment: {
    status: 'pending_collection',
    transaction_id: null,
    gateway_ref: 'COD-PENDING',
    paid_at: null,
    last4: null
  },
  created_at: '2026-01-26T14:20:00Z'
}, {
  id: 3,
  order_number: 'ORD-2026-003',
  customer_name: 'Mike Williams',
  customer_phone: '+44 7700 900789',
  customer_address: '789 Park Lane, Birmingham, UK',
  items: [{
    name: 'Worcester Bosch Greenstar',
    quantity: 1,
    price: 1299.99
  }],
  subtotal: 1299.99,
  shipping: 0,
  tax: 0,
  total: 1299.99,
  status: 'completed',
  payment_method: 'Mastercard **** 8891',
  payment: {
    status: 'paid',
    transaction_id: 'txn_sp_7d3b1f8a2c6e',
    gateway_ref: 'pi_3QwZmPL9k1x2vY8b',
    paid_at: '2026-01-25T09:16:22Z',
    last4: '8891'
  },
  created_at: '2026-01-25T09:15:00Z'
}, {
  id: 4,
  order_number: 'ORD-2026-004',
  customer_name: 'Emma Davies',
  customer_phone: '+44 7700 901112',
  customer_address: '12 River View, Leeds, UK',
  items: [{
    name: 'PVC Waste Pipe 40mm (2m)',
    quantity: 8,
    price: 5.5
  }, {
    name: 'Compression Elbow 15mm',
    quantity: 12,
    price: 1.8
  }],
  subtotal: 65.6,
  shipping: 3.5,
  tax: 0,
  total: 69.1,
  status: 'shipped',
  payment_method: 'Apple Pay',
  payment: {
    status: 'paid',
    transaction_id: 'txn_ap_9e1c4b7f3a2d',
    gateway_ref: 'ap_1Kx9mN2pQ5rS8tU',
    paid_at: '2026-01-24T11:05:00Z',
    last4: null
  },
  created_at: '2026-01-24T11:04:00Z'
}, {
  id: 5,
  order_number: 'ORD-2026-005',
  customer_name: 'James O’Connor',
  customer_phone: '+44 7700 902233',
  customer_address: '88 Queens Road, Bristol, UK',
  items: [{
    name: 'Thermostatic Shower Mixer',
    quantity: 1,
    price: 129
  }],
  subtotal: 129,
  shipping: 6.99,
  tax: 0,
  total: 135.99,
  status: 'delivered',
  payment_method: 'Visa Debit **** 1102',
  payment: {
    status: 'paid',
    transaction_id: 'txn_sp_4a8e2d9c1f5b',
    gateway_ref: 'pi_3QvAbCdEfGhIjKl',
    paid_at: '2026-01-23T08:40:11Z',
    last4: '1102'
  },
  created_at: '2026-01-23T08:39:00Z'
}, {
  id: 6,
  order_number: 'ORD-2026-006',
  customer_name: 'Priya Patel',
  customer_phone: '+44 7700 903344',
  customer_address: '45 Station Approach, Reading, UK',
  items: [{
    name: 'Wall-Hung Toilet Frame',
    quantity: 1,
    price: 220
  }, {
    name: 'Freestanding Bath Mixer Tap',
    quantity: 1,
    price: 310
  }],
  subtotal: 530,
  shipping: 0,
  tax: 0,
  total: 530,
  status: 'cancelled',
  payment_method: 'Card',
  payment: {
    status: 'refunded',
    transaction_id: 'txn_sp_refund_2m9k',
    gateway_ref: 're_3QtRefund001',
    paid_at: '2026-01-22T16:00:00Z',
    refunded_at: '2026-01-22T18:30:00Z',
    last4: '5512'
  },
  created_at: '2026-01-22T15:55:00Z'
}, {
  id: 7,
  order_number: 'ORD-2026-007',
  customer_name: 'Oliver Hughes',
  customer_phone: '+44 7700 904455',
  customer_address: '3 Meadow Close, Cardiff, UK',
  items: [{
    name: 'Underfloor Heating Manifold Kit (6 Zone)',
    quantity: 1,
    price: 430
  }],
  subtotal: 430,
  shipping: 12,
  tax: 0,
  total: 442,
  status: 'pending',
  payment_method: 'PayPal',
  payment: {
    status: 'authorized',
    transaction_id: 'PAY-UK-20260121084211',
    gateway_ref: 'EC-7XK90123AB',
    paid_at: null,
    last4: null
  },
  created_at: '2026-01-21T08:42:00Z'
}];
// i merge mock data with any real fetch later for seller order management view
const SellerOrders = () => {
  useAuth();
  const {
    navigate
  } = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0
  });
  const statusColors = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: FaClock
    },
    processing: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: FaTruck
    },
    shipped: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      icon: FaTruck
    },
    delivered: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: FaCheck
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: FaCheck
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: FaTimes
    }
  };
  useEffect(() => {
    setTimeout(() => {
      let filteredOrders = [...mockOrders];
      if (statusFilter) {
        filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
      }
      if (searchTerm) {
        filteredOrders = filteredOrders.filter(o => o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      setOrders(filteredOrders);
      setStats({
        total: mockOrders.length,
        pending: mockOrders.filter(o => o.status === 'pending').length,
        processing: mockOrders.filter(o => o.status === 'processing').length,
        completed: mockOrders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
        cancelled: mockOrders.filter(o => o.status === 'cancelled').length
      });
      setLoading(false);
    }, 500);
  }, [statusFilter, searchTerm]);
  const formatDate = dateStr => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const paymentStatusStyle = status => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'authorized':
        return 'bg-amber-100 text-amber-800';
      case 'pending_collection':
        return 'bg-sky-100 text-sky-800';
      case 'refunded':
        return 'bg-violet-100 text-violet-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  const paymentStatusLabel = status => {
    const map = {
      paid: 'Paid',
      authorized: 'Authorized (capture pending)',
      pending_collection: 'Pay on delivery',
      refunded: 'Refunded'
    };
    return map[status] || status || 'Unknown';
  };
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => order.id === orderId ? {
      ...order,
      status: newStatus
    } : order));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };
  return <div className="min-h-screen" style={{
    background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
  }}>
      {}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/home')} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                background: '#F5E6D3'
              }}>
                  <FaShoppingBag className="text-2xl" style={{
                  color: '#D2A752'
                }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">View Orders</h1>
                  <p className="text-sm text-gray-500">{stats.total} total orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#D2A752]">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
            <div className="text-sm text-gray-500">Processing</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-500">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by order number or customer name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all" />
            </div>
            <div className="md:w-48">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D2A752] transition-all">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {}
        {loading ? <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-[#D2A752]/30 border-t-[#D2A752] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div> : orders.length === 0 ? <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Orders from customers will appear here</p>
          </div> : <div className="space-y-4">
            {orders.map(order => {
          const statusStyle = statusColors[order.status] || statusColors.pending;
          const StatusIcon = statusStyle.icon;
          return <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-gray-900 text-lg">{order.order_number}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} flex items-center gap-1`}>
                            <StatusIcon size={10} />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(order.created_at)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{
                    color: '#D2A752'
                  }}>£{order.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                          <FaCreditCard className="text-gray-400" size={12} />
                          {order.payment_method}
                        </div>
                        {order.payment && <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${paymentStatusStyle(order.payment.status)}`}>
                            {paymentStatusLabel(order.payment.status)}
                          </span>}
                      </div>
                    </div>

                    {}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#D2A752]" />
                          <span className="text-gray-700">{order.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-[#D2A752]" />
                          <span className="text-gray-700">{order.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-[#D2A752]" />
                          <span className="text-gray-700 text-sm">{order.customer_address}</span>
                        </div>
                      </div>
                    </div>

                    {}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <FaBox className="text-gray-400" />
                              <span className="text-gray-700">{item.name}</span>
                              <span className="text-gray-400">x{item.quantity}</span>
                            </div>
                            <span className="font-semibold text-gray-700">£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>)}
                      </div>
                    </div>

                    {}
                    {selectedOrder?.id === order.id && order.payment && <div className="mb-4 rounded-xl border-2 border-[#D2A752]/30 bg-[#FEFCF8] p-4 space-y-3">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <FaPoundSign className="text-[#D2A752]" />
                          Payment &amp; transaction
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Subtotal</div>
                            <div className="font-medium text-gray-900">
                              £{(order.subtotal ?? order.total).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Shipping</div>
                            <div className="font-medium text-gray-900">
                              £{(order.shipping ?? 0).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Tax / VAT</div>
                            <div className="font-medium text-gray-900">
                              £{(order.tax ?? 0).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs uppercase tracking-wide">Total charged</div>
                            <div className="font-bold text-[#D2A752]">£{order.total.toFixed(2)}</div>
                          </div>
                        </div>
                        <div className="border-t border-amber-100 pt-3 space-y-2 text-sm">
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-mono text-gray-800 break-all">
                              {order.payment.transaction_id || '—'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-gray-500">Gateway reference</span>
                            <span className="font-mono text-gray-800 break-all">
                              {order.payment.gateway_ref || '—'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span className="text-gray-500">Paid at</span>
                            <span className="text-gray-800">{formatDate(order.payment.paid_at)}</span>
                          </div>
                          {order.payment.refunded_at && <div className="flex flex-wrap gap-x-4 gap-y-1">
                              <span className="text-gray-500">Refunded at</span>
                              <span className="text-gray-800">{formatDate(order.payment.refunded_at)}</span>
                            </div>}
                        </div>
                      </div>}

                    {}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      {order.status === 'pending' && <>
                          <button onClick={() => handleStatusChange(order.id, 'processing')} className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center gap-2">
                            <FaTruck size={12} /> Process Order
                          </button>
                          <button onClick={() => handleStatusChange(order.id, 'cancelled')} className="px-4 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 transition-all flex items-center gap-2">
                            <FaTimes size={12} /> Cancel
                          </button>
                        </>}
                      {order.status === 'processing' && <button onClick={() => handleStatusChange(order.id, 'shipped')} className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 transition-all flex items-center gap-2">
                          <FaTruck size={12} /> Mark as Shipped
                        </button>}
                      {order.status === 'shipped' && <button onClick={() => handleStatusChange(order.id, 'delivered')} className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition-all flex items-center gap-2">
                          <FaCheck size={12} /> Mark as Delivered
                        </button>}
                      <button onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all flex items-center gap-2" style={{
                  borderColor: '#D2A752',
                  color: '#D2A752'
                }}>
                        <FaEye size={12} /> {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>;
        })}
          </div>}
      </div>
    </div>;
};
export default SellerOrders;
