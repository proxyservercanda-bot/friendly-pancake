'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, CheckCircle2, ShieldCheck, Truck, RefreshCw, Printer } from 'lucide-react';
import { ALLOWED_VILLAGES, calculateOrderPrice, orderFormSchema } from '@/lib/types';

export default function OrderSection() {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    village: ALLOWED_VILLAGES[0],
    fullAddress: '',
    quantity: 100,
    paymentMethod: 'COD' as 'ONLINE' | 'COD',
    utrNumber: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const calc = calculateOrderPrice(formData.quantity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = orderFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedOrder(data.order);
      } else {
        alert(data.message || 'त्रुटी आली.');
      }
    } catch (err) {
      alert('सर्व्हर त्रुटी! कृपया पुन्हा प्रयत्न करा किंवा थेट कॉल करा.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppSummary = () => {
    if (!confirmedOrder) return '';
    const text = `*फरकाडे पोल्ट्री फार्म - नवीन ऑर्डर*\n\n` +
      `*ऑर्डर क्र:* ${confirmedOrder.orderNumber}\n` +
      `*ग्राहक:* ${confirmedOrder.customerName}\n` +
      `*मोबाईल:* ${confirmedOrder.mobileNumber}\n` +
      `*गाव:* ${confirmedOrder.village}\n` +
      `*पत्ता:* ${confirmedOrder.fullAddress}\n` +
      `*प्रमाण:* ${confirmedOrder.quantity} गावराण अंडी\n` +
      `*एकूण रक्कम:* ₹${confirmedOrder.finalAmount}\n` +
      `*पेमेंट प्रकार:* ${confirmedOrder.paymentMethod === 'ONLINE' ? 'ऑनलाइन पेमेंट (UTR: ' + confirmedOrder.utrNumber + ')' : 'Cash on Delivery'}\n` +
      `*डिलिव्हरी:* मोफत घरपोच सेवा`;
    return encodeURIComponent(text);
  };

  if (confirmedOrder) {
    return (
      <div className="py-10 px-4 max-w-3xl mx-auto">
        {/* Printable Receipt Section */}
        <div id="printable-receipt" className="bg-white border-2 border-amber-800/30 rounded-2xl p-6 sm:p-10 shadow-xl print:m-0 print:border-none print:shadow-none print:p-0">
          <div className="text-center border-b pb-6 mb-6">
            <div className="flex justify-center mb-3">
              <Image 
                src="/farm-logo.jpg" 
                alt="फरकाडे पोल्ट्री फार्म अधिकृत लोगो" 
                width={120} 
                height={120} 
                className="rounded-full border border-amber-600 shadow-sm print:w-28 print:h-28"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-950">फरकाडे पोल्ट्री फार्म</h1>
            <p className="text-sm text-gray-700 font-medium mt-1">मालक: स्वप्नील सीताराम फरकाडे</p>
            <p className="text-xs sm:text-sm text-gray-600">बनकिंन्होळा, ता. सिल्लोड, जि. छत्रपती संभाजीनगर, ४३११३५</p>
            <p className="text-xs sm:text-sm text-gray-800 font-bold mt-1">मोबाईल: 9822131534</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl mb-6 border border-amber-200 print:bg-white print:border-gray-300">
            <div className="flex justify-between text-sm font-semibold text-gray-800 mb-1">
              <span>ऑर्डर क्रमांक: {confirmedOrder.orderNumber}</span>
              <span>दिनांक: {new Date(confirmedOrder.createdAt).toLocaleDateString('mr-IN')}</span>
            </div>
            <div className="text-sm text-gray-700">
              वेळ: {new Date(confirmedOrder.createdAt).toLocaleTimeString('mr-IN')}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-gray-500">ग्राहक तपशील:</p>
              <p className="font-bold text-gray-900">{confirmedOrder.customerName}</p>
              <p className="text-gray-700">मोबाईल: {confirmedOrder.mobileNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">डिलिव्हरी पत्ता:</p>
              <p className="font-bold text-gray-900">गाव: {confirmedOrder.village}</p>
              <p className="text-gray-700">{confirmedOrder.fullAddress}</p>
              <p className="text-xs text-gray-500">ता. सिल्लोड, जि. छत्रपती संभाजीनगर</p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm mb-6 border-collapse">
            <thead>
              <tr className="border-b-2 border-amber-900/40 text-amber-950">
                <th className="py-2">उत्पादन</th>
                <th className="py-2 text-center">संख्या</th>
                <th className="py-2 text-right">दर</th>
                <th className="py-2 text-right">रक्कम</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold">{confirmedOrder.productName}</td>
                <td className="py-3 text-center">{confirmedOrder.quantity}</td>
                <td className="py-3 text-right">₹17</td>
                <td className="py-3 text-right">₹{confirmedOrder.subtotal}</td>
              </tr>
            </tbody>
          </table>

          {/* Calculations */}
          <div className="space-y-1.5 text-sm border-b pb-4 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>मूळ रक्कम:</span>
              <span>₹{confirmedOrder.subtotal}</span>
            </div>
            {Number(confirmedOrder.discountAmount) > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Bulk सवलत ({confirmedOrder.discountPercent}%):</span>
                <span>- ₹{confirmedOrder.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-700">
              <span>घरपोच सेवा (Delivery):</span>
              <span className="text-emerald-700 font-bold">मोफत (FREE)</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold text-amber-950 pt-2 border-t">
              <span>एकूण देय रक्कम:</span>
              <span>₹{confirmedOrder.finalAmount}</span>
            </div>
          </div>

          <div className="text-sm text-gray-700 space-y-1 mb-8">
            <p><span className="font-semibold">पेमेंट प्रकार:</span> {confirmedOrder.paymentMethod === 'ONLINE' ? 'ऑनलाइन पेमेंट' : 'Cash on Delivery'}</p>
            <p><span className="font-semibold">UTR / ट्रान्झॅक्शन नंबर:</span> {confirmedOrder.utrNumber}</p>
          </div>

          <div className="text-center text-sm font-semibold text-amber-900 border-t pt-4">
            आपल्या ऑर्डरसाठी मनापासून धन्यवाद! 🙏
          </div>
        </div>

        {/* Action Buttons (Hidden when printing) */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-6 rounded-xl transition shadow"
          >
            <Printer size={20} />
            पावती प्रिंट करा
          </button>
          <a
            href={`https://wa.me/919822131534?text=${getWhatsAppSummary()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition shadow"
          >
            <MessageCircle size={20} />
            WhatsApp वर पाठवा
          </a>
          <a
            href="tel:9822131534"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow"
          >
            <Phone size={20} />
            कॉल करा
          </a>
          <button
            onClick={() => {
              setConfirmedOrder(null);
              setFormData({
                customerName: '',
                mobileNumber: '',
                village: ALLOWED_VILLAGES[0],
                fullAddress: '',
                quantity: 100,
                paymentMethod: 'COD',
                utrNumber: '',
                notes: '',
              });
            }}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition"
          >
            <RefreshCw size={20} />
            नवीन ऑर्डर करा
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="order-section" className="py-12 px-4 bg-amber-50/50">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-100">
        <div className="text-center mb-8">
          <span className="text-amber-800 text-sm font-bold tracking-wider uppercase bg-amber-100 px-4 py-1 rounded-full">
            सुलभ व जलद नोंदणी
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-950 mt-3">
            गावराण अंडी ऑर्डर करा
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            थेट फार्ममधून ताजी अंडी तुमच्या घरी. मोफत घरपोच सेवा उपलब्ध.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
              ग्राहकाचे पूर्ण नाव <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="उदा. राहुल पांडुरंग पाटील"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900"
            />
            {errors.customerName && <p className="text-red-600 text-xs mt-1">{errors.customerName}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
              मोबाईल नंबर <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              maxLength={10}
              placeholder="उदा. 9822131534"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900"
            />
            {errors.mobileNumber && <p className="text-red-600 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>

          {/* Village Selection Dropdown Only */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
              गाव निवडा (ता. सिल्लोड) <span className="text-red-500">*</span>
            </label>
            <select
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900 font-medium"
            >
              {ALLOWED_VILLAGES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">डिलिव्हरी केवळ या १० गावांमध्ये उपलब्ध आहे.</p>
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1 text-sm sm:text-base">
              घर / दुकानाचा पूर्ण पत्ता <span className="text-red-500">*</span>
            </label>
            <textarea
              name="fullAddress"
              rows={2}
              value={formData.fullAddress}
              onChange={handleInputChange}
              placeholder="उदा. मारुती मंदिराजवळ, मेन रोड, घर नं. ४२"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900"
            />
            {errors.fullAddress && <p className="text-red-600 text-xs mt-1">{errors.fullAddress}</p>}
          </div>

          {/* Quantity Selection */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-800 font-semibold text-sm sm:text-base">
                गावराण अंड्यांची संख्या (१ ते २,०००) <span className="text-red-500">*</span>
              </label>
              {calc.quantity >= 1000 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  15% Bulk Discount लागू झाला!
                </span>
              )}
            </div>
            <input
              type="number"
              name="quantity"
              min={1}
              max={2000}
              value={formData.quantity || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900 font-bold text-lg"
            />
            {errors.quantity && <p className="text-red-600 text-xs mt-1">{errors.quantity}</p>}
          </div>

          {/* Calculation Card */}
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200/80 space-y-2 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>अंड्यांची संख्या:</span>
              <span className="font-semibold">{calc.quantity} अंडी</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>दर:</span>
              <span>₹17 प्रति अंडे</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>मूळ रक्कम:</span>
              <span>₹{calc.subtotal}</span>
            </div>
            {calc.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>15% Bulk सवलत:</span>
                <span>- ₹{calc.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-700">
              <span>घरपोच सेवा:</span>
              <span className="text-emerald-700 font-bold">मोफत (FREE)</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold text-amber-950 pt-2 border-t border-amber-200">
              <span>अंतिम देय रक्कम:</span>
              <span>₹{calc.finalAmount}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <label className="block text-gray-800 font-semibold text-sm sm:text-base">
              पेमेंट पद्धत निवडा <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${formData.paymentMethod === 'COD' ? 'border-amber-700 bg-amber-50/70' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-amber-700"
                />
                <span className="font-semibold text-gray-900">Cash on Delivery (हस्ते रोख)</span>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${formData.paymentMethod === 'ONLINE' ? 'border-amber-700 bg-amber-50/70' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={formData.paymentMethod === 'ONLINE'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-amber-700"
                />
                <span className="font-semibold text-gray-900">ऑनलाइन पेमेंट (QR Code / UPI)</span>
              </label>
            </div>
          </div>

          {/* Online Payment Details */}
          {formData.paymentMethod === 'ONLINE' && (
            <div className="bg-gray-50 border border-gray-300 rounded-2xl p-5 text-center space-y-4">
              <p className="text-sm font-semibold text-gray-800">
                खालील QR Code स्कॅन करून पेमेंट करा आणि पेमेंट केल्यानंतर UTR नंबर खाली भरा:
              </p>
              <div className="flex justify-center">
                <Image
                  src="/payment-qr.jpg"
                  alt="India Post Payments Bank QR Code"
                  width={220}
                  height={220}
                  className="border rounded-xl shadow-sm bg-white p-2"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                <p className="font-bold">FARKADE SWAPNIL SITARAM</p>
                <p className="text-amber-800 font-mono">9420991534@postbank</p>
              </div>

              <div className="text-left">
                <label className="block text-gray-800 font-semibold mb-1 text-sm">
                  UTR / Transaction Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleInputChange}
                  placeholder="उदा. 423456789012"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900"
                />
                {errors.utrNumber && <p className="text-red-600 text-xs mt-1">{errors.utrNumber}</p>}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1 text-sm">
              काही सूचना / टीप (पर्यायी)
            </label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="उदा. सकाळी १० नंतर डिलिव्हरी द्या"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-gray-900 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-amber-800 hover:bg-amber-900 text-white font-bold text-lg rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {submitting ? 'ऑर्डर नोंदवत आहे...' : 'ऑर्डर निश्चित करा (Confirm Order)'}
          </button>
        </form>
      </div>
    </section>
  );
}
