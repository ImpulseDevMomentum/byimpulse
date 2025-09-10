'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion'

const text = "I'm Discord Bot Developer, Minecraft Technician, Backend Developer, Community Manager, CS student, network manager, and more."
const words = text.split(' ')

const projectsText = "A collection of projects crafted with care and thoughtfulness, each project representing my journey to blend creativity and purpose in meaningful ways."
const projectsWords = projectsText.split(' ')

const projects = [
  {
    title: "Wish Logger",
    year: "discontinued",
    description: "Wish Logger - Project has been discontinued due to Discord's doing.",
    image: "/wish.png",
    link: ""
  },
  {
    title: "Null Drop",
    year: "-", 
    description: "Null Drop - Secure file uploads, generate links for your files and share them with your friends.",
    image: "/drop.png",
    link: "https://nulldrop.xyz"
  },
  {
    title: "Null Mails [Outdated Image Cover]",
    year: "-",
    description: "Null Mails - Secure temporary mails and phone numbers, create your null in seconds, safely, with care.",
    image: "/mails.png",
    link: "https://nullmails.xyz"
  },
  {
    title: "Null Tools",
    year: "2025",
    description: "Null Tools - Collection of null apps & tools, to make developer lifes easier.",
    image: "/tools.png",
    link: "https://nulltools.xyz"
  }
  // {
  //   title: "Null Vault",
  //   year: "-",
  //   description: "Null Vault - Secure payment processor, billing, and invoicing solution.",
  //   image: "",
  //   link: ""
  // },
  // {
  //   title: "Null Pass",
  //   year: "2025",
  //   description: "Null Pass - Secure account manager for Null Tools apps & tools.",
  //   image: "",
  //   link: ""
  // }
]

const expertiseAreas = [
  {
    title: "Discord Bot Development",
    color: "blue",
    tags: ["API", "TYPESCRIPT", "NODE.JS", "DISCORD.JS", "DISCORD BOTS"]
  },
  {
    title: "Minecraft Server Technician", 
    color: "red",
    tags: ["JAVA", "SPIGOT", "PAPER", "PROXY", "SETUP"]
  },
  {
    title: "Web Backend Development",
    color: "cyan", 
    tags: ["API", "TYPESCRIPT", "NODE.JS", "DATABASE DESIGN"]
  },
  {
    title: "Network Management",
    color: "orange",
    tags: ["ROUTING", "SWITCHING", "FIREWALL", "NETWORK SECURITY"]
  }
]


const testimonials = [
  {
    tag: "Great Improviser",
    text: "Impulse is good at designing and implementing new features to his products. He is a great problem solver and has a great sense of design and aesthetics.",
    author: "Notix",
    role: "Owner, Flexcode",
  },
  {
    tag: "Your Go-to guy!",
    text: "He's easy to work with and makes an effort to develop a working relationship across and within teams he's a part of. You can count on him to get things done, and fast.",
    author: "AyrixMC",
    role: "Owner, Clush SMP"
  }
]

type TestimonialCardProps = {
  tag: string;
  text: string;
  author: string;
  role: string;
  index: number;
};

const TestimonialCard = ({ tag, text, author, role, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-zinc-900 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full flex-grow"
    >
      <span className="inline-block px-3 py-1 text-xs bg-zinc-800 rounded-full text-gray-400 mb-4">
        {tag}
      </span>

      <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
        {text}
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <div>
          <h4 className="text-white font-medium">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}


type ProjectCardProps = {
  title: string;
  year: string;
  link: string;
  description: string;
  index: number;
  image: string;
};

const ProjectCard = ({ title, year, description, index, image, link }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="w-full aspect-[4/3] bg-zinc-800 rounded-2xl mb-6 overflow-hidden relative">
        <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
        </a>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-3xl font-semibold text-white">{title}</h3>
        <motion.span 
          className="px-4 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-300 transition-all duration-300 cursor-default ml-4 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          {year}
        </motion.span>
      </div>
      
      <p className="text-zinc-500 leading-relaxed text-base">{description}</p>
    </motion.div>
  )
}

function ProjectsGrid() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              year={project.year}
              description={project.description}
              image={project.image}
              link={project.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ExpertiseCardProps = {
  title: string;
  color: string;
  tags: string[];
  index: number;
};

const ExpertiseCard = ({ title, color, tags, index }: ExpertiseCardProps) => {
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue':
        return {
          bg: 'from-blue-600 to-blue-800',
          hover: 'hover:from-blue-500 hover:to-blue-700'
        }
      case 'red':
        return {
          bg: 'from-red-600 to-red-800', 
          hover: 'hover:from-red-500 hover:to-red-700'
        }
      case 'cyan':
        return {
          bg: 'from-cyan-600 to-cyan-800',
          hover: 'hover:from-cyan-500 hover:to-cyan-700'
        }
      case 'orange':
        return {
          bg: 'from-orange-700 to-orange-900',
          hover: 'hover:from-orange-600 hover:to-orange-800'
        }
      default:
        return {
          bg: 'from-zinc-700 to-zinc-800',
          hover: 'hover:from-zinc-600 hover:to-zinc-700'
        }
    }
  }

  const colorClasses = getColorClasses(color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group bg-zinc-800 hover:bg-gradient-to-r ${colorClasses.bg} ${colorClasses.hover} transition-all duration-500 rounded-2xl p-4 cursor-pointer overflow-hidden relative min-h-[100px] hover:min-h-[160px] flex items-center justify-between flex-wrap`}
    >
      <h3 className="text-2xl font-semibold text-white z-10 mb-2 md:mb-0 md:mr-4 flex-shrink-0 w-full md:w-auto text-center md:text-left">
        {title}
      </h3>
      
      <div className="flex items-center gap-4 z-10 flex-wrap justify-center md:justify-end flex-grow">
        <motion.div 
          className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 justify-center md:justify-end max-w-full"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-white/20 rounded-full text-xs text-white border border-white/20 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        
        <motion.button 
          className="px-4 py-2 bg-white/20 rounded-full text-sm text-white border border-white/30 group-hover:bg-white/30 transition-all duration-300 flex-shrink-0 mt-2 md:mt-0"
          whileHover={{ scale: 1.05 }}
        >
          SEE MORE
        </motion.button>
      </div>
    </motion.div>
  )
}

function ContactSection() {
  return (
    <section className="relative bg-zinc-100 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute -top-4 -left-4 w-3 h-3 bg-zinc-400 rounded-full z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="absolute -top-2 -right-8 w-2 h-2 bg-zinc-500 transform rotate-45 z-10"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
            className="absolute top-1/3 -left-12 h-px bg-zinc-300 w-8 z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            viewport={{ once: true }}
            className="absolute bottom-1/4 -right-6 w-1 h-1 bg-zinc-400 rounded-full z-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-[400px] aspect-[4/3] bg-zinc-200 rounded-xl overflow-hidden mb-12 relative"
          >
            <img 
              src="/me.jpg"
              alt="Portrait"
              className="w-full h-full object-cover filter grayscale"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-none mb-4"
            style={{ fontFamily: 'Arial Black', letterSpacing: '-0.05em' }}
          >
            I̸m̸p̸u̸l̸s̸e̸'
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-auto pt-8 border-t border-zinc-300 w-full flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              Made with ❤️ by me.
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/ImpulseDevMomentum" className="hover:text-zinc-900 transition-colors">Github</a>
              <a href="mailto:contact@byimpulse.xyz" className="hover:text-zinc-900 transition-colors">Email</a>
              <a href="https://dc.byimpulse.xyz" className="hover:text-zinc-900 transition-colors">Discord</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Resume</a>
            </div>
          </motion.div>

        </div>

        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="self-end mb-12 md:mb-20"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C25.5228 0 30 4.47715 30 10C30 15.5228 25.5228 20 20 20C14.4772 20 10 15.5228 10 10C10 4.47715 14.4772 0 20 0ZM20 0C14.4772 0 10 4.47715 10 10C10 15.5228 14.4772 20 20 20C25.5228 20 30 15.5228 30 10C30 4.47715 25.5228 0 20 0Z" fill="black"/>
                <path d="M20 20C25.5228 20 30 24.4772 30 30C30 35.5228 25.5228 40 20 40C14.4772 40 10 35.5228 10 30C10 24.4772 14.4772 20 20 20ZM20 20C14.4772 20 10 24.4772 10 30C10 35.5228 14.4772 40 20 40C25.5228 40 30 35.5228 30 30C30 24.4772 25.5228 20 20 20Z" fill="black"/>
                <path d="M0 20C0 25.5228 4.47715 30 10 30C15.5228 30 20 25.5228 20 20C20 14.4772 15.5228 10 10 10C4.47715 10 0 14.4772 0 20ZM0 20C0 14.4772 4.47715 10 10 10C15.5228 10 20 14.4772 20 20C20 25.5228 15.5228 30 10 30C4.47715 30 0 25.5228 0 20Z" fill="black"/>
                <path d="M40 20C40 25.5228 35.5228 30 30 30C24.4772 30 20 25.5228 20 20C20 14.4772 24.4772 10 30 10C35.5228 10 40 14.4772 40 20ZM40 20C40 14.4772 35.5228 10 30 10C24.4772 10 20 14.4772 20 20C20 25.5228 24.4772 30 30 30C35.5228 30 40 25.5228 40 20Z" fill="black"/>
                <path d="M20 20C20 22.7614 22.2386 25 25 25C27.7614 25 30 22.7614 30 20C30 17.2386 27.7614 15 25 15C22.2386 15 20 17.2386 20 20Z" fill="black"/>
                <path d="M10 20C10 22.7614 12.2386 25 15 25C17.7614 25 20 22.7614 20 20C20 17.2386 17.7614 15 15 15C12.2386 15 10 17.2386 10 20Z" fill="black"/>
                <path d="M20 10C20 12.7614 22.2386 15 25 15C27.7614 15 30 12.7614 30 10C30 7.23858 27.7614 5 25 5C22.2386 5 20 7.23858 20 10Z" fill="black"/>
                <path d="M20 30C20 32.7614 22.2386 35 25 35C27.7614 35 30 32.7614 30 30C30 27.2386 27.7614 25 25 25C22.2386 25 20 27.2386 20 30Z" fill="black"/>
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 mb-8 md:mb-12"
          >
            New project, partnership, or just want to chat?{' '}
            <motion.span
              style={{
                background: 'linear-gradient(to right, #1a1a2e, #0a0a1a, #2a2a4e, #0a0a1a, #1a1a2e)',
                backgroundSize: '300% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'linear',
              }}
              className="inline-block"
            >
              Hit me up!
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full mb-6 border-b border-gray-300 pb-2"
          >
            <a
              href="mailto:contact@byimpulse.xyz"
              className="group text-3xl md:text-4xl font-semibold text-zinc-900 hover:text-blue-600 transition-colors duration-300 flex items-center"
            >
              contact@byimpulse.xyz
              <span className="ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                &rarr;
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full pb-2 border-b border-gray-300"
          >
            <a
              href="#"
              className="group text-3xl md:text-4xl font-semibold text-zinc-900 hover:text-blue-600 transition-colors duration-300 flex items-center"
            >
              Schedule a call
              <span className="ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>
      </section>
    )
  }

function ExpertiseSection() {
  return (
    <>
      <section className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 25%, #F87171 50%, #FCA5A5 75%, #FECACA 100%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,255,255,0.2) 35px,
              rgba(255,255,255,0.2) 70px
            )`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              My Areas of{' '}
              <span 
                className="italic"
                style={{ fontFamily: 'serif' }}
              >
                Expertise
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-0.5 bg-white/30 max-w-xs mx-auto"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-zinc-500 text-sm tracking-wider uppercase">HOW I DO IT</span>
          </div>
          <p className="text-3xl md:text-4xl text-white leading-relaxed mb-16">
            From discovery to strategy, branding, design, and development, I craft seamless solutions to help users love web and products again.
          </p>
          
          <div className="mb-8">
            <span className="text-zinc-500 text-sm tracking-wider uppercase">MY SERVICES</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard
                key={area.title}
                title={area.title}
                color={area.color}
                tags={area.tags}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="text-gray-400 text-sm tracking-widest uppercase font-medium">TESTIMONIALS</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
          Grateful for Your Words, <span className="italic" style={{ fontFamily: 'serif' }}>Motivated to Do More!</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mt-4">
          Every kind word and thoughtful testimonial gives me the motivation to do more. Knowing my work has made an impact inspires me to push boundaries, think creatively, and deliver my best every time.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
        {testimonials.map((t, index) => (
          <TestimonialCard
            key={index}
            tag={t.tag}
            text={t.text}
            author={t.author}
            role={t.role}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

function LetsWorkTogetherBanner() {
  return (
    <section className="relative h-[40vh] overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 25%, #424242 50%, #575757 75%, #6B6B6B 100%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,0.05) 35px,
            rgba(255,255,255,0.05) 70px
          )`
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            LET'S{' '}
            <span 
              className="italic"
              style={{ fontFamily: 'serif' }}
            >
              WORK
            </span>{' '}
            TOGETHER
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-0.5 bg-white/30 max-w-xs mx-auto"
          />
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsTextSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={targetRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <motion.p className="text-3xl md:text-5xl font-bold text-center max-w-5xl px-4 leading-relaxed">
            {projectsWords.map((word, i) => {
              const start = (i / projectsWords.length) * 0.8
              const end = ((i + 1) / projectsWords.length) * 0.8
              return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
            })}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [currentName, setCurrentName] = useState('Kacper')

  useEffect(() => {
    const nameInterval = setInterval(() => {
      setCurrentName(prev => (prev === 'Kacper' ? '!̸I̸m̸p̸u̸l̸s̸e̸' : 'Kacper'))
    }, 4000)
    return () => clearInterval(nameInterval)
  }, [])

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  const wallY = useTransform(scrollYProgress, [0, 0.2], ['100%', '0%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const textContainerOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1])

  return (
    <>
      <main ref={targetRef} className="relative h-[250vh]">
        <div className="absolute top-8 right-8 z-50 flex space-x-4">
          <motion.a
            href="https://github.com/ImpulseDevMomentum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lucide lucide-github"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://dc.byimpulse.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="Discord server"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lucide lucide-discord"
            >
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/>
            </svg>
          </motion.a>
          <motion.a
            href="mailto:contact@byimpulse.xyz"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="Send an email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.293 6.707a2.5 2.5 0 0 1-3.414 0L2 7" />
            </svg>
          </motion.a>
        </div>

        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
            <img 
              src="/rocks.jpg"
              alt="Rocks background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'contrast(1.2) brightness(1.1)' }}
            />
            <div className="relative z-10 min-h-screen flex items-center justify-start pl-20">
              <div className="text-left">
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="text-gray-400">Hello, I'm{' '}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentName}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="inline-block"
                    >
                      <motion.span
                        style={{
                          background: 'linear-gradient(to right, #A0AEC0, #FFFFFF, #A0AEC0)',
                          backgroundSize: '200% auto',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                        }}
                        animate={{
                          backgroundPosition: ['0% center', '200% center'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'linear',
                        }}
                      >
                        {currentName}
                      </motion.span>
                    </motion.span>
                  </AnimatePresence>
                  </span>
                </h1>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: wallY }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <motion.p 
              style={{ opacity: textContainerOpacity }}
              className="text-4xl md:text-6xl font-bold text-center max-w-4xl px-4"
            >
              {words.map((word, i) => {
                const start = 0.25 + (i / words.length) * 0.5
                const end = 0.25 + ((i + 1) / words.length) * 0.5
                return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
              })}
            </motion.p>
          </motion.div>
        </div>
      </main>
      
      <section className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 25%, #93C5FD 50%, #BFDBFE 75%, #DBEAFE 100%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,255,255,0.2) 35px,
              rgba(255,255,255,0.2) 70px
            )`
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              My Selected{' '}
              <span 
                className="italic"
                style={{ fontFamily: 'serif' }}
              >
                Work
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-0.5 bg-white/30 max-w-xs mx-auto"
            />
          </motion.div>
        </div>
      </section>

      <ProjectsTextSection />

      <ProjectsGrid />


      <ExpertiseSection />

      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 20%, #333333 40%, #666666 60%, #999999 80%, #ffffff 100%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent max-w-2xl mx-auto mb-8"
            />
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-light text-black-200 tracking-wide"
            >
              Currently Building the Future
            </motion.h2>
          </motion.div>
        </div>
      </section>
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-gray-400 text-sm tracking-widest uppercase font-medium">CURRENT</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-relaxed font-light">
                Currently, a <span className="font-medium">growning developer, former owner of <span className="font-bold">Wish Logger.</span><br /> <> <br /></>
                </span>{' '}
                <span className="font-medium">Founder</span> of <span className="font-bold">Null Tools</span> with <span className="font-bold">2 years</span> of experience across{' '}
                Discord bots, Minecraft servers, Network Management, Service Provider, and more.{' '}
                <br />
                <br />
                Deadline-driven, problem-solving enthusiast, experienced in{' '}
                <span className="font-medium">seamless teamwork</span> and{' '}
                <span className="font-medium">focus</span> to deliver results that <em className="italic font-medium" style={{ fontFamily: 'serif' }}>matter</em>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="relative my-16"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rotate-45"
            />
          </motion.div>
      <section className="mb-20">
        <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-gray-400 text-sm tracking-widest uppercase font-medium">MY APPROACH</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-500 leading-relaxed font-light mb-12">
                From initial concept and strategic planning to{' '}
                delivering a polished final product, I focus on{' '}
                creating projects that not only meet your goals but{' '}
                leave a <em className="italic font-medium" style={{ fontFamily: 'serif' }}>lasting impression</em>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-500 leading-relaxed font-light">
                Driven by in-depth research, user-centered design{' '}
                principles, and real-world feedback, my designs go{' '}
                beyond appearance—they <span className="font-medium" style={{ fontFamily: 'serif' }}>communicate</span>, <span className="font-medium" style={{ fontFamily: 'serif' }}>inspire</span>,{' '}
                and <span className="font-medium" style={{ fontFamily: 'serif' }}>connect</span>.{' '}
              </p>
            </motion.div>
          </div>
      </section>

      <TestimonialsSection />

      <LetsWorkTogetherBanner />
          

      <ContactSection />
      
    </>
  )
}

type WordProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
};

const Word = ({ children, progress, range }: WordProps) => {
  const color = useTransform(progress, range, ['rgb(107, 114, 128)', 'rgb(255, 255, 255)'])
  return (
    <span className="relative">
      <motion.span style={{ color }}>{children} </motion.span>
    </span>
  )
}