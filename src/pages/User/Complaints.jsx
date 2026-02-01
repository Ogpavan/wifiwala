import { useState } from "react";
import {
  Send,
  CheckCircle,
  Phone,
  MessageCircle,
  Mail,
  AlertCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function HelpComplaintCenter() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complaintId, setComplaintId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get user info from localStorage
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo || !userInfo.id) {
        throw new Error("User not logged in");
      }

      const complaintData = {
        user_id: userInfo.id,
        subject: formData.subject,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(complaintData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit complaint");
      }

      console.log("Complaint submitted successfully:", result);
      setComplaintId(result.complaint.complaint_id);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setComplaintId(null);
        setFormData({
          subject: "",
          description: "",
          category: "general",
          priority: "medium",
        });
      }, 3000);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError(err.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/1234567890?text=Hi, I need help with...",
      "_blank",
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 pb-32">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-white" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Complaint Registered
          </h2>
          <p className="text-gray-600 text-sm mb-1">ID: #{complaintId}</p>
          <p className="text-gray-500 text-xs">We'll respond within 24 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-18">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-6">
        <h1 className="text-xl font-bold mb-1">Help & Support</h1>
        <p className="text-blue-100 text-xs">We're here to help</p>
      </div>

      <div className="px-6 py-6 max-w-lg mx-auto">
        {/* Register Complaint Form */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-blue-900 text-base"
            />
            <h2 className="text-base font-bold text-gray-800">Need Help?</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle
                className="text-red-500 mt-0.5 flex-shrink-0"
                size={16}
              />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description"
                maxLength="200"
                disabled={loading}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="general">General</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing</option>
                <option value="connection">Connection Problem</option>
                <option value="speed">Speed Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your issue..."
                rows="4"
                disabled={loading}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Complaint
                </>
              )}
            </button>
          </form>
        </div>

        {/* Need More Help Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Need More Help?
          </h2>

          <div className="space-y-3">
            {/* Call Option */}
            <button
              onClick={handleCall}
              className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
            >
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="text-white" size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-800 text-sm">Call Us</p>
                <p className="text-xs text-gray-600">+1 (234) 567-890</p>
              </div>
            </button>

            {/* WhatsApp Option */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all"
            >
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-800 text-sm">WhatsApp</p>
                <p className="text-xs text-gray-600">24/7 Support</p>
              </div>
            </button>

            {/* Email Support */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-800 text-sm">Email</p>
                <p className="text-xs text-gray-600">support@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
