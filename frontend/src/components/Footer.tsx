import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-100 py-20 transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
      
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate("/");
              }}
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Career <span className="text-primary">Compass</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Empowering students to navigate their future with AI-driven insights and expert mentorship. Your journey to success starts with clarity.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4 font-bold text-slate-400">
              {["About Us", "Career Paths", "Resource Hub", "Student Portal", "Book Guidance"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Support</h3>
            <ul className="space-y-4 font-bold text-slate-400">
              {["Help Center", "Privacy Policy", "Terms of Service", "Knowledge Base", "Contact Counselors"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:support@careercompass.com" className="text-slate-200 font-bold hover:text-primary transition-colors">support@careercompass.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Call Us</p>
                  <a href="tel:+911234567890" className="text-slate-200 font-bold hover:text-primary transition-colors">+91 12345 67890</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Our Office</p>
                  <p className="text-slate-200 font-bold leading-tight">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold text-sm tracking-tight text-center md:text-left">
            © {currentYear} Career Compass. All rights reserved by <span className="text-slate-300">SLRTCE Students</span>.
          </p>
          <div className="flex items-center gap-8">
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 cursor-pointer transition-colors">Security</p>
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 cursor-pointer transition-colors">Cookies</p>
            <p className="text-xs font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 cursor-pointer transition-colors">Accessibility</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
