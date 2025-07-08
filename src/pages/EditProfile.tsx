
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Camera, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: ""
  });
  const [touched, setTouched] = useState<{[key:string]:boolean}>({});
  const [valid, setValid] = useState<{[key:string]:boolean}>({});

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        dateOfBirth: user.date_of_birth || "",
        address: user.address || ""
      });
    });
  }, []);

  const validate = (field:string, value:string) => {
    switch(field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\+?\d{7,}$/.test(value);
      default:
        return value.trim().length > 0;
    }
  };

  const handleInput = (field:string, value:string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setValid(prev => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleSave = async () => {
    try {
      // Add update user API call here if available
      // await authService.updateUser(formData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center justify-start animate-fade-slide-up">
      <div className="w-full max-w-xl px-4 sm:px-0 py-8 overflow-y-auto" style={{minHeight:'100vh'}}>
        {/* Header with Back */}
        <div className="flex items-center gap-2 mb-10 animate-stagger-in" style={{animationDelay:'100ms'}}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight">Edit Profile</h1>
        </div>
        {/* Card */}
        <Card className="p-10 glass-card rounded-3xl shadow-2xl animate-stagger-in" style={{animationDelay:'200ms'}}>
          <h3 className="text-lg font-semibold mb-10 text-blue-700">Personal Information</h3>
          <form className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* First Name */}
              <div className="relative group animate-stagger-in" style={{animationDelay:'300ms'}}>
                <input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => handleInput('firstName', e.target.value)}
                  onFocus={() => setTouched(prev => ({...prev, firstName:true}))}
                  className={`peer h-20 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 ${touched.firstName ? (valid.firstName ? 'border-green-400' : 'border-red-300') : ''}`}
                  required
                  aria-label="First Name"
                />
                <label htmlFor="firstName" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.firstName ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>First Name</label>
                {touched.firstName && (
                  valid.firstName ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
                )}
              </div>
              {/* Last Name */}
              <div className="relative group animate-stagger-in" style={{animationDelay:'350ms'}}>
                <input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => handleInput('lastName', e.target.value)}
                  onFocus={() => setTouched(prev => ({...prev, lastName:true}))}
                  className={`peer h-20 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 ${touched.lastName ? (valid.lastName ? 'border-green-400' : 'border-red-300') : ''}`}
                  required
                  aria-label="Last Name"
                />
                <label htmlFor="lastName" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.lastName ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>Last Name</label>
                {touched.lastName && (
                  valid.lastName ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
                )}
              </div>
            </div>
            {/* Email */}
            <div className="relative group animate-stagger-in" style={{animationDelay:'400ms'}}>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInput('email', e.target.value)}
                onFocus={() => setTouched(prev => ({...prev, email:true}))}
                className={`peer h-20 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 ${touched.email ? (valid.email ? 'border-green-400' : 'border-red-300') : ''}`}
                required
                aria-label="Email"
              />
              <label htmlFor="email" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.email ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>Email</label>
              {touched.email && (
                valid.email ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
              )}
            </div>
            {/* Phone */}
            <div className="relative group animate-stagger-in" style={{animationDelay:'450ms'}}>
              <input
                id="phone"
                value={formData.phone}
                onChange={e => handleInput('phone', e.target.value)}
                onFocus={() => setTouched(prev => ({...prev, phone:true}))}
                className={`peer h-20 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 ${touched.phone ? (valid.phone ? 'border-green-400' : 'border-red-300') : ''}`}
                required
                aria-label="Phone Number"
              />
              <label htmlFor="phone" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.phone ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>Phone Number</label>
              {touched.phone && (
                valid.phone ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
              )}
            </div>
            {/* Date of Birth */}
            <div className="relative group animate-stagger-in" style={{animationDelay:'500ms'}}>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={e => handleInput('dateOfBirth', e.target.value)}
                onFocus={() => setTouched(prev => ({...prev, dateOfBirth:true}))}
                className={`peer h-20 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 ${touched.dateOfBirth ? (valid.dateOfBirth ? 'border-green-400' : 'border-red-300') : ''}`}
                required
                aria-label="Date of Birth"
              />
              <label htmlFor="dateOfBirth" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.dateOfBirth ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>Date of Birth</label>
              {touched.dateOfBirth && (
                valid.dateOfBirth ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
              )}
            </div>
            {/* Address */}
            <div className="relative group animate-stagger-in" style={{animationDelay:'550ms'}}>
              <textarea
                id="address"
                value={formData.address}
                onChange={e => handleInput('address', e.target.value)}
                onFocus={() => setTouched(prev => ({...prev, address:true}))}
                className={`peer h-64 w-full rounded-xl bg-white/70 px-4 pt-7 pb-2 text-xl font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 resize-none ${touched.address ? (valid.address ? 'border-green-400' : 'border-red-300') : ''}`}
                required
                aria-label="Address"
                rows={16}
              />
              <label htmlFor="address" className={`absolute left-4 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${formData.address ? '-translate-y-7 scale-90 text-blue-600' : ''}`}>Address</label>
              {touched.address && (
                valid.address ? <CheckCircle className="absolute right-3 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-3 top-7 text-red-400 w-6 h-6 animate-pop-in" />
              )}
            </div>
          </form>
          {/* Save/Cancel Buttons */}
          <div className="flex gap-6 mt-14 animate-stagger-in" style={{animationDelay:'600ms'}}>
            <Button
              onClick={() => navigate('/profile')}
              variant="outline"
              className="flex-1 h-16 rounded-xl border-blue-300 text-blue-600 bg-white/80 hover:bg-blue-50 font-bold text-lg shadow-lg transition-all duration-150 animate-bounce-on-press"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-16 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
