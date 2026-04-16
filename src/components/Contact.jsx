import {FaGithub,FaLinkedinIn,FaInstagram,FaWhatsapp,FaDiscord} from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/MuneebMoosa" },
    { icon: FaLinkedinIn, link: "https://www.linkedin.com/in/muneeb-moosa-v-v-318270288" },
    { icon: FaInstagram, link: "https://instagram.com/yourprofile" },
    { icon: FaWhatsapp, link: "https://wa.me/7356878374" },
    { icon: FaDiscord, link: "https://discord.com/users/1264980057945014345" },
  ];

  const [name, setName] = useState('');
  const [email , setEmail] = useState('');
  const [message , setMessage] = useState('');
  const [status , setStatus] = useState('INITAILIZE_TRANSMISSION');

  const handleSubmit = async (e) => {
    e.preventDefault();

      const serviceId = import.meta.env.VITE_SERVICE;
      const templateId = import.meta.env.VITE_TEMPLATE;
      const publicKey = import.meta.env.VITE_PUBLIC;
      const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
            title: "New Contact Message",
            from_name: name,
            from_email:  email,
            from_message: message,
        }
    };
    // send data to the mail
    try {
      setStatus('SENDING...');
      const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
      console.log(res.data);
      setName('');
      setEmail('');
      setMessage('')
      setStatus('INITAILIZE_TRANSMISSION')
    } catch (error) {
        console.log(error);
        setStatus('FAILED. TRY AGAIN');             // ← on error
        setTimeout(() => setStatus('INITAILIZE_TRANSMISSION'), 3000);
    }

 }

  return (
    <div className='mt-[100px] md:mt-[200px] mb-[50px] flex justify-center items-center flex-col  px-6' id='contact'>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">
        SEND A<span className="text-[#9CA3AF]"> MESSAGE </span>
      </h1>
      <p className="mt-6 md:mt-10 mb-10 w-full max-w-lg text-sm md:text-l text-[#9CA3AF] font-[family-name:var(--font-kosugi)] text-center">
         Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      {/* main div start */}
        <div className='max-w-6xl w-full h-auto flex flex-col lg:flex-row gap-10 justify-center items-stretch'>
          <div className='bg-[#111114] p-6 md:p-10 h-auto border rounded-lg border-[#1a1c1f] w-full lg:w-1/2 text-start hover:border-[#E84A4A] hover:shadow-[0_0_30px_rgba(212,183,131,0.2)] transition-all duration-300'>
              <h1 className='text-2xl font-bold mb-6'>Establish Connection</h1>
              <div className='mb-5 group'>
                <h2 className='text-sm text-[#9CA3AF] font-normal'>System Email</h2>
                <p className='font-medium text-lg md:text-xl md:mb-5 text-white relative w-max transition-colors duration-300 group-hover:text-[#D4B783] break-all'>
                  muneebmoosavv@gmail.com
                  <span className='absolute left-0 -bottom-2 h-[2px] w-0 bg-[#D4B783] transition-all duration-300 group-hover:w-full'></span>
                </p>
              </div>
              <div className='mb-5 md:mb-10 group'>
                <h2 className='text-sm text-[#9CA3AF] font-normal'>Secure Line</h2>
                <p className='font-medium text-xl md:mb-9 text-white relative w-max transition-colors duration-300 group-hover:text-[#D4B783]'>
                  +91 7356878374
                  <span className='absolute left-0 -bottom-2 h-[2px] w-0 bg-[#D4B783] transition-all duration-300 group-hover:w-full'></span>
                </p>
              </div>
              <h2 className='font-semibold text-sm text-[#9CA3AF]'>SOCIAL NETWORKS:</h2>
              <div className="flex gap-4 mt-4">
                {socialLinks.map((Item, i) => {
                  const Icon = Item.icon;
                  return (
                  <a 
                    href={Item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i} className="w-8 h-8 md:w-10 md:h-10 bg-[#192029] flex items-center justify-center rounded-lg border border-white/20 text-gray-400 hover:text-[#D4B783] hover:bg-[#242220] hover:-translate-y-3  hover:border-[#D4B783] transition cursor-pointer transition-all duration-300">
                    <Icon />
                  </a>
                  ) 
                })}
              </div>
          </div>
          <form className='flex flex-col gap-6 w-full lg:w-1/2' onSubmit={handleSubmit}>
            {/* name */}
              <div className='flex flex-col items-start w-full gap-3'>
                <label htmlFor='name' className='text-[#888f9a] text-xs '>YOUR NAME</label>
                <input
                  className="border border-[#888f9a] w-full rounded-xl p-3 bg-[#10131f9e] placeholder-[#888f9a] text-sm font-[family-name:var(--font-kosugi)] focus:border-2 focus:border-[#D4B783] focus:outline-none transition"
                  id='name'
                  type="text"
                  placeholder="Enter your name...."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {/* email */}
              <div className='flex flex-col items-start w-full gap-3'>
                <label htmlFor='email' className='text-[#888f9a] text-xs'>YOUR EMAIL</label>
                <input
                  className="border border-[#888f9a] w-full rounded-xl p-3 bg-[#10131f9e] placeholder-[#888f9a] text-sm font-[family-name:var(--font-kosugi)] focus:border-2 focus:border-[#D4B783] focus:outline-none transition"
                  id='email'
                  type='email'
                  placeholder="Enter your email...."
                  value={email}
                   onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* message */}
              <div className='flex flex-col items-start w-full gap-3'>
                <label htmlFor='message' className='text-[#888f9a] text-xs'>MESSAGE PAYLOAD</label>
                <textarea
                  className="resize-none border border-[#888f9a] w-full h-40 rounded-xl p-3 bg-[#10131f9e] placeholder-[#888f9a] text-sm font-[family-name:var(--font-kosugi)] focus:border-2 focus:border-[#D4B783] focus:outline-none transition"
                  id='message'
                  placeholder="Enter your message...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              {/* button */}
              <button type='submit'
              className='w-full h-12 font-[family-name:var(--font-kosugi)] bg-linear-to-r from-[#D4B783] to-[#E84A4A] font-bold rounded-lg p-5 flex items-center justify-center hover:scale-103 transition-all duration-300 cursor-pointer'>{status}</button>
          </form>
      </div>

    </div>
  )
}

export default Contact