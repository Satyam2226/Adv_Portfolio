import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';
import { useState, type ChangeEvent, type FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(Array.isArray(result.error) ? result.error[0].message : result.error || 'Failed to send message');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-24 px-6 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-blue/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold font-display">Let's build something <span className="neon-text">epic</span> together.</h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-sm">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem icon={<Mail />} label="Email" value={PERSONAL_INFO.email} href={`mailto:${PERSONAL_INFO.email}`} />
              <ContactInfoItem icon={<Phone />} label="Phone" value="+91 7634848781" href="tel:+917634848781" />
              <ContactInfoItem icon={<MapPin />} label="Location" value="Bhubaneswar, India" href="https://www.google.com/maps/place/Bhubaneswar,+Odisha,+India" />
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:bg-white/[0.04] transition-all duration-500 hover:border-neon-purple/20 group/box shadow-lg hover:shadow-neon-purple/5">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-white/40 group-hover/box:text-white/60 transition-colors">Connect Instantly</h4>
              <div className="flex flex-wrap gap-3 md:gap-4">
                 {[
                   { name: 'GitHub', url: PERSONAL_INFO.socials.github, color: 'hover:text-white hover:border-white/40' },
                   { name: 'LinkedIn', url: PERSONAL_INFO.socials.linkedin, color: 'hover:text-[#0077b5] hover:border-[#0077b5]/40' },
                   { name: 'Instagram', url: PERSONAL_INFO.socials.instagram, color: 'hover:text-[#E4405F] hover:border-[#E4405F]/40' }
                 ].map((s) => (
                   <a 
                     key={s.name} 
                     href={s.url} 
                     target="_blank"
                     rel="noreferrer"
                     className={`px-4 md:px-6 py-3 glass-dark border border-white/10 rounded-2xl transition-all text-xs md:text-sm font-bold flex items-center gap-2 group ${s.color}`}
                   >
                     {s.name}
                     <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                   </a>
                 ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative bg-white/[0.02]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormInput 
                   label="Full Name" 
                   placeholder="John Doe" 
                   type="text" 
                   name="name" 
                   value={formData.name} 
                   onChange={handleChange} 
                   required 
                 />
                 <FormInput 
                   label="Email Address" 
                   placeholder="john@example.com" 
                   type="email" 
                   name="email" 
                   value={formData.email} 
                   onChange={handleChange} 
                   required 
                 />
              </div>
              <FormInput 
                label="Subject" 
                placeholder="Inquiry about Project" 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Message</label>
                 <textarea 
                   rows={6}
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   required
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-neon-blue/40 transition-all resize-none"
                   placeholder="Your detailed message here..."
                 />
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Message sent successfully!
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-neon-blue text-black font-black rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.2)] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-center gap-6 group">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-neon-blue group-hover:bg-neon-blue/10 transition-all border border-white/10 group-hover:border-neon-blue/40">
        {icon}
      </div>
      <div>
        <span className="block text-xs font-bold text-white/30 uppercase tracking-widest">{label}</span>
        <span className="text-lg font-semibold text-white group-hover:neon-text transition-all">{value}</span>
      </div>
    </a>
  );
}

function FormInput({ label, placeholder, type, name, value, onChange, required }: { 
  label: string, 
  placeholder: string, 
  type: string, 
  name: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">{label}</label>
      <input 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-neon-blue/40 transition-all"
      />
    </div>
  );
}
